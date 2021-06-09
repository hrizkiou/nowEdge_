import React, {Component, Suspense} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import BreadcrumbMenu from './BreadcrumbMenu';
import UpdateProfile from './UpdateProfile';
import Sidebar from './Sidebar';
import SwalModal from './SwalModal';
import {withTranslation} from 'react-i18next';

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
// const Topbar = React.lazy(() => import("./Topbar"));
// const RightSidebar = React.lazy(() => import("./RightSidebar"));
// const Footer = React.lazy(() => import("./Footer"));

const loading = () => <div className="text-center"></div>;

class AuthLayout_ extends Component {
  onClickLogout = () => {
    const {t} = this.props;
    SwalModal({
      text: t('loginIn.askLogout'),
      icon: 'warning',
      buttons: [t('moduleQuiz.swal.no'), t('moduleQuiz.swal.yes')],
      confirmButtonColor: '#71B6F9',
      dangerMode: false,
    }).then((willLogout) => {
      if (willLogout) {
        this.props.history.push(`/logout`);
      }
    });
  };

  constructor(props) {
    super(props);

    this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      isCondensed: false,
      modalShow: false,
    };
  }

  signOut(e) {
    e.preventDefault();
    this.props.history.push('/login');
  }

  /**
   * toggle Menu
   */
  toggleMenu = (e) => {
    e.preventDefault();
    this.setState({isCondensed: !this.state.isCondensed});
  };

  /**
   * Toggle right side bar
   */
  toggleRightSidebar = () => {
    document.body.classList.toggle('right-bar-enabled');
  };

  render() {
    // get the child view which we would like to render
    const children = this.props.children || null;
    return (
      <div className="app">
        <UpdateProfile
          show={this.state.modalShow}
          onHide={() => {
            this.setState({modalShow: false});
          }}
        />
        <div id="wrapper">
          <Suspense fallback={loading()}>
            {/* <Topbar rightSidebarToggle={this.toggleRightSidebar} menuToggle={this.toggleMenu} {...this.props} /> */}
            <Sidebar
              isCondensed={this.state.isCondensed}
              {...this.props}
              showUpProfile={() => {
                this.setState({modalShow: !this.state.modalShow});
              }}
            />
          </Suspense>
          <div className="content-page mt-0">
            <div className="content pb-4">
              <Container fluid>
                <div className="logout-mobile">
                  <div
                    className="logout-btn"
                    onClick={this.onClickLogout}
                    style={{cursor: 'pointer'}}>
                    <i
                      className="fas fa-power-off  fa-2x"
                      style={{color: '#EB4D4D'}}></i>
                  </div>
                </div>
                <BreadcrumbMenu
                  name={this.props.name}
                  moduleID={this.props.moduleID}
                />
                <Suspense fallback={loading()}>{children}</Suspense>
              </Container>
            </div>

            {/* <Footer /> */}
          </div>
        </div>

        {/* <RightSidebar title={"Settings"}>
                    <RightSidebarContent user={this.props.user} />
                </RightSidebar> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

const AuthLayout = connect(mapStateToProps, null)(AuthLayout_);

// export default AuthLayout_ as AuthLayout

export default withTranslation()(AuthLayout);

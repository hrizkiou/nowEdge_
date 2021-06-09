import React, {Component, Suspense} from 'react';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import BreadcrumbMenu from './BreadcrumbMenu';
import SwalModal from './SwalModal';
import {withTranslation} from 'react-i18next';
import SidebarCollapsed from './SidebarCollapsed';

const loading = () => <div className="text-center"></div>;

class BusinessGameLayout_ extends Component {
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
        <div id="wrapper">
          <Suspense fallback={loading()}>
            <SidebarCollapsed
              isCondensed={this.state.isCondensed}
              {...this.props}
              showUpProfile={() => {
                this.setState({modalShow: !this.state.modalShow});
              }}
              user={this.props.user}
            />
          </Suspense>
          <div className="content-page mt-0" style={{marginLeft: '68px'}}>
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.Auth.user,
  };
};

const BusinessGameLayout = connect(mapStateToProps, null)(BusinessGameLayout_);

export default withTranslation()(BusinessGameLayout);

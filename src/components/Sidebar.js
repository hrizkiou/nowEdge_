import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  UncontrolledDropdown,
  DropdownToggle,
} from "reactstrap";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import MetisMenu from "metismenujs/dist/metismenujs";
import profilePic from "../assets/images/user-1.png";
import logo from "../assets/images/logo_2.svg";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import SwalModal from "./SwalModal";

const SideNavContent = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          <li className="menu-title">{t("sideBar.navigation")} </li>

          <li>
            <Link to="/dashboard" className="waves-effect side-nav-link-ref">
              <i className="fas fa-folder-open"></i>
              <span> {t("sideBar.modules")} </span>
            </Link>
          </li>

        </ul>
      </div>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

const SideNavContentModerator = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          <li className="menu-title">{t("sideBar.navigation")} </li>

          <li>
            <Link to={{ pathname: '/moderator/modules' }} className="waves-effect side-nav-link-ref">
              <i className="fas fa-folder-open"></i>
              <span> Formation </span>
            </Link>
          </li>

        </ul>

        <ul className="metismenu" id="side-menu">
          <li className="menu-title">Forum</li>

          <li>
            <Link to={{ pathname: '' }} className="waves-effect side-nav-link-ref">
              <i className="fab fa-wpforms"></i>
              <span> Forum </span>
            </Link>
          </li>

        </ul>
      </div>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

const UserProfile = (props) => {

  const { t } = useTranslation();
  const history = useHistory();
  
  const onClickLogout = () => { 
    SwalModal({
      text: t('loginIn.askLogout') ,
      icon: "warning",
      buttons: [t('moduleQuiz.swal.no'),t('moduleQuiz.swal.yes')],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willLogout) => {
      if (willLogout) {  

        history.push(
          `/logout`
        );
      }
    });
  } 
  return (
    <React.Fragment>
      <div className="user-box text-center">
        <div className="logo-box mb-2">
          <Link to="/" className="logo text-center">
            <span className="logo-lg">
              <img src={logo} alt="" height="33" />
            </span>
            {/* <span className="logo-sm">
                    <img src={logoSm} alt="" height="29" />
                </span> */}
          </Link>
        </div>
        <img
          src={props.user.avatarPath ||  profilePic}
          alt="user-img"
          title= {props.user.firstName + " " + props.user.lastName}
          className="rounded-circle img-thumbnail avatar-lg"
        />
        <UncontrolledDropdown>
          <DropdownToggle
            caret
            tag="a"
            className="text-dark dropdown-toggle h5 mt-2 mb-1 d-block"
          >
            {props.user.firstName} {props.user.lastName}
          </DropdownToggle>
        </UncontrolledDropdown>

        <p className="text-muted">
          {props.user.role && props.user.role.name}
        </p>
        <ul className="list-inline">
          <li className="list-inline-item" onClick={()=>props.showUpProfile()} style={{ cursor: 'pointer'}}>
              <i className="fas fa-cog"></i>
          </li>

          <li className="list-inline-item  text-custom" onClick={onClickLogout}  style={{ cursor: 'pointer'}} >
              <i className="fas fa-power-off" style={{ color: "#EB4D4D" }}></i>
          </li>
          
        </ul>
      </div>
    </React.Fragment>
  );
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleOtherClick = this.handleOtherClick.bind(this);
    this.initMenu = this.initMenu.bind(this);
  }

  /**
   * Bind event
   */
  componentWillMount = () => {
    document.addEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   *
   */
  componentDidMount = () => {
    this.initMenu();
  };

  /**
   * Component did update
   */
  componentDidUpdate = (prevProps) => {
    if (this.props.isCondensed !== prevProps.isCondensed) {
      if (prevProps.isCondensed) {
        document.body.classList.remove("sidebar-enable");
        document.body.classList.remove("enlarged");
      } else {
        document.body.classList.add("sidebar-enable");
        const isSmallScreen = window.innerWidth < 768;
        if (!isSmallScreen) {
          document.body.classList.add("enlarged");
        }
      }

      this.initMenu();
    }
  };

  /**
   * Bind event
   */
  componentWillUnmount = () => {
    document.removeEventListener("mousedown", this.handleOtherClick, false);
  };

  /**
   * Handle the click anywhere in doc
   */
  handleOtherClick = (e) => {
    if (this.menuNodeRef && this.menuNodeRef.contains(e.target)) return;
    // else hide the menubar
    document.body.classList.remove("sidebar-enable");
  };

  /**
   * Init the menu
   */
  initMenu = () => {
    // render menu
    new MetisMenu("#side-menu");
    var links = document.getElementsByClassName("side-nav-link-ref");
    var matchingMenuItem = null;
    for (var i = 0; i < links.length; i++) {
      if (this.props.location.pathname === links[i].pathname) {
        matchingMenuItem = links[i];
        break;
      }
    }

    if (matchingMenuItem) {
      matchingMenuItem.classList.add("active");
      var parent = matchingMenuItem.parentElement;

      /**
       * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
       * We should come up with non hard coded approach
       */
      if (parent) {
        parent.classList.add("active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.add("in");
        }
        const parent3 = parent2.parentElement;
        if (parent3) {
          parent3.classList.add("active");
          var childAnchor = parent3.querySelector(".has-dropdown");
          if (childAnchor) childAnchor.classList.add("active");
        }

        const parent4 = parent3.parentElement;
        if (parent4) parent4.classList.add("in");
        const parent5 = parent4.parentElement;
        if (parent5) parent5.classList.add("active");
      }
    }
  };

  render() {
    const isCondensed = this.props.isCondensed || false;
    const user  = this.props.user || {};
    const showUpProfile  = this.props.showUpProfile || false;

    if(user)
    return (
      <React.Fragment>
        <div
          className="left-side-menu"
          style={{ top: 0, padding: 0 }}
          ref={(node) => (this.menuNodeRef = node)}
        >
          {!isCondensed && (
            <PerfectScrollbar>
              <UserProfile user={user} showUpProfile={showUpProfile} />
              {(
                user.role && user.role.id === 2 ?
                <SideNavContentModerator />
                :
                <SideNavContent />
              )}
            </PerfectScrollbar>
          )}
          {isCondensed && <UserProfile user={user} /> && 
          
          (
            user.role.id === 2 ?
              <SideNavContentModerator />
              :
              <SideNavContent />
            
          )
          }
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  return { user };
};

export default connect(mapStateToProps)(Sidebar);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo_dash.png";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {

  const generateBreadcrumb = () => {

    switch (this.props.name) {
      case "Dashboard":
        return (
          <Breadcrumb>
            <BreadcrumbItem active>Modules</BreadcrumbItem>
          </Breadcrumb>
        )
      
      case "ListQuiz":
        return ( 
          <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/Dashboard">Modules</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="">Nom du module 1</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Liste des quiz</BreadcrumbItem>
        </Breadcrumb>
        ) 
      
      case "ModuleDetail":
        return (
          
          <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/Dashboard">Modules</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Nom du module 1</BreadcrumbItem>
        </Breadcrumb>
        ) ;
      
    
      default:
        return null;
    }
  }


    return (
      <React.Fragment>
        <div className="navbar-custom">
        
        {
          this.props.name !== 'Dashboard' && 
          <ul className="list-unstyled topnav-menu float-right mb-0">
            <li className="d-none d-sm-block">
              <form className="app-search">
                <div className="app-search-box">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search..."
                    />
                    <div className="input-group-append">
                      <button className="btn" type="submit">
                        <i className="fe-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </li>

            {/* <li>
              <NotificationDropdown notifications={Notifications} />
            </li>

            <li>
              <ProfileDropdown profilePic={profilePic} menuItems={ProfileMenus} username={'Nik Patel'} />
            </li> */}

{/* 
            <li className="dropdown notification-list">
              <button className="btn btn-link nav-link right-bar-toggle waves-effect waves-light" onClick={this.props.rightSidebarToggle}>
                <i className="fe-settings noti-icon"></i>
              </button>
            </li> */}
          </ul>
        }

          <div className="logo-box">
            <Link to="/" className="logo text-center">
              <span className="logo-lg">
                <img src={logo} alt="" height="29" />
              </span>
              {/* <span className="logo-sm">
                <img src={logoSm} alt="" height="29" />
              </span> */}
            </Link>
          </div>

          <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
          <li>
              <button
                className="button-menu-mobile disable-btn waves-effect"
                onClick={this.props.menuToggle}
              >
                <i className="fe-menu"></i>
              </button>
            </li>

            <li className="ml-2">
            {/* 
              must build component to manage Breadcrumb   
             */}

            {generateBreadcrumb()}
            </li>
            
{/* 
            <li>
              <h4 className="page-title-main">{this.props.title}</h4>
            </li> */}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default connect()(Topbar);

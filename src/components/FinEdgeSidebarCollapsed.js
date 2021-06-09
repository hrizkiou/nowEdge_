import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import profilePic from "../assets/images/user-1.png";
import groupImg from "../assets/images/groupImg.svg";
import welkr from "../assets/images/Group 5209.svg";

import { useTranslation } from "react-i18next";

const Submenu = ({ item }) => {
  const [state, setstate] = useState(false);

  return (
    <li
      className="submenu_li"
      onMouseEnter={() => (item.content.length > 0 ? setstate(true) : null)}
      onMouseLeave={() => (item.content.length > 0 ? setstate(false) : null)}
    >
      <Link
        to={item.to}
        className={item.content.length > 0 ? "submenu_a" : null}
      >
        {item.content && (
          <ul
            className="submenu sub_ul_link_finEdg"
            style={{
              display: state ? "inline-block" : "none",
            }}
          >
            {item.content.map((item, index) => {
              return (
                <>
                  {item.isNotClickable ? (
                    <div
                      style={{
                        paddingRight: 20,
                        paddingTop: 13,
                        paddingBottom: 13,
                        paddingLeft: 10,
                      }}
                    >
                      <span style={{ cursor: "default" }}>{item.label}</span>
                    </div>
                  ) : (
                    <li className="sub_link_parent" key={index}>
                      <Link to={item.to} className="sub_link">
                         {item.label}
                      </Link>{" "}
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        )}
        <i
          className={[item.icon , "icon_sidebar_finEdg"].join(" ")}
          style={item.isLast ? { marginLeft: 2 } : {}}
        ></i>
      </Link>
    </li>
  );
};

const SideNavContentModerator = (props) => {
  const { user } = props;

  const { t } = useTranslation();
  const contentModerator = [
    {
      icon: "fas fa-folder-open",
      label: "Second Item",
      to: "#",
      content: [
        {
          icon: "icon-class-name",
          label: t("stratEdge.sidebar.analyse"),
          to: "/moderator/StratEdge/analysis",
          isNotClickable: true,
        },
        {
          icon: "icon-class-name",
          label: t("stratEdge.sidebar.analyseProduct"),
          to: "/moderator/StratEdge/product-analysis",
        },
        {
          icon: "icon-class-name",
          label: t("stratEdge.sidebar.analyseCompetitor"),
          to: "/moderator/StratEdge/competitor-analysis",
        },
        {
          icon: "icon-class-name",
          label: t("stratEdge.sidebar.analyseMarket"),
          to: "/moderator/StratEdge/market-analysis",
        },
        {
          icon: "icon-class-name",
          label: t("stratEdge.sidebar.strategicDesicion"),
          to: "/moderator/StratEdge/strategic-decisions",
        },
      ],
    },

    {
      icon: "fas fa-poll",
      to: "/moderator/StratEdge/analysis",
      content: [],
    },
  ];

  const contentParticipant = [
    {
      icon: "fas fa-book",
      label: "Second Item",
      to: "#",
      content: [
        {
          icon: "icon-class-name",
          label: t("finEdge.sidebar.theoryRules"),
          to: "/FinEdge/theory-rules",
        },
      ],
    },
    {
      icon: "fas fa-wallet",
      to: "#",
      content: [
        {
          icon: "icon-class-name",
          label: t("finEdge.sidebar.marketView"),
          to: "/FinEdge/market",
        },
        {
          icon: "icon-class-name",
          label: t("finEdge.sidebar.portefeuille"),
          to: "/finEdge/Wallet",
        },
      ],
    },
    {
      icon: " fas fa-chart-pie",
      to: "#",
      content: [
        {
          icon: "icon-class-name",
          label: t("finEdge.sidebar.statsrisques"),
          to: "/FinEdge/statistics-risks",
        },
      ],
    },
    {
      icon: " fas fa-poll",
      to: "#",
      content: [
        {
          icon: "icon-class-name",
          label: t("finEdge.sidebar.classement"),
          to: "/FinEdge/ranking",
        },
      ],
    },
  ];
  const content = user.role.id === 2 ? contentModerator : contentParticipant;
  return (
    <React.Fragment>
      <div id="sidebar-menu">
        <ul className="metismenu" id="side-menu">
          {content.map((item, index) => {
            return <Submenu key={index} item={item} />;
          })}
          {/* <li>
            <Link
              to="/business-game"
              className="submenu_a"
              style={{
                justifyContent: 'center',
                display: 'flex',
              }}>
              <img src={PollSolid} alt="user-img" />
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="clearfix"></div>
    </React.Fragment>
  );
};

const UserProfile = (props) => {
  return (
    <React.Fragment>
      <div className="user-box text-center">
        <div>
          {/* {props.user.role.id === 2 ? ( */}

          <Link to="/FinEdge">
            <img
              src={welkr}
              alt="user-img"
              style={{
                width: "40px",
                height: "40px",
                marginTop: "22px",
                marginBottom: "32px",
              }}
            />
          </Link>
          {/* ) : (
            <Link to="#">
              <img
                src={welkr}
                alt="user-img"
                style={{
                  width: "40px",
                  height: "40px",
                  marginTop: "22px",
                  marginBottom: "32px",
                }}
              />
            </Link>
          )} */}
        </div>
        <img
          src={props.user.avatarPath || profilePic}
          alt="user-img"
          style={{
            width: "50px",
            height: "50px",
            marginBottom: "39px",

            borderRadius: 30,
          }}
          className=""
        />
      </div>
    </React.Fragment>
  );
};

class FinEdgeSidebarCollapsed extends Component {
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
    // new MetisMenu('#side-menu', {
    //   toggle: false,
    // });
    // var links = document.getElementsByClassName('side-nav-link-ref');
    // var matchingMenuItem = null;
    // for (var i = 0; i < links.length; i++) {
    //   if (this.props.location.pathname === links[i].pathname) {
    //     matchingMenuItem = links[i];
    //     break;
    //   }
    // }
    // if (matchingMenuItem) {
    //   matchingMenuItem.classList.add('active');
    //   var parent = matchingMenuItem.parentElement;
    /**
     * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
     * We should come up with non hard coded approach
     */
    // if (parent) {
    //   parent.classList.add('active');
    //   const parent2 = parent.parentElement;
    //   if (parent2) {
    //     parent2.classList.add('in');
    //   }
    //   const parent3 = parent2.parentElement;
    //   if (parent3) {
    //     parent3.classList.add('active');
    //     var childAnchor = parent3.querySelector('.has-dropdown');
    //     if (childAnchor) childAnchor.classList.add('active');
    //   }
    //   const parent4 = parent3.parentElement;
    //   if (parent4) parent4.classList.add('in');
    //   const parent5 = parent4.parentElement;
    //   if (parent5) parent5.classList.add('active');
    // }
    // }
  };

  render() {
    const user = this.props.user || {};
    const showUpProfile = this.props.showUpProfile || false;

    if (user)
      return (
        <React.Fragment>
          <div
            className="left-side-menu"
            style={{ top: 0, padding: 0, width: "67px" }}
            ref={(node) => (this.menuNodeRef = node)}
          >
            <UserProfile user={user} showUpProfile={showUpProfile} />
            <SideNavContentModerator user={user} />

            <Timer currentRound={"21/02/21 22:45"} />
          </div>
        </React.Fragment>
      );
  }
}

const Timer = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          textAlign: "left",
          width: 60,
          height: "auto",
          alignSelf: "center",
          color: "#fff",
          textAlign: "center",
          backgroundColor: "#61656C",
          justifyContent: "center",
          display: "flex",
          borderRadius: 3,
        }}
      >
        <span
          style={{
            alignSelf: "center",
            font: "normal normal bold 12px/17px Karla",
            letterSpacing: "0.22px",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {props.currentRound}
        </span>
      </div>
      {/* 
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          width: '39px',
          height: '45px',
          background: '#61656C 0% 0% no-repeat padding-box',
          borderRadius: '2px',
          textAlign: 'center',
          color: 'white',
          marginLeft: '15px',
        }}>
        <div>
          <i
            className="fas fa-stopwatch"
            style={{
              fontSize: '15px',
            }}></i>
        </div>
        <div
          style={{
            textAlign: 'left',
            font: 'normal normal normal 12px/15px Karla',
            letterSpacing: '0.24px',
            color: '#FFFFFF',
          }}>
          12:23
        </div>
      </div>
   */}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { user } = state.Auth;
  const { currentRound } = state.StratEdge;
  return { user, currentRound };
};

export default connect(mapStateToProps)(FinEdgeSidebarCollapsed);

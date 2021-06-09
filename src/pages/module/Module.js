import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import Loader from "../../components/Loader";
import { getModuleByID, getNotionsModuleByID } from "../../redux/actions";
import { useTranslation } from "react-i18next";
import { encrypt, decrypt } from "../../helpers/crypto";
import { initStratEdge } from "../../redux/StratEdge/actions";

const ModuleDetail = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [notion, setNotion] = useState({});
  const [notions, setNotions] = useState([]);
  const [module, setModule] = useState({});

  const { user } = props;

  useEffect(() => {
    if (user && user.role && user.role.name === "Moderator") {
      const { moduleNotions, module } = props;

      moduleNotions.sort(function (a, b) {
        return a.notionOrder - b.notionOrder;
      });
      setNotions(moduleNotions);

      setModule(module);
      if (moduleNotions && moduleNotions.length > 0) {
        setNotion(moduleNotions[0]);
      }
    } else if (user && user.role && user.role.name === "Participant") {
      const { module } = props.location;
      props.getModuleByID(module);
    }

    // const found = array1.find(item => item. === moduleID);
  }, []);

  useEffect(() => {
    if (user && user.role && user.role.name === "Moderator") {
      const id = decrypt(props.match.params.moduleID);
      //console.log("props.match.params.moduleID :>> ", id);
      props.getNotionsModuleByID(id);
    }
  }, [props.match.params.moduleID]);

  useEffect(() => {
    setNotions(props.moduleNotions);
    props.moduleNotions &&
      props.moduleNotions.length > 1 &&
      setNotion(props.moduleNotions[0]);
  }, [props.moduleNotions]);

  useEffect(() => {
    if (user && user.role && user.role.name === "Participant") {
      let items = [];
      if (props.notions && props.notions.length > 0) items = props.notions;

      items.sort(function (a, b) {
        return a.notionOrder - b.notionOrder;
      });

      setNotion({ ...items[0], index: 1 });
      setNotions(items);

      setModule(props.module);
    }
  }, [props.notions]);

  function youTubeGetID(url) {
    let ID = "";
    if (url) {
      const url_ = url
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url_[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = url_[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url_;
      }
      return "https://www.youtube.com/embed/" + ID;
    }
  }

  const getLinkGame = () => {
    switch (module.gameName) {
      case "StratEdge":
        return "/StratEdge";
      case "PVGame":
        return "/pv-game";
      case "FinEdge":
        return "/FinEdge";

      default:
        return "#";
    }
  };

  return (
    <React.Fragment>
      <div className="">
        {props.loading && <Loader />}
        <Row className="mb-1">
          <Col lg={8}>
            <h4 className="mb-3">{module.moduleName}</h4>
          </Col>
          {user && user.role && user.role.name === "Participant" && (
            <Col lg={4}>
              <div
                className="card card-body p-0 m-0 activity-container mb-2"
                style={{ flexDirection: "row-reverse" }}
              >
                {module.businessGame && (
                  <Link
                    to={getLinkGame()}
                    onClick={() => {
                      dispatch(initStratEdge());
                    }}
                    target="_blank"
                    className="btn btn-test text-black ml-2 noHover"
                  >
                    <i className="fa fa-gamepad mr-1"></i>
                    {t("module.businessGame")}
                  </Link>
                )}
                <Link
                  to={`/module/${encrypt(
                    props.module.moduleInstanceId
                  )}/quizzes`}
                  className="btn btn-indigo text-black"
                >
                  <i className="fa fa-trophy mr-1"></i>
                  {t("module.quizzes")}
                </Link>
              </div>
            </Col>
          )}
        </Row>

        <Row>
          <Col lg={12}>
            <div className="card card-body pt-3">
              <h4 className="card-title modules-title-top">
                {t("module.description")}
              </h4>

              <p className="card-text modules-desc-top module-list">
                {module.description}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <h4 className="card-header pl-0 video-container bg-t">
              {" "}
              {notion.title}
            </h4>
            <div className="embed-responsive embed-responsive-16by9 video-content">
              <iframe
                src={youTubeGetID(notion.mediaPath)}
                frameBorder="0"
                width="500"
                height="281"
                title="test"
              ></iframe>
            </div>
          </Col>
          <Col className="mt-4 col-12 col-md-12 order-2 order-md-12">
            <div className="card card-body">
              <h6
                className="card-title text-blue-cost mb-2 modules-title-bottom"
                style={{ fontSize: 10 }}
              >
                {t("module.notion")} {notion.index}
              </h6>
              <h3 className="card-title" style={{ color: "#102559" }}>
                {notion.title}{" "}
              </h3>
              <div
                className="card-text modules-desc-bottom"
                dangerouslySetInnerHTML={{ __html: notion.content }}
              ></div>
            </div>
          </Col>
          <Col lg={4} className="col order-3">
            <h5 className="card-header text-blue-cost pl-0 f-s-14 bg-t">
              {" "}
              {t("module.notions")}
            </h5>
            <ul
              className="list-group list-group-custom module-list"
              style={{
                cursor: "pointer",
                backgroundColor: "transparent !important",
              }}
            >
              {notions &&
                notions.map((item, index) => {
                  if (item.notionId === notion.notionId) {
                    return (
                      <li
                        onClick={() => setNotion({ ...item, index: index + 1 })}
                        key={item.notionId}
                        className="list-group-item module-list-not module-list_active"
                      >
                        {item.title}{" "}
                      </li>
                    );
                  } else
                    return (
                      <li
                        onClick={() => setNotion({ ...item, index: index + 1 })}
                        key={item.notionId}
                        className="list-group-item module-list-not"
                      >
                        {item.title}{" "}
                      </li>
                    );
                })}
            </ul>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { module, loading, notions } = state.Module;
  const { user } = state.Auth;
  const { moduleNotions } = state.Notion;
  const loadingNotions = state.Notion.loading;
  return {
    module,
    loading: loadingNotions || loading,
    notions,
    user,
    moduleNotions,
  };
};

export default connect(mapStateToProps, {
  getModuleByID,
  getNotionsModuleByID,
})(ModuleDetail);

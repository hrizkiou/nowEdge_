import React, { useEffect } from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Tab, Nav } from "react-bootstrap";

import industrySolid from "../../../assets/images/industry-solid.svg";
import coinsSolid from "../../../assets/images/coins-solid.svg";
import shipSolid from "../../../assets/images/ship-solid.svg";
import groupImg from "../../../assets/images/groupImg.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  getStratEdgeConfiguration,
  getStratEdgeGameSessionConfiguration,
} from "../../../redux/StratEdge/actions";

import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { encrypt } from "../../../helpers/crypto";

const StratEdgeCompetitorAnalysis = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const currentModule = useSelector(
    (state) => state.Module.module
    );
    const gameSessionId = currentModule.gameSessionId;
    // const currentSession = useSelector((state) => state.Session.selectedSession);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  useEffect(() => {
    if (stratEdgeSelector.config === null)
      dispatch(getStratEdgeGameSessionConfiguration(gameSessionId));
  }, []);

  const Item = ({ text, nbr, marginLeft = 0, icon = null }) => {
    return (
      <div className="d-flex" style={{ marginLeft: `${marginLeft}px` }}>
        <div>
          <img
            src={icon || "https://via.placeholder.com/34"}
            // className="rounded-circle img-thumbnail avatar-lg adp-img"
            alt="Cardcap"
            style={{
              width: "34px",
              height: "34px",
              marginRight: "7px",
            }}
          />
        </div>
        <div>
          <div className="adc-item-f-title">{nbr}</div>
          <div className="adc-item-s-title">{text}</div>
        </div>
      </div>
    );
  };

  if (!stratEdgeSelector.result.gameConfigurationId) return <div></div>;
  else if (stratEdgeSelector.config === null) return <Loader />;
  else
    return (
      <div>
        {stratEdgeSelector.loading && <Loader />}
         

        <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/moderator/modules">{t("breadcrumbMenu.modules")} </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          {/* <Link to="/moderator/modules"></Link> */}
          <Link
            to={`/moderator/modules/${encrypt(
              currentModule.moduleId
            )}/student-management`}
          >
            {currentModule.moduleName}
          </Link>
          {/* Stratégie */}
        </BreadcrumbItem>
        <BreadcrumbItem active>
          {/* {currentSession.trainingSessionName} */}

        {t("stratEdge.config.analyseCompetitors")}
        </BreadcrumbItem>
      </Breadcrumb>

        <h1 style={{ fontSize: 22, marginBottom: 27 }}>
        {t("stratEdge.config.analyseCompetitors")}
        </h1>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={
            stratEdgeSelector.config.competitors[0] &&
            stratEdgeSelector.config.competitors[0].id
          }
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                {stratEdgeSelector.config.competitors.map((item, index) => (
                  <Nav.Item key={index}>
                    <Nav.Link eventKey={item.id} className="tab-anc">
                      {item.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                {stratEdgeSelector.config.competitors.map((item, index) => (
                  <Tab.Pane eventKey={item.id} key={index}>
                    <Row>
                      <Col lg={2}>
                        <img
                          src={
                            item.imagePath &&
                            item.imagePath !== null &&
                            item.imagePath !== "null"
                              ? item.imagePath
                              : groupImg
                          }
                          className="rounded-circle img-thumbnail avatar-lg adp-img"
                          alt="Cardimagecap"
                        />
                      </Col>
                      <Col lg={10}>
                        <div className="adp-CardSubtitle">{t("stratEdge.config.AnsP.description")} </div>
                        <div
                          className="adp-CardText"
                          style={{ marginBottom: "10px" }}
                        >
                          {item.description}
                        </div>
                        <div className="adp-CardSubtitle">{t("stratEdge.config.AnsC.chiffreCles")}</div>
                        <div className="adp-CardText">{item.chiffresCles}</div>

                        <div className="d-flex mt-2 ">
                          <Item
                            text="Capacity"
                            nbr={item.productionCapacity}
                            icon={industrySolid}
                          />
                          <Item
                            text="Cost"
                            nbr={item.productionCost}
                            marginLeft="17"
                            icon={coinsSolid}
                          />
                          <Item
                            text="Cost of transport / market 1"
                            nbr={item.fretMarket1}
                            marginLeft="17"
                            icon={shipSolid}
                          />
                          <Item
                            text="Cost of transport / market 2"
                            nbr={item.fretMarket2}
                            marginLeft="17"
                            icon={shipSolid}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
};

export { StratEdgeCompetitorAnalysis };

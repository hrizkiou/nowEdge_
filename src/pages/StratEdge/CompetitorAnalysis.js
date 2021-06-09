import React, { useEffect } from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Tab, Nav } from "react-bootstrap";

import groupImg from "../../assets/images/groupImg.svg";
import industrySolid from "../../assets/images/industry-solid.svg";
import coinsSolid from "../../assets/images/coins-solid.svg";
import shipSolid from "../../assets/images/ship-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { getStratEdgeConfigurationParticipant } from "../../redux/StratEdge/actions";

import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CompetitorAnalysis = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId
  );
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (stratEdgeSelector.configParticipant === null)
      dispatch(getStratEdgeConfigurationParticipant(gameSessionId));
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

  if (stratEdgeSelector.configParticipant === null) return <Loader />;
  else
    return (
      <div>
        {stratEdgeSelector.loading && <Loader />}
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/moderator/timeline-tours">
              {stratEdgeSelector.currentRound &&
                stratEdgeSelector.currentRound.name}
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem active> {t("stratEdge.config.analyseCompetitors")}</BreadcrumbItem>
        </Breadcrumb>
        <h1 style={{ fontSize: 22, marginBottom: 27 }}>
        {t("stratEdge.config.analyseCompetitors")}
        </h1>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={
            stratEdgeSelector.configParticipant.competitors[0] &&
            stratEdgeSelector.configParticipant.competitors[0].id
          }
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                {stratEdgeSelector.configParticipant.competitors.map(
                  (item, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={item.id} className="tab-anc">
                        {item.name}
                      </Nav.Link>
                    </Nav.Item>
                  )
                )}
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                {stratEdgeSelector.configParticipant.competitors.map(
                  (item, index) => (
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
                          <div className="adp-CardSubtitle">{t("stratEdge.config.AnsP.description")}</div>
                          <div
                            className="adp-CardText"
                            style={{ marginBottom: "10px" }}
                          >
                            {item.description}
                          </div>
                          <div className="adp-CardSubtitle">{t("stratEdge.config.AnsC.chiffreCles")}</div>
                          <div className="adp-CardText">
                            {item.chiffresCles}
                          </div>

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
                  )
                )}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
};

export { CompetitorAnalysis };

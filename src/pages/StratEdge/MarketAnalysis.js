import React, { useEffect } from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Tab, Nav } from "react-bootstrap";

import groupImg from "../../assets/images/groupImg.svg";
import BarOneExChart from "../../components/charts/BarOneExChart";
import { useDispatch, useSelector } from "react-redux";
import { getStratEdgeConfigurationParticipant } from "../../redux/StratEdge/actions";
import { useTranslation } from "react-i18next";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const MarketAnalysis = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (stratEdgeSelector.configParticipant === null)
      dispatch(getStratEdgeConfigurationParticipant(gameSessionId));
  }, []);

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
          <BreadcrumbItem active> {t("stratEdge.config.analyseMarkets")}</BreadcrumbItem>
        </Breadcrumb>
        <h1 style={{ fontSize: 22, marginBottom: 27 }}> {t("stratEdge.config.analyseMarkets")}</h1>

        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={
            stratEdgeSelector.configParticipant.markets[0] &&
            stratEdgeSelector.configParticipant.markets[0].id
          }
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                {stratEdgeSelector.configParticipant.markets.map(
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
                {stratEdgeSelector.configParticipant.markets.map(
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
                          <div className="adp-CardSubtitle">
                          {t("stratEdge.config.AnsM.evolutionDemand")}
                          </div>
                          <Col lg={6} style={{ height: 300 }}>
                            <BarOneExChart
                              labels={[
                                // 'T=0',
                                "T=1",
                                "T=2",
                                "T=3",
                                "T=4",
                                "T=5",
                              ]}
                              datasets={[
                                {
                                  label: "",
                                  backgroundColor: "rgba(24, 138, 226, 1)",
                                  borderColor: "rgba(24, 138, 226, 1)",
                                  borderWidth: 1,
                                  hoverBackgroundColor: "rgba(24, 138, 226, 1)",
                                  hoverBorderColor: "rgba(24, 138, 226, 1)",
                                  data: [
                                    // item.demand0,
                                    item.demand1,
                                    item.demand2,
                                    item.demand3,
                                    item.demand4,
                                    item.demand5,
                                  ],
                                },
                              ]}
                            />
                          </Col>
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

export { MarketAnalysis };

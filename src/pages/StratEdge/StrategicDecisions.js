import React, { useEffect } from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Tab, Nav } from "react-bootstrap";

import dollar from "../../assets/images/dollar-sign-solid.svg";
import { useDispatch, useSelector } from "react-redux";
import { getStratEdgeConfigurationParticipant } from "../../redux/StratEdge/actions";

import Loader from "../../components/Loader";
import { toFixedOnlyFloat } from "../../helpers/func";
import { formatNumber } from "../../helpers/formatNumbers";
import { useTranslation } from "react-i18next";
import NoPathCopie from "../../assets/images/NoPathCopie.png";
import { ReactComponent as Groupe332 } from "../../assets/images/groupe332.svg";
import { ReactComponent as Chimney } from "../../assets/images/chimney.svg";
import { ReactComponent as Megaphone } from "../../assets/images/megaphone.svg";
import { ReactComponent as Setup } from "../../assets/images/setup.svg";
import { Link } from "react-router-dom";

const StrategicDecisions = (props) => {
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

  const Item = ({ item, t }) => {
    const {
      costImpact,
      capacityImpact,
      fretImpactMarket1,
      fretImpactMarket2,
      imagePath,
      price,
      name,
    } = item;
    return (
      <Col className="des-block">
        <Row>
          <Col
            lg={3}
            className="pl-0"
            style={{
              justifyContent: "center",
              paddingRight: 0,
              display: "flex",
            }}
          >
            <img
              src={
                imagePath && imagePath !== null && imagePath !== "null"
                  ? imagePath
                  : NoPathCopie
              }
              className="rounded-circle des-img"
              alt="Cardimagecap"
            />
          </Col>
          <Col lg={9}>
            <div className="adp-CardSubtitle">{name}</div>
            {/* <div className="adp-CardText" style={{marginBottom: '10px'}}>
              Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez ce
              vieux whisky au juge blond qui fume sur son île intérieure, à côté
              de l"alcôve ovoïde, où les bûches se consument dans.
            </div> */}
            <Row style={{ paddingLeft: "12px", marginTop: "15px" }}>
              <Col lg={5} className="p-0">
                <div className="des-item-title">
                  {toFixedOnlyFloat(costImpact * 100)} %
                </div>
                <div className="des-item-s-title">{t("stratEdge.config.AnsS.impactCost")}</div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {" "}
                  {toFixedOnlyFloat(capacityImpact * 100)} %
                </div>
                <div className="des-item-s-title">{t("stratEdge.config.AnsS.impactCapacity")}</div>
              </Col>
            </Row>
            <Row style={{ paddingLeft: "12px", marginTop: "7px" }}>
              <Col lg={5} className="p-0">
                <div className="des-item-title">
                  {toFixedOnlyFloat(fretImpactMarket1 * 100)} %{" "}
                </div>
                <div className="des-item-s-title">{t("stratEdge.config.AnsS.impactTransport1")}</div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {" "}
                  {toFixedOnlyFloat(fretImpactMarket2 * 100)} %{" "}
                </div>
                <div className="des-item-s-title">{t("stratEdge.config.AnsS.impactTransport2")}</div>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingLeft: "66px", paddingTop: "18px" }}>
                <img
                  src={dollar}
                  alt="img"
                  style={{
                    width: "21px",
                    height: "26px",
                    marginTop: "-17px",
                  }}
                />
                <div className="d-inline-block" style={{ marginLeft: "7px" }}>
                  <div className="des-item-title d-block">
                    {formatNumber(price)}
                  </div>
                  <div className="des-item-s-title d-block">{t("stratEdge.config.AnsS.budget")}</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    );
  };

  const TabStrategicDecisions = ({ strategicDecisions, t}) => {
    //console.log(strategicDecisions);
    return (
      <Tab.Pane eventKey={strategicDecisions.type}>
        <Row>
          {strategicDecisions.decision.map((d, index) => (
            <Item item={d} key={index} t={t} />
          ))}
        </Row>
      </Tab.Pane>
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
          <BreadcrumbItem active>{t("stratEdge.config.decisionsStrategy")}</BreadcrumbItem>
        </Breadcrumb>
        <h1 style={{ fontSize: 22, marginBottom: 27 }}>
          {t("stratEdge.config.decisionsStrategy")}
        </h1>

        <Tab.Container id="ans-tabs" defaultActiveKey={"r_d_cost"}>
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              <Nav variant="pills" className="flex-row">
                <Nav.Item>
                  <Nav.Link eventKey={"r_d_cost"} className="tab-anc">
                    <Groupe332 className="sim-tab-icon" />
                    {t("stratEdge.config.AnsS.RDCost")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"r_d_capacity"} className="tab-anc">
                    <Chimney className="sim-tab-icon" />
                    {t("stratEdge.config.AnsS.RDCapacity")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"marketing"} className="tab-anc">
                    <Megaphone className="sim-tab-icon" />
                    {t("stratEdge.config.AnsS.marketing")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"human_resources"} className="tab-anc">
                    <i className="  fas fa-users sim-tab-icon-v"></i>
                    {t("stratEdge.config.AnsS.RessourceHumain")}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={"maintenance"} className="tab-anc">
                    <Setup className="sim-tab-icon" />
                    {t("stratEdge.config.AnsS.maintenance")}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <Tab.Content>
                <TabStrategicDecisions
                  t={t}
                  strategicDecisions={stratEdgeSelector.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "r_d_cost"
                  )}
                />
                <TabStrategicDecisions
                  t={t}
                  strategicDecisions={stratEdgeSelector.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "r_d_capacity"
                  )}
                />
                <TabStrategicDecisions
                  t={t}
                  strategicDecisions={stratEdgeSelector.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "marketing"
                  )}
                />
                <TabStrategicDecisions
                  t={t}
                  strategicDecisions={stratEdgeSelector.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "human_resources"
                  )}
                />
                <TabStrategicDecisions
                  t={t}
                  strategicDecisions={stratEdgeSelector.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "maintenance"
                  )}
                />
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
};

export { StrategicDecisions };

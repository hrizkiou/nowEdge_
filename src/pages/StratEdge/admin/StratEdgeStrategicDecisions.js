import React, { useEffect } from "react";
import { Row, Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Tab, Nav } from "react-bootstrap";

import NoPathCopie from "../../../assets/images/NoPathCopie.png";
import dollar from "../../../assets/images/dollar-sign-solid.svg";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../components/Loader"; 
import {
  // getStratEdgeConfiguration,
  getStratEdgeGameSessionConfiguration,
} from "../../../redux/StratEdge/actions";
import { toFixedOnlyFloat } from "../../../helpers/func";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { encrypt } from "../../../helpers/crypto";

import { ReactComponent as Groupe332 } from "../../../assets/images/groupe332.svg";
import { ReactComponent as Chimney } from "../../../assets/images/chimney.svg";
import { ReactComponent as Megaphone } from "../../../assets/images/megaphone.svg";
import { ReactComponent as Setup } from "../../../assets/images/setup.svg";

const StratEdgeStrategicDecisions = (props) => {
  const stratEdgeSelector = useSelector((state) => state.StratEdge);

  const currentModule = useSelector((state) => state.Module.module);
  const gameSessionId = currentModule.gameSessionId;

  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (stratEdgeSelector.config === null)
      dispatch(getStratEdgeGameSessionConfiguration(gameSessionId));
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
                  {" "}
                  {toFixedOnlyFloat(costImpact * 100)} %
                </div>
                <div className="des-item-s-title">
                  {t("stratEdge.config.AnsS.impactCost")}
                </div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {toFixedOnlyFloat(capacityImpact * 100)} %
                </div>
                <div className="des-item-s-title">
                  {t("stratEdge.config.AnsS.impactCapacity")}
                </div>
              </Col>
            </Row>
            <Row style={{ paddingLeft: "12px", marginTop: "7px" }}>
              <Col lg={5} className="p-0">
                <div className="des-item-title">
                  {" "}
                  {toFixedOnlyFloat(fretImpactMarket1 * 100)} %
                </div>
                <div className="des-item-s-title">
                  {t("stratEdge.config.AnsS.impactTransport1")}{" "}
                </div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {" "}
                  {toFixedOnlyFloat(fretImpactMarket2 * 100)} %
                </div>
                <div className="des-item-s-title">
                  {t("stratEdge.config.AnsS.impactTransport2")}{" "}
                </div>
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
                  <div className="des-item-title d-block">{price}</div>
                  <div className="des-item-s-title d-block">
                    {t("stratEdge.config.AnsS.budget")}
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
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
          </BreadcrumbItem>
          <BreadcrumbItem active>
            {t("stratEdge.config.decisionsStrategy")}
          </BreadcrumbItem>
        </Breadcrumb>

        <h1 style={{ fontSize: 22, marginBottom: 27 }}>
          {t("stratEdge.config.decisionsStrategy")}
        </h1>

        <Tab.Container
          id="ans-tabs"
          defaultActiveKey={
            stratEdgeSelector.config.strategicDecisions[0] &&
            stratEdgeSelector.config.strategicDecisions[0].type
          }
        >
          <Row>
            <Col style={{ marginLeft: "1px" }}>
              {/* {stratEdgeSelector.config.strategicDecisions.map(
                  (item, index) => (
                    <Nav.Item key={index}>
                      <Nav.Link eventKey={item.type} className="tab-anc">
                        {GetTypeAndLogo(item.type).logo}
                        {GetTypeAndLogo(item.type).typeName}
                      </Nav.Link>
                    </Nav.Item>
                  )
                )} */}
              <Nav variant="pills" className="flex-row"  defaultActiveKey={"r_d_cost"}>
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
                <Tab.Pane eventKey={"r_d_cost"}>
                  <Row>
                    {stratEdgeSelector.config.strategicDecisions
                      .find((sd) => sd.type === "r_d_cost")
                      .decision.map((d, index) => (
                        <Item item={d} key={index} t={t} />
                      ))}
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey={"r_d_capacity"}>
                  <Row>
                    {stratEdgeSelector.config.strategicDecisions
                      .find((sd) => sd.type === "r_d_capacity")
                      .decision.map((d, index) => (
                        <Item item={d} key={index} t={t} />
                      ))}
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey={"human_resources"}>
                  <Row>
                    {stratEdgeSelector.config.strategicDecisions
                      .find((sd) => sd.type === "human_resources")
                      .decision.map((d, index) => (
                        <Item item={d} key={index} t={t} />
                      ))}
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey={"marketing"}>
                  <Row>
                    {stratEdgeSelector.config.strategicDecisions
                      .find((sd) => sd.type === "marketing")
                      .decision.map((d, index) => (
                        <Item item={d} key={index} t={t} />
                      ))}
                  </Row>
                </Tab.Pane>

                <Tab.Pane eventKey={"maintenance"}>
                  <Row>
                    {stratEdgeSelector.config.strategicDecisions
                      .find((sd) => sd.type === "maintenance")
                      .decision.map((d, index) => (
                        <Item item={d} key={index} t={t} />
                      ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>

        {/* 
      <Tab.Container id="left-tabs-example" defaultActiveKey="first-wiz">
        <Row>
          <Col style={{marginLeft: '1px'}}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first-wiz" className="tab-anc">
                  <img
                    src={groupe332}
                    alt="img"
                    style={{
                      marginRight: '4px',
                      marginTop: '-4px',
                      width: '16px',
                    }}
                  />
                  R&D cout
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second-wiz" className="tab-anc">
                  <img
                    src={chimney}
                    alt="img"
                    style={{
                      marginRight: '4px',
                      marginTop: '-4px',
                      width: '16px',
                    }}
                  />
                  R&D capacité
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three-wiz" className="tab-anc">
                  <img
                    src={megaphone}
                    alt="img"
                    style={{
                      marginRight: '4px',
                      marginTop: '-4px',
                      width: '16px',
                    }}
                  />
                  Marketing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four-wiz" className="tab-anc">
                  <i className=" fas fa-users mr-1"></i>
                  Ressource humaines
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="five-wiz" className="tab-anc">
                  <img
                    src={setup}
                    alt="img"
                    style={{
                      marginRight: '4px',
                      marginTop: '-4px',
                      width: '16px',
                    }}
                  />
                  Maintenance
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first-wiz">
                <Row>
                <Item />
                <Item />
                <Item />
                
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="three-wiz">
                <h1>Page 2</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    
     */}
      </div>
    );
};

export { StratEdgeStrategicDecisions };

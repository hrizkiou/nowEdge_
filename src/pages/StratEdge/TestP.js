import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Col, Modal, ModalBody, Row, Tooltip } from "reactstrap";

import ChimneyBlue from "../../assets/images/chimney_blue.svg";
import { ReactComponent as Chimney } from "../../assets/images/chimney.svg";
import dollar from "../../assets/images/dollar-sign-solid.svg";
import { ReactComponent as Groupe332 } from "../../assets/images/groupe332.svg";
import StatsGroupe from "../../assets/images/groupe332.svg";
import groupImg from "../../assets/images/groupImg.svg";
import MegaphoneBlue from "../../assets/images/megaphone_blue.svg";
import { ReactComponent as Megaphone } from "../../assets/images/megaphone.svg";
import NoPathCopie from "../../assets/images/NoPathCopie.png";
import SetupBlue from "../../assets/images/setup_blue.svg";
import { ReactComponent as Setup } from "../../assets/images/setup.svg";
import Team from "../../assets/images/team.svg";
import TimesCircle from "../../assets/images/times-circle-regular.svg";
import Loader from "../../components/Loader";
import ResultBusinessGame from "../../components/ResultBusinessGame";
import SwalModal from "../../components/SwalModal";
import { formatNumber } from "../../helpers/formatNumbers";
import { toFixedOnlyFloat } from "../../helpers/func";
import { addDecisionSimulations, chooseDecision, chooseDecisionSuccess, initScenarioSaveSuccess, initSimulations, runSimulations, saveScenario, StartSimulation } from "../../redux/StratEdge/actions";

const Session = (props) => {
  const { competitor, competitorParams, t, isCurrentCompetitor } = props;
  return (
    <div className="sim-card-th">
      <Row>
        <div className="sim-th-crd">
          <img
            src={
              competitor.imagePath &&
              competitor.imagePath !== null &&
              competitor.imagePath !== "null"
                ? competitor.imagePath
                : groupImg
            }
            alt="user-img"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: 30,
              marginBottom: 6,
              border : isCurrentCompetitor ? "3px solid rgb(88, 159, 251)" : ""
            }}
            className=""
          />
          <img
            src={dollar}
            alt="user-img"
            style={{
              width: "15px",
              height: "27px",
              marginLeft: "10px",
              marginRight: "2px",
            }}
          />
          <div>
            <div className="sim-th-t3">
              {competitorParams &&
                formatNumber(parseInt(competitorParams.budget))}
            </div>
            <div className="sim-th-t2">
              {t("stratEdge.buisnessGame.scenario.budgetRest")}
            </div>
          </div>
        </div>
      </Row>
      <Row>
        <Col>
          <p className="sim-th-t1">
            {competitorParams &&
              formatNumber(
                parseFloat(competitorParams.productionCost).toFixed(2)
              )}
          </p>
          <p className="sim-th-t2"> {t("stratEdge.config.AnsC.cost")}</p>
        </Col>
        <Col>
          <p className="sim-th-t1">
            {competitorParams &&
              formatNumber(
                parseFloat(competitorParams.productionCapacity).toFixed(2)
              )}
          </p>
          <p className="sim-th-t2"> {t("stratEdge.config.AnsC.capacity")}</p>
        </Col>
      </Row>{" "}
      <Row className="mt-1">
        <Col>
          <p className="sim-th-t1">
            {competitorParams &&
              formatNumber(parseFloat(competitorParams.fretMarket1).toFixed(2))}
          </p>
          <p className="sim-th-t2"> {t("stratEdge.config.AnsC.transport1")}</p>
        </Col>
        <Col>
          <p className="sim-th-t1">
            {competitorParams &&
              formatNumber(parseFloat(competitorParams.fretMarket1).toFixed(2))}
          </p>
          <p className="sim-th-t2"> {t("stratEdge.config.AnsC.transport2")}</p>
        </Col>
      </Row>
    </div>
  );
};

const Item = (props) => {
  const {
    decision,
    competitor,
    dispatch,
    simulation,
    teamCompetitors,
    competitorParams,
    type,
    t,
  } = props;
  const [state, setstate] = useState(null);
  const [showDecision, setShowDecision] = useState(true);
  const [teamId, setTeamId] = useState(
    teamCompetitors.find((tc) => competitor.id === tc.competitorId).teamId
  );

  useEffect(() => {
    setTeamId(
      teamCompetitors.find((tc) => competitor.id === tc.competitorId).teamId
    );
  }, [teamCompetitors]);

  useEffect(() => {
    const currentSimulation = simulation.filter((s) => s.teamId === teamId)[0];
    //console.log("currentSimulation", competitorParams);
    if (currentSimulation) {
      const decisionId = currentSimulation.strategicDecisions.filter(
        (s) => s.type === type
      )[0];
      if (decisionId) {
        const d = decision.filter((i) => decisionId.id === i.id)[0];
        if (d) {
          setstate(d);
          //console.log("dddddd", d);
        } else {
          setstate(null);
        }
      }
    }

    if (competitorParams && competitorParams.budget <= 0) {
      setShowDecision(false);
    } else {
      setShowDecision(true);
    }
  }, [simulation]);

  const DetailsClassmentItem = ({ decision }) => {
    return (
      <div className="clas-show-detail-decision-hover">
        <div className="mb-2">
          <div className="sim-th-t3">
            {" "}
            <img
              src={dollar}
              alt="user-img"
              style={{
                width: "15px",
                height: "27px",
                marginLeft: "10px",
                marginRight: "2px",
              }}
            />
            {decision.price}{" "}
          </div>
          <div className="sim-th-t2" style={{ marginLeft: 29 }}>
            {t("stratEdge.config.AnsS.budget")}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="mb-2">
            <div className="sim-th-t3">
              {toFixedOnlyFloat(decision.costImpact * 100)} %{" "}
            </div>
            <div className="sim-th-t2">{t("stratEdge.config.AnsC.cost")}</div>
          </div>
          <div className="mb-2">
            <div className="sim-th-t3">
              {toFixedOnlyFloat(decision.capacityImpact * 100)} %
            </div>
            <div className="sim-th-t2">
              {" "}
              {t("stratEdge.config.AnsC.capacity")}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="mb-2">
            <div className="sim-th-t3">
              {toFixedOnlyFloat(decision.fretImpactMarket1 * 100)} %{" "}
            </div>
            <div className="sim-th-t2">
              {t("stratEdge.config.AnsC.transport1")}
            </div>
          </div>
          <div className="mb-2">
            <div className="sim-th-t3">
              {toFixedOnlyFloat(decision.fretImpactMarket2 * 100)} %{" "}
            </div>
            <div className="sim-th-t2">
              {t("stratEdge.config.AnsC.transport2")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {state !== null ? (
        <div className="sim-cont-st">
          <div
            className="float-right adp-edit-btn sim-btn"
            onClick={() => {
              setstate(null);

              dispatch(
                addDecisionSimulations(teamId, state.decisionType, null)
              );
              dispatch(chooseDecision(state, competitorParams, false));
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </div>
          <div className="sim-decision-select">
            <img
              src={
                state.imagePath &&
                state.imagePath !== null &&
                state.imagePath !== "null"
                  ? state.imagePath
                  : NoPathCopie
              }
              width={47}
              height={47}
              alt="img"
            />

            <div>
              <div className="sim-th-t4">{state.name}</div>
              <div className="d-flex">
                <img
                  src={dollar}
                  alt="user-img"
                  style={{
                    width: "15px",
                    height: "27px",
                    marginLeft: "10px",
                    marginRight: "2px",
                  }}
                />
                <div
                  style={{
                    paddingTop: " 2px",
                  }}
                >
                  <div className="sim-th-t3">{formatNumber(state.price)}</div>
                  <div className="sim-th-t2">
                    {t("stratEdge.config.AnsS.budget")}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic" className="sim-decision-content">
            <div>
              <i className="fas fa-plus sim-decision-icon"></i>
            </div>
          </Dropdown.Toggle>

          {showDecision && (
            <Dropdown.Menu className="sim-list details-classment-decision">
              {decision &&
                decision.map((d, i) => (
                  <div
                    style={
                      competitorParams &&
                      d &&
                      competitorParams.budget - d.price < 0
                        ? { position: "relative", backgroundColor: "#b8b6b0" }
                        : { position: "relative" }
                    }
                  >
                    <Dropdown.Item
                      key={i}
                      style={
                        competitorParams &&
                        d &&
                        competitorParams.budget - d.price < 0
                          ? {
                              pointerEvents: "none",
                              cursor: "default",
                              textDecoration: "none",
                            }
                          : {}
                      }
                      onClick={() => {
                        console.log(
                          "************$$$$$$$$",
                          d.price,
                          competitorParams.budget
                        );
                        if (competitorParams.budget - d.price >= 0) {
                          setstate(d);
                          //console.log("lllllllllllllll", d);
                          dispatch(StartSimulation(true));
                          dispatch(
                            addDecisionSimulations(teamId, d.decisionType, d.id)
                          );
                          dispatch(chooseDecision(d, competitorParams));
                        }
                      }}
                      className="sim-list-item"
                    >
                      <img
                        src={
                          d.imagePath &&
                          d.imagePath !== null &&
                          d.imagePath !== "null"
                            ? d.imagePath
                            : NoPathCopie
                        }
                        width={29}
                        height={29}
                        alt="img"
                        style={{
                          marginRight: "10px",
                        }}
                      />
                      {d.name}
                    </Dropdown.Item>
                    <DetailsClassmentItem decision={d} />
                  </div>
                ))}
            </Dropdown.Menu>
          )}
        </Dropdown>
      )}
    </div>
  );
};

export const TestP = () => {
  const [decisionsModalShow, setDecisionsModalShow] = useState(false);
  const [runSimulationModalShow, setRunSimulationModalShow] = useState(false);
  const { t } = useTranslation();
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const StratEdge = useSelector((state) => state.StratEdge);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!StratEdge.startSimulation) {
      dispatch(
        initSimulations(
          StratEdge.configParticipant,
          StratEdge.resultParticipant
        )
      );
    }
  }, []);

  useEffect(() => {
    if (StratEdge.scenarioSaveSuccess) {
      SwalModal({
        text: t("stratEdge.buisnessGame.scenario.savedScenariosMessage"),
        icon: "success",
      });

      dispatch(initScenarioSaveSuccess());
    }
  }, [StratEdge.scenarioSaveSuccess]);

  const DecisionsModal = (props) => {
    const { t } = props;
    const DecisionsExist = (props) => {
      const { decision } = props;
      return (
        <>
          <img
            alt="img"
            src={
              decision.imagePath &&
              decision.imagePath !== null &&
              decision.imagePath !== "null"
                ? decision.imagePath
                : "https://randomuser.me/api/portraits/men/3.jpg"
            }
            style={{
              borderRadius: 100,
              width: 29,
              height: 29,
              marginRight: 7,
            }}
          />
          <span style={{ fontSize: 12, fontFamily: "Karla", color: "#6C757D" }}>
            {decision && decision.name}
          </span>
        </>
      );
    };

    const DecisionsNotExist = (props) => {
      return (
        <>
          <img
            alt="img"
            src={TimesCircle}
            // style={{
            //   borderRadius: 100,
            //   width: 29,
            //   height: 29,
            //   marginRight: 7
            // }}
          />
        </>
      );
    };

    const ContentDecisions = (props) => {
      const { StratEdge, competitor } = props;
      return (
        <div
          className="decisions-modal-content"
          style={{ marginTop: 0, border: "0" }}
        >
          <div
            style={{
              marginTop: 21,
              marginLeft: 19,
              marginRight: 22,
              marginBottom: 27,
            }}
          >
            <Row>
              <Col lg={2}></Col>
              <Col lg={2} className="decisions-modal-content-header">
                <img
                  alt="img"
                  src={StatsGroupe}
                  style={{
                    marginBottom: 5,
                  }}
                />
                {t("stratEdge.config.AnsS.RDCost")}
              </Col>

              <Col lg={2} className="decisions-modal-content-header">
                <img
                  alt="img"
                  src={ChimneyBlue}
                  style={{
                    marginBottom: 5,
                  }}
                />
                {t("stratEdge.config.AnsS.RDCapacity")}
              </Col>

              <Col lg={2} className="decisions-modal-content-header">
                <img
                  alt="img"
                  src={MegaphoneBlue}
                  style={{
                    marginBottom: 5,
                  }}
                />
                {t("stratEdge.config.AnsS.marketing")}
              </Col>

              <Col lg={2} className="decisions-modal-content-header">
                <img
                  alt="img"
                  src={Team}
                  style={{
                    marginBottom: 5,
                  }}
                />
                {t("stratEdge.config.AnsS.RessourceHumain")}
              </Col>

              <Col lg={2} className="decisions-modal-content-header">
                <img
                  alt="img"
                  src={SetupBlue}
                  style={{
                    marginBottom: 5,
                  }}
                />
                {t("stratEdge.config.AnsS.maintenance")}
              </Col>
            </Row>
            {StratEdge.resultParticipant.rounds.map((r) => (
              <Row
                key={r.id}
                style={{
                  backgroundColor: "#FBFBFB",
                  height: 50,
                  marginBottom: 8,
                  marginTop: 29,
                }}
              >
                <Col lg={2} className="decisions-modal-content-header">
                  <h5>{r.name}</h5>
                </Col>
                {StratEdge.resultParticipant.roundScenarios.find(
                  (rs) => rs.roundId === r.id
                ) && (
                  <>
                    <Col
                      lg={2}
                      className="decisions-modal-content-header"
                      style={{ flexDirection: "row" }}
                    >
                      {StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        ) &&
                      StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        )
                        .strategicDecisions.find(
                          (sd) => sd.decisionType === "r_d_cost"
                        ) ? (
                        <DecisionsExist
                          decision={StratEdge.resultParticipant.roundScenarios
                            .find((rs) => rs.roundId === r.id)
                            .teamScenarios.find(
                              (ts) =>
                                ts.competitorFixedName === competitor.fixedName
                            )
                            .strategicDecisions.find(
                              (sd) => sd.decisionType === "r_d_cost"
                            )}
                        />
                      ) : (
                        <DecisionsNotExist />
                      )}
                    </Col>

                    <Col
                      lg={2}
                      className="decisions-modal-content-header"
                      style={{ flexDirection: "row" }}
                    >
                      {StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        ) &&
                      StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        )
                        .strategicDecisions.find(
                          (sd) => sd.decisionType === "r_d_capacity"
                        ) ? (
                        <DecisionsExist
                          decision={StratEdge.resultParticipant.roundScenarios
                            .find((rs) => rs.roundId === r.id)
                            .teamScenarios.find(
                              (ts) =>
                                ts.competitorFixedName === competitor.fixedName
                            )
                            .strategicDecisions.find(
                              (sd) => sd.decisionType === "r_d_capacity"
                            )}
                        />
                      ) : (
                        <DecisionsNotExist />
                      )}
                    </Col>

                    <Col
                      lg={2}
                      className="decisions-modal-content-header"
                      style={{ flexDirection: "row" }}
                    >
                      {StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        ) &&
                      StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        )
                        .strategicDecisions.find(
                          (sd) => sd.decisionType === "marketing"
                        ) ? (
                        <DecisionsExist
                          decision={StratEdge.resultParticipant.roundScenarios
                            .find((rs) => rs.roundId === r.id)
                            .teamScenarios.find(
                              (ts) =>
                                ts.competitorFixedName === competitor.fixedName
                            )
                            .strategicDecisions.find(
                              (sd) => sd.decisionType === "marketing"
                            )}
                        />
                      ) : (
                        <DecisionsNotExist />
                      )}
                    </Col>

                    <Col
                      lg={2}
                      className="decisions-modal-content-header"
                      style={{ flexDirection: "row" }}
                    >
                      {StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        ) &&
                      StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        )
                        .strategicDecisions.find(
                          (sd) => sd.decisionType === "human_resources"
                        ) ? (
                        <DecisionsExist
                          decision={StratEdge.resultParticipant.roundScenarios
                            .find((rs) => rs.roundId === r.id)
                            .teamScenarios.find(
                              (ts) =>
                                ts.competitorFixedName === competitor.fixedName
                            )
                            .strategicDecisions.find(
                              (sd) => sd.decisionType === "human_resources"
                            )}
                        />
                      ) : (
                        <DecisionsNotExist />
                      )}
                    </Col>

                    <Col
                      lg={2}
                      className="decisions-modal-content-header"
                      style={{ flexDirection: "row" }}
                    >
                      {StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        ) &&
                      StratEdge.resultParticipant.roundScenarios
                        .find((rs) => rs.roundId === r.id)
                        .teamScenarios.find(
                          (ts) =>
                            ts.competitorFixedName === competitor.fixedName
                        )
                        .strategicDecisions.find(
                          (sd) => sd.decisionType === "maintenance"
                        ) ? (
                        <DecisionsExist
                          decision={StratEdge.resultParticipant.roundScenarios
                            .find((rs) => rs.roundId === r.id)
                            .teamScenarios.find(
                              (ts) =>
                                ts.competitorFixedName === competitor.fixedName
                            )
                            .strategicDecisions.find(
                              (sd) => sd.decisionType === "maintenance"
                            )}
                        />
                      ) : (
                        <DecisionsNotExist />
                      )}
                    </Col>
                  </>
                )}
              </Row>
            ))}
          </div>
        </div>
      );
    };
    return (
      <Modal
        {...props}
        isOpen={props.show}
        toggle={props.onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // backdrop={"static"}
      >
        <ModalBody>
          <h5>{t("stratEdge.buisnessGame.simulation.decisionHistory")}</h5>

          <Tab.Container
            id="left-tabs-example"
            defaultActiveKey={
              StratEdge.configParticipant &&
              StratEdge.configParticipant.competitors.length > 0 &&
              StratEdge.configParticipant.competitors[0].id
            }
          >
            <Row>
              <Col style={{ marginLeft: "1px" }}>
                <Nav variant="pills" className="flex-row">
                  {StratEdge.configParticipant.competitors.map((c) => (
                    <Nav.Item key={c.id}>
                      <Nav.Link eventKey={c.id} className="tab-anc">
                        {c.name}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Tab.Content
                  style={{
                    border: "1px solid #e6ece6",
                  }}
                >
                  {StratEdge.configParticipant.competitors.map((c) => (
                    <Tab.Pane key={c.id} eventKey={c.id}>
                      <ContentDecisions competitor={c} StratEdge={StratEdge} />
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 23,
              marginRight: 22,
              marginTop: 24,
            }}
          >
            <button
              onClick={props.onHide}
              className="btn btn-primary waves-effect waves-light "
              type="submit"
              style={{
                backgroundColor: "#6C757D",
              }}
            >
              {t("stratEdge.config.AnsP.retour")}
            </button>
            <Link
              to="/StratEdge/analysis"
              className="btn btn-primary waves-effect waves-light "
              type="submit"
              style={{
                backgroundColor: "#71B6F9",
              }}
            >
              {t("stratEdge.buisnessGame.simulation.resultOldTOur")}
            </Link>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  const RunSimulationModal = (props) => {
    const { t } = props;
    const StratEdge = useSelector((state) => state.StratEdge);
    const [obj, setObj] = useState({});

    useEffect(() => {
      if (
        StratEdge.resultParticipant.rounds &&
        StratEdge.resultSimulation.roundScenarios
      ) {
        //console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
        const round = StratEdge.resultParticipant.rounds.find(
          (item) => item.status === 0
        );
        const res = StratEdge.resultSimulation.roundScenarios.find(
          (rs) => rs.roundId === round.id
        );
        setObj(res);
      }
    }, [props, StratEdge]);

    const dispatch = useDispatch();

    return (
      <Modal
        {...props}
        isOpen={props.show}
        toggle={props.onHide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ModalBody>
          <div>
            <div className="card-badge-container">
              {StratEdge.resultParticipant.rounds &&
                StratEdge.resultSimulation.roundScenarios && (
                  <ResultBusinessGame
                    t={t}
                    isModal
                    isNotAnalysis
                    config={StratEdge.configParticipant}
                    result={{
                      scenarioResults:
                        obj &&
                        obj.scenarioResults
                         &&
                        obj.scenarioResults.sort(function (a, b) {
                         
          return (b.reserve )- (a.reserve );
                        })
                        ,
                      teamCompetitors:
                        StratEdge.configParticipant.teamCompetitors,
                    }}
                    roundScenarios={StratEdge.resultSimulation.roundScenarios}
                    rounds={StratEdge.resultSimulation.rounds}
                  />
                )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              marginLeft: 23,
              marginRight: 22,
              marginTop: 24,
            }}
          >
            <button
              onClick={props.onHide}
              className="btn btn-primary waves-effect waves-light "
              type="submit"
              style={{
                backgroundColor: "#6C757D",
                marginRight: 10,
              }}
            >
              {t("stratEdge.config.AnsP.retour")}
            </button>
            <button
              onClick={() => {
                props.onHide();

                const pp = {
                  roundId: obj.roundId,
                  gameSessionId: obj.gameSessionId,
                  // ownerTeamId: obj.ownerTeamId,
                  teamScenarios: obj.teamScenarios,
                  scenarioResults: obj.scenarioResults,
                  // isDecision: false,
                  decision: false,
                };
                //console.log("lllllllllllllll", pp);
                dispatch(saveScenario(pp));
              }}
              className="btn btn-primary waves-effect waves-light "
              type="submit"
              style={{
                backgroundColor: "#71B6F9",
              }}
            >
              <i className="fas fa-save" style={{ marginRight: 10 }}></i>
              {t("stratEdge.buisnessGame.scenario.saveScenario")}
            </button>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  const ItemContent = (props) => {
    const { strategicDecision, dispatch, competitor, StratEdge, t } = props;
    return (
      <td>
        <Item
          type={strategicDecision.type}
          decision={strategicDecision.decision}
          competitor={competitor}
          dispatch={dispatch}
          simulation={StratEdge.simulation}
          teamCompetitors={StratEdge.configParticipant.teamCompetitors}
          competitorParams={StratEdge.competitorParams.find(
            (cp) => cp.id === competitor.id
          )}
          t={t}
        />
      </td>
    );
  };
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
  return (
    <div>
      {StratEdge.loading && <Loader text={t("stratEdge.buisnessGame.simulation.simulationInProgress")} />}
      {StratEdge.loadingSavedScenario && <Loader text={t('stratEdge.buisnessGame.scenario.saveScenarioInProgress')} />}
      <RunSimulationModal
        show={runSimulationModalShow}
        onHide={() => {
          setRunSimulationModalShow(false);
        }}
        t={t}
      />
      <DecisionsModal
        show={decisionsModalShow}
        onHide={() => {
          setDecisionsModalShow(false);
        }}
        t={t}
      />
      <Breadcrumb>
        <BreadcrumbItem>
          <Link to="/moderator/timeline-tours">
            {StratEdge.currentRound && StratEdge.currentRound.name}
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          {t("stratEdge.buisnessGame.simulation.title")}
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 style={{ fontSize: 22, marginBottom: 27 }}>
        {t("stratEdge.buisnessGame.simulation.title")}
      </h1>
      <table className="table table-borderless mb-0">
        <thead>
          <tr>
            <th></th>

            <th>
              <div className="sim-tab-icon-content">
                <Groupe332 className="sim-tab-icon" />
                <div className="sim-tab-icon-text">
                  {" "}
                  {t("stratEdge.config.AnsS.RDCost")}
                </div>
              </div>
            </th>

            <th>
              <div className="sim-tab-icon-content">
                <Chimney className="sim-tab-icon" />
                <div className="sim-tab-icon-text">
                  {" "}
                  {t("stratEdge.config.AnsS.RDCapacity")}
                </div>
              </div>
            </th>

            <th>
              <div className="sim-tab-icon-content">
                <Megaphone className="sim-tab-icon" />
                <div className="sim-tab-icon-text">
                  {" "}
                  {t("stratEdge.config.AnsS.marketing")}
                </div>
              </div>
            </th>

            <th>
              <div className="sim-tab-icon-content">
                <i className="  fas fa-users sim-tab-icon-v"></i>
                <div className="sim-tab-icon-text">
                  {" "}
                  {t("stratEdge.config.AnsS.RessourceHumain")}
                </div>
              </div>
            </th>

            <th>
              <div className="sim-tab-icon-content">
                <Setup className="sim-tab-icon" />
                <div className="sim-tab-icon-text">
                  {" "}
                  {t("stratEdge.config.AnsS.maintenance")}
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {StratEdge &&
            StratEdge.configParticipant &&
            StratEdge.configParticipant.competitors.map((competitor, i) => {
              const teamCompetitor = StratEdge.configParticipant.teamCompetitors.find((tc)=>  StratEdge.configParticipant.playerTeamId === tc.teamId);

             return (
              <tr key={i}>
                <th scope="row">
                  <Session
                    competitor={competitor}
                    competitorParams={StratEdge.competitorParams.find(
                      (cp) => cp.id === competitor.id
                    )}
                    isCurrentCompetitor = {teamCompetitor.competitorId === competitor.id}
                    t={t}
                  />
                </th>

                <ItemContent
                  strategicDecision={StratEdge.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "r_d_cost"
                  )}
                  competitor={competitor}
                  dispatch={dispatch}
                  StratEdge={StratEdge}
                  t={t}
                />

                <ItemContent
                  strategicDecision={StratEdge.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "r_d_capacity"
                  )}
                  competitor={competitor}
                  dispatch={dispatch}
                  StratEdge={StratEdge}
                  t={t}
                />

                <ItemContent
                  strategicDecision={StratEdge.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "marketing"
                  )}
                  competitor={competitor}
                  dispatch={dispatch}
                  StratEdge={StratEdge}
                  t={t}
                />

                <ItemContent
                  strategicDecision={StratEdge.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "human_resources"
                  )}
                  competitor={competitor}
                  dispatch={dispatch}
                  StratEdge={StratEdge}
                  t={t}
                />

                <ItemContent
                  strategicDecision={StratEdge.configParticipant.strategicDecisions.find(
                    (sd) => sd.type === "maintenance"
                  )}
                  competitor={competitor}
                  dispatch={dispatch}
                  StratEdge={StratEdge}
                  t={t}
                />
              </tr>
            )
            }
            
            
            )}
        </tbody>
      </table>

      <Row
        style={{
          marginTop: "32px",
        }}
      >
        <Col
          style={{
            textAlign: "end",
            paddingRight: "42px",
          }}
        >
          <button
            id="resett"
            onClick={() => {
              dispatch(
                initSimulations(
                  StratEdge.configParticipant,
                  StratEdge.resultParticipant
                )
              );
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mr-2"
          >
            <Tooltip
              placement="top"
              isOpen={tooltipOpen1}
              target="resett"
              toggle={toggle1}
            >
              {t("stratEdge.buisnessGame.simulation.reset")}
            </Tooltip>
            <i className="fas fa-undo-alt"></i>
          </button>
          <button
            id="hdecision"
            onClick={() => {
              setDecisionsModalShow(true);
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mr-2"
          >
            {!decisionsModalShow && (
              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="hdecision"
                toggle={toggle}
              >
                {t("stratEdge.buisnessGame.simulation.decisionHistory")}
              </Tooltip>
            )}
            <i className="fas fa-book-open"></i>
          </button>
          <button
            onClick={() => {
              const simulation = {
                roundId:
                  StratEdge.resultParticipant.rounds.filter(
                    (r) => r.status === 0
                  )[0] &&
                  StratEdge.resultParticipant.rounds.filter(
                    (r) => r.status === 0
                  )[0].id,
                gameSessionId: StratEdge.resultParticipant.gameSessionId,

                isDecision: false,

                teamScenarios: StratEdge.simulation,
              };
              //console.log("*******************************", simulation);
              dispatch(
                runSimulations(simulation, () => {
                  setRunSimulationModalShow(true);
                })
              );
            }}
            className="btn btn-primary waves-effect waves-light "
            type="submit"
            style={{
              backgroundColor: "#5B69BC",
            }}
          >
            <i className="fas fa-calculator mr-1"></i>

            {t("stratEdge.buisnessGame.simulation.startSimulation")}
          </button>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TestP);

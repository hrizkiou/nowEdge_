import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import TimesCircle from "../../assets/images/times-circle-regular.svg";
import ChimneyBlue from "../../assets/images/chimney_blue.svg";
import StatsGroupe from "../../assets/images/groupe332.svg";
import SetupBlue from "../../assets/images/setup_blue.svg";
import MegaphoneBlue from "../../assets/images/megaphone_blue.svg";
import Team from "../../assets/images/team.svg";
import { Modal } from "react-bootstrap";
import {
  deleteScenario,
  getScenarios,
  initScenarioDeleteSuccess,
  initSendDecisionSuccess,
  sendDecision,
} from "../../redux/StratEdge/actions";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import SwalModal from "../../components/SwalModal";
import ResultBusinessGame from "../../components/ResultBusinessGame";
import { useTranslation } from "react-i18next";
import { formatNumber } from "../../helpers/formatNumbers";
import { Link } from "react-router-dom";
const SavedScenarios = () => {
  const [scenarioSelected, setScenarioSelected] = useState({});
  const [runSimulationModalShow, setRunSimulationModalShow] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const dispatch = useDispatch();
  const StratEdge = useSelector((state) => state.StratEdge);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getScenarios(
        StratEdge.resultParticipant.gameSessionId,
        StratEdge.resultParticipant.rounds &&
          StratEdge.resultParticipant.rounds.filter((r) => r.status === 0)[0] &&
          StratEdge.resultParticipant.rounds.filter((r) => r.status === 0)[0].id
      )
    );
  }, []);

  useEffect(() => {
    if (StratEdge.scenarios.length > 0) {
      const decisionScenarios = StratEdge.scenarios.find((s) => s.decision);
      if (decisionScenarios) {
        setHasDecision(true);
      } else {
        setHasDecision(false);
      }
      //console.log("decisionScenarios **************", decisionScenarios);
    }
  }, [StratEdge.scenarios]);

  useEffect(() => {
    if (StratEdge.scenarioDeletedSuccess) {
      SwalModal({
        text: t("stratEdge.buisnessGame.scenario.deleteMessage"),
        icon: "success",
      });

      dispatch(initScenarioDeleteSuccess());
    }
  }, [StratEdge.scenarioDeletedSuccess]);

  useEffect(() => {
    if (StratEdge.decisionSendSuccess) {
      SwalModal({
        text: t("stratEdge.buisnessGame.scenario.chooseScenario", {
          scenario: "sénario 1",
        }),
        icon: "success",
      });

      dispatch(initSendDecisionSuccess());
    }
  }, [StratEdge.decisionSendSuccess]);

  useEffect(() => {
    if (StratEdge.scenarios && StratEdge.scenarios.length > 0) {
      setScenarioSelected({ ...StratEdge.scenarios[0], index: 1 });
    } else {
      setScenarioSelected({});
    }
  }, [StratEdge.scenarios]);

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
          src={TimesCircle}
          alt="img"
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
    const { scenario, t } = props;
    const StratEdge = useSelector((state) => state.StratEdge);

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

          {scenario.teamScenarios &&
            scenario.teamScenarios.map((team) => (
              <Row
                style={{
                  backgroundColor: "#FBFBFB",
                  height: 50,
                  marginBottom: 8,
                  marginTop: 29,
                }}
              >
                <Col lg={2} className="decisions-modal-content-header">
                  <h5>
                    {StratEdge.configParticipant &&
                      StratEdge.configParticipant.competitors &&
                      StratEdge.configParticipant.competitors.find(
                        (c) => c.fixedName === team.competitorFixedName
                      ) &&
                      StratEdge.configParticipant.competitors.find(
                        (c) => c.fixedName === team.competitorFixedName
                      ).name}
                  </h5>
                </Col>
                <Col
                  lg={2}
                  className="decisions-modal-content-header"
                  style={{ flexDirection: "row" }}
                >
                  {team.strategicDecisions.filter(
                    (r) => r.decisionType === "r_d_cost"
                  )[0] ? (
                    <DecisionsExist
                      decision={
                        team.strategicDecisions.filter(
                          (r) => r.decisionType === "r_d_cost"
                        )[0]
                      }
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
                  {team.strategicDecisions.filter(
                    (r) => r.decisionType === "r_d_capacity"
                  )[0] ? (
                    <DecisionsExist
                      decision={
                        team.strategicDecisions.filter(
                          (r) => r.decisionType === "r_d_capacity"
                        )[0]
                      }
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
                  {team.strategicDecisions.filter(
                    (r) => r.decisionType === "marketing"
                  )[0] ? (
                    <DecisionsExist
                      decision={
                        team.strategicDecisions.filter(
                          (r) => r.decisionType === "marketing"
                        )[0]
                      }
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
                  {team.strategicDecisions.filter(
                    (r) => r.decisionType === "human_resources"
                  )[0] ? (
                    <DecisionsExist
                      decision={
                        team.strategicDecisions.filter(
                          (r) => r.decisionType === "human_resources"
                        )[0]
                      }
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
                  {team.strategicDecisions.filter(
                    (r) => r.decisionType === "maintenance"
                  )[0] ? (
                    <DecisionsExist
                      decision={
                        team.strategicDecisions.filter(
                          (r) => r.decisionType === "maintenance"
                        )[0]
                      }
                    />
                  ) : (
                    <DecisionsNotExist />
                  )}
                </Col>
              </Row>
            ))}
        </div>
      </div>
    );
  };

  const CardScenario = (props) => {
    const { onSelectScenario, scenario, dispatch, t, scenarioSelected } = props;
    return (
      <li
        className="sim-cont-st"
        onClick={() => {
          onSelectScenario({
            ...scenario,
            index: props.index,
          });
        }}
        style={{
          // display: 'table-cell',
          border:
            scenarioSelected.id === scenario.id
              ? "2px solid rgb(88 159 251)"
              : "1px solid #F2F4F5",
          width: 143,
          paddingLeft: 9,
          marginRight: 20,
          cursor: "pointer",
        }}
      >
        {scenario.decision && (
          <i
            className="fas fa-check text-valid"
            style={{
              position: "absolute",
              top: 5,
              left: 5,
            }}
          ></i>
        )}
        <div
          style={{
            position: "flex",
            alignSelf: "flex-end",
            cursor: "pointer",
          }}
          onClick={() => {
            if (!scenario.decision) {
              SwalModal({
                text: t("stratEdge.buisnessGame.scenario.deleteQuestion"),
                icon: "warning",
                buttons: [t("moduleQuiz.swal.no"), t("moduleQuiz.swal.yes")],
                confirmButtonColor: "#71B6F9",
                dangerMode: false,
              }).then((willDelete) => {
                if (willDelete) {
                  dispatch(deleteScenario(scenario.id));
                }
              });
            }
          }}
        >
          <i
            className="fas fa-trash-alt"
            style={{
              padding: 5,
              color: scenario.decision ? "#B8B8B8" : "#333",
            }}
          ></i>
        </div>
        <div
          className="sim-decision-select"
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <h4 style={{ marginTop: 0 }}>
            {t("stratEdge.buisnessGame.scenario.title")} {props.index}
          </h4>
          <div className="d-flex">
            <div>
              <div
                className="sim-th-t3"
                style={{ fontSize: 19, marginBottom: 3 }}
              >
                <i className=" fas fa-dollar-sign"></i>
                {scenario.scenarioResults.find(
                  (sr) => sr.teamId === scenario.ownerTeamId
                ) &&
                  formatNumber(
                    scenario.scenarioResults.find(
                      (sr) => sr.teamId === scenario.ownerTeamId
                    ).ebitda
                  )}
              </div>
              <span
                className="sim-th-t2"
                style={{ fontSize: 14, marginBottom: 12 }}
              >
                {t("stratEdge.buisnessGame.scenario.budgetRest")}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const RunSimulationModal = (props) => {
    const { result, roundScenarios, rounds, configParticipant, t } = props;

    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // backdrop={"static"}
      >
        <Modal.Body>
          <div>
            <div className="card-badge-container">
              <ResultBusinessGame
                isModal
                result={result}
                roundScenarios={roundScenarios}
                rounds={rounds}
                config={configParticipant}
                isNotAnalysis
                t={t}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div>
      {StratEdge.loading && <Loader />}
      <RunSimulationModal
        result={{
          scenarioResults:
            scenarioSelected.scenarioResults &&
            scenarioSelected.scenarioResults.sort(function (a, b) {
              return b.reserve - a.reserve;
            }),
          teamCompetitors: StratEdge.configParticipant.teamCompetitors,
        }}
        roundScenarios={StratEdge.resultParticipant.roundScenarios}
        rounds={StratEdge.resultParticipant.rounds}
        configParticipant={StratEdge.configParticipant}
        show={runSimulationModalShow}
        onHide={() => {
          setRunSimulationModalShow(false);
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
          {t("stratEdge.buisnessGame.scenario.savedScenarios")}
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 style={{ fontSize: 22 }}>
        {t("stratEdge.buisnessGame.scenario.savedScenarios")}
      </h1>

      {StratEdge.scenarios.length > 0 && (
        <>
          <Card className="mb-0">
            <CardBody>
              <div className="toolbar-scroll">
                <ul
                  className="row-cards"
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    display: "flex",
                  }}
                >
                  {StratEdge.scenarios.map((scenario, index) => (
                    <CardScenario
                      scenario={scenario}
                      index={index + 1}
                      key={index}
                      onSelectScenario={setScenarioSelected}
                      scenarioSelected={scenarioSelected}
                      dispatch={dispatch}
                      t={t}
                    />
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>

          <Card className="mb-0 mt-3">
            <CardBody>
              {StratEdge.scenarios && StratEdge.scenarios.length > 0 && (
                <>
                  <h1 style={{ fontSize: 18 }}>
                    {t("stratEdge.buisnessGame.scenario.title")}{" "}
                    {scenarioSelected.index}
                  </h1>
                  <ContentDecisions scenario={scenarioSelected} t={t} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      onClick={() => setRunSimulationModalShow(true)}
                      className="btn btn-primary waves-effect waves-light "
                      type="submit"
                      style={{
                        backgroundColor: "#71B6F9",
                        marginRight: 10,
                      }}
                    >
                      <i className="fas fa-calculator"></i>
                    </button>
                    <button
                      disabled={hasDecision}
                      onClick={() => {
                        SwalModal({
                          text: t(
                            "stratEdge.buisnessGame.scenario.chooseQuestion"
                          ),
                          icon: "warning",
                          buttons: [
                            t("moduleQuiz.swal.no"),
                            t("moduleQuiz.swal.yes"),
                          ],
                          confirmButtonColor: "#71B6F9",
                          dangerMode: false,
                        }).then((willDelete) => {
                          if (willDelete) {
                            dispatch(
                              sendDecision(scenarioSelected.id, {
                                gameSessionId:
                                  StratEdge.resultParticipant.gameSessionId,
                                roundId:
                                  StratEdge.resultParticipant.rounds &&
                                  StratEdge.resultParticipant.rounds.filter(
                                    (r) => r.status === 0
                                  )[0] &&
                                  StratEdge.resultParticipant.rounds.filter(
                                    (r) => r.status === 0
                                  )[0].id,
                              })
                            );
                          }
                        });
                      }}
                      className="btn btn-primary waves-effect waves-light "
                      type="submit"
                      style={{
                        backgroundColor: "#5B69BC",
                      }}
                    >
                      <i
                        className=" fas fa-check"
                        style={{ marginRight: 10 }}
                      ></i>
                      {t("stratEdge.buisnessGame.scenario.sendDecision")}
                    </button>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </>
      )}

      {StratEdge.scenarios.length <= 0 && (
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            flex: 1,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h3
            style={{
              display: "flex",
              alignSelf: "center",
            }}
          >
            {t("stratEdge.buisnessGame.scenario.noSaved")}
          </h3>
        </div>
      )}
    </div>
  );
};

export { SavedScenarios };

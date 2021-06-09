import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Tab, Nav } from "react-bootstrap";
import StopCircle from "../../../assets/images/stop-circle-solid.svg";
import PlayCircle from "../../../assets/images/play-circle-solid.svg";
import TimesCircle from "../../../assets/images/times-circle-regular.svg";
import BookOpen from "../../../assets/images/book-open-solid.svg";
import ChimneyBlue from "../../../assets/images/chimney_blue.svg";
import StatsGroupe from "../../../assets/images/groupe332.svg";
import SetupBlue from "../../../assets/images/setup_blue.svg";
import MegaphoneBlue from "../../../assets/images/megaphone_blue.svg";
import Team from "../../../assets/images/team.svg";
import groupImg from "../../../assets/images/groupImg.svg";
import LineChart from "../../../components/charts/LineChart";
import BarChart from "../../../components/charts/BarChart";
import {
  getStratEdgeConfigurationParticipant,
  getStratEdgeResult,
  startOrStopRound,
} from "../../../redux/StratEdge/actions";

import SwalModal from "../../../components/SwalModal";
import Loader from "../../../components/Loader";
import { useTranslation } from "react-i18next";
import ResultBusinessGame from "../../../components/ResultBusinessGame";
import { Link } from "react-router-dom";
import { encrypt } from "../../../helpers/crypto";

const DecisionsModal = (props) => {
  const [roundScenarios, setRoundScenarios] = useState(false);
  const stratEdgeSelector = useSelector((state) => state.StratEdge);

  const { t , selectedRoundId} = props;
  useEffect(() => {
    if (
      stratEdgeSelector.result &&
      stratEdgeSelector.result.roundScenarios &&
      stratEdgeSelector.result.roundScenarios.length > 0
    ) {
      let roundScenariosVAR =
        stratEdgeSelector.result.roundScenarios[
          stratEdgeSelector.result.roundScenarios.length - 1
        ];
      // const currentRoundActive = stratEdgeSelector.result.rounds.find(
      //   (r) => r.status === 0
      // );
      if (selectedRoundId) {
        const roundScenariosActive = stratEdgeSelector.result.roundScenarios.find(
          (rs) => rs.roundId === selectedRoundId
        );
        if (roundScenariosActive) roundScenariosVAR = roundScenariosActive;
      }
      setRoundScenarios(roundScenariosVAR);
    }
  }, [stratEdgeSelector, selectedRoundId]);

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
    const { scenario } = props;
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

          {scenario &&
            scenario.teamScenarios &&
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
                  <h5>{
                    team.competitorFixedName && stratEdgeSelector.config && stratEdgeSelector.config.competitors &&
                  stratEdgeSelector.config.competitors.find((c)=> c.fixedName === team.competitorFixedName).name

                  }</h5>
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

  return (
    <Modal
      {...props}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // backdrop={"static"}
    >
      <Modal.Body>
        <h5>
          {t("stratEdge.buisnessGame.decisions")} :
          {roundScenarios &&
            stratEdgeSelector.result &&
            stratEdgeSelector.result.rounds &&
            stratEdgeSelector.result.rounds.find(
              (r) => r.id === roundScenarios.roundId
            ) &&
            stratEdgeSelector.result.rounds.find(
              (r) => r.id === roundScenarios.roundId
            ).name}
        </h5>
        <ContentDecisions scenario={roundScenarios} />
      </Modal.Body>
    </Modal>
  );
};

const RoundCard = (props) => {
  const { id, status, name, enablePlay, gameSessionId, dispatch, t } = props;
  const [colorStatus, setColorStatus] = useState("#10C46E");
  const [statusName, setStatusName] = useState("Terminé");

  useEffect(() => {
    switch (status) {
      case -1:
        setColorStatus("#FF5B5B");
        setStatusName(t("stratEdge.buisnessGame.round.statusComing"));
        break;
      case 1:
        setColorStatus("#10C46E");
        setStatusName(t("stratEdge.buisnessGame.round.statusFinish"));
        break;
      case 0:
        setColorStatus("#F9C851");
        setStatusName(t("stratEdge.buisnessGame.round.statusInProgress"));
        break;

      default:
        break;
    }
  }, [props]);

  const onClick = (status) => {
    SwalModal({
      text:
        status === 1
          ? t("stratEdge.buisnessGame.round.finishRoundMessage")
          : t("stratEdge.buisnessGame.round.startRoundMessage"),
      icon: "warning",
      buttons: [t("moduleNotion.swal.no"), t("moduleNotion.swal.yes")],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(startOrStopRound(id, status, gameSessionId));
      }
    });
  };

  return (
    <div
    style={{
        paddingRight: 30,
        flex: 1,
        cursor:  status === 1 ? "pointer" : "default",
      }}
      onClick={() => {
        if ( status === 1) {
          props.onCLick(id);
        }
      }}
    >
      <Card style={{ height: 63 }}>
        <CardBody
          className="card-box project-box mb-0 pb-0 p-11 "
          style={{ flex: 1, display: "flex" }}
        >
          <div className="inner-card-container">
            <div className="tour-container">
              <h4 className="tour-text" style={{ fontWeight: "bold" }}>
                {name}
              </h4>
            </div>
            <div className="status-container">
              <h4 className="status-text" style={{ color: colorStatus }}>
                {statusName}
              </h4>
            </div>
          </div>
          {status === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => onClick(1)}
            >
              <img alt="" src={StopCircle} />
            </div>
          )}
          {status === -1 && enablePlay === id && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => onClick(0)}
            >
              <img alt="" src={PlayCircle} />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const StratEdgeAnalysis = (props) => {
  const [decisionsModalShow, setDecisionsModalShow] = useState(false);
  const [result, setResult] = useState(false);
  const [isFound, setIsFound] = useState(0);
  const currentSession = useSelector((state) => state.Session.selectedSession);
  const currentModule = useSelector((state) => state.Module.module);
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const dispatch = useDispatch();

  const [selectedRoundId, setSelectedRoundId] = useState(false);

  const { t } = useTranslation();
  useEffect(() => {
    //console.log("currentSession", currentSession);
    dispatch(getStratEdgeResult(currentSession.gameSessionId));
  }, []);

  useEffect(() => {
    if (
      stratEdgeSelector.config !== null &&
      stratEdgeSelector.result.roundScenarios &&
      stratEdgeSelector.result.roundScenarios.length > 0
    ) {
      let obj = stratEdgeSelector.result.roundScenarios.find(
        (rs) => rs.roundId === selectedRoundId
      );

      if (!obj) {
        obj =
          stratEdgeSelector.result.roundScenarios[
            stratEdgeSelector.result.roundScenarios &&
              stratEdgeSelector.result.roundScenarios.length - 1
          ];
      }

      if (obj) {
        obj.scenarioResults.sort(function (a, b) {

          return (b.reserve )- (a.reserve );
        });
        obj.teamCompetitors = stratEdgeSelector.config.teamCompetitors;
        setResult(obj);
      }
    }
  }, [selectedRoundId])

  useEffect(() => {
    const roundId =
      stratEdgeSelector.result &&
      stratEdgeSelector.result.rounds &&
      stratEdgeSelector.result.rounds.find((r) => r.status === 0) &&
      stratEdgeSelector.result.rounds.find((r) => r.status === 0).id;

      setSelectedRoundId(roundId)
    if (
      stratEdgeSelector.config !== null &&
      stratEdgeSelector.result.roundScenarios &&
      stratEdgeSelector.result.roundScenarios.length > 0
    ) {
      let obj = stratEdgeSelector.result.roundScenarios.find(
        (rs) => rs.roundId === roundId
      );

      if (!obj) {
        obj =
          stratEdgeSelector.result.roundScenarios[
            stratEdgeSelector.result.roundScenarios &&
              stratEdgeSelector.result.roundScenarios.length - 1
          ];
      }

      if (obj) {
        obj.scenarioResults.sort(function (a, b) {

          return (b.reserve )- (a.reserve );
        });
        obj.teamCompetitors = stratEdgeSelector.config.teamCompetitors;
        setResult(obj);
      }
    }
  }, [stratEdgeSelector.result, stratEdgeSelector.config]);

  useEffect(() => {
    if (stratEdgeSelector.result.rounds) {
      const item = stratEdgeSelector.result.rounds.find(
        (item) => item.status === -1
      );
      if (item) setIsFound(item.id);
    }
  }, [stratEdgeSelector.result]);

  return (
    <div>
      {stratEdgeSelector.loading && <Loader />}
      <DecisionsModal
        t={t}
        show={decisionsModalShow}
        onHide={() => {
          setDecisionsModalShow(false);
        }}
        selectedRoundId={selectedRoundId}
      />
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
          {currentSession.trainingSessionName}
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 style={{ fontSize: 22 }}>{t("stratEdge.buisnessGame.results")} </h1>

      <div className="card-tour-container">
        {stratEdgeSelector.result &&
          stratEdgeSelector.result.rounds &&
          stratEdgeSelector.result.rounds.map((item) => {
            return (
              <RoundCard
                {...item}
                key={item.id}
                gameSessionId={currentSession.gameSessionId}
                enablePlay={isFound}
                dispatch={dispatch}
                onCLick={setSelectedRoundId}
                t={t}
              />
            );
          })}
      </div>

      <div className="card-badge-container">
        {result && stratEdgeSelector.config !== null && (
          <ResultBusinessGame
            result={result}
            roundScenarios={stratEdgeSelector.result.roundScenarios}
            config={stratEdgeSelector.config}
            rounds={stratEdgeSelector.result.rounds}
            t={t}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-end",
            paddingRight: 30,
          }}
        >
          <Button
            style={{ backgroundColor: "#5B69BC" }}
            onClick={() => {
              setDecisionsModalShow(true);
            }}
          >
            <img
              alt=""
              src={BookOpen}
              // className="rounded-circle img-thumbnail avatar-lg adp-img"
              style={{
                width: 23,
                height: 18,
                marginRight: "7px",
              }}
            />
            {t("stratEdge.buisnessGame.decisions")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { StratEdgeAnalysis };

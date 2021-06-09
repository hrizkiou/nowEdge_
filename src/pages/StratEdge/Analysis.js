import React, { useEffect, useState } from "react";
import {
  Row,
  Card,
  Col,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Tab, Nav } from "react-bootstrap";
import UnlockSolid from "../../assets/images/unlock-solid.svg";
import LockSolid from "../../assets/images/lock-solid.svg";
import groupImg from "../../assets/images/groupImg.svg";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import { useDispatch, useSelector } from "react-redux";
import { getStratEdgeResultParticipant } from "../../redux/StratEdge/actions";
import Loader from "../../components/Loader";
import ResultBusinessGame from "../../components/ResultBusinessGame";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RoundCard = (props) => {
  const { id, status, name, enablePlay, gameSessionId, dispatch, t } = props;
  const [colorStatus, setColorStatus] = useState("#10C46E");
  const [statusName, setStatusName] = useState(
    t("stratEdge.buisnessGame.round.statusFinish")
  );

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

  return (
    <div
      style={{
        paddingRight: 30,
        flex: 1,
        cursor: status === 1 || status === 0 ? "pointer" : "default",
      }}
      onClick={() => {
        if (status === 1 || status === 0) {
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <img alt="" src={status === -1 ? LockSolid : UnlockSolid} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
const Analysis = (props) => {
  const resultParticipant = useSelector(
    (state) => state.StratEdge.resultParticipant
  );

  const { t } = useTranslation();

  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId
  );

  const [result, setResult] = useState(false);
  const [selectedRoundId, setSelectedRoundId] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log("result+++++++++++++", resultParticipant);

    // if (!resultParticipant.gameSessionId)
    dispatch(getStratEdgeResultParticipant(gameSessionId));
  }, []);
  useEffect(() => {
    if (stratEdgeSelector.resultParticipant.roundScenarios.length > 0) {
      let obj = stratEdgeSelector.resultParticipant.roundScenarios.find(
        (rs) => rs.roundId === selectedRoundId
      );

      if (!obj) {
        obj =
          stratEdgeSelector.resultParticipant.roundScenarios[
            stratEdgeSelector.resultParticipant.roundScenarios.length - 1
          ];
      }

      if (obj) {
        obj.scenarioResults.sort(function (a, b) {
          return (b.reserve )- (a.reserve );
        });
        obj.teamCompetitors =
          stratEdgeSelector.configParticipant &&
          stratEdgeSelector.configParticipant.teamCompetitors;
        setResult(obj);
      }
    }
  }, [selectedRoundId]);

  useEffect(() => {
    const roundId =
      stratEdgeSelector.resultParticipant.rounds &&
      stratEdgeSelector.resultParticipant.rounds.find((r) => r.status === 0) &&
      stratEdgeSelector.resultParticipant.rounds.find((r) => r.status === 0).id;

    setSelectedRoundId(roundId);
    if (stratEdgeSelector.resultParticipant.roundScenarios.length > 0) {
      let obj = stratEdgeSelector.resultParticipant.roundScenarios.find(
        (rs) => rs.roundId === roundId
      );

      if (!obj) {
        obj =
          stratEdgeSelector.resultParticipant.roundScenarios[
            stratEdgeSelector.resultParticipant.roundScenarios.length - 1
          ];
      }

      if (obj) {
        obj.scenarioResults.sort(function (a, b) {
          return (b.reserve)- (a.reserve );
        });
        obj.teamCompetitors =
          stratEdgeSelector.configParticipant &&
          stratEdgeSelector.configParticipant.teamCompetitors;
        setResult(obj);
      }
    }
  }, [stratEdgeSelector]);

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
        <BreadcrumbItem active>
          {" "}
          {t("stratEdge.buisnessGame.results")}
        </BreadcrumbItem>
      </Breadcrumb>
      <h1 style={{ fontSize: 22 }}> {t("stratEdge.buisnessGame.results")}</h1>

      <div className="card-tour-container">
        {stratEdgeSelector.resultParticipant.rounds &&
          stratEdgeSelector.resultParticipant.rounds.map((item) => {
            return (
              <RoundCard
                {...item}
                key={item.id}
                dispatch={dispatch}
                t={t}
                onCLick={setSelectedRoundId}
              />
            );
          })}
      </div>
      <div className="card-badge-container">
        {result && (
          <ResultBusinessGame
            result={result}
            roundScenarios={stratEdgeSelector.resultParticipant.roundScenarios}
            config={stratEdgeSelector.configParticipant}
            rounds={stratEdgeSelector.resultParticipant.rounds}
            t={t}
          />
        )}
      </div>
    </div>
  );
};

export { Analysis };

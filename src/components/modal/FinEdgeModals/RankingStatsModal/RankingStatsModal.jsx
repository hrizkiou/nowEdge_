import React, { useState, useEffect } from "react";

import style from "./style.module.scss";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { LineZoomChart } from "../../../charts/highcharts/LineZoomChart";
import { useSelector } from "react-redux";
const RankingStatsModal = ({
  show,
  currentUserRankId,
  onHide = () => {},
  onSuccess = () => {},
  currentItem,
}) => {
  const { t } = useTranslation();

  const [currentUser, setCurrentUser] = useState({})
  const {rankingChartData, rankings} = useSelector(
    (state) => state.FinEdge
  );
  const user = useSelector(
    (state) => state.Auth.user
  );

  useEffect(() => {
    setCurrentUser(rankings.find((r)=> r.id === currentUserRankId)?.user)
  }, [currentUserRankId])
 
  return (
    <Modal
      show={show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => onHide()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Classement : Vous Vs {currentUser.firstName} {currentUser.lastName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={style.container}>
          <div className={style.item}>
            <h5>Evolution du classement</h5>
            <LineZoomChart
              disableZoom
              data2={rankingChartData.find((rcd)=> rcd.rank_id === currentUserRankId)?.data?.ranking}
              data1={rankingChartData.find((rcd)=> rcd.rank_id === rankings.find((r)=> r.user.id === user.id)?.id)?.data?.ranking}
              
            />
          </div>
          <div className={style.item}>
            <h5>Historique des rendements (comparatif)</h5>
            <LineZoomChart
              disableZoom
              legendEnabled
              name1={"Rdts benchmark"}
              name2={`Rdts benchmark (${currentUser.firstName} ${currentUser.lastName})`}
              name3={"Rdts benchmark (Vous)"}
              data2={rankingChartData.find((rcd)=> rcd.rank_id === currentUserRankId)?.data?.yieldR}
              data1={rankingChartData.find((rcd)=> rcd.rank_id === rankings.find((r)=> r.user.id === user.id)?.id)?.data?.yieldR}
               
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export { RankingStatsModal };

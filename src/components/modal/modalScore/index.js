import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import style from "./style.module.scss";
import badge1 from "../../../assets/images/StrategicGame/checklist (1).svg";
import star1 from "../../../assets/images/StrategicGame/star/star_1.svg";
import star2 from "../../../assets/images/StrategicGame/star/star_2.svg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ChartLine = ({ fill = "#ff5b5b" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="23.414"
    height="17.56"
    fill={fill}
    viewBox="0 0 23.414 17.56"
  >
    <path
      className="a"
      d="M22.682,78.633H2.927v-13.9A.731.731,0,0,0,2.2,64H.732A.731.731,0,0,0,0,64.732V80.1A1.464,1.464,0,0,0,1.463,81.56H22.682a.731.731,0,0,0,.732-.732V79.365A.731.731,0,0,0,22.682,78.633Zm-1.463-13.17h-5.4a1.1,1.1,0,0,0-.776,1.874l1.482,1.482L13.17,72.174,9.815,68.819a1.463,1.463,0,0,0-2.069,0L4.6,71.96A.732.732,0,0,0,4.6,73l1.034,1.034a.732.732,0,0,0,1.035,0L8.78,71.923l3.355,3.355a1.463,1.463,0,0,0,2.069,0l4.39-4.39,1.482,1.482a1.1,1.1,0,0,0,1.874-.776V66.2A.731.731,0,0,0,21.219,65.463Z"
      transform="translate(0 -64)"
    />
  </svg>
);
const CogsSolid = ({ fill = "#10c469" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width="20.876"
    height="18.269"
    viewBox="0 0 20.876 18.269"
  >
    <path
      className="a"
      d="M18.325,6.946l-.294.512a.442.442,0,0,1-.541.193,3.956,3.956,0,0,1-1.149-.666.445.445,0,0,1-.1-.562l.294-.512a3.091,3.091,0,0,1-.569-.981h-.591a.442.442,0,0,1-.437-.369,4.033,4.033,0,0,1,0-1.328.445.445,0,0,1,.437-.372h.591a3.091,3.091,0,0,1,.569-.981l-.294-.512a.44.44,0,0,1,.1-.562A4,4,0,0,1,17.491.141a.442.442,0,0,1,.541.193l.294.512a3.181,3.181,0,0,1,1.135,0l.294-.512a.442.442,0,0,1,.541-.193,3.956,3.956,0,0,1,1.149.666.445.445,0,0,1,.1.562l-.294.512a3.091,3.091,0,0,1,.569.981h.591a.442.442,0,0,1,.437.369,4.033,4.033,0,0,1,0,1.328.445.445,0,0,1-.437.372h-.591a3.091,3.091,0,0,1-.569.981l.294.512a.44.44,0,0,1-.1.562,4,4,0,0,1-1.149.666.442.442,0,0,1-.541-.193l-.294-.512A3.181,3.181,0,0,1,18.325,6.946Zm-.376-2.105a1.337,1.337,0,0,0,1.89-1.89A1.337,1.337,0,0,0,17.949,4.841Zm-4.128,5.51,1.207.6a.861.861,0,0,1,.376,1.042,8.452,8.452,0,0,1-1.525,2.356.856.856,0,0,1-1.085.19l-1.042-.6a6.15,6.15,0,0,1-1.966,1.135v1.2a.857.857,0,0,1-.705.845,8.051,8.051,0,0,1-2.717,0,.86.86,0,0,1-.716-.845v-1.2a6.217,6.217,0,0,1-1.966-1.135l-1.042.6a.857.857,0,0,1-1.085-.19A8.439,8.439,0,0,1,.045,11.994a.864.864,0,0,1,.376-1.042l1.192-.6a6.2,6.2,0,0,1,0-2.27L.421,7.476A.854.854,0,0,1,.045,6.438,8.406,8.406,0,0,1,1.555,4.082a.856.856,0,0,1,1.085-.19l1.042.6A6.15,6.15,0,0,1,5.648,3.359V2.153a.853.853,0,0,1,.7-.841,8.165,8.165,0,0,1,2.721,0,.86.86,0,0,1,.716.845v1.2A6.217,6.217,0,0,1,11.752,4.49l1.042-.6a.857.857,0,0,1,1.085.19,8.394,8.394,0,0,1,1.507,2.356.856.856,0,0,1-.358,1.042l-1.207.6A6.222,6.222,0,0,1,13.821,10.351Zm-4.21.755A2.677,2.677,0,0,0,5.827,7.322,2.677,2.677,0,0,0,9.611,11.107Zm8.714,6.541-.294.512a.442.442,0,0,1-.541.193,3.956,3.956,0,0,1-1.149-.666.445.445,0,0,1-.1-.562l.294-.512a3.091,3.091,0,0,1-.569-.981h-.591a.442.442,0,0,1-.437-.369,4.033,4.033,0,0,1,0-1.328.445.445,0,0,1,.437-.372h.591a3.091,3.091,0,0,1,.569-.981l-.294-.512a.44.44,0,0,1,.1-.562,4,4,0,0,1,1.149-.666.442.442,0,0,1,.541.193l.294.512a3.181,3.181,0,0,1,1.135,0l.294-.512a.442.442,0,0,1,.541-.193,3.956,3.956,0,0,1,1.149.666.445.445,0,0,1,.1.562l-.294.512a3.091,3.091,0,0,1,.569.981h.591a.442.442,0,0,1,.437.369,4.033,4.033,0,0,1,0,1.328.445.445,0,0,1-.437.372h-.591a3.091,3.091,0,0,1-.569.981l.294.512a.44.44,0,0,1-.1.562,4,4,0,0,1-1.149.666.442.442,0,0,1-.541-.193l-.294-.512A3.181,3.181,0,0,1,18.325,17.648Zm-.376-2.109a1.337,1.337,0,0,0,1.89-1.89A1.337,1.337,0,0,0,17.949,15.539Z"
      transform="translate(0.009 -0.112)"
    />
  </svg>
);
const CubesSolid = ({ fill = "#10c469" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    width="20.876"
    height="18.269"
    viewBox="0 0 20.876 18.269"
  >
    <path
      className="a"
      d="M19.922,40.873,15.983,39.4V34.973a1.468,1.468,0,0,0-.954-1.374L10.952,32.07a1.451,1.451,0,0,0-1.032,0L5.843,33.6a1.468,1.468,0,0,0-.954,1.374V39.4L.95,40.873A1.47,1.47,0,0,0,0,42.247v4.489a1.469,1.469,0,0,0,.811,1.313l4.077,2.039a1.46,1.46,0,0,0,1.313,0l4.236-2.12,4.236,2.12a1.46,1.46,0,0,0,1.313,0l4.077-2.039a1.469,1.469,0,0,0,.811-1.313V42.247A1.468,1.468,0,0,0,19.922,40.873ZM14.6,39.429l-3.466,1.3V37.949L14.6,36.441ZM6.279,34.916l4.159-1.558L14.6,34.916v.024l-4.159,1.688L6.279,34.94ZM9.7,46.785,6.238,48.518V45.293L9.7,43.711Zm0-4.567L5.545,43.906,1.386,42.218v-.024l4.159-1.558L9.7,42.194Zm9.786,4.567-3.466,1.733V45.293l3.466-1.582Zm0-4.567-4.159,1.688-4.159-1.688v-.024l4.159-1.558,4.159,1.558Z"
      transform="translate(0 -31.975)"
    />
  </svg>
);

const Stars = ({ limitStar = 3 }) => {
  return (
    <div className={style.stars_content}>
      {Array.from(Array(3).keys()).map((val, index) => {
        return (
          <img
            key={index}
            src={index + 1 <= limitStar ? star1 : star2}
            className={index + 1 === limitStar ? style.start_b : style.start_n}
          />
        );
      })}
    </div>
  );
};

const RowScore = ({ title, points = 0, state = 1, t }) => {
  const color = state === 1 ? "#10C469" : "#FF5B5B";
  const background = state === 1 ? "#CFF2E1" : "#FFDEDE";
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "29px",
        marginRight: "29px",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <span>{title}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: " 113px",
          height: "37px",
          background: `${background} 0% 0% no-repeat padding-box`,
          borderRadius: "23px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ChartLine fill={color} />
          <span
            style={{
              textAlign: "left",
              font: "normal normal normal 10px/9px Karla",
              letterSpacing: "0px",
              color: color,
              marginLeft: "5px",
              marginTop: "5px",
            }}
          >
            {points} {t("pvgame.parcour.point")}
          </span>
        </div>
      </div>
    </div>
  );
};

const Score = ({
  show,
  close = () => null,
  text = "xxxxxxx",
  history,
  onValidate = null,
  scoreDay,
}) => {
  const { score } = useSelector((state) => state.PvGame);
  const { t } = useTranslation();

  return (
    <Modal
      show={show}
      dialogClassName={style.daysModal}
      contentClassName={style.modalContent}
      centered
    >
      <Modal.Body>
        <div className={style.dayOneModal}>
          <div className={style.block1}>
            <h3>Score</h3>
          </div>
          <div className={style.block2}>
            <div className={style.content}>
              <div className={style.stars_content_}>
                <Stars limitStar={scoreDay.stars} />
              </div>
              <div className={style.score}>
                <RowScore
                  title={t("modals.score.Score_structurel")}
                  points={
                    scoreDay.score1
                    // - score.score1
                  }
                  state={scoreDay.score1 > 0 ? 1 : 2}
                  t={t}
                />
                <RowScore
                  title={t("modals.score.Score_Process")}
                  points={scoreDay.score2}
                  state={scoreDay.score2 > 0 ? 1 : 2}
                  t={t}
                />
                <RowScore
                  title={t("modals.score.Score_Outcome")}
                  points={scoreDay.score3}
                  state={scoreDay.score3 > 0 ? 1 : 2}
                  t={t}
                />
              </div>
            </div>
          </div>
          <div className={style.block3}>
            <button
              className={[
                "btn btn-primary waves-effect width-md waves-light",
              ].join(" ")}
              onClick={() => close()}
            >
              {t("modals.notee")}
              <i className=" fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default Score;

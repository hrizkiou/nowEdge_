import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import img1Gris from "../../../assets/images/StrategicGame/days/1.png";
import img10 from "../../../assets/images/StrategicGame/days/10-color.png";
import img11 from "../../../assets/images/StrategicGame/days/11-color.png";
import img2Gris from "../../../assets/images/StrategicGame/days/2.png";
import img3Gris from "../../../assets/images/StrategicGame/days/3.png";
import img4Gris from "../../../assets/images/StrategicGame/days/4.png";
import img5Gris from "../../../assets/images/StrategicGame/days/5.png";
import img6Gris from "../../../assets/images/StrategicGame/days/7.png";
import img8Gris from "../../../assets/images/StrategicGame/days/8.png";
import img9Gris from "../../../assets/images/StrategicGame/days/9.png";
import img1 from "../../../assets/images/StrategicGame/days/day1.png";
import img10Gris from "../../../assets/images/StrategicGame/days/day10.png";
import img11Gris from "../../../assets/images/StrategicGame/days/day11.png";
import img2 from "../../../assets/images/StrategicGame/days/day2.png";
import img4 from "../../../assets/images/StrategicGame/days/day4.png";
import img5 from "../../../assets/images/StrategicGame/days/day5.png";
import img6 from "../../../assets/images/StrategicGame/days/day7.png";
import img8 from "../../../assets/images/StrategicGame/days/day8.png";
import img9 from "../../../assets/images/StrategicGame/days/day9.png";
import img3 from "../../../assets/images/StrategicGame/Group 5174.svg";
import startI from "../../../assets/images/StrategicGame/Group 5180.svg";
import startII from "../../../assets/images/StrategicGame/Group 5181.svg";
import startIII from "../../../assets/images/StrategicGame/Group 5183.svg";
import startIV from "../../../assets/images/StrategicGame/Group 5184.svg";
import runningSolid from "../../../assets/images/StrategicGame/running-solid.svg";
import music from "../../../assets/main-music.mp3";
import { avatars, countries, getLogoById } from "../../../helpers/centerData";
import { getCenterInfo, getscore } from "../../../redux/actions";

// var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;
// function addNameSpace(data) {
//   if (data.indexOf("http://www.w3.org/2000/svg") < 0) {
//     data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
//   }

//   return data;
// }
// function encodeSVG(data) {
//   if (data.indexOf('"') >= 0) {
//     data = data.replace(/"/g, "'");
//   }

//   data = data.replace(/>\s{1,}</g, "><");
//   data = data.replace(/\s{2,}/g, " ");

//   return data.replace(symbols, encodeURIComponent);
// }

const StartN = ({ nbrS, position = true, hover = true, step = 0 }) => {
  const [state, setState] = useState(startI);
  useEffect(() => {
    switch (nbrS) {
      case 0:
        setState(startI);
        break;
      case 1:
        setState(startIV);
        break;
      case 2:
        setState(startIII);
        break;
      case 3:
        setState(startII);
        break;

      default:
        break;
    }
  }, [nbrS]);

  const style = position
    ? {
        position: "absolute",
        marginTop: "-150px",
      }
    : {};

  if (nbrS !== -1)
    return (
      <div style={style} className={`${hover ? "show-starts" : ""}`}>
        <img src={state} />
      </div>
    );

  return (
    <div
      style={{
        position: "absolute",
        marginTop: "-150px",
      }}
    ></div>
  );
};

const ItemSercl = ({
  img = img1,
  title = "",
  top,
  left,
  click = () => null,
  style = {},
  topBlock = null,
  leftBlock = null,
  dayObject,
}) => {
  const day = dayObject?.dayId;
  const step = dayObject?.status;
  const nbrS = step !== -1 ? dayObject?.stars : -1;

  const { t } = useTranslation();
  return (
    <div
      onClick={click}
      className="hhkjshd"
      style={{
        position: "absolute",
        left: `${left}%`,
        top: `${top}%`,
        cursor: step === -1 ? "not-allowed": "pointer",
      }}
    >
      <div className="example-contene">
        <StartN nbrS={nbrS} />
        <img src={img} className="parc-box-img" style={style} />
      </div>
      <div
        className="exampleContene-s"
        style={{
          top: `${topBlock ? topBlock + "px" : "-20px"}`,
          left: `${leftBlock ? leftBlock + "px" : "0px"}`,
          paddingLeft: "16px",
          justifyContent: "flex-start",
        }}
      >
        <img src={img} className="parc-box-img-2" style={style} />
        <div className="d-flex flex-column ml-2 pb-3 pt-3 ">
          <div>
            {t(`pvgame.parcour.niveau`)} {day}
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "Karla",
              color: "#3F4351",
              lineHeight: "1",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "bold",
              fontFamily: "Karla",
              color:
                step === 1 ? "#10C469" : step === 0 ? "#F9C851" : "#9F9F9F",
              fontWeight: "400",
              textTransform: "uppercase",
              letterSpacing: "20",
              marginTop: "4px",
              marginBottom: "4px",
            }}
          >
            {step === 1
              ? t(`pvgame.parcour.termine`)
              : step === 0
              ? t(`pvgame.parcour.encour`)
              : t(`pvgame.parcour.verouille`)}
          </div>
          <StartN nbrS={nbrS} position={false} hover={false} />
        </div>
      </div>
    </div>
  );
};

const PlayButton = () => {
  const audioEl = useRef();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    audioEl.current = document.getElementsByClassName("audio-element")[0];
    audioEl.current.play();
    setPaused(audioEl.current.paused);
  }, []);

  const onEnded_ = () => {
    audioEl.current.currentTime = 0;
    audioEl.current.play();
  };
  const click_ = () => {
    audioEl.current.paused ? audioEl.current.play() : audioEl.current.pause();
    setPaused(audioEl.current.paused);
  };

  return (
    <div
      style={{
        width: "20px",
        height: "25px",
        position: "absolute",
        right: "20px",
        top: "15px",
        cursor: "pointer",
      }}
      onClick={click_}
    >
      <i
        className={paused ? " mdi mdi-volume-off" : "mdi mdi-volume-high "}
        style={{ fontSize: "1.9rem", color: "white" }}
      ></i>
      <audio autoPlay className="audio-element" onEnded={onEnded_}>
        <source src={music}></source>
      </audio>
    </div>
  );
};

export default function Parcours() {
  const history = useHistory();
  const { days } = useSelector((state) => state.PvGame.center);
  const center = useSelector((state) => state.PvGame.center);
  const { t } = useTranslation();
  const centerId = useSelector((state) => state.PvGame.center.centerId);
  const score = useSelector((state) => state.PvGame.score);
  const { gameSessionId } = useSelector((state) => state.Module.module);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getscore(centerId));
    if (!days) {
      dispatch(getCenterInfo(gameSessionId));
    }
  }, [centerId]);
  const to = (path) => {
    history.push(path);
  };

  return (
    <div className="mainBackground">
      <PlayButton />
      <div className="par-row1">
        <div className="d-flex flex-column sg-onHover">
          <div className="d-flex justify-content-center align-items-center">
            <img
              src={getLogoById(center.countryId, countries)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
                marginRight: "-10px",
              }}
            />
            <img
              src={getLogoById(center.avatarId, avatars)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
              }}
            />
            <span className="sg-menu-item-title" style={{ color: "#fff" }}>
              {center.name}
            </span>
          </div>
          <div className="sg-menu-item-btn-config-p" onClick={() => null}>
            <div className="sg-menu-item-btn-config-sp">
              <i className=" fas fa-cubes"></i> {score.score1}{" "}
              {t(`pvgame.parcour.point`)}
            </div>
            <div className="sg-menu-item-btn-config-sp">
              <i className="   fas fa-cogs"></i> {score.score2}{" "}
              {t(`pvgame.parcour.point`)}
            </div>
            <div className="sg-menu-item-btn-config-sp">
              <i className="fas fa-chart-line"></i> {score.score3}{" "}
              {t(`pvgame.parcour.point`)}
            </div>
          </div>
        </div>
        <div className="parc-btnQ" onClick={() => history.push("/pv-game")}>
          {t(`pvgame.parcour.quitter`)}
          <img src={runningSolid} style={{ marginLeft: "5px" }} />
        </div>
      </div>
      <div className="par-row2">
        <h3>
          <span>{t(`pvgame.parcour.welcome`)}</span>{" "}
          <span className="title-x">{t(`pvgame.parcour.Aventure`)}</span>
        </h3>
        <p
          style={{
            margin: "0px 27%",
          }}
        >
          {t(`pvgame.parcour.desc`)}
        </p>
      </div>
      {days?.find((d) => d.dayId === 1) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 1).status !== -1 &&
              to("/pv-game/day/1");
          }}
          img={days.find((d) => d.dayId === 1).status === -1 ? img1Gris : img1}
          title={t(`pvgame.parcour.day1title`)}
          left={12}
          top={78}
          dayObject={days.find((d) => d.dayId === 1)}
        />
      )}
      {days?.find((d) => d.dayId === 2) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 2).status !== -1 &&
              to("/pv-game/day/2");
          }}
          img={days.find((d) => d.dayId === 2).status === -1 ? img2Gris : img2}
          title={t(`pvgame.parcour.day2title`)}
          left={17}
          top={54}
          topBlock={-12}
          dayObject={days.find((d) => d.dayId === 2)}
        />
      )}
      {days?.find((d) => d.dayId === 3) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 3).status !== -1 &&
              to("/pv-game/day/3");
          }}
          img={days.find((d) => d.dayId === 3).status === -1 ? img3Gris : img3}
          title={t(`pvgame.parcour.day3title`)}
          left={22}
          top={28}
          dayObject={days.find((d) => d.dayId === 3)}
        />
      )}
      {days?.find((d) => d.dayId === 4) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 4).status !== -1 &&
              to("/pv-game/day/4");
          }}
          img={days.find((d) => d.dayId === 4).status === -1 ? img4Gris : img4}
          title={t(`pvgame.parcour.day4title`)}
          left={28}
          top={50}
          dayObject={days.find((d) => d.dayId === 4)}
        />
      )}
      {days?.find((d) => d.dayId === 5) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 5).status !== -1 &&
              to("/pv-game/day/5");
          }}
          img={days.find((d) => d.dayId === 5).status === -1 ? img5Gris : img5}
          title={t(`pvgame.parcour.day5title`)}
          left={27}
          top={79}
          dayObject={days.find((d) => d.dayId === 5)}
        />
      )}
      {/* {days?.find((d) => d.dayId === 6) && (
        <ItemSercl
          topBlock={-20}
          leftBlock={9}
          img={days.find((d) => d.dayId === 6).status === -1 ? img6Gris : img6}
          title={"La promotion de la notification"}
          left={44}
          top={72}
          dayObject={days.find((d) => d.dayId === 6)}
        />
      )} */}
      {days?.find((d) => d.dayId === 6) && (
        <ItemSercl
          topBlock={-20}
          leftBlock={9}
          click={() => {
            days.find((d) => d.dayId === 6).status !== -1 &&
              to("/pv-game/day/6");
          }}
          img={days.find((d) => d.dayId === 6).status === -1 ? img6Gris : img6}
          title={t(`pvgame.parcour.day6title`)}
          left={44}
          top={72}
          dayObject={days.find((d) => d.dayId === 6)}
        />
      )}
      {days?.find((d) => d.dayId === 7) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 7).status !== -1 &&
              to("/pv-game/day/7");
          }}
          img={days.find((d) => d.dayId === 7).status === -1 ? img8Gris : img8}
          title={t(`pvgame.parcour.day7title`)}
          left={57}
          top={55}
          topBlock={-12}
          dayObject={days.find((d) => d.dayId === 7)}
        />
      )}
      {days?.find((d) => d.dayId === 8) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 8).status !== -1 &&
              to("/pv-game/day/8");
          }}
          img={days.find((d) => d.dayId === 8).status === -1 ? img9Gris : img9}
          title={t(`pvgame.parcour.day8title`)}
          left={65}
          top={79}
          dayObject={days.find((d) => d.dayId === 8)}
        />
      )}
      {days?.find((d) => d.dayId === 9) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 9).status !== -1 &&
              to("/pv-game/day/9");
          }}
          img={
            days.find((d) => d.dayId === 9).status === -1 ? img10Gris : img10
          }
          title={t(`pvgame.parcour.day9title`)}
          left={65}
          top={28}
          topBlock={-18}
          dayObject={days.find((d) => d.dayId === 9)}
        />
      )}
      {days?.find((d) => d.dayId === 10) && (
        <ItemSercl
          click={() => {
            days.find((d) => d.dayId === 10).status !== -1 &&
              to("/pv-game/day/10");
          }}
          img={
            days.find((d) => d.dayId === 10).status === -1 ? img11Gris : img11
          }
          title={t(`pvgame.parcour.day10title`)}
          left={76}
          top={47}
          topBlock={1}
          leftBlock={6}
          style={{
            width: "52px",
          }}
          dayObject={days.find((d) => d.dayId === 10)}
        />
      )}
      {/* {days?.find((d) => d.dayId === 12) && (
        <ItemSercl
          img={
            days.find((d) => d.dayId === 12).status === -1 ? img12Gris : img12
          }
          title={"Les actions de minimisation des risques"}
          left={79}
          top={74}
          topBlock={-19}
          dayObject={days.find((d) => d.dayId === 12)}
        />
      )} */}
    </div>
  );
}

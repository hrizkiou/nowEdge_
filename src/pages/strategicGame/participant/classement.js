import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import badge1 from "../../../assets/images/StrategicGame/Component25e311.svg";
import badge2 from "../../../assets/images/StrategicGame/Component3581.svg";
import img1 from "../../../assets/images/StrategicGame/Component51–12.svg";
import badge3 from "../../../assets/images/StrategicGame/Componente3551.svg";
import img2 from "../../../assets/images/StrategicGame/Group 4406.svg";
import img3 from "../../../assets/images/StrategicGame/Group 4410.svg";
import badg44 from "../../../assets/images/StrategicGame/Mask Group 14.svg";
import img4 from "../../../assets/images/StrategicGame/Mask-Group114.svg";
import MaskGroup144 from "../../../assets/images/StrategicGame/MaskGroup14.svg";
import runningSolid from "../../../assets/images/StrategicGame/running-solid.svg";
import { avatars, countries, getLogoById } from "../../../helpers/centerData";
import { getscore, getScoreGlobal } from "../../../redux/actions";

const ListClassItem = ({ t, active = false, onClick, index, item = {} }) => {
  return (
    <div
      className={`list-item-classment ${active ? "active-classment" : ""}`}
      onClick={() => onClick(index)}
    >
      <div className="list-item-classment-b1">
        <h3>{index + 1}</h3>
        <img
          src={getLogoById(item.pvCenter.avatarId, avatars)?.logo}
          style={{
            backgroundColor: "aliceblue",
            borderRadius: " 50%",
            width: `34px`,
          }}
        />
        <div>{item.pvCenter.name}</div>
      </div>
      <div className="list-item-classment-b2">
        <h3>{t(`pvgame.classement.score`)} :</h3>
        <h4>{item.score1 + item.score2 + item.score3}</h4>
        <DetailsClassmentItemList
          t={t}
          score1={item.score1}
          score2={item.score2}
          score3={item.score3}
        />
      </div>
    </div>
  );
};

const ListClass = ({ t, scoreGlobal = [] }) => {
  const [indexActive, setindexActive] = useState(null);

  const centerId = useSelector((state) => state.PvGame.center.centerId);
  let list = scoreGlobal
    .map((value, index) => {
      const total = value.score1 + value.score2 + value.score3;
      return { ...value, total: total };
    })
    .sort(function (a, b) {
      return b.total - a.total;
    });

  list.splice(0, 3);

  useEffect(() => {
    const index = list.findIndex((s)=> s.pvCenter.centerId === centerId)
    setindexActive(index)
  }, [list])

  const clickItem = (index) => {
    // setindexActive(index);
  };
  return (
    <div className="list-classment">
      {list.map((item, index) => {
        return (
          <ListClassItem
            t={t}
            key={index}
            index={index + 3}
            active={index === indexActive}
            onClick={clickItem}
            item={item}
          />
        );
      })}
    </div>
  );
};

const DetailsClassmentItem = ({ t, score1 = 0, score2 = 0, score3 = 0 }) => {
  return (
    <div className="clas-show-detail-hover">
      <div className="mb-2">
        <i className=" fas fa-cubes"></i> {score1} {t(`pvgame.parcour.point`)}
      </div>
      <div className="mb-2">
        <i className=" fas fa-cogs"></i> {score2} {t(`pvgame.parcour.point`)}
      </div>
      <div className="mb-2">
        <i className=" fas fa-chart-line"></i> {score3} {t(`pvgame.parcour.point`)}
      </div>
    </div>
  );
};
const DetailsClassmentItemList = ({ t, score1, score2, score3 }) => {
  return (
    <span
      className="clas-show-detail-hover-li"
      style={{ color: "color: rgb(7, 96, 165) !important" }}
    >
      <div className="mb-2">
        <i className=" fas fa-cubes mr-1"></i> {score1}{" "}
        {t(`pvgame.parcour.point`)}
      </div>
      <div className="mb-2">
        <i className=" fas fa-cogs mr-1"></i> {score2}{" "}
        {t(`pvgame.parcour.point`)}
      </div>
      <div className="mb-2">
        <i className=" fas fa-chart-line  mr-1"></i> {score3}{" "}
        {t(`pvgame.parcour.point`)}
      </div>
    </span>
  );
};

const DetailsClassment = ({
  t,
  scoreGlobal,
  centerId,
  user1,
  user2,
  user3,
}) => {
  return (
    <div className="details-classment">
      <div style={{ position: "relative" }}>
        {user2 && (
          <>
            <div
              className="details-class-2"
              style={{
                justifyContent: "center",
                alignContent: "center",
                display: "flex",
                alignItems: "center",
                height: "140px",
              }}
            >
              <img
                src={getLogoById(user2.pvCenter.avatarId, avatars)?.logo}
                style={{ width: "80px", height: "100px" }}
              />
              <img
                src={badge2}
                style={{ position: "absolute", right: "40px", top: "55px" }}
              />
              <p>{user2?.pvCenter.name}</p>
              <div>
                <div className="text-score">
                  {" "}
                  {t(`pvgame.classement.score`)} :
                </div>
                <div className="text-score-n">{user2?.total}</div>
              </div>
            </div>

            <DetailsClassmentItem
              t={t}
              score1={user2.score1}
              score2={user2.score2}
              score3={user2.score3}
            />
          </>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {user1 && (
          <>
            <div className="details-class-1" style={{ height: "161px" }}>
              <img
                src={getLogoById(user1.pvCenter.avatarId, avatars)?.logo}
                style={{ width: "80px", height: "100px", alignSelf: "center" }}
              />
              <img
                src={badge1}
                style={{ position: "absolute", right: "37px", top: "58px" }}
              />
              <p>{user1?.pvCenter.name}</p>
              <div>
                <div className="text-score">
                  {t(`pvgame.classement.score`)} :
                </div>
                <div className="text-score-n">{user1?.total}</div>
              </div>
            </div>

            <DetailsClassmentItem
              t={t}
              score1={user1.score1}
              score2={user1.score2}
              score3={user1.score3}
            />
          </>
        )}
      </div>
      <div style={{ position: "relative" }}>
        {user3 && (
          <>
            <div className="details-class-3" style={{ height: "140px" }}>
              <img src={getLogoById(user3.pvCenter.avatarId, avatars)?.logo}   style={{ width: "80px", height: "100px", alignSelf: "center" }}/>
              <img
                src={badge3}
                style={{ position: "absolute", right: "40px", top: "55px" }}
              />
              <p style={{ marginTop: "20px" }}>{user3?.pvCenter.name}</p>
              <div>
                <div className="text-score">
                  {t(`pvgame.classement.score`)} :
                </div>
                <div className="text-score-n">{user3?.total}</div>
              </div>
            </div>
            <DetailsClassmentItem
              t={t}
              score1={user3.score1}
              score2={user3.score2}
              score3={user3.score3}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default function Classement() {
  const history = useHistory();
  const gameSessionId = useSelector(
    (state) => state.PvGame.center.gameSessionId
  );
  const centerId = useSelector((state) => state.PvGame.center.centerId);
  const scoreGlobal = useSelector((state) => state.PvGame.scoreGlobal);

  const center = useSelector((state) => state.PvGame.center);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const score = useSelector((state) => state.PvGame.score);
  useEffect(() => {
    if (!score) dispatch(getscore(centerId));
    dispatch(getScoreGlobal(gameSessionId));
  }, []);

  let list = scoreGlobal
    .map((value, index) => {
      const total = value.score1 + value.score2 + value.score3;
      return { ...value, total: total };
    })
    .sort(function (a, b) {
      return b.total - a.total;
    });

  const CLASSEMENT =
    list.findIndex((elem) => elem.pvCenter.centerId === centerId) + 1;

  const user1 = list.length >= 1 ? list[0] : null;
  const user2 = list.length >= 2 ? list[1] : null;
  const user3 = list.length >= 3 ? list[2] : null;

  return (
    <div className="main-classement">
      <div className="classement-header">
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
              {" "}
              <i className="   fas fa-cogs"></i> {score.score2}{" "}
              {t(`pvgame.parcour.point`)}
            </div>
            <div className="sg-menu-item-btn-config-sp">
              {" "}
              <i className=" fas fa-chart-line"></i> {score.score3}{" "}
              {t(`pvgame.parcour.point`)}
            </div>
          </div>
        </div>
        <div className="parc-btnQ" onClick={() => history.push("/pv-game")}>
          {t(`pvgame.parcour.quitter`)}
          <img src={runningSolid} style={{ marginLeft: "5px" }} />
        </div>
      </div>
      <div className="classement-content">
        <div className="classement-content-block">
          <div className="heder">
            <h3>{t(`pvgame.classement.title`)}</h3>
            <h5>
              {" "}
              {t(`pvgame.classement.subTitle`)} {CLASSEMENT}
              {CLASSEMENT === 1
                ? t(`pvgame.classement.first`)
                : t(`pvgame.classement.second`)}
            </h5>
          </div>
          <DetailsClassment
            t={t}
            scoreGlobal={scoreGlobal}
            user1={user1}
            user2={user2}
            user3={user3}
          />
          <ListClass t={t} scoreGlobal={scoreGlobal} />
        </div>
      </div>
    </div>
  );
}

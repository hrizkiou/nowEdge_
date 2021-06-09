import React, { useEffect, useState } from "react";

import img1 from "../../../assets/images/StrategicGame/checklist (1).svg";
import img2 from "../../../assets/images/StrategicGame/hammer.svg";
import img3 from "../../../assets/images/StrategicGame/warning-inActive.svg";
import img4 from "../../../assets/images/StrategicGame/Groupe 4467.svg";
import img5 from "../../../assets/images/StrategicGame/Logo-OMS.svg";
import { useHistory } from "react-router-dom";
import { avatars, countries, getLogoById } from "../../../helpers/centerData";
import { useDispatch, useSelector } from "react-redux";
import badg44 from "../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../assets/images/StrategicGame/MaskGroup14.svg";
import runningSolid from "../../../assets/images/StrategicGame/running-solid.svg";
import { httpClient_get } from "../../../helpers/api";
import { useTranslation } from "react-i18next";
import { getscore } from "../../../redux/actions";

export default function Badges() {
  const [Badges, setBadges] = useState([]);
  const center = useSelector((state) => state.PvGame.center);
  const { centerId } = useSelector((state) => state.PvGame.center);
  const score = useSelector((state) => state.PvGame.score);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!score) dispatch(getscore(centerId));

    httpClient_get(`/participant/pvgame/getbadgesstatus?centerId=${centerId}`)
      .then((data) => {
        //console.log("|--------->>>>>", data);
        setBadges(data.data);
      })
      .catch((error) => {});
  }, []);

  const history = useHistory();
  return (
    <div className="main-badge">
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
            <span className="sg-menu-item-title">{center.name}</span>
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
      <div className="par-row2">
        <h4 className="badge-title">{t(`pvgame.badges.title`)}</h4>
        <p
          className="badge-parg"
          style={{
            margin: "0px 27%",
          }}
        >
          {t(`pvgame.badges.desc`)}
        </p>
      </div>

      <div className="bdg-row1">
        <div>
          <div className="badge-block">
            <img
              src={img1}
              style={{
                filter:
                  Badges.find((b) => b.badgeId === 1)?.status === 1
                    ? "none"
                    : "grayscale(100%)",
              }}
            />
          </div>

          <h3> {t(`pvgame.badges.notif`)}</h3>
          <p>{t(`pvgame.badges.notifDesc`)}</p>
        </div>

        {/* <div>
          <div className="badge-block">
            <img src={img2} />
          </div>

          <h3>Structure</h3>
          <p>
            Ce badge indique que votre centre répond aux 5 premiers indicateurs
            structurels de l’OMS
          </p>
        </div> */}

        {/* <div>
          <div className="badge-block">
            <img src={img3} />
          </div>

          <h3>Gestion de crise</h3>
          <p>
            Ce badge indique que vous avez bien su gérer les crises qui se sont
            imposées à vous et que vous avez limité les dégâts au mieux
          </p>
        </div> */}

        <div>
          <div className="badge-block">
            <img
              src={img4}
              style={{
                filter:
                  Badges.find((b) => b.badgeId === 2)?.status === 1
                    ? "none"
                    : "grayscale(100%)",
              }}
            />
          </div>

          <h3> {t(`pvgame.badges.imputab`)}</h3>
          <p>{t(`pvgame.badges.imputabDesc`)}</p>
        </div>

        <div className="m-0">
          <div className="badge-block">
            <img
              src={img5}
              style={{
                filter:
                  Badges.find((b) => b.badgeId === 3)?.status === 1
                    ? "none"
                    : "grayscale(100%)",
              }}
            />
          </div>

          <h3>{t(`pvgame.badges.oms`)}</h3>
          <p>{t(`pvgame.badges.omsDesc`)}</p>
        </div>
      </div>
    </div>
  );
}

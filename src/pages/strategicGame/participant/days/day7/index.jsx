import React, { useEffect, useState } from "react";
import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import Modal1 from "../../../../../components/modal/modal1/index";
import AnalyseCas from "../../../../../components/modal/AnalyseCas/index";

import "./style.scss";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal2 from "../../../../../components/modal/modal2";
import PharmacienneModal from "../../../../../components/modal/pharmacienne";
import Modalexpert from "../../../../../components/modal/modalexpert";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../../helpers/centerData";
import {
  day7getDetail,
  day7Validations,
} from "../../../../../redux/days/actions";
import { useTranslation } from "react-i18next";

const Cas = ({ index, cas, _idLevel, t }) => {
  const [showM1, setShowM1] = useState(false);
  return (
    <>
      {showM1 && (
        <AnalyseCas
          show={showM1}
          cas={cas}
          index={index}
          _idLevel={_idLevel}
          close={() => setShowM1(false)}
          t={t}
        />
      )}
      <div
        onClick={() => {
           if (cas.isValid !== 2)
           setShowM1(true);
        }}
        className={`cas ${
          cas.isValid === 1
            ? "text-valid  border-valid"
            : cas.isValid === 0
            ? "text-not-valid border-not-valid"
            : cas.isValid === 2
            ? "cas-answered-container"
            : ""
        }`}
      >
        <span
          className={`title ${
            cas.isValid === 1
              ? "text-valid  "
              : cas.isValid === 0
              ? "text-not-valid"
              : cas.isValid === 2
              ? "cas-answered-text"
              : ""
          }`}
        >
          {t("pvgame.day7.notification")} {index}
        </span>
        {cas.isValid !== -1 && (
          <span className={`icon-ssr-Ver8`}>
            <i
              // className={`fas fa-question ${
              //   res === 1
              //     ? 'text-valid  border-valid-i'
              //     : res === 0
              //     ? 'text-not-valid border-not-valid-i'
              //     : ''
              // }`

              className={
                cas.isValid === 1
                  ? "fas fa-check text-valid"
                  : cas.isValid === 0
                  ? "fas fa-times text-not-valid"
                  : " "
              }
            ></i>
          </span>
        )}
      </div>
    </>
  );
};

const Accordion = ({ level, title, t }) => {
  return (
    <div className={`accordion`}>
      <div
        className={`accordion-header ${
          level.isValid === 1
            ? "accordion-valid"
            : level.isValid === 0
            ? "accordion-not-valid"
            : "accordion-0"
        }`}
      >
        <h3>{title}</h3>
        <span>
          <i
            className={
              level.isValid === 1
                ? " fas fa-check"
                : level.isValid === 0
                ? "fas fa-times"
                : level.isValid === -1
                ? "fas fa-lock"
                : ""
            }
          ></i>
        </span>
      </div>
      <div className="accordion-body">
        {level.isValid !== -1 &&
          level?.cas?.map((c, index) => (
            <Cas index={index + 1} cas={c} _idLevel={level._id} t={t} />
          ))}
      </div>
    </div>
  );
};

const Day7 = (props) => {
  const [showM, setShowM] = useState(true);
  const [showF, setShowF] = useState(false);
  const [showTermin, setshowTermin] = useState(false);
  const [modeEdit, setModeEdit] = useState(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [textBtnValid] = useState(t("pvgame.validLevel"));

  const levels = useSelector((state) => state.Days.day7.levels);
  const day7 = useSelector((state) => state.Days.day7);
  const center = useSelector((state) => state.PvGame.center);

  const history = useHistory();

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 7);
    if (currentDay.status === -1) {
      history.push("/pv-game/parcours");
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(day7getDetail(center.centerId));
    }
  }, []);
  const [
    { isValid: isValid1 },
    { isValid: isValid2 },
    { isValid: isValid3 },
  ] = levels;

  const accordionNames = [
    t("pvgame.day7.novice"),
    t("pvgame.day7.intermediaire"),
    t("pvgame.day7.expert"),
  ];

  const validDay7 = () => {
    if (modeEdit) {
      //console.log("day7", day7);
      setShowF(true);
    } else {
      history.push("/pv-game");
    }
  };

  return (
    <div className="container-day">
      <Modalexpert
        show={showTermin}
        history={props.history}
        close={() => null}
        text={
          day7.currentLevel === 1
            ? t("pvgame.day7.noviceDoneMsg")
            : day7.currentLevel === 2
            ? t("pvgame.day7.intermediaireDoneMsg")
            : t("pvgame.day7.expertDoneMsg")
        }
      />

      <PharmacienneModal
        show={showM}
        close={() => setShowM(false)}
        message={t("modals.day7.startModal.body")}
        btnText={t("modals.day7.startModal.btnText")}
      />

      <Modal2
        show={showF}
        title={t("modals.day7.confirmationModal.title")}
        text={t("modals.day7.confirmationModal.body")}
        btnText={t("modals.yes")}
        btnDefText={t("modals.notyet")}
        valid={() => {
          dispatch(
            day7Validations(center.centerId, day7, () => {
              setshowTermin(true);
            })
          );
        }}
        reset={() => setShowF(false)}
        showTowBtn={true}
      />

      <div className="box box-2">
        <div className="box-2-1">
          <div className="d-flex justify-content-center align-content-center align-items-center ">
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
          {/* <div className="cat-ad" onClick={() => null}>
            <i className=" fas fa-book-open mr-1"></i>
            Catalogue des décisions
          </div> */}
          <button
            type="reset"
            onClick={() => {
              history.push("/pv-game/parcours");
            }}
            className="btn btn-secondary waves-effect waves-light mb-4"
          >
            {t("pvgame.parcour.quitter")}

            <i className="fas fa-running ml-1"></i>
          </button>
        </div>
        <div className="box-2-2 pt-0 pb-0">
          <h3>{t("pvgame.day7.title")} </h3>
          <p>{t("pvgame.day7.subTitle1")} </p>
          <p>{t("pvgame.day7.subTitle2")} </p>
        </div>
        <div className="box-2-3">
          {levels.map((level, index) => (
            <Accordion title={accordionNames[index]} level={level} t={t} />
          ))}
        </div>
        <div
          className="box-2-1"
          style={{
            paddingTop: 20,
            justifyContent: "flex-end",
          }}
        >
          {modeEdit && (
            <>
              {(isValid1 === 0 || isValid1 === 1) &&
                (isValid2 === 0 || isValid2 === 1) &&
                (isValid3 === 0 || isValid3 === 1) && (
                  <button
                    onClick={validDay7}
                    className="btn btn-primary waves-effect waves-light mb-4"
                    type="submit"
                  >
                    {textBtnValid}
                    <i className="fas fa-arrow-right ml-1"></i>
                  </button>
                )}
              {(isValid1 === 0 || isValid2 === 0 ) && (
                <button
                  onClick={validDay7}
                  className="btn btn-primary waves-effect waves-light mb-4"
                  type="submit"
                >
                  {textBtnValid}
                  <i className="fas fa-arrow-right ml-1"></i>
                </button>
              )}{" "}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day7;

import React, { useEffect, useState } from "react";
import Modal1 from "../../../components/modal/modal1";
import Modal1Msg from "../../../components/modal/modal1Msg";
import Modal1Msg2 from "../../../components/modal/modal1Msg2";
import Modal1Msg3 from "../../../components/modal/modal1Msg3";
import img from "../../../assets/images/StrategicGame/group_5172.png";
import { useHistory } from "react-router-dom";
import Modal2 from "../../../components/modal/modal2";
import meds from "../../../assets/images/StrategicGame/mask_group_12-33.png";
import Modalexpert from "../../../components/modal/modalexpert";
import { useDispatch, useSelector } from "react-redux";
import { Day6getDetail, validDay6 } from "../../../redux/actions";
import PreLoaderWidget from "../../../components/Loader";
import { useTranslation } from "react-i18next";
export default function Rapport() {
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showF, setShowF] = useState(false);
  const [showInit, setShowInit] = useState(true);
  const [modeEdit, setModeEdit] = useState(true);
  const history = useHistory();
  const [showTermin, setShowTermin] = useState(false);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { Day6, loading } = useSelector((state) => state.Days);
  const { center } = useSelector((state) => state.PvGame);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 6);

    if (currentDay.status === -1) {
      history.push("/pv-game/parcours");
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(Day6getDetail(center.centerId));
    }
  }, []);

  return (
    <>
      {loading && <PreLoaderWidget />}
      <Modalexpert show={showTermin} history={history} text={t("modals.day6.expert.text")} close={() => null} />
      {showModal2 && (
        <Modal1Msg
          modeEdit={modeEdit}
          show={showModal2}
          close={() => setShowModal1(false)}
          onHide={() => setShowModal2(false)}
          t={t}
        />
      )}
      {showModal1 && (
        <Modal1Msg2
          modeEdit={modeEdit}
          show={showModal1}
          close={() => setShowModal2(false)}
          onHide={() => setShowModal1(false)}
          t={t}
        />
      )}
      {showModal3 && (
        <Modal1Msg3
          modeEdit={modeEdit}
          show={showModal3}
          close={() => setShowModal3(false)}
          onHide={() => setShowModal3(false)}
          t={t}
        />
      )}

      <Modal2
        show={showF}
        title={t("modals.day6.confirmationModal.title")}
        text={t("modals.day6.confirmationModal.text")}
        btnText={t("modals.yes")}
        btnDefText={t("modals.notyet")}
        valid={() => {
          dispatch(
            validDay6(center.centerId, Day6, () => {
              setShowF(false);
              setShowTermin(true);
            })
          );
        }}
        reset={() => setShowF(false)}
        showTowBtn={true}
      />

      <Modal2
        show={showInit}
        title={t("modals.day6.startModal.title")}
        text={t("modals.day6.startModal.text")}
        btnText={t("modals.notee")}
        valid={() => setShowInit(false)}
        showTowBtn={false}
      />
      <div className="main-rapport">
        <div className="rapport_day_7_msg">
          <img src={meds} />
          <div className="rapport_day_7_text">
            <span>{t("pvgame.day6.title")} </span>
            <p>{t("pvgame.day6.subTitle")}</p>
          </div>
        </div>
        <div className="rap-img">
          <div
            style={{
              position: "absolute",
              top: "2rem",
              right: 0,
            }}
          >
            <button
              onClick={() => {
                history.push("/pv-game/parcours");
              }}
              type="reset"
              className="btn btn-secondary waves-effect waves-light"
            >
              {t("pvgame.parcour.quitter")}
              <i className="ml-2 fas fa-running"></i>
            </button>
          </div>

          <img src={img} alt="background" />
          <div className="rap-msag-label-1" onClick={() => setShowModal1(true)}>
            1/6
          </div>
          <div className="rap-msag-label-2" onClick={() => setShowModal2(true)}>
            1/7
          </div>
          <div
            className="rap-msag-label-3"
            onClick={() => {
              setShowModal3(true);
            }}
          >
            1/7
          </div>
        </div>

        <div
          className="footer-rapport"
          style={{
            justifyContent: "flex-end",
          }}
        >
          <div>
            {modeEdit && (
              <button
                className="btn btn-primary waves-effect waves-light mr-1"
                type="submit"
                onClick={() => {
                  if (modeEdit) {
                    setShowF(true);
                  } else {
                    history.push("/pv-game");
                  }
                }}
              >
                {t("pvgame.validChoice")}
                <i className="ml-2 fas fa-arrow-right"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

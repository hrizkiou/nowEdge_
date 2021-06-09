import React, { useEffect, useState } from "react";
import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import Modal from "../../../../../components/modal/index";
import Modal2 from "../../../../../components/modal/modal2";
import Modal4 from "../../../../../components/modal/modal4";
import CentreNationalPV from "../../../../../components/modal/CentreNationalPV";
import NotificationMixte from "../../../../../components/modal/NotificationMixte";
import NotificationDirecte from "../../../../../components/modal/NotificationDirecte";
import "./style.scss";
import { useHistory } from "react-router-dom";
import PharmacienneModal from "../../../../../components/modal/pharmacienne";
import Modalexpert from "../../../../../components/modal/modalexpert";
import { useDispatch, useSelector } from "react-redux";
import {
  day5getDetail,
  onChangeCatDay5,
  validDay5,
} from "../../../../../redux/actions";

import PreLoaderWidget from "../../../../../components/Loader";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../../helpers/centerData";
import { useTranslation } from "react-i18next";
const Item = ({ icon, text, click = false, setClick, index }) => {
  return (
    <div
      onClick={() => {
        setClick(index);
      }}
      className={`item-notif ${click ? "item-notif-active" : ""}`}
    >
      <span>
        <i className={icon}></i>
      </span>
      <h3>{text}</h3>
    </div>
  );
};

const ListChois = ({ onChange = () => null, modeEdit, t }) => {
  const { selectedCategory } = useSelector((state) => state.Days.day5);
  const [selectedIndex, setSelectedIndex] = useState(selectedCategory);

  useEffect(() => {
    setSelectedIndex(selectedCategory);
  }, [selectedCategory]);

  const onChange_ = (index) => {
    setSelectedIndex(index);
    onChange(index);
  };

  return (
    <div className="d-flex flex-column">
      <div className="content-notif">
        <Item
          icon={" fas fa-sitemap"}
          text={t("pvgame.day5.notifHierar")}
          index={0}
          click={selectedIndex === 0}
          setClick={modeEdit ? onChange_ : () => {}}
        />
        <Item
          icon={" fas fa-random"}
          text={t("pvgame.day5.notifDirect")}
          index={1}
          click={selectedIndex === 1}
          setClick={modeEdit ? onChange_ : () => {}}
        />
        <Item
          icon={" fas fa-compress-arrows-alt"}
          text={t("pvgame.day5.notifMixte")}
          index={2}
          click={selectedIndex === 2}
          setClick={modeEdit ? onChange_ : () => {}}
        />
      </div>
    </div>
  );
};

const Day5 = (props) => {
  const [showM, setShowM] = useState(true);
  const [showM1, setShowM1] = useState(false);
  const [showM2, setShowM2] = useState(false);
  const [showM3, setShowM3] = useState(false);
  const [showM4, setShowM4] = useState(false);
  const [modalexpert, setModalexpert] = useState(false);

  const [modeEdit, setModeEdit] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const { t } = useTranslation();
  const { selectedCategory } = useSelector((state) => state.Days.day5);
  const day5 = useSelector((state) => state.Days.day5);
  const { center } = useSelector((state) => state.PvGame);
  const { loading } = useSelector((state) => state.Days);
  const [showBolck, setShowBolck] = useState(true);
  const [selecteIndex, setSelecteIndex] = useState(selectedCategory);
  const [textBtnValid, setTextBtnValid] = useState(t("pvgame.day4.nextStep"));
  const [stp_, setStp] = useState(1);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 5);
    if (currentDay.status === -1) {
      history.push("/pv-game/parcours")
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(day5getDetail(center.centerId));
    }
  }, []);

  useEffect(() => {
    //console.log("selectedCategory", selectedCategory);
    setSelecteIndex(selectedCategory);
  }, [selectedCategory]);
  const steps = () => {
    //console.log(stp_);
    switch (selecteIndex) {
      case 0: // Hiérarchisée
        setShowM1(true);
        break;
      case 1: // Directe
        setShowM3(true);

        break;
      case 2: // Mixte
        setShowM2(true);
        break;
      case 4:
        setShowM3(false);
        setShowM4(true);
        setStp(5);
        break;
      case 5:
        setShowM4(false);
        setStp(6);
        break;
      default:
        break;
    }
  };

  const onSelectTypeNotif = (index) => {
    setSelecteIndex(index);
    dispatch(onChangeCatDay5(index));
  };

  return (
    <div className="container-day-5">
      {loading && <PreLoaderWidget />}
      <Modalexpert show={modalexpert} history={props.history} text={t("modals.day5.expert.text")} />
      <PharmacienneModal
        show={showM}
        close={() => setShowM(false)}
        message={t("modals.day5.startModal.text")}
        btnText={t("modals.notee")}
      />
      <CentreNationalPV
        modeEdit={modeEdit}
        history={props.history}
        show={showM1}
        valid={() => {
          //dispatch save day
          dispatch(validDay5(center.centerId, day5, () => {}));
          setModalexpert(true);
        }}
        close={() => {
          setShowM1(false);
        }}
      />

      <NotificationMixte
        modeEdit={modeEdit}
        history={props.history}
        show={showM2}
        valid={() => {
          //dispatch save day

          dispatch(validDay5(center.centerId, day5, () => {}));
          setModalexpert(true);
        }}
        close={() => {
          setShowM2(false);
        }}
      />
      <NotificationDirecte
        modeEdit={modeEdit}
        history={props.history}
        show={showM3}
        valid={() => {
          //dispatch save day
          dispatch(validDay5(center.centerId, day5, () => {}));
          setModalexpert(true);
        }}
        close={() => {
          setShowM3(false);
        }}
      />

      <Modal4
        show={showM4}
        valid={steps}
        reset={steps}
        title={t("modals.day5.finalModal.title")}
        text={t("modals.day5.finalModal.text")}
        btnText={t("modals.notee")}
      />
      {showBolck && (
        <div className="box box-1">
          <div className="pup">
            <h3>{t("pvgame.day2.title")}</h3>
            <p>{t("pvgame.day5.subTitle")}</p>
          </div>
        </div>
      )}
      <div className="box box-2">
        <div className="box-2-1_5">
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
            style={{
              marginTop: "2rem",
            }}
            onClick={() => {
              history.push("/pv-game/parcours");
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mb-4"
          >
            {t("pvgame.parcour.quitter")}
            <i className="fas fa-running ml-1"></i>
          </button>
        </div>
        <div className="box-2-2_5 pt-0 pb-0">
          <h3>{t("pvgame.day5.niveau")} </h3>
          <p>{t("pvgame.day5.niveauTitle")}</p>
        </div>
        <div className="box-2-3_5">
          <ListChois onChange={onSelectTypeNotif} modeEdit={modeEdit} t={t} />
        </div>
        <div className="box-2-1_5" style={{ justifyContent: "flex-end" }}>
          {/* <button
            type="reset"
            className="btn btn-secondary waves-effect waves-light mb-4">
            Quitter
            <i className="fas fa-running ml-1"></i>
          </button> */}

          <button
            onClick={steps}
            className="btn btn-primary waves-effect waves-light mr-1 mb-4"
            type="submit"
          >
            {textBtnValid}
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day5;

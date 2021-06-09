import React, { useEffect, useState } from "react";
import "./style.scss";
import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import { Button, Container, Dropdown, FormControl } from "react-bootstrap";
import Modal from "../../../../../components/modal/index";
import { tr } from "date-fns/locale";
import Modal3 from "../../../../../components/modal/modal3";
import Modal4 from "../../../../../components/modal/modal4";
import Modal1 from "../../../../../components/modal/modal1";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  day4getDetail,
  day4Part1ChangeIsSelected,
  day4Part2UpdateDecisions,
  validDay4,
} from "../../../../../redux/days/actions";
import PreLoaderWidget from "../../../../../components/Loader";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../../helpers/centerData";

const CheckBox = ({ text, index, decision, dispatch, modeEdit }) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id={`autoSizingCheck${index}`}
        checked={decision.isSelected}
        disabled={!modeEdit}
        onChange={() => {
          dispatch(day4Part1ChangeIsSelected(decision));
        }}
      />
      <label
        className="custom-control-label"
        htmlFor={`autoSizingCheck${index}`}
      >
        {text}
      </label>
    </div>
  );
};

const ListChois = ({ t, modeEdit }) => {
  const { decisions } = useSelector((state) => state.Days.day4.part1);
  const dispatch = useDispatch();

  return (
    <div className="content-notif-moy">
      <div className="content-notif-moy-nt">
        <i className="fas fa-capsules"></i>
        <div className="text-notf">
          <h3 className="p-0 m-0">{t(`pvgame.day4.part1.title`)}</h3>
          <h4 className="p-0 m-0">{t(`pvgame.day4.part1.subTitle`)}</h4>
        </div>
      </div>
      <div className="list-chois">
        <CheckBox
          index={1}
          text={t(`pvgame.day4.part1.151`)}
          decision={decisions.find((d) => d.id === 151)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
        <CheckBox
          index={2}
          text={t(`pvgame.day4.part1.148`)}
          decision={decisions.find((d) => d.id === 148)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
        <CheckBox
          index={3}
          text={t(`pvgame.day4.part1.149`)}
          decision={decisions.find((d) => d.id === 149)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
        <CheckBox
          index={4}
          text={t(`pvgame.day4.part1.150`)}
          decision={decisions.find((d) => d.id === 150)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
        <CheckBox
          index={5}
          text={t(`pvgame.day4.part1.147`)}
          decision={decisions.find((d) => d.id === 147)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
        <CheckBox
          index={6}
          text={t(`pvgame.day4.part1.152`)}
          decision={decisions.find((d) => d.id === 152)}
          dispatch={dispatch}
          modeEdit={modeEdit}
        />
      </div>
    </div>
  );
};

const RowDrag = ({ List, onDragStart, onDrop, ValidTask, t }) => {
  const onDragOver = (ev) => {
    ev.preventDefault();
  };
  return (
    <div className="row-items">
      {List.map((item, index) => {
        if (item.category === "non")
          return (
            <div
              key={index}
              className={[
                "items-box",
                ValidTask && item.category_v !== "non" ? "valid" : "",
              ].join(" ")}
              draggable={!ValidTask}
              onDragOver={(ev) => onDragOver(ev)}
              onDragStart={(e) => {
                onDragStart(e, item.id);
              }}
            >
              {t(`pvgame.day4.part2.${item.id}`)}
            </div>
          );
      })}
    </div>
  );
};

const RowDragSelected = ({
  list = [],
  title,
  type,
  onDrop,
  onDragStart,
  ValidTask,
  t,
}) => {
  const [ls, setLs] = useState([{}, {}, {}]);

  useEffect(() => {
    let ls_ = [{}, {}, {}];

    list.map((item, index) => {
      if (item.category === type) {
        ls_[item.blocIndex] = { ...item, isValid: ls.category_v === type };
      }
      //  item.category === type;
    });

    setLs(ls_);
  }, [list]);

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="row-items">
      <div className="item-title">{title}</div>
      <div className="item-content">
        <div
          className={[
            "items-box ",
            ValidTask
              ? ls.length > 0 && ls[0].category_v === type
                ? "valid"
                : "not-valid"
              : "",
          ].join(" ")}
          draggable={!ValidTask}
          onDragStart={(e) => {
            if (ls.length > 0 && ls[0]) onDragStart(e, ls[0].id);
          }}
          onDragOver={(ev) => onDragOver(ev)}
          onDrop={(e) => onDrop(e, type, 0)}
        >
          {ls.length > 0 && ls[0].id && t(`pvgame.day4.part2.${ls[0].id}`)}
        </div>
        <div
          className={[
            "items-box ",
            ValidTask
              ? ls.length > 0 && ls[1].category_v === type
                ? "valid"
                : "not-valid"
              : "",
          ].join(" ")}
          draggable={!ValidTask}
          onDragStart={(e) => {
            if (ls.length > 0 && ls[1]) onDragStart(e, ls[1].id);
          }}
          onDragOver={(ev) => onDragOver(ev)}
          onDrop={(e) => onDrop(e, type, 1)}
        >
          {ls.length > 0 && ls[1].id && t(`pvgame.day4.part2.${ls[1].id}`)}
        </div>
        <div
          className={[
            "items-box ",
            ValidTask
              ? ls.length > 0 && ls[2].category_v === type
                ? "valid"
                : "not-valid"
              : "",
          ].join(" ")}
          draggable={!ValidTask}
          onDragStart={(e) => {
            if (ls.length > 0 && ls[2]) onDragStart(e, ls[2].id);
          }}
          onDragOver={(ev) => onDragOver(ev)}
          onDrop={(e) => onDrop(e, type, 2)}
        >
          {ls.length > 0 && ls[2].id && t(`pvgame.day4.part2.${ls[2].id}`)}
        </div>
      </div>
    </div>
  );
};

const ListDrag = ({ ValidTask, t }) => {
  const [List, setList] = useState([]);
  const decisions = useSelector((state) => state.Days.day4.part2.decisions);
  const dispatch = useDispatch();

  useEffect(() => {
    const d = decisions.sort(() => Math.random() - 0.5);
    setList(...[d]);
  }, []);
  const onDrop = (ev, cat, blocIndex) => {
    let id = ev.dataTransfer.getData("id");

    //console.log("----onDragStart----", cat, blocIndex);

    if (cat !== "non") {
      const found = List.find(
        (element) => element.blocIndex === blocIndex && element.category === cat
      );
      if (found) return;
    }

    let tasks = List.filter((elem) => {
      if (elem.id == id) {
        elem.category = cat;
        elem.blocIndex = blocIndex;
      }
      return elem;
    });
    dispatch(day4Part2UpdateDecisions(tasks));
    //dispatch edit redux List
    setList(tasks);
  };

  const onDragStart = (ev, id) => {
    //console.log("----onDragStart----", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="box-2-3-4_ew">
      <div
        className="drag-block-1"
        onDrop={(e) => onDrop(e, "non", 0)}
        onDragOver={(ev) => onDragOver(ev)}
      >
        <RowDrag
          List={List}
          t={t}
          onDragStart={onDragStart}
          onDrop={onDrop}
          ValidTask={ValidTask}
        />
      </div>
      <div className="drag-block-2">
        <RowDragSelected
          ValidTask={ValidTask}
          title={t(`pvgame.day4.part2.patient`)}
          list={List}
          type="pat"
          onDrop={onDrop}
          onDragStart={onDragStart}
          t={t}
        />
        <RowDragSelected
          ValidTask={ValidTask}
          title={t(`pvgame.day4.part2.Eventinde`)}
          type="evi"
          list={List}
          onDrop={onDrop}
          onDragStart={onDragStart}
          t={t}
        />
        <RowDragSelected
          ValidTask={ValidTask}
          title={t(`pvgame.day4.part2.Produitsanté`)}
          type="prods"
          list={List}
          onDrop={onDrop}
          onDragStart={onDragStart}
          t={t}
        />
        <RowDragSelected
          ValidTask={ValidTask}
          title={t(`pvgame.day4.part2.Notificateur`)}
          type="notif"
          list={List}
          onDrop={onDrop}
          onDragStart={onDragStart}
          t={t}
        />
      </div>
    </div>
  );
};

const Day4 = (props) => {
  const { history } = props;
  const [showM, setShowM] = useState(true);
  const [showM1, setShowM1] = useState(false);
  const [showM2, setShowM2] = useState(false);
  const [showM3, setShowM3] = useState(false);
  const [modeEdit, setModeEdit] = useState(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { day4, loading } = useSelector((state) => state.Days);
  const { center } = useSelector((state) => state.PvGame);
  const [showBolck, setShowBolck] = useState(true);
  const [showQBtn, setShowQBtn] = useState(false);
  const [textBtnValid, setTextBtnValid] = useState(t("pvgame.day4.nextStep"));
  const [stp_, setStp] = useState(1);
  const [ValidTask, setValidTask] = useState(false);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 4);

    if (currentDay.status === -1) {
      history.push("/pv-game/parcours");
    }

    if (currentDay.status === 1) {
      setModeEdit(false);
      setValidTask(true);
      dispatch(day4getDetail(center.centerId));
    }
  }, []);

  const steps = () => {
    switch (stp_) {
      case 1:
        setShowM1(true);
        setShowBolck(false);
        setTextBtnValid(t("pvgame.validLevel"));
        setShowQBtn(true);
        setStp(2);

        break;
      case 2:
        setShowBolck(false);
        setTextBtnValid(t("modals.finished"));
        setShowQBtn(false);
        setStp(3);
        setShowM2(true);

        if (!modeEdit) props.history.push("/pv-game");

        // setValidTask(true)
        break;
      case 3:
        setShowM3(true);
        setTextBtnValid(t("modals.finished"));
        setStp(4);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container-day-4">
      {loading && <PreLoaderWidget />}
      <Modal3 show={showM} close={() => setShowM(false)} />
      <Modal4
        show={showM1}
        reset={() => {
          setShowM1(false);
        }}
        valid={() => setShowM1(false)}
        title={t("modals.day4.startModal.title2")}
        text={t("modals.day4.startPart2.text")}
        btnText={t("modals.notee")}
      />
      <Modal4
        show={showM2}
        reset={() => {
          setShowM2(false);
          setStp(2);
          setTextBtnValid(t("pvgame.validChoice"));
        }}
        valid={() => {
          setShowM2(false);
          dispatch(
            validDay4(center.centerId, day4, () => {
              setValidTask(true);
            })
          );
        }}
        title={t("modals.day4.confirmationModal.title")}
        text={t("modals.day4.confirmationModal.text")}
        btnText={t("modals.yes")}
        btnDefText={t("modals.notyet")}
        showTowBtn
      />
      <Modal1
        show={showM3}
        close={() => {
          setShowM3(false);
          props.history.push("/pv-game");
        }}
        text={t("modals.day4.expert.body")}
        title={t("modals.day4.expert.title")}
        btnText={t("modals.notee")}
      />

      {showBolck && (
        <div className="box box-1">
          <div className="pup">
            <h3>{t("pvgame.day2.title")}</h3>
            <p>
              {t("pvgame.day4.part1.text")}
              <br />{" "}
            </p>
          </div>
        </div>
      )}
      <div className="box box-2">
        <div className="box-2-1_ew pt-2">
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

          <button
            style={{
              marginTop: "2rem",
            }}
            onClick={() => {
              props.history.push("/pv-game/parcours");
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mb-4"
          >
            {t("pvgame.parcour.quitter")}
            <i className="fas fa-running ml-1"></i>
          </button>
        </div>
        <div className="box-2-2_ew pt-0 pb-0">
          <h3> {t("pvgame.day4.niveau")}</h3>
          <p>
            {stp_ === 1
              ? t("pvgame.day4.part1.niveauTitle")
              : t("pvgame.day4.part2.niveauTitle")}
          </p>
        </div>
        <div className="box-2-3">
          {showBolck ? (
            <ListChois t={t} modeEdit={modeEdit} />
          ) : (
            <ListDrag ValidTask={ValidTask} t={t} modeEdit={modeEdit} />
          )}
        </div>
        <div
          className="box-2-1_ew waves-effect_ew"
          style={{ justifyContent: "flex-end" }}
        >
          {modeEdit && (
            <button
              onClick={steps}
              className="btn btn-primary waves-effect_ew waves-light"
              type="submit"
            >
              {textBtnValid}
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          )} 
          
          {!modeEdit && stp_ === 1 && (
            <button
              onClick={steps}
              className="btn btn-primary waves-effect_ew waves-light"
              type="submit"
            >
              {textBtnValid}
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day4;

import React, { useEffect, useState } from "react";
import Modal1 from "../../../../../components/modal/modal1/index";
import Modal2 from "../../../../../components/modal/modal2/index";

import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import MaskGroup145 from "../../../../../assets/images/StrategicGame/ascending_arrow.png";

import "./style.scss";
import { map } from "lodash";
import { useHistory } from "react-router-dom";
import Modalexpert from "../../../../../components/modal/modalexpert";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  day3getDetail,
  day3UpdateDecisions,
  day3Validations,
} from "../../../../../redux/days/actions";
import SwalModal from "../../../../../components/SwalModal";
import PreLoaderWidget from "../../../../../components/Loader";
import ModalMinisterValidation from "../../../../../components/modal/modalMinisterValidation";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../../helpers/centerData";
import { getDetailsService } from "../../../../../redux/days/service";

const Drag = ({
  listP,
  item,
  modeEdit,
  onDrop = () => null,
  onDragOver = () => null,
  t,
}) => {
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setData("id", id);
  };
  return (
    <div
      className="drag-block"
      onDrop={(ev, cat) => onDrop(ev, cat, item.id)}
      onDragOver={onDragOver}
    >
      <h3 className="title m-0"> {t(`pvgame.day3.${item.id}`)} </h3>
      <div className="body mt-1">
        {listP.map((elem, index) => {
          if (elem.category === item.id) {
            return (
              <div
                key={index}
                className="item"
                draggable={modeEdit}
                onDragStart={(e) => onDragStart(e, elem.id)}
              >
                <p title={t(`pvgame.day3.${elem.id}`)}>
                  {t(`pvgame.day3.${elem.id}`)}
                </p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

function Day3(props) {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const { decisions, categories } = useSelector((state) => state.Days.day3);
  const { loading } = useSelector((state) => state.Days);
  const { center } = useSelector((state) => state.PvGame);
  const history = useHistory();
  const [showTermin, setShowTermin] = useState(false);

  const [modeEdit, setModeEdit] = useState(true);
  const { t } = useTranslation();
  const [tasks, setTasks] = useState(categories);

  const dispatch = useDispatch();
  const [listP, setListP] = useState(decisions);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 3);
    if (currentDay.status === -1) {
      history.push("/pv-game/parcours");
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(day3getDetail(center.centerId));
    }
  }, []);

  useEffect(() => {
    const d = decisions.sort(() => Math.random() - 0.5);
    setListP(d);
  }, []);

  const onDragStart = (ev, id) => {
    //console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  const onDragOver = (ev) => {
    ev.preventDefault();
  };

  const onDrop = (ev, cat, idBlock) => {
    //console.log("idBlock", idBlock);

    if (idBlock) {
      let id = ev.dataTransfer.getData("id");

      let tasks_ = listP.map((task) => {
        if (task.id == id) {
          task.category = idBlock;
        }
        return task;
      });
      //setListP(tasks_);
      dispatch(day3UpdateDecisions(tasks_));
    } else {
      let id = ev.dataTransfer.getData("id");

      //console.log("===id===", id);
      let tasks_ = listP.map((task) => {
        if (task.id == id) {
          task.category = "block";
        }
        return task;
      });

      dispatch(day3UpdateDecisions(tasks_));
    }
  };

  return (
    <div className="day-3-content">
      {loading && <PreLoaderWidget />}
      <ModalMinisterValidation
        text={t("modals.day3.confirmationModal.body")}
        title={t("modals.day3.confirmationModal.title")}
        show={show2}
        btnText={t("pvgame.validChoice")}
        cancelBtnText={t("modals.notyet")}
        close={() => {
          //console.log(listP);
          setShow2(false);
          dispatch(
            day3Validations(center.centerId, listP, () => {
              setShowTermin(true);
            })
          );
        }}
        cancel={() => setShow2(false)}
      />

      <Modal1
        show={show}
        title={t("modals.day3.startModal.title")}
        text={t("modals.day3.startModal.body")}
        btnText={t("modals.day3.startModal.btnText")}
        close={() => setShow(false)}
      />

      <Modalexpert
        show={showTermin}
        history={history}
        close={() => null}
        text={t("modals.day3.expert.body")}
      />
      <div className="box-2-1_dy_3 ">
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
            marginTop: "1rem",
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
      <div className="box-2-2">
        <h3 className="mb-0"> {t("pvgame.day3.niveau")} </h3>
        <p>{t("pvgame.day3.niveauTitle")}</p>
      </div>
      <div className="box-2-3 ">
        <div className="block-1_day3">
          <div
            className="list-dr"
            onDrop={(ev) => onDrop(ev)}
            onDragOver={onDragOver}
          >
            {listP.map((item, index) => {
              if (item.category === "block") {
                return (
                  <div
                    key={index}
                    draggable={modeEdit}
                    onDragStart={(e) => onDragStart(e, item.id)}
                    className="list-dr-item"
                  >
                    {t(`pvgame.day3.${item.id}`)}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="block-2">
          <div className="block-2-1">
            <img src={MaskGroup145} />
          </div>
          <div className="block-2-2">
            <div className="block-2-2row">
              {tasks.map((item, index) => {
                if (item.block === 1)
                  return (
                    <Drag
                      key={index}
                      modeEdit={modeEdit}
                      listP={listP}
                      item={item}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      t={t}
                    ></Drag>
                  );
              })}
            </div>

            <div className="block-2-2row mt-2">
              {tasks.map((item, index) => {
                if (item.block === 2)
                  return (
                    <Drag
                      key={index}
                      modeEdit={modeEdit}
                      listP={listP}
                      item={item}
                      onDrop={onDrop}
                      onDragOver={onDragOver}
                      t={t}
                    ></Drag>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="box-2-1_dy_3_f " style={{ justifyContent: "flex-end" }}>
        {modeEdit && (
          <button
            onClick={() => {
              if (modeEdit) {
                setShow2(true);
              } else {
                history.push("/pv-game");
              }
            }}
            className="btn btn-primary waves-effect waves-light mr-1 mb-4"
            type="submit"
          >
            {t("pvgame.validLevel")}
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Day3;

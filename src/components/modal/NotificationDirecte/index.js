import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import img from "../../../assets/images/StrategicGame/research-center-133.png";
import img1 from "../../../assets/images/StrategicGame/ascending-arrow-symbol-with-three-circles.png";
import "./style.scss";
import swal from "sweetalert";
import Modal2 from "../modal2";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  onChangeCategory1LeftDecisions1Day5,
  onChangeCategory1LeftDecisions2Day5,
  onChangeCategory1LeftDecisions3Day5,
  onChangeCategory1LeftDecisions4Day5,
  onChangeCategory1RightDecisions1Day5,
  onChangeCategory1RightDecisions2Day5,
  onChangeCategory1RightDecisions3Day5,
  onChangeCategory1RightDecisions4Day5,
} from "../../../redux/actions";

const ItemSelect = ({
  value,
  onChange = () => {},
  showIcon = false,
  style = {},
  modeEdit,
}) => {
  const { t } = useTranslation();

  const options = [
    {
      value: 165,
      label: t("pvgame.day5.165"),
    },
    {
      value: 166,
      label: t("pvgame.day5.166"),
    },
    { value: 167, label: t("pvgame.day5.167") },
    { value: 168, label: t("pvgame.day5.168") },
    { value: 169, label: t("pvgame.day5.169") },
    { value: 170, label: t("pvgame.day5.170") },
    { value: 171, label: t("pvgame.day5.171") },
    { value: 172, label: t("pvgame.day5.172") },
    { value: 185, label: t("pvgame.day5.185") },
    { value: 186, label: t("pvgame.day5.186") },
    { value: 187, label: t("pvgame.day5.187") },
    { value: 188, label: t("pvgame.day5.188") },
    { value: 189, label: t("pvgame.day5.189") },
    { value: 190, label: t("pvgame.day5.190") },
    { value: 191, label: t("pvgame.day5.191") },
    { value: 192, label: t("pvgame.day5.192") },
  ];

  return (
    <div className="block-select" style={style}>
      {showIcon && (
        <span className="icon m-0">
          <i className="fas fa-question m-0"></i>
        </span>
      )}
      <Select
        options={modeEdit ? options.sort(() => Math.random() - 0.5) : []}
        placeholder=""
        onChange={onChange}
        value={
          value !== null ? { value, label: t(`pvgame.day5.${value}`) } : null
        }
      />
    </div>
  );
};

const NotificationDirecte = ({
  show,
  btnText = "Primary",
  close = () => null,
  valid = () => null,
  history,
  modeEdit,
}) => {
  const [showF, setShowF] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.Days.day5.categories[1]);

  const { t } = useTranslation();

  const onChangeLeftDecision1 = (index) => {
    dispatch(onChangeCategory1LeftDecisions1Day5(index?.value));
  };
  const onChangeLeftDecision2 = (index) => {
    dispatch(onChangeCategory1LeftDecisions2Day5(index?.value));
  };
  const onChangeLeftDecision3 = (index) => {
    dispatch(onChangeCategory1LeftDecisions3Day5(index?.value));
  };
  const onChangeLeftDecision4 = (index) => {
    dispatch(onChangeCategory1LeftDecisions4Day5(index?.value));
  };

  const onChangeRightDecision1 = (index) => {
    dispatch(onChangeCategory1RightDecisions1Day5(index?.value));
  };
  const onChangeRightDecision2 = (index) => {
    dispatch(onChangeCategory1RightDecisions2Day5(index?.value));
  };
  const onChangeRightDecision3 = (index) => {
    dispatch(onChangeCategory1RightDecisions3Day5(index?.value));
  };
  const onChangeRightDecision4 = (index) => {
    dispatch(onChangeCategory1RightDecisions4Day5(index?.value));
  };
  return (
    <>
      {showF && (
        <Modal2
          show={showF}
          title={t("modals.day5.centreNationalPV.modal2.title")}
          text={t("modals.day5.centreNationalPV.modal2.text")}
          btnText={t("modals.yes")}
          btnDefText={t("modals.notyet")} 
          valid={() => valid()}
          reset={() => setShowF(false)}
          showTowBtn={true}
        />
      )}
      <Modal show={show} dialogClassName={"daysModal"} centered>
        <Modal.Body
          style={{ minWidth: "100%", backgroundColor: "transparent" }}
        >
          <div className={"dayOneModalPV-direct"}>
            <div className="title">
              <i className="fas fa-random" style={{ fontSize: "22px" }}></i>{" "}
              {t("pvgame.day5.notifDirect")}
              <h4>
              {t("pvgame.day5.notifDirectTitle")}
                
              </h4>
            </div>

            <div className="content-notification-mixte mt-3">
              <div className="row-notification-mixte">
                <div className="item-notification-mixte">
                  <ItemSelect
                    value={category.leftDecisions1}
                    onChange={onChangeLeftDecision1}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.leftDecisions2}
                    onChange={onChangeLeftDecision2}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.leftDecisions3}
                    onChange={onChangeLeftDecision3}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.leftDecisions4}
                    onChange={onChangeLeftDecision4}
                    modeEdit={modeEdit}
                  />
                </div>
                <div className="item-notification-mixte-2">
                  <div>
                    <img src={img1} />
                  </div>
                  <div className="title-ss">
                    <img src={img} />
                    <h3>{t("pvgame.day5.centerNPV")}</h3>
                  </div>
                  <div>
                    <img className="img-rot" src={img1} />
                  </div>
                </div>
                <div className="item-notification-mixte">
                  {/* left */}
                  <ItemSelect
                    value={category.rightDecisions1}
                    onChange={onChangeRightDecision1}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.rightDecisions2}
                    onChange={onChangeRightDecision2}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.rightDecisions3}
                    onChange={onChangeRightDecision3}
                    modeEdit={modeEdit}
                  />
                  <ItemSelect
                    value={category.rightDecisions4}
                    onChange={onChangeRightDecision4}
                    modeEdit={modeEdit}
                  />
                </div>
              </div>
            </div>

            <div className="box-btn">
              <button
                onClick={close}
                type="reset"
                className="btn btn-secondary waves-effect waves-light  mr-1 "
              >
                 {t("pvgame.day5.cancel")}
              </button>

              {modeEdit && (
                <button
                  onClick={() => {
                    // swal({
                    //     title: "Are you sure?",
                    //     text: "",
                    //     icon: "warning",
                    //     buttons: true,
                    //     dangerMode: true,
                    //   })
                    //   .then((willDelete) => {
                    //     if (willDelete) {
                    //       close()
                    //     } else {
                    //     }
                    //   });
                    setShowF(true);
                    close();
                  }}
                  className="btn btn-primary waves-effect waves-light "
                  type="submit"
                >
                   {t("pvgame.day5.validate")}
                  <i className="fas fa-arrow-right ml-1"></i>
                </button>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NotificationDirecte;

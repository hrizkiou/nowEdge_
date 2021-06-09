import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import badge1 from "../../../assets/images/StrategicGame/checklist (1).svg";
import img4 from "../../../assets/images/StrategicGame/Groupe 4467.svg";
import img5 from "../../../assets/images/StrategicGame/Logo-OMS.svg";
import style from "./style.module.scss";

const ModalFinalGame = ({
  show,
  close = () => null,
  text = "xxxxxxx",
  history,
  onValidate = null,

}) => { 
  const { t } = useTranslation();
  
 
  return (
    <Modal
      show={show}
      dialogClassName={style.daysModal}
      contentClassName={style.modalContent}
      centered
    >
      <Modal.Body>
        <div className={style.dayOneModal} style={{borderRadius: 15 }}>
          <div className={style.block1} style={{borderTopRightRadius: 15 ,borderTopLeftRadius: 15 ,}}>
          </div>
          <div className={style.block2}>
            <h3> {t(`pvgame.menu.finalGameTitle`)}</h3>
            <p>{t(`pvgame.menu.finalGameBody`)}</p>

            <button
              className={[
                "btn btn-primary waves-effect width-md waves-light",
              ].join(" ")}
              onClick={() => {
                close()
              }}
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
export default ModalFinalGame;

import React, { useState } from 'react';
import { Modal } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import style from './style.module.scss';

const Modalexpert = ({ show, close = () => null , text = 'xxxxxxx' , history , onValidate =null}) => {
  

  const { t } = useTranslation();
    return (
      <Modal show={show} dialogClassName={style.daysModal} contentClassName={style.modalContent} centered>
 
        <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
          <div className={style.dayOneModal}>
            <div className={style.discussMessage}>
              <span>{t("modals.expertTitle")} </span>
              <p>
               {text}
              </p>
            </div>
            <div
              className={"budget_restant-mod"}
              onClick={()=>{
                onValidate === null ?   history.push('/pv-game') : onValidate();
                }}
            >
              <div style={{ width: "115px" }}>
                <span>
                  {t("modals.finished")} <i className=" fas fa-arrow-right "></i>
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };
export default Modalexpert

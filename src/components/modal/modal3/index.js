import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import img1 from '../../../assets/images/StrategicGame/mask_group_12-33.png';
import img2 from '../../../assets/images/StrategicGame/mask_group_16-33.png';
import img3 from '../../../assets/images/StrategicGame/mask_group_15-33.png';
import './style.scss';
import { useTranslation } from 'react-i18next';

const DiscussMessage1 = ({title, text, index}) => {
  return (
    <div className={`discussMessageCustom${index}`}>
      <span>{title}</span>
      <p dangerouslySetInnerHTML={{__html: text}} />
    </div>
  );
};

const Modal3 = ({
  show,
  close = () => null,
}) => {


  const { t } = useTranslation();
  return (
    <Modal show={show} dialogClassName={'daysModal3'} centered>
      <Modal.Body style={{minWidth: '100%', backgroundColor: 'transparent'}}>
        <div className={'dayOneModalCost'}>
          <img src={img1} className="img1" />
          <img src={img2} className="img2" />
          <img src={img3} className="img3" />
          <DiscussMessage1
            title={t("modals.day4.startModal.title1")}
            text={t("modals.day4.startModal.text1")}
            index={1}
          />
          <DiscussMessage1
            title={t("modals.day4.startModal.title2")}
            text={t("modals.day4.startModal.text2")} 
            index={2}
          />
          <DiscussMessage1
            title={t("modals.day4.startModal.title3")}
            text={t("modals.day4.startModal.text3")}
            index={3}
          />
          <div className={'budget_restant-mod'}>
            <button
              onClick={close}
              type="button"
              className="btn btn-primary waves-effect width-md waves-light">
              {t("modals.notee")}
              <i className=" fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal3;

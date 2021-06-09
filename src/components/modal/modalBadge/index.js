import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import badge1 from "../../../assets/images/StrategicGame/checklist (1).svg";
import img4 from "../../../assets/images/StrategicGame/Groupe 4467.svg";
import img5 from "../../../assets/images/StrategicGame/Logo-OMS.svg";
import style from "./style.module.scss";

const ModalBadge = ({
  show,
  close = () => null,
  text = "xxxxxxx",
  history,
  onValidate = null,
  badges,
}) => {
  const [NotifBadge, setNotifBadge] = useState(false);
  const [OMSBadge, setOMSBadge] = useState(false);
  const [ImputabilityBadge, setImputabilityBadge] = useState(false);
  const [currentBadge, setCurrentBadge] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (NotifBadge) {
      setCurrentBadge(1);
    } else if (ImputabilityBadge) {
      setCurrentBadge(2);
    } else if (OMSBadge) {
      setCurrentBadge(3);
    } else {
      close();
    }
  }, [NotifBadge, OMSBadge, ImputabilityBadge]);

  useEffect(() => {
    if (badges.length > 0) {
      const NotifBadgeID = badges.find((b) => b.badgeId === 1);
      if (NotifBadgeID) setNotifBadge(true);

      const ImputabilityBadgeID = badges.find((b) => b.badgeId === 2);
      if (ImputabilityBadgeID) setImputabilityBadge(true);

      const OMSBadgeID = badges.find((b) => b.badgeId === 3);
      if (OMSBadgeID) {
        setOMSBadge(true);
      }
    }
  }, [badges]);

  const getImg = () => {
    switch (currentBadge) {
      case 1:
        return {img:badge1,width:'40%'};
      case 2:
        return  {img:img4,width:'40%'};
      case 3:
        return {img:img5,width:'55%'};

      default:
        return {img:img5,width:'55%'};
        break;
    }
  };
  const getTitle = () => {
    switch (currentBadge) {
      case 1:
        return t("modals.badges.notif.title");
      case 2:
        return t("modals.badges.imputability.title");
      case 3:
        return t("modals.badges.oms.title");

      default:
        break;
    }
  };

  const getBody = () => {
    switch (currentBadge) {
      case 1:
        return t("modals.badges.notif.body");
      case 2:
        return t("modals.badges.imputability.body");
      case 3:
        return t("modals.badges.oms.body");
      default:
        break;
    }
  };
  return (
    <Modal
      show={show}
      dialogClassName={style.daysModal}
      contentClassName={style.modalContent}
      centered
    >
      <Modal.Body>
        <div className={style.dayOneModal}>
          <div className={style.block1}>
            <div className={style.poligon}>
              <img src={getImg()?.img} style={{width:getImg().width}} />
            </div>
          </div>
          <div className={style.block2}>
            <h3>{getTitle()}</h3>
            <p>{getBody()}</p>

            <button
              className={[
                "btn btn-primary waves-effect width-md waves-light",
              ].join(" ")}
              onClick={() => {
                // close();
                if (currentBadge === 1) {
                  setNotifBadge(false);
                } else if (currentBadge === 2) {
                  setImputabilityBadge(false);
                } else if (currentBadge === 3) {
                  setOMSBadge(false);
                }
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
export default ModalBadge;

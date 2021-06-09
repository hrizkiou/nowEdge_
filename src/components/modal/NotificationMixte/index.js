import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import img from "../../../assets/images/StrategicGame/research-center-133.png";
import img1 from "../../../assets/images/StrategicGame/ascending-arrow-symbol-with-three-circles.png";
import "./style.scss";
import swal from "sweetalert";
import Modal2 from "../modal2";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeCategory2LeftDecisions1Day5,
  onChangeCategory2LeftDecisions2Day5,
  onChangeCategory2LeftDecisions3Day5,
  onChangeCategory2LeftDecisions4Day5,
  onChangeCategory2RightDecisions1Day5,
  onChangeCategory2RightDecisions2Day5,
  onChangeCategory2RightDecisions3Day5,
  onChangeCategory2RightDecisions4Day5,
  onChangeCategory2Rank1Day5,
  onChangeCategory2Rank2Day5,
  onChangeCategory2Rank3Day5,
  onChangeCategory2Rank4Day5,
} from "../../../redux/actions";
import { useTranslation } from "react-i18next";

const ItemSelect = ({ rank, setRank = () => null, modeEdit }) => {
  const { t } = useTranslation();
  const [state, setstate] = useState(null);

  useEffect(() => {
    if (rank !== null) {
      setstate({
        value: rank,
        label: t(`pvgame.day5.${rank}`),
      });
    }
  }, [rank]);

  const options = [
    {
      value: 174,
      label: t("pvgame.day5.174"),
    },
    {
      value: 173,
      label: t("pvgame.day5.173"),
    },
    { value: 176, label: t("pvgame.day5.176") },
    { value: 175, label: t("pvgame.day5.175") },
  ];

  const onChange_ = (val) => {
    setstate(val);
    setRank(val.value);
  };

  return (
    <div className="block-select" style={{ marginTop: "0px" }}>
      <span className="icon" style={{ margin: "0px", padding: "0px" }}>
        <i
          className="fas fa-long-arrow-alt-up"
          style={{
            fontSize: 25,
          }}
        ></i>
      </span>
      <Select
        options={modeEdit ? options : []}
        placeholder=""
        value={state}
        onChange={onChange_}
      />
    </div>
  );
};

const ItemSelectDirect = ({
  value,
  onChange = () => {},
  showIcon = false,
  style = {},
  modeEdit,
}) => {
  const { t } = useTranslation();

  const options = [
    {
      value: 153,
      label: t("pvgame.day5.153"),
    },
    {
      value: 154,
      label: t("pvgame.day5.154"),
    },
    { value: 155, label: t("pvgame.day5.155") },
    { value: 156, label: t("pvgame.day5.156") },
    { value: 157, label: t("pvgame.day5.157") },
    { value: 158, label: t("pvgame.day5.158") },
    { value: 159, label: t("pvgame.day5.159") },
    { value: 160, label: t("pvgame.day5.160") },
    { value: 177, label: t("pvgame.day5.177") },
    { value: 178, label: t("pvgame.day5.178") },
    { value: 179, label: t("pvgame.day5.179") },
    { value: 180, label: t("pvgame.day5.180") },
    { value: 181, label: t("pvgame.day5.181") },
    { value: 182, label: t("pvgame.day5.182") },
    { value: 183, label: t("pvgame.day5.183") },
    { value: 184, label: t("pvgame.day5.184") },
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

const NotificationMixte = ({
  modeEdit,
  show,
  close = () => null,
  valid = () => null,
  history,
}) => {
  const [showF, setShowF] = useState(false);

  const category = useSelector((state) => state.Days.day5.categories[0]);
  const dispatch = useDispatch();
  const [rank1, setRank1] = useState(null);
  const [rank2, setRank2] = useState(null);
  const [rank3, setRank3] = useState(null);
  const [rank4, setRank4] = useState(null);

  const { t } = useTranslation();
  useEffect(() => {
    setRank1(category.rank1);
    setRank2(category.rank2);
    setRank3(category.rank3);
    setRank4(category.rank4);
  }, [category]);

  const onChangeLeftDecision1 = (index) => {
    dispatch(onChangeCategory2LeftDecisions1Day5(index?.value));
  };
  const onChangeLeftDecision2 = (index) => {
    dispatch(onChangeCategory2LeftDecisions2Day5(index?.value));
  };
  const onChangeLeftDecision3 = (index) => {
    dispatch(onChangeCategory2LeftDecisions3Day5(index?.value));
  };
  const onChangeLeftDecision4 = (index) => {
    dispatch(onChangeCategory2LeftDecisions4Day5(index?.value));
  };

  const onChangeRightDecision1 = (index) => {
    dispatch(onChangeCategory2RightDecisions1Day5(index?.value));
  };
  const onChangeRightDecision2 = (index) => {
    dispatch(onChangeCategory2RightDecisions2Day5(index?.value));
  };
  const onChangeRightDecision3 = (index) => {
    dispatch(onChangeCategory2RightDecisions3Day5(index?.value));
  };
  const onChangeRightDecision4 = (index) => {
    dispatch(onChangeCategory2RightDecisions4Day5(index?.value));
  };

  const onchangeRank1 = (val) => {
    setRank1(val);
    dispatch(onChangeCategory2Rank1Day5(val));
  };
  const onchangeRank2 = (val) => {
    setRank2(val);
    dispatch(onChangeCategory2Rank2Day5(val));
  };
  const onchangeRank3 = (val) => {
    setRank3(val);
    dispatch(onChangeCategory2Rank3Day5(val));
  };
  const onchangeRank4 = (val) => {
    setRank4(val);
    dispatch(onChangeCategory2Rank4Day5(val));
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
          <div className={"dayOneModalPV-mixte"}>
            <div className="title">
              <i
                className="fas fa-compress-arrows-alt"
                style={{ fontSize: "22px" }}
              ></i>{" "}
              {t("pvgame.day5.notifMixte")}
              <h4>{t("pvgame.day5.notifMixteText")}</h4>
            </div>

            <div className="content-notification-mixte mt-3">
              <div className="row-notification-mixte">
                <div className="item-notification-mixte">
                  <span className="titleSelect" style={{ padding: "7px 10px" }}>
                    {t("pvgame.day5.notifDirect")}
                  </span>
                  <ItemSelectDirect
                    value={category.leftDecisions1}
                    onChange={onChangeLeftDecision1}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
                    value={category.leftDecisions2}
                    onChange={onChangeLeftDecision2}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
                    value={category.leftDecisions3}
                    onChange={onChangeLeftDecision3}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
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
                  <span className="titleSelect" style={{ padding: "7px 10px" }}>
                    {t("pvgame.day5.notifDirect")}
                  </span>
                  <ItemSelectDirect
                    value={category.rightDecisions1}
                    onChange={onChangeRightDecision1}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
                    value={category.rightDecisions2}
                    onChange={onChangeRightDecision2}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
                    value={category.rightDecisions3}
                    onChange={onChangeRightDecision3}
                    modeEdit={modeEdit}
                  />
                  <ItemSelectDirect
                    value={category.rightDecisions4}
                    onChange={onChangeRightDecision4}
                    modeEdit={modeEdit}
                  />
                </div>
              </div>
              <div className="row-notification-mixte">
                <div className="item-notification-mixte">
                  <div
                    className="d-flex listcostom-select"
                    style={{ marginTop: "0px" }}
                  >
                    <ItemSelect
                      rank={rank1}
                      setRank={onchangeRank1}
                      modeEdit={modeEdit}
                    />
                    <ItemSelect
                      rank={rank2}
                      setRank={onchangeRank2}
                      modeEdit={modeEdit}
                    />
                    <ItemSelect
                      rank={rank3}
                      setRank={onchangeRank3}
                      modeEdit={modeEdit}
                    />
                    <ItemSelect
                      rank={rank4}
                      setRank={onchangeRank4}
                      modeEdit={modeEdit}
                    />
                    <span
                      className="titleSelect-blue mt-2"
                      style={{ padding: "7px 10px" }}
                    >
                      {t("pvgame.day5.notifHierar")}
                    </span>
                  </div>
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
            <div className="box-index">
              <div className="text-index">
                <span className="mr-1"></span>
                <h3> {t("pvgame.day5.mixteTitle1")}</h3>
              </div>
              <div className="text-index">
                <span
                  className="mr-1"
                  style={{ backgroundColor: "#FFB188" }}
                ></span>
                <h3>{t("pvgame.day5.mixteTitle2")}</h3>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NotificationMixte;

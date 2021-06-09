import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Select from "react-select";

import img from "../../../assets/images/StrategicGame/research-center-133.png";
import "./style.scss";
import swal from "sweetalert";
import Modal2 from "../modal2";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeCategory0Rank1Day5,
  onChangeCategory0Rank2Day5,
  onChangeCategory0Rank3Day5,
  onChangeCategory0Rank4Day5,
} from "../../../redux/actions";

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
    <div className="block-select">
      <span className="icon">
        <i
          className="fas fa-long-arrow-alt-up"
          style={{
            fontSize: 30,
          }}
        ></i>
      </span>
      <Select
        options={ modeEdit ? options.sort(() => Math.random() - 0.5) : []}
        placeholder=""
        value={state}
        onChange={onChange_}
      />
    </div>
  );
};

const CentreNationalPV = ({
  modeEdit,
  show, 
  close = () => null,
  valid = () => null,
  history,
}) => {
  const [Show_, setShow] = useState(show);
  const [showF, setShowF] = useState(false);
  const [rank1, setRank1] = useState(null);
  const [rank2, setRank2] = useState(null);
  const [rank3, setRank3] = useState(null);
  const [rank4, setRank4] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const category = useSelector((state) => state.Days.day5.categories[2]);

  useEffect(() => {
    setRank1(category.rank1);
    setRank2(category.rank2);
    setRank3(category.rank3);
    setRank4(category.rank4);
  }, [category]);
  const onchangeRank1 = (val) => {
    setRank1(val);
    dispatch(onChangeCategory0Rank1Day5(val));
  };
  const onchangeRank2 = (val) => {
    setRank2(val);
    dispatch(onChangeCategory0Rank2Day5(val));
  };
  const onchangeRank3 = (val) => {
    setRank3(val);
    dispatch(onChangeCategory0Rank3Day5(val));
  };
  const onchangeRank4 = (val) => {
    setRank4(val);
    dispatch(onChangeCategory0Rank4Day5(val));
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
          valid={() => {
            valid();
          }}
          reset={() => setShowF(false)}
          showTowBtn={true}
        />
      )}
      <Modal show={show} dialogClassName={"daysModal"} centered>
        <Modal.Body
          style={{ minWidth: "100%", backgroundColor: "transparent" }}
        >
          <div className={"dayOneModalPV"}>
            <div className="title">
              <i className="fas fa-sitemap " style={{ fontSize: "22px" }}></i>{" "}
              
              {t("pvgame.day5.notifHierar")}
              <h4>
              {t("pvgame.day5.notifHierarText")}
                
              </h4>
            </div>
            <div className="title-s">
              <img src={img} />
              <h3>{t("pvgame.day5.centerNPV")}</h3>
            </div>

            <ItemSelect rank={rank1} setRank={onchangeRank1} modeEdit={modeEdit} />
            <ItemSelect rank={rank2} setRank={onchangeRank2} modeEdit={modeEdit} />
            <ItemSelect rank={rank3} setRank={onchangeRank3} modeEdit={modeEdit} />
            <ItemSelect rank={rank4} setRank={onchangeRank4} modeEdit={modeEdit} />

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
                    // setValidate(true);
                    // setShow(false);r
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

export default CentreNationalPV;

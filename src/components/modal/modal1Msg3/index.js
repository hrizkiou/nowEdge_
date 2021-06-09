import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import img1 from "../../../assets/images/StrategicGame/group_5063-phone.png";
import img2 from "../../../assets/images/StrategicGame/s77auimage_33.png";
import img3 from "../../../assets/images/StrategicGame/image_31-900.png";
import img4 from "../../../assets/images/StrategicGame/image_31-901.png";
import img5 from "../../../assets/images/StrategicGame/image_31-902.png";
import img6 from "../../../assets/images/StrategicGame/image_31-903.png";

import img7 from "../../../assets/images/StrategicGame/avatar/1233idjlksd.png";
import img8 from "../../../assets/images/StrategicGame/avatar/ewwllipse_233.png";
import img9 from "../../../assets/images/StrategicGame/avatar/ellipse_234.png";
import img10 from "../../../assets/images/StrategicGame/avatar/ellipse_23321.png";
import img11 from "../../../assets/images/StrategicGame/avatar/ellipse_233.png";
import img12 from "../../../assets/images/StrategicGame/ellipse_234.png";

import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { onChangeCat1Day6 } from "../../../redux/actions";

const Content2Item = ({
  phone,
  img,
  width,
  text = "",
  onSelect,
  index,
  yesId,
  noId,
  defaultValue,
  modeEdit,
  dispatch,
  t,
}) => {
  const [btn, setBtn] = useState(null);

  useEffect(() => {
    setBtn(defaultValue);
  }, [defaultValue]);
  return (
    <div className="carousel_item" style={{ width: width }}>
      <section className="sub-item-2">
        <div className="phoneNumber">
          <h5>{phone}</h5>
        </div>
        <div className="msg-lin">
          <div className="msg-lin-img"></div>
          <div className="msg-lin-text">
            <img src={img} alt="" style={{ width: "33px", height: "33px" }} />
            <p className="m-0">{text}</p>
          </div>
        </div>
        <div className="mt-2" style={{ textAlign: "end" }}>
          <button
            onClick={(e) => {
              if (modeEdit) {
                e.stopPropagation();
                dispatch(onChangeCat1Day6(index, noId));
                setBtn(noId);
                onSelect();
              }
            }}
            type="button"
            className={`btn waves-danger-cost waves-effect  mr-2 ${
              btn === noId ? "waves-danger-cost-valid" : ""
            }`}
          >
            {t("pvgame.day6.supprimer")}
          </button>
          <button
            onClick={(e) => {
              if (modeEdit) {
                e.stopPropagation();
                dispatch(onChangeCat1Day6(index, yesId));
                setBtn(yesId);
                onSelect();
              }
            }}
            type="button"
            className={`btn waves-effect   waves-success-cost ${
              btn === yesId ? "waves-success-cost-valid" : ""
            }`}
            style={{ backgroundColor: "transparent !important" }}
          >
            {t("pvgame.day5.validate")}
          </button>
        </div>
      </section>
    </div>
  );
};

const Content2 = ({ containerWidth, left = 0, onSelect, modeEdit, t }) => {
  const category = useSelector((state) => state.Days.Day6.categories[0]);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(7 * containerWidth);
  }, [containerWidth]);
  return (
    <div className="carousel js-carousel" onClick={(e) => e.stopPropagation()}>
      <div className="carousel__container js-carousel-container">
        <div
          className="carousel__list js-carousel-list"
          style={{
            transition: "left 0.5s",
            left: `${left}px`,
            width: `${total}px`,
            height: "100%",
          }}
        >
          <Content2Item
            modeEdit={modeEdit}
            t={t}
            img={img7}
            phone={t("pvgame.day6.phones.1.phone")}
            text={t("pvgame.day6.phones.1.text")}
            width={containerWidth}
            index={1}
            onSelect={onSelect}
            defaultValue={category.selectedDecision1}
            yesId={194}
            noId={193}
            dispatch={dispatch}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img10}
            phone={t("pvgame.day6.phones.2.phone")}
            text={t("pvgame.day6.phones.2.text")}
            width={containerWidth}
            index={2}
            onSelect={onSelect}
            defaultValue={category.selectedDecision2}
            yesId={196}
            noId={195}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img8}
            phone={t("pvgame.day6.phones.3.phone")}
            text={t("pvgame.day6.phones.3.text")}
            width={containerWidth}
            index={3}
            onSelect={onSelect}
            defaultValue={category.selectedDecision3}
            yesId={198}
            noId={197}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img11}
            phone={t("pvgame.day6.phones.4.phone")}
            text={t("pvgame.day6.phones.4.text")}
            width={containerWidth}
            index={4}
            onSelect={onSelect}
            defaultValue={category.selectedDecision4}
            yesId={200}
            noId={199}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img9}
            phone={t("pvgame.day6.phones.5.phone")}
            text={t("pvgame.day6.phones.5.text")}
            width={containerWidth}
            index={5}
            onSelect={onSelect}
            defaultValue={category.selectedDecision5}
            yesId={201}
            noId={202}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img9}
            phone={t("pvgame.day6.phones.6.phone")}
            text={t("pvgame.day6.phones.6.text")}
            width={containerWidth}
            index={6}
            onSelect={onSelect}
            defaultValue={category.selectedDecision6}
            yesId={203}
            noId={204}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img12}
            phone={t("pvgame.day6.phones.7.phone")}
            text={t("pvgame.day6.phones.7.text")}
            width={containerWidth}
            index={7}
            onSelect={onSelect}
            defaultValue={category.selectedDecision7}
            yesId={205}
            noId={206}
            dispatch={dispatch}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

const Modal1Msg3 = ({
  show,
  btnText = "Primary",
  close = () => null,
  onHide = () => null,
  modeEdit,
  t,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [index, setIndex] = useState(1);

  const category = useSelector((state) => state.Days.Day6.categories[0]);
  const ref_ = useRef(null);
  const [TotalSelect, setTotalSelect] = useState(0);
  const onSelect = () => {
    setTotalSelect((prv) => prv + 1);
  };
  useEffect(() => {
    if (ref_.current !== null) setContainerWidth(ref_.current.offsetWidth);
  });

  const prev = () => {
    if (index !== 1) {
      setLeft((prev) => prev + containerWidth);
      setIndex((prev) => prev - 1);
    }
  };
  const next = () => {
    if (index !== 7) {
      setLeft((prev) => prev - containerWidth);
      setIndex((prev) => prev + 1);
    }
  };

  const checkIfAllSelected = () => {
    return (
      category.selectedDecision1 === null ||
      category.selectedDecision2 === null ||
      category.selectedDecision3 === null ||
      category.selectedDecision4 === null ||
      category.selectedDecision5 === null ||
      category.selectedDecision6 === null ||
      category.selectedDecision7 === null
    );
  };
  return (
    <Modal
      show={show}
      dialogClassName={"daysModal"}
      onClick={onHide}
      onHide={onHide}
    >
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div
          className={"dayOneModal-modal1Msg3"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <img src={img1} alt="" />
          <div className="black-msg" ref={ref_}>
            <Content2
              left={left}
              containerWidth={containerWidth}
              onSelect={onSelect}
              modeEdit={modeEdit}
              t={t}
            />
          </div>
          <div className="carousel_nav">
            <div style={{ visibility: `${index === 1 ? "hidden" : ""}` }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                type="button"
                className="btn btn-secondary waves-effect mr-1"
              >
                {t("pvgame.day6.previous")}
              </button>
            </div>
            <h4 className="mr-1">{index}/7</h4>

            {index !== 7 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                type="button"
                className="btn btn-primary waves-effect  waves-light"
              >
                {t("pvgame.day10.suivant")}
                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            ) : (
              <button
                onClick={(e) => {
                  onHide();
                }}
                type="button"
                style={{ visibility: checkIfAllSelected() ? "hidden" : "" }}
                className="btn btn-success waves-effect  waves-light"
              >
                {t("pvgame.day6.valide")}
                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal1Msg3;

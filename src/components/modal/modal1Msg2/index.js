import React, { useRef, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import img1 from "../../../assets/images/StrategicGame/Component 49 – 1@2x.png";
import img2 from "../../../assets/images/StrategicGame/s77auimage_33.png";
import img3 from "../../../assets/images/StrategicGame/image_31-900.png";
import img4 from "../../../assets/images/StrategicGame/image_31-901.png";
import img5 from "../../../assets/images/StrategicGame/image_31-902.png";
import img6 from "../../../assets/images/StrategicGame/image_31-903.png";
import img7 from "../../../assets/images/StrategicGame/image_38.png";

import "./style.scss";
import { onChangeCat3Day6 } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Content2Item = ({
  img,
  yesId,
  noId,
  widthImg = 162,
  width,
  index,
  onSelect,
  defaultValue,
  dispatch,
  modeEdit,
  t
}) => {
  const [btn, setBtn] = useState(null);

  useEffect(() => {
    setBtn(defaultValue);
  }, [defaultValue]);

  return (
    <div className="carousel_item" style={{ width: width }}>
      <section className="sub-item-2">
        <img src={img} alt="" style={{ height: `${widthImg}px` }} />
      </section>
      <div className="mt-2">
        <button
          onClick={() => {
            if (modeEdit) {
              dispatch(onChangeCat3Day6(index, noId));
              setBtn(noId);
              onSelect();
            }
          }}
          type="button"
          className={`btn waves-danger-cost waves-effect  width-md  mr-2 ${
            btn === noId ? "waves-danger-cost-valid" : ""
          }`}
        >
            {t("pvgame.day6.supprimer")}
        </button>
        <button
          onClick={() => {
            if (modeEdit) {
              dispatch(onChangeCat3Day6(index, yesId));
              setBtn(yesId);
              onSelect();
            }
          }}
          type="button"
          className={`btn waves-effect  width-md waves-success-cost ${
            btn === yesId ? "waves-success-cost-valid" : ""
          }`}
          style={{ backgroundColor: "transparent !important" }}
        >
           {t("pvgame.day5.validate")}
        </button>
      </div>
    </div>
  );
};

const Content2 = ({ containerWidth, left = 0, onSelect, modeEdit, t}) => {
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.Days.Day6.categories[2]);
  useEffect(() => {
    setTotal(6 * containerWidth);
  }, [containerWidth]);
  return (
    <div
      className="carousel js-carousel"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="carousel__container js-carousel-container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
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
            img={img2}
            widthImg={160}
            width={containerWidth}
            yesId={222}
            noId={221}
            index={1}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision1}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img3}
            widthImg={363}
            yesId={224}
            noId={223}
            width={containerWidth}
            index={2}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision2}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img4}
            widthImg={193}
            yesId={226}
            noId={225}
            width={containerWidth}
            index={3}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision3}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img5}
            widthImg={368}
            yesId={227}
            noId={228}
            width={containerWidth}
            index={4}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision4}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img6}
            widthImg={328}
            yesId={229}
            noId={230}
            width={containerWidth}
            index={5}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision5}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            img={img7}
            widthImg={328}
            yesId={231}
            noId={232}
            width={containerWidth}
            index={6}
            onSelect={onSelect}
            dispatch={dispatch}
            defaultValue={category.selectedDecision6}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

const Modal1Msg2 = ({
  show,
  close = () => null,
  onHide = () => null,
  modeEdit,
  t
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [index, setIndex] = useState(1);

  const category = useSelector((state) => state.Days.Day6.categories[2]);
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
    if (index !== 6) {
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
      category.selectedDecision6 === null
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
        <div className={"dayOneModal-modal1Msg2"}>
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
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                type="button"
                className="btn btn-secondary waves-effect width-md"
                style={{ visibility: `${index === 1 ? "hidden" : ""}` }}
              >
                {t("pvgame.day6.previous")} 
              </button>
            </div>
            <h4>{index}/6</h4>
            {index !== 6 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                type="button"
                className="btn btn-primary waves-effect width-md waves-light"
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
                className="btn btn-success waves-effect width-md waves-light"
              >
                {t("pvgame.day6.valide")}
              </button>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal1Msg2;

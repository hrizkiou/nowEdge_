import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { onChangeCat2Day6 } from "../../../redux/actions";
import "./style.scss";

const Content2Item = ({
  width,
  index,
  onSelect,
  email,
  date,
  sujet,
  body,
  yesId,
  noId,
  defaultValue,
  dispatch,
  modeEdit,
  t,
}) => {
  const [btn, setBtn] = useState(null);

  useEffect(() => {
    setBtn(defaultValue);
  }, [defaultValue]);
  return (
    <div className="carousel_item pl-2">
      <section className="sub-item-2">
        <p className="m-0">
          {email} <br />
          {date} <br />
          {sujet}
          <br />
          <br />
          {body?.split("\n").map((str) => (
            <p>{str}</p>
          ))}
        </p>
      </section>
      <div className="mt-2">
        <button
          onClick={() => {
            if (modeEdit) {
              dispatch(onChangeCat2Day6(index, noId));
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
              dispatch(onChangeCat2Day6(index, yesId));
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

const Content2 = ({ containerWidth, left = 0, onSelect, modeEdit, t }) => {
  const [total, setTotal] = useState(0);

  const category = useSelector((state) => state.Days.Day6.categories[1]);
  const dispatch = useDispatch();
  useEffect(() => {
    setTotal(7 * containerWidth);
  }, [containerWidth]);

  return (
    <div
      className="carousel js-carousel"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
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
            width={containerWidth}
            index={1}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.1.email")}
            date={t("pvgame.day6.emails.1.date")}
            sujet={t("pvgame.day6.emails.1.sujet")}
            body={t("pvgame.day6.emails.1.body")}
            defaultValue={category.selectedDecision1}
            yesId={208}
            noId={207}
            dispatch={dispatch}
            t={t}
          />

          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={2}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.2.email")}
            date={t("pvgame.day6.emails.2.date")}
            sujet={t("pvgame.day6.emails.2.sujet")}
            body={t("pvgame.day6.emails.2.body")}
            defaultValue={category.selectedDecision2}
            yesId={209}
            noId={210}
            dispatch={dispatch}
            t={t}
          />
          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={3}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.3.email")}
            date={t("pvgame.day6.emails.3.date")}
            sujet={t("pvgame.day6.emails.3.sujet")}
            body={t("pvgame.day6.emails.3.body")}
            defaultValue={category.selectedDecision3}
            yesId={211}
            noId={212}
            dispatch={dispatch}
            t={t}
          />

          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={4}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.4.email")}
            date={t("pvgame.day6.emails.4.date")}
            sujet={t("pvgame.day6.emails.4.sujet")}
            body={t("pvgame.day6.emails.4.body")}
            defaultValue={category.selectedDecision4}
            yesId={213}
            noId={214}
            dispatch={dispatch}
            t={t}
          />

          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={5}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.5.email")}
            date={t("pvgame.day6.emails.5.date")}
            sujet={t("pvgame.day6.emails.5.sujet")}
            body={t("pvgame.day6.emails.5.body")}
            defaultValue={category.selectedDecision5}
            yesId={215}
            noId={216}
            dispatch={dispatch}
            t={t}
          />

          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={6}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.6.email")}
            date={t("pvgame.day6.emails.6.date")}
            sujet={t("pvgame.day6.emails.6.sujet")}
            body={t("pvgame.day6.emails.6.body")}
            defaultValue={category.selectedDecision6}
            yesId={217}
            noId={218}
            dispatch={dispatch}
            t={t}
          />

          <Content2Item
            modeEdit={modeEdit}
            width={containerWidth}
            index={7}
            onSelect={onSelect}
            email={t("pvgame.day6.emails.7.email")}
            date={t("pvgame.day6.emails.7.date")}
            sujet={t("pvgame.day6.emails.7.sujet")}
            body={t("pvgame.day6.emails.7.body")}
            defaultValue={category.selectedDecision7}
            yesId={219}
            noId={220}
            dispatch={dispatch}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};

const Modal1Msg = ({
  modeEdit,
  show,
  close = () => null,
  onHide = () => null,
  t,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [left, setLeft] = useState(0);
  const [index, setIndex] = useState(1);
  const [TotalSelect, setTotalSelect] = useState(0);

  const category = useSelector((state) => state.Days.Day6.categories[1]);
  const onSelect = () => {
    setTotalSelect((prv) => prv + 1);
  };
  const ref_ = useRef(null);

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
          className={"dayOneModal-modal1Msg"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="black-msg" ref={ref_}>
            <Content2
              modeEdit={modeEdit}
              t={t}
              left={left}
              containerWidth={containerWidth}
              onSelect={onSelect}
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
            <h4>{index}/7</h4>
            {index !== 7 ? (
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
                style={{ visibility: checkIfAllSelected() ? "hidden" : "" }}
                type="button"
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

export default Modal1Msg;

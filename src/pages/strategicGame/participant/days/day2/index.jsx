import React, { useEffect, useState } from "react";
import "./style.scss";
import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import { Button, Container, Dropdown, FormControl } from "react-bootstrap";
import Modal from "../../../../../components/modal/index";
import { tr } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import Modalexpert from "../../../../../components/modal/modalexpert";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  day2getDetail,
  day2OnChangeCasValue,
  day2ValidDay,
} from "../../../../../redux/days/actions";
import {
  avatars,
  countries,
  responsibilities,
  getLogoById,
} from "../../../../../helpers/centerData";
import PreLoaderWidget from "../../../../../components/Loader";
import SwalModal from "../../../../../components/SwalModal";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    className="sg-menu-mod-select-avatar p-2"
    style={{ height: "auto", cursor: "pointer", justifyContent: "flex-start" }}
    ref={ref}
    onClick={(e) => {
      onClick(e);
    }}
  >
    {children}
    {/* <div style={{ marginLeft: "15px" }}>&#x25bc;</div> */}
  </div>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <div className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </div>
      </div>
    );
  }
);

const Select = ({ category, t, modeEdit, dispatch, style = {} }) => {
  const decisions = category.decisions.sort(() => Math.random() - 0.5);

  return (
    <div className="form-group form-group-selecte mb-0 pb-0" style={style}>
      <label htmlFor="inputZip" className="lable-select">
        {t(`pvgame.day2.${category.id}`)}
      </label>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
          <h5 style={{ fontSize: "12px", margin: "0px", width: "95%" }}>
            {category.decisionId !== null
              ? t(`pvgame.day2.${category.decisionId}`)
              :t(`pvgame.day2.selectAction`)}
          </h5>

          {modeEdit && <div style={{ marginLeft: "15px", color: "gray", fontSize: "15px" }}>
            &#x25bc;
          </div>}
        </Dropdown.Toggle>

        {modeEdit && (
          <Dropdown.Menu as={CustomMenu} align="right sm">
            {decisions.map((d) => (
              <Dropdown.Item
                onClick={() => {
                  //console.log("category.id, d", category.id, d);
                  dispatch(day2OnChangeCasValue(category.id, d));
                }}
              >
                {t(`pvgame.day2.${d}`)}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        )}
      </Dropdown>
    </div>
  );
};

const Day2 = (props) => {
  const [showM, setShowM] = useState(true);
  const [showM1, setShowM1] = useState(false);
  const [showTermin, setShowTermin] = useState(false);
  const [modeEdit, setModeEdit] = useState(true);

  const history = useHistory();

  const categories = useSelector((state) => state.Days.day2.categories);
  const day2 = useSelector((state) => state.Days.day2);
  const loading = useSelector((state) => state.Days.loading);
  const { center } = useSelector((state) => state.PvGame);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 2);

    if (currentDay.status === -1) {
      history.push("/pv-game/parcours");
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(day2getDetail(center.centerId));
    }
  }, []);
  const validDay = () => {
    dispatch(
      day2ValidDay(day2, center.centerId, () => {
        setShowM1(false);
        setShowTermin(true)
      })
    );
  };
  return (
    <div className="container-day-2">
      {loading && <PreLoaderWidget />}
      <Modal show={showM}>
        <div className="modal-block-1"></div>
        <div className="modal-block-2">
          <div className="msg">
            <h3>{t(`modals.day2.startModal.title`)}</h3>
            <p>
              {t(`modals.day2.startModal.body1`)}
              <br />
              {t(`modals.day2.startModal.body2`)}
            </p>
          </div>
          <button
            onClick={() => {
              setShowM(false);
            }}
            style={{ width: "auto" }}
            className="btn btn-primary waves-effect waves-light mr-1 mb-4 btn-msg"
            type="submit"
          >
            {t(`modals.notee`)}
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </Modal>

      <Modal show={showM1}>
        <div className="modal-block-1"></div>
        <div className="modal-block-2">
          <div className="msg">
            <h3>{t(`modals.day2.confirmationModal.title`)}</h3>
            <p>{t(`modals.day2.confirmationModal.body`)}</p>
          </div>
          <button
            onClick={() => {
              setShowM1(false);
            }}
            className="btn  waves-effect waves-light mb-4 btn-msg-can"
            type="submit"
          >
            {t(`modals.notyet`)}
          </button>
          <button
            onClick={validDay}
            className="btn btn-primary waves-effect waves-light mb-4 btn-msg"
            type="submit"
          >
            {t(`modals.yes`)}
            <i className="fas fa-arrow-right ml-1"></i>
          </button>
        </div>
      </Modal>

      <Modalexpert
        show={showTermin}
        history={props.history}
        close={() =>  history.push("/pv-game")}
        text={t(`modals.day2.expert.body`)}
      />

      <div className="box box-1" style={{ backgroundColor: "red" }}>
        <div className="pup">
          <h3> {t(`pvgame.day2.title`)}</h3>
          <p>
            {t(`pvgame.day2.body1`)}
            <br />
            {t(`pvgame.day2.body2`)}
          </p>
        </div>
      </div>
      <div className="box box-2">
        <div className="box-2-1">
          <div className="d-flex justify-content-center align-content-center align-items-center ">
            <img
              src={getLogoById(center.countryId, countries)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
                marginRight: "-10px",
              }}
            />
            <img
              src={getLogoById(center.avatarId, avatars)?.logo}
              alt="user-img"
              width={41}
              height={41}
              style={{
                backgroundColor: "#fff",
                borderRadius: "50px",
              }}
            />
            <span className="sg-menu-item-title">{center.name}</span>
          </div>
          {/* <div className="cat-ad" onClick={() => null}>
            <i className=" fas fa-book-open mr-1"></i>
            Catalogue des décisions
          </div> */}
          <button
            style={{
              marginTop: "1rem",
            }}
            onClick={() => {
              history.push("/pv-game/parcours");
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mb-4"
          >
            {t(`pvgame.parcour.quitter`)}
            <i className="fas fa-running ml-1"></i>
          </button>
        </div>
        <div className="box-2-2 pt-0 pb-0">
          <h3>{t(`pvgame.day2.niveau`)}</h3>
          <p>{t(`pvgame.day2.niveauTitle`)}</p>
        </div>
        <div className="box-2-3" style={{ padding: "0px 20px" }}>
          <div className="d-flex m-0">
            <Select
              category={categories[0]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
              style={{ paddingLeft: "0px" }}
            />
            <Select
              category={categories[1]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
            />
          </div>
          <div className="d-flex ">
            <Select
              category={categories[2]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
              style={{ paddingLeft: "0px" }}
            />
            <Select
              category={categories[3]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
            />
          </div>
          <div className="d-flex ">
            <Select
              category={categories[4]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
              style={{ paddingLeft: "0px" }}
            />
            <Select
              category={categories[5]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
            />
          </div>
          <div className="d-flex ">
            <Select
              category={categories[6]}
              t={t}
              dispatch={dispatch}
              modeEdit={modeEdit}
              style={{ paddingLeft: "0px" }}
            />
          </div>
        </div>
        <div className="box-2-1" style={{ justifyContent: "flex-end" }}>
          {modeEdit && (
            <button
              onClick={() => {
                if (modeEdit) {
                  setShowM1(true);
                } else {
                  history.push("/pv-game");
                }
              }}
              className="btn btn-primary waves-effect waves-light mr-1 mb-4"
              type="submit"
            >
              {t(`pvgame.validLevel`)}
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Day2;

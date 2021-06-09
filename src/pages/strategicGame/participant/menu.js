import React, { useEffect, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import MySvg from "../../../assets/images/StrategicGame/Component50–1.svg";
import mySvg1 from "../../../assets/images/StrategicGame/Component51–1.svg";
import badg7 from "../../../assets/images/StrategicGame/contest.svg";
import doctor from "../../../assets/images/StrategicGame/doctor man.svg";
import avatar1 from "../../../assets/images/StrategicGame/Group 3893.svg";
import Group5172 from "../../../assets/images/StrategicGame/Group 5172.svg";
import Group_3860 from "../../../assets/images/StrategicGame/Group_3860.svg";
import Group_3897 from "../../../assets/images/StrategicGame/Group_3897.svg";
import Group_644 from "../../../assets/images/StrategicGame/Group_644.svg";
import badg5 from "../../../assets/images/StrategicGame/Layer_15.svg";
import badg6 from "../../../assets/images/StrategicGame/Layer_26.svg";
import badg2 from "../../../assets/images/StrategicGame/Layer_47.svg";
import badg3 from "../../../assets/images/StrategicGame/travel-itinerary.svg";
import Loader from "../../../components/Loader";
import ModalBadge from "../../../components/modal/modalBadge";
import ModalFinalGame from "../../../components/modal/modalFinalGame";
import ModalScore from "../../../components/modal/modalScore";
import { avatars, countries, getLogoById, responsibilities } from "../../../helpers/centerData";
import { closeDayClear, getCenterInfo, updateCenterInfo } from "../../../redux/actions";

var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;
function addNameSpace(data) {
  if (data.indexOf("http://www.w3.org/2000/svg") < 0) {
    data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
  }

  return data;
}
function encodeSVG(data) {
  // Use single quotes instead of double to avoid encoding.
  if (data.indexOf('"') >= 0) {
    data = data.replace(/"/g, "'");
  }

  data = data.replace(/>\s{1,}</g, "><");
  data = data.replace(/\s{2,}/g, " ");

  return data.replace(symbols, encodeURIComponent);
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => {
  const [disableEdit, setDisableEdit] = useState(false);

  const { center } = useSelector((state) => state.PvGame);

  useEffect(() => {
    if (center.days && center.days.find((d) => d.dayId === 1)?.status === 1)
      setDisableEdit(true);
  }, []);
  return (
    <div
      className="sg-menu-mod-select-avatar"
      ref={ref}
      style={{            userSelect:'none',
}}
      onClick={(e) => {
        onClick(e);
      }}
    >
      {children}
      {!disableEdit && <div style={{ marginLeft: "15px" }}>&#x25bc;</div>}
    </div>
  );
});

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={{
          ...style,
          ...{
            // maxHeight: "18rem",
            overflow: "auto",
            maxHeight: "8.5rem",
            userSelect:'none',
          },
        }}
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

const AvatarMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
        style={{
          minWidth: "auto",
        }}
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

function ConfigModal(props) {
  const { center, t } = props;
  const [dropdownOpen, setOpen] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [name, setName] = useState("");
  const [avatarLogo, setAvatarLogo] = useState(avatars[0]);
  const [countryLogo, setCountryLogo] = useState(countries[0]);
  const [responsibility, setResponsibility] = useState(responsibilities[0]);
  const [disableEdit, setDisableEdit] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    if (center.days && center.days.find((d) => d.dayId === 1)?.status === 1)
      setDisableEdit(true);
    setName(center.name);
    setAvatarLogo(getLogoById(center.avatarId));
    setCountryLogo(getLogoById(center.countryId, countries));
    setResponsibility(getLogoById(center.responsibilityId, responsibilities));
  }, [center]);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <div className="sg-menu-mod-contaiber">
          <div className="sg-menu-mod-lr">
            <img src={Group5172} height={250} alt="#" />
          </div>
          <div className="sg-menu-mod-c">
            <div className="d-flex align-content-center justify-content-center">
              <h3 className="d-flex   sg-menu-mod-title-p1">
                {t(`pvgame.menu.welcome1`)}
              </h3>
              <h3 className="d-flex   sg-menu-mod-title-p2 ml-2">
                {t(`pvgame.menu.welcome2`)}
              </h3>
            </div>
            <p className="d-flex  sg-menu-item-title-p3 text-center">
              {t(`pvgame.menu.descConfig`)}
            </p>

            <form>
              <div className="form-row justify-content-center">
                <div className="form-group " style={{ flex: 3 }}>
                  <label htmlFor="inputCity" className="col-form-label">
                    {t(`pvgame.menu.configCenterName`)}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    maxLength={20}
                    placeholder="Nom du centre"
                    style={{
                      padding: "21px 18px",
                      borderColor: errorName ? "red" : "#ced4da",
                    }}
                    disabled={disableEdit}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value !== "") {
                        setErrorName(false);
                      } else {
                        setErrorName(true);
                      }
                    }}
                  />
                </div>

                <div
                  className="form-group "
                  style={{ flex: 1, marginLeft: "1rem" }}
                >
                  <label htmlFor="inputZip" className="col-form-label">
                    {t(`pvgame.menu.configAvatar`)}
                  </label>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <img src={avatarLogo?.logo} alt="#" />
                    </Dropdown.Toggle>

                    {!disableEdit && (
                      <Dropdown.Menu as={AvatarMenu} align="right sm">
                        <Dropdown.Item
                          onClick={() => {
                            setAvatarLogo(getLogoById(1));
                          }}
                        >
                          <img src={avatar1} alt="#" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setAvatarLogo(getLogoById(2));
                          }}
                        >
                          <img src={Group_3860} alt="#" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setAvatarLogo(getLogoById(3));
                          }}
                        >
                          <img src={Group_644} alt="#" />
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setAvatarLogo(getLogoById(4));
                          }}
                        >
                          <img src={Group_3897} alt="#" />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>
              </div>
              <div className="form-row justify-content-center">
                <div className="form-group " style={{ flex: 4 }}>
                  <label htmlFor="inputCity" className="col-form-label">
                    {t(`pvgame.menu.configCountry`)}
                  </label>
                  <Dropdown  >
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <img src={countryLogo?.logo} alt="#" />{" "}
                      <span
                        style={{
                          marginLeft: 14,
                        }}
                      >
                        {t(`pvgame.menu.country${countryLogo?.id}`)}
                      </span>
                    </Dropdown.Toggle>

                    {!disableEdit && (
                      <Dropdown.Menu as={CustomMenu} align="right sm" >
                        {countries.map((c, index) => (
                          <Dropdown.Item
                            key={index}
                            onClick={() => {
                              setCountryLogo(getLogoById(c.id, countries));
                            }}
                          >
                            <img src={c.logo} alt="#" />{" "}
                            <span
                              style={{
                                marginLeft: 12,
                              }}
                            >
                              {t(`pvgame.menu.country${c.id}`)}
                            </span>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </div>

                <div
                  className="form-group"
                  style={{ flex: 4, marginLeft: "1rem" }}
                >
                  <label htmlFor="inputZip" className="col-form-label">
                    {t(`pvgame.menu.configRespo`)}
                  </label>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      {responsibility?.label}
                    </Dropdown.Toggle>
                    {!disableEdit && (
                      <Dropdown.Menu as={CustomMenu} align="right sm">
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(1, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession1`)}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(2, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession2`)}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(3, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession3`)}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(4, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession4`)}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(5, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession5`)}
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            setResponsibility(getLogoById(6, responsibilities));
                          }}
                        >
                          {t(`pvgame.menu.proffession6`)}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    )}{" "}
                  </Dropdown>
                </div>
              </div>

              <div className="form-row justify-content-center">
                <div className="form-group col-md-4">
                  <button
                    type="reset"
                    onClick={() => props.onClose()}
                    style={{
                      width: "100%",
                      height: "60px",
                    }}
                    className="btn btn-secondary waves-effect waves-light mr-1 d-block"
                  >
                    {t(`pvgame.menu.back`)}
                  </button>
                </div>

                <div className="form-group col-md-4">
                  <button
                    type="reset"
                    onClick={() => {
                      if (disableEdit) {
                        props.onClose();
                      } else {
                        if (name !== "") {
                          setErrorName(false);
                          props.dispatch(
                            updateCenterInfo(
                              props.gameSessionId,
                              name,
                              avatarLogo.id,
                              countryLogo.id,
                              responsibility.id
                            )
                          );
                          props.onClose();
                        } else {
                          setErrorName(true);
                        }
                      }
                    }}
                    style={{
                      width: "100%",
                      height: "60px",
                    }}
                    className="btn btn-primary waves-effect waves-light mr-1 d-block"
                  >
                    {t(`pvgame.menu.register`)}
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="sg-menu-mod-lr">
            <img src={doctor} height={250} alt="#" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function RegleJeuModal(props) {
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="sg-menu-mod-contaiber">
          <div className="sg-menu-mod-c">
            <div className="d-flex align-content-center justify-content-center">
              <h3 className="d-flex   sg-menu-mod-title-p2 ml-2">
                {t("modals.regle.title")}
              </h3>
            </div>
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text1") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text2") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text3") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text4") }}
            />

            <dl
              style={{ marginTop: 5, marginLeft: 40 }}
              className=" sg-menu-item-title-p3"
            >
              <dd
                dangerouslySetInnerHTML={{ __html: t("modals.regle.text5") }}
              />
              <dd
                dangerouslySetInnerHTML={{ __html: t("modals.regle.text6") }}
              />
              <dd
                dangerouslySetInnerHTML={{ __html: t("modals.regle.text7") }}
              />
            </dl>

            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text8") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text9") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text10") }}
            />
            <p
              className="  sg-menu-item-title-p3"
              dangerouslySetInnerHTML={{ __html: t("modals.regle.text11") }}
            />

            <p className="  sg-menu-item-title-p3">
              {t("modals.regle.text12")}
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Menu() {
  const [regleJeu, setRegleJeu] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showBadge, setShowBadge] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [showFinalGame, setShowFinalGame] = useState(false);
  const [score, setScore] = useState({});
  const [badges, setBadges] = useState([]);
  const { gameSessionId } = useSelector((state) => state.Module.module);
  const { closeDay } = useSelector((state) => state.PvGame);
  const { loading, center } = useSelector((state) => state.PvGame);
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const days = useSelector((state) => state.PvGame.center.days);

  useEffect(() => {
    if (closeDay !== null) {
      setScore({
        stars: closeDay.stars,
        score1: closeDay.score1,
        score2: closeDay.score2,
        score3: closeDay.score3,
      });
      setBadges(closeDay.badges);
      setTimeout(() => {
        if (closeDay.dayId === 10) setShowFinalGame(true);
        setShowScore(true);
        if (closeDay.badges.length > 0) setShowBadge(true);

        // dispatch(closeDayClear());
      }, 100);
      setTimeout(() => {
        dispatch(closeDayClear());
      }, 1000);
    }
  }, [closeDay]);

  useEffect(() => {
    dispatch(getCenterInfo(gameSessionId));
    // document.addEventListener(
    //   "keydown",
    //   (e) => {
    //     //console.log("---e.code---", e.code);
    //     if (e.code === "KeyS") setShowScore(true);
    //     if (e.code === "KeyE") setShowFinalGame(true);
    //   },
    //   false
    // );
  }, []);

  const to = (path) => {
    // window.history.replaceState(null, null, '/pv-game');
    history.push(path);
  };
  return (
    <div className="sg-menu-contant">
      {loading && <Loader />}

      <ModalBadge
        badges={badges}
        show={showBadge}
        close={() => {
          setShowBadge(false);
        }}
      />
      <ModalFinalGame
        badges={badges}
        show={showFinalGame}
        close={() => {
          setShowFinalGame(false);
        }}
      />

      <ModalScore
        scoreDay={score}
        show={showScore}
        close={() => {
          setShowScore(false);
        }}
      />
      <ConfigModal
        t={t}
        show={showConfig}
        center={center}
        gameSessionId={gameSessionId}
        dispatch={dispatch}
        onClose={() => {
          setShowConfig(false);
        }}
        onHide={() => {
          setShowConfig(false);
        }}
      />
      <RegleJeuModal
        show={regleJeu}
        onClose={() => {
          setRegleJeu(false);
        }}
        onHide={() => {
          setRegleJeu(false);
        }}
      />
      <div className="sg-menu-contant-left">
        <div className="sg-menu-item-btn ">
          <div className="d-flex flex-column sg-onHover">
            <div className="d-flex justify-content-center align-items-center">
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
            <div
              className="sg-menu-item-btn-config"
              onClick={() => setShowConfig(true)}
            >
              <div className="sg-menu-item-btn-config-s">
                {" "}
                {t(`pvgame.menu.configure`)}{" "}
              </div>
            </div>
          </div>

          <div
            className="border-darken-1  "
            style={{
              cursor: "pointer",
              position: "absolute",
              left: "3.6rem",
              top: "1rem",
            }}
            onClick={() => {
              setRegleJeu(true);
            }}
          >
            <div className="d-flex">
              <img
                src={badg2}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={70}
                height={50}
              />
              <h3
                style={{
                  marginLeft: "-10px",
                  marginTop: "20px",
                  textAlign: "center",
                  borderRadius: "30px",
                  // backgroundColor: "#fff",
                  font: "normal normal normal 16px/23px Karla",
                  color: "#3F4351",
                }}
              >
                {" "}
                {t(`pvgame.menu.regle`)}{" "}
              </h3>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-baseline ml-5">
          <img
            src={mySvg1}
            alt="user-img"
            width={57}
            height={60}
            style={{ bottom: "-7px", position: "relative" }}
          />
          <p className="sg-menu-item-title-logo m-0">
            {t(`pvgame.menu.title`)}
          </p>
        </div>
        <div className="d-flex  ml-5">
          <h3 className="d-flex  mr-1 sg-menu-item-title-p1">
            {t(`pvgame.menu.welcome1`)}
          </h3>
          <h3 className="d-flex sg-menu-item-title-p2">
            {" "}
            {t(`pvgame.menu.welcome2`)}
          </h3>
        </div>
        <p className="d-flex ml-5 mr-5 sg-menu-item-title-p3">
          {t(`pvgame.menu.desc1`)}
        </p>
        <p className="d-flex ml-5 mr-5 sg-menu-item-title-p3">
          {t(`pvgame.menu.desc2`)}
        </p>
        <div className="sg-menu-item-box-container">
          <div
            className="d-flex ml-5 mr-5  sg-menu-item-box-row pt-2 pb-4"
            style={{ justifyContent: "space-evenly" }}
          >
            {/* <div
              className="border-darken-1 mr-4 sg-menu-item-box"
              onClick={() => to("/pv-game/centre")}
            >
              <img
                src={badg1}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={88}
                height={77}
              />
              Mon centre
            </div> */}

            <div
              className="border-darken-1  mr-4 sg-menu-item-box"
              onClick={() => to(`/pv-game/parcours`)}
            >
              <img
                src={badg3}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={88}
                height={77}
              />
              {t(`pvgame.menu.parcour`)}
            </div>
            <div
              className="border-darken-1 mr-4 sg-menu-item-box"
              onClick={() => to("/pv-game/activity-report")}
            >
              <img
                src={badg6}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={88}
                height={77}
              />
              {t(`pvgame.menu.Ractivity`)}
            </div>
          </div>
          <div
            className="d-flex ml-5 mr-5  sg-menu-item-box-row pb-4 pt-2"
            style={{ justifyContent: "space-evenly" }}
          >
            <div
              className="border-darken-1 mr-4 sg-menu-item-box"
              onClick={() => to("/pv-game/classement")}
            >
              <img
                src={badg7}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={88}
                height={77}
              />
              {t(`pvgame.menu.classement`)}
            </div>

            <div
              className="border-darken-1 mr-4 sg-menu-item-box"
              onClick={() => to("/pv-game/badges")}
            >
              <img
                src={badg5}
                alt="user-img"
                className="mb-1 sg-menu-item-box-img"
                width={88}
                height={77}
              />
              {t(`pvgame.menu.badges`)}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 3,
          background: `url(${encodeSVG(MySvg)}) no-repeat center `,
          backgroundPositionY: "-80px",
          backgroundColor: "#aedcff",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
}

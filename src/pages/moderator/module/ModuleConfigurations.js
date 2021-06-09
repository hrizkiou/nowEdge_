import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Tooltip,
} from "reactstrap";
import Select from "react-select";
import plusSolid from "../../../assets/images/plus-solid.svg";
import copySolid from "../../../assets/images/copy-solid.svg";
import gamepadSolid from "../../../assets/images/gamepad-solid.svg";
import trophySolid from "../../../assets/images/trophy-solid.svg";
import copySolidHover from "../../../assets/images/copy-solid-hover.svg";
import gamepadSolidHover from "../../../assets/images/gamepad-solid-hover.svg";
import trophySolidHover from "../../../assets/images/trophy-solid-hover.svg";
import ellipsisVSolid from "../../../assets/images/ellipsis-v-solid.svg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { Modal, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SwalModal from "../../../components/SwalModal";
import {
  getAllConfiguration,
  createConfiguration,
  initSuccess,
  deleteConfiguration,
  editConfiguration,
  duplicateConfiguration,
  selectConfiguration,
} from "../../../redux/configuration/actions";
import { parse } from "../../../helpers/func";
import moment from "moment";
import { encrypt, decrypt } from "../../../helpers/crypto";

const CardConfig = (props) => {
  const {
    moduleInstanceId,
    moduleInstanceName,
    creationDate,
    numberOfTrainingSessions,
    numberOfQuizzes,
    numberOfNotions,
    moduleAffectationId,
    gameConfigurationId,
    t,
  } = props;

  const dispatch = useDispatch();
  const deleteSuccess = useSelector(
    (state) => state.Configuration.deleteSuccess
  );

  const [gamepadSolidIsHover, setGamepadSolidIsHover] = useState(false);
  const [gamepadSolidIMG, setGamepadSolidIMG] = useState(gamepadSolid);

  const [copySolidIsHover, setCopySolidIsHover] = useState(false);
  const [copySolidIMG, setCopySolidIMG] = useState(copySolid);

  const [trophySolidIsHover, setTrophySolidIsHover] = useState(false);
  const [trophySolidIMG, setTrophySolidIMG] = useState(trophySolid);

  const [modalShow, setModalShow] = useState(false);
  const [modalEditShow, setModalEditShow] = useState(false);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);

  useEffect(() => {
    if (gamepadSolidIsHover) {
      setGamepadSolidIMG(gamepadSolidHover);
    } else setGamepadSolidIMG(gamepadSolid);
  }, [gamepadSolidIsHover]);

  useEffect(() => {
    if (copySolidIsHover) {
      setCopySolidIMG(copySolidHover);
    } else setCopySolidIMG(copySolid);
  }, [copySolidIsHover]);

  useEffect(() => {
    if (trophySolidIsHover) {
      setTrophySolidIMG(trophySolidHover);
    } else setTrophySolidIMG(trophySolid);
  }, [trophySolidIsHover]);

  useEffect(() => {
    if (deleteSuccess) {
      SwalModal({
        text: t("moduleConfig.modalDeleteConfig.successMessage"),
        icon: "success",
      });

      dispatch(initSuccess());
    }
  }, [deleteSuccess]);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

  const deleteConfig = () => {
    SwalModal({
      text: t("moduleConfig.modalDeleteConfig.askMessage"),
      icon: "warning",
      buttons: [t("moduleSession.swal.no"), t("moduleSession.swal.yes")],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteConfiguration(moduleInstanceId));
      }
    });
  };

  const onClickLink = () => {
    dispatch(
      selectConfiguration({
        moduleAffectationId,
        moduleInstanceId,
        moduleInstanceName,
        creationDate,
        numberOfNotions,
        numberOfQuizzes,
        numberOfTrainingSessions,
      })
    );
  };

  return (
    <React.Fragment>
      <DuplicateConfigModal
        t={t}
        show={modalShow}
        onHide={(value) => {
          if (value !== false) {
            //console.log("======>", value);
          }
          setModalShow(false);
        }}
        moduleInstanceId={moduleInstanceId}
      />
      <EditConfigModal
        t={t}
        show={modalEditShow}
        onHide={(value) => {
          setModalEditShow(false);
        }}
        name={moduleInstanceName}
        moduleInstanceId={moduleInstanceId}
      />
      <Col xl={4}>
        <Card>
          <CardBody className="card-box project-box mb-0 pb-0 ">
            <div className="ellipsis-position">
              <UncontrolledDropdown direction="left">
                <DropdownToggle
                  caret
                  tag="a"
                  className="text-muted"
                  style={{ cursor: "pointer" }}
                >
                  <img src={ellipsisVSolid} alt="" title="" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setModalShow(true)}>
                    <span>{t("moduleConfig.cardConfig.duplicate")}</span>
                  </DropdownItem>
                  {numberOfTrainingSessions === 0 && (
                    <>
                      <DropdownItem onClick={() => setModalEditShow(true)}>
                        <span>{t("moduleConfig.cardConfig.edit")}</span>
                      </DropdownItem>
                      <DropdownItem onClick={deleteConfig}>
                        <span>{t("moduleConfig.cardConfig.delete")}</span>
                      </DropdownItem>
                    </>
                  )}
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
            <h4 className="mt-0">{moduleInstanceName} </h4>
            <h6 className="date-config font-weight-normal">
              {t("moduleConfig.cardConfig.createdAt")} {creationDate}
            </h6>
            <Row>
              <Col>
                <h4 className="m-0">{parse(numberOfTrainingSessions)} </h4>
                <p className="mb-0">{t("moduleConfig.cardConfig.sessions")}</p>
              </Col>
              <Col>
                <h4 className="m-0">{parse(numberOfNotions)} </h4>
                <p className="mb-0">{t("moduleConfig.cardConfig.notions")}</p>
              </Col>
              <Col>
                <h4 className="m-0">{parse(numberOfQuizzes)} </h4>
                <p className="mb-0">{t("moduleConfig.cardConfig.quiz")}</p>
              </Col>
            </Row>
          </CardBody>
          <div className="tool-box-container">
            <Link
              to={`/moderator/modules/${encrypt(moduleInstanceId)}/notions`}
              id={"formation" + props.index}
              onClick={onClickLink}
              style={{ cursor: "pointer" }}
              className="tool-box"
              onMouseEnter={() => setCopySolidIsHover(!copySolidIsHover)}
              onMouseLeave={() => setCopySolidIsHover(!copySolidIsHover)}
            >
              <img src={copySolidIMG} alt="" />
            </Link>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target={"formation" + props.index}
              toggle={toggle}
            >
              <p style={{ fontSize: "12px", margin: "0px" }}>
                {t("moduleConfig.cardConfig.manageTraining")}
              </p>
            </Tooltip>
            <Link
              id={"manageQuiz" + props.index}
              to={`/moderator/modules/${encrypt(moduleInstanceId)}/config/quiz`}
              className="tool-box"
              onClick={onClickLink}
              onMouseEnter={() => setTrophySolidIsHover(!trophySolidIsHover)}
              onMouseLeave={() => setTrophySolidIsHover(!trophySolidIsHover)}
            >
              <img src={trophySolidIMG} alt="" />
            </Link>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen1}
              target={"manageQuiz" + props.index}
              toggle={toggle1}
            >
              <p style={{ fontSize: "12px", margin: "0px" }}>
                {t("moduleConfig.cardConfig.manageQuiz")}
              </p>
            </Tooltip>

            <Link
              id={"manageBusinessGame" + props.index}
              to={
                gameConfigurationId !== 0 && gameConfigurationId !== null
                  ? `/moderator/business-game/${gameConfigurationId}`
                  : "#"
              }
              className="tool-box"
              style={
                gameConfigurationId !== 0 && gameConfigurationId !== null
                  ? {}
                  : {
                      //backgroundColor: "gray",
                      cursor: "default",
                    }
              }
              onClick={onClickLink}
              title={t("moduleConfig.cardConfig.manageBusinessGame")}
              onMouseEnter={() => {
                gameConfigurationId !== 0 &&
                  gameConfigurationId !== null &&
                  setGamepadSolidIsHover(!gamepadSolidIsHover);
              }}
              onMouseLeave={() => {
                gameConfigurationId !== 0 &&
                  gameConfigurationId !== null &&
                  setGamepadSolidIsHover(!gamepadSolidIsHover);
              }}
            >
              <img src={gamepadSolidIMG} alt="" />
            </Link>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen2}
              target={"manageBusinessGame" + props.index}
              toggle={toggle2}
            >
              <p style={{ fontSize: "12px", margin: "0px" }}>
                {" "}
                {t("moduleConfig.cardConfig.manageBusinessGame")}
              </p>
            </Tooltip>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

const AddConfigModal = (props) => {
  const addSuccess = useSelector((state) => state.Configuration.addSuccess);
  const configurations = useSelector(
    (state) => state.Configuration.configurations
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState("none");

  const { t, show, onHide } = props;

  useEffect(() => {
    setName("");
    setInvalid("none");
  }, [props.show]);

  useEffect(() => {
    if (addSuccess) {
      SwalModal({
        text: t("moduleConfig.modalAddConfig.successMessage"),
        icon: "success",
      });

      dispatch(initSuccess());
    }
  }, [addSuccess]);

  const valide = () => {
    let isDuplicated = false;

    for (const config of configurations) {
      if (config.moduleInstanceName === name) {
        isDuplicated = true;
        break;
      }
    }

    if (name !== "" && !isDuplicated) {
      dispatch(
        createConfiguration({
          moduleAffectationId: props.moduleID,
          moduleInstanceName: name,
        })
      );
      onHide();
    } else {
      setInvalid("initial");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <Container>
          <h4>{t("moduleConfig.modalAddConfig.title")}</h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t("moduleConfig.modalAddConfig.name")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t("moduleConfig.modalAddConfig.name")}
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: `${invalid}` }}
                >
                  {t("moduleConfig.modalAddConfig.errorName")}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide(false)}
              >
                {t("moduleConfig.modalAddConfig.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}
              >
                {t("moduleConfig.modalAddConfig.add")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const EditConfigModal = (props) => {
  const editSuccess = useSelector((state) => state.Configuration.editSuccess);
  const configurations = useSelector(
    (state) => state.Configuration.configurations
  );
  const dispatch = useDispatch();

  const [name, setName] = useState(props.name);
  const [invalid, setInvalid] = useState("none");

  const { t, show, onHide } = props;

  useEffect(() => {
    setInvalid("none");
  }, [props.show]);

  useEffect(() => {
    if (editSuccess) {
      SwalModal({
        text: t("moduleConfig.modalEditConfig.successMessage"),
        icon: "success",
      });
      dispatch(initSuccess());
    }
  }, [editSuccess]);

  const valide = () => {
    let isDuplicated = false;

    for (const config of configurations) {
      if (config.moduleInstanceName === name) {
        isDuplicated = true;
        break;
      }
    }

    if (name !== "" && !isDuplicated) {
      dispatch(
        editConfiguration({
          moduleInstanceId: props.moduleInstanceId,
          moduleInstanceName: name,
        })
      );
      onHide();
    } else {
      setInvalid("initial");
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <Container>
          <h4>{t("moduleConfig.modalAddConfig.title")}</h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t("moduleConfig.modalAddConfig.name")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t("moduleConfig.modalAddConfig.name")}
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: `${invalid}` }}
                >
                  {t("moduleConfig.modalAddConfig.errorName")}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide(false)}
              >
                {t("moduleConfig.modalAddConfig.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}
              >
                {t("moduleConfig.modalEditConfig.edit")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const DuplicateConfigModal = (props) => {
  const configurations = useSelector(
    (state) => state.Configuration.configurations
  );
  const duplicateSuccess = useSelector(
    (state) => state.Configuration.duplicateSuccess
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [invalid, setInvalid] = useState("none");
  const [notions, setNotions] = useState(true);
  const [quiz, setQuiz] = useState(true);
  const [businessGame, setBusinessGame] = useState(true);
  const { t, show, onHide } = props;

  useEffect(() => {
    setName("");
    setInvalid("none");
  }, [props.show]);

  useEffect(() => {
    if (duplicateSuccess) {
      SwalModal({
        text: t("moduleConfig.modalDuplicateConfig.successMessage"),
        icon: "success",
      });
      dispatch(initSuccess());
    }
  }, [duplicateSuccess]);

  const valide = () => {
    let isDuplicated = false;

    for (const config of configurations) {
      if (config.moduleInstanceName === name) {
        isDuplicated = true;
        break;
      }
    }

    if (name !== "" && !isDuplicated) {
      dispatch(
        duplicateConfiguration({
          moduleInstanceId: props.moduleInstanceId,
          moduleInstanceName: name,
          notions,
          quizzes: quiz,
          games: businessGame,
        })
      );
      props.onHide({ name, notions, quiz, businessGame });
    } else {
      setInvalid("initial");
    }
  };

  const handleInputNotionsChange = () => {
    setNotions(!notions);
  };

  const handleInputQuizChange = () => {
    setQuiz(!quiz);
  };

  const handleInputBusinessGameChange = () => {
    setBusinessGame(!businessGame);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <Container>
          <h4>{t("moduleConfig.modalDuplicateConfig.title")}</h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t("moduleConfig.modalDuplicateConfig.name")}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t("moduleConfig.modalDuplicateConfig.title")}
                  onChange={(e) => {
                    setName(e.target.value);
                    setInvalid("none");
                  }}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: `${invalid}` }}
                >
                  {t("moduleConfig.modalDuplicateConfig.errorName")}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <div
                className="checkbox checkbox-primary mt-3"
                style={{ marginLeft: "6px" }}
              >
                <input
                  id="notions-checkbox"
                  type="checkbox"
                  onChange={handleInputNotionsChange}
                  checked={notions}
                />
                <label htmlFor="notions-checkbox">
                  {t("moduleConfig.modalDuplicateConfig.notions")}
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div
                className="checkbox checkbox-primary"
                style={{ marginLeft: "6px" }}
              >
                <input
                  id="quiz-checkbox"
                  type="checkbox"
                  onChange={handleInputQuizChange}
                  checked={quiz}
                />
                <label htmlFor="quiz-checkbox">
                  {t("moduleConfig.modalDuplicateConfig.quiz")}
                </label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div
                className="checkbox checkbox-primary"
                style={{ marginLeft: "6px" }}
              >
                <input
                  id="business-game-checkbox"
                  type="checkbox"
                  onChange={handleInputBusinessGameChange}
                  checked={businessGame}
                />
                <label htmlFor="business-game-checkbox">
                  {t("moduleConfig.modalDuplicateConfig.businessGameConfig")}
                </label>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide(false)}
              >
                {t("moduleConfig.modalDuplicateConfig.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}
              >
                {t("moduleConfig.modalDuplicateConfig.add")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const ModuleConfigurations = (props) => {
  const loading = useSelector((state) => state.Configuration.loading);
  const module = useSelector((state) => state.Module.module);

  const moduleConfiguration = useSelector(
    (state) => state.Configuration.configurations
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modalShow, setModalShow] = useState(false);
  const [moduleConfigs, setModuleConfigs] = useState([]);

  useEffect(() => {
    setModuleConfigs(moduleConfiguration);
  }, [moduleConfiguration]);

  useEffect(() => {
    const id = decrypt(props.match.params.moduleID);
    dispatch(getAllConfiguration(id));
  }, [props.match.params.moduleID]);

  const searchConfiguration = (value) => {
    const search_ = new RegExp(value, "i"); // prepare a regex object
    const res = moduleConfiguration.filter((item) => {
      return (
        search_.test(item.moduleInstanceName) || search_.test(item.creationDate)
      );
    });

    setModuleConfigs(res);
  };

  const sort = (selectedValue) => {
    if (selectedValue.value === "date") {
      //console.log(selectedValue);
      const res = moduleConfigs.sort((a, b) =>
        moment(a.creationDate).diff(moment(b.creationDate))
      );
      return setModuleConfigs([...res]);
    }
  };

  return (
    <React.Fragment>
      <AddConfigModal
        moduleID={decrypt(props.match.params.moduleID)}
        t={t}
        show={modalShow}
        onHide={(value) => {
          setModalShow(false);
        }}
      />

      <div>
        {loading && <Loader />}
        <Row className="mb-1">
          <Col lg={3}>
            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
              <h4 className="mb-0">{module.moduleName}</h4>
            </ul>
          </Col>
          <Col lg={9}>
            <div
              className="d-flex justify-content-end controls-bar"
              style={{ flexWrap: "wrap" }}
            >
              <div className="p-1 flex-grow-1 ">
                <button
                  onClick={() => {
                    setModalShow(true);
                  }}
                  type="button"
                  className="btn btn-primary waves-effect width-md waves-light module-btn float-right"
                  style={{ backgroundColor: "#5A97F8" }}
                >
                  <img className="mr-2" src={plusSolid} alt="" title="" />
                  {t("moduleConfig.addConfig")}
                </button>
              </div>
              <div className="p-1 flex-grow-2 search-box">
                <div className="input-group">
                  <input
                    onChange={(e) => {
                      searchConfiguration(e.target.value);
                    }}
                    type="text"
                    className="form-control search-container"
                    placeholder={t("moduleConfig.search") + "..."}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn search-button"
                      type="submit"
                      onClick={() => searchConfiguration}
                    >
                      <i className="fe-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-1 flex-grow-3">
                <h5 className="mr-2" style={{ display: "inline-block" }}>
                  {t("moduleConfig.sort")}
                </h5>
                <div
                  className="width170 module-select"
                  style={{ display: "inline-block" }}
                >
                  <Select
                    menuPlacement="auto"
                    menuPosition="fixed"
                    value={"date"}
                    onChange={sort}
                    options={[
                      { value: "date", label: t("moduleConfig.byDate") },
                    ]}
                    placeholder={t("moduleConfig.byDate")}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {moduleConfigs.length
            ? moduleConfigs.map((item, index) => (
                <CardConfig key={index} {...item} t={t} index={index} />
              ))
            : null}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModuleConfigurations;

import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Translation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { Card, CardBody, Col, Row, Tooltip } from "reactstrap";

import Loader from "../../../components/Loader";
import { encrypt } from "../../../helpers/crypto";
import { parse } from "../../../helpers/func";
import { getAllModules, getModuleByIDSuccess } from "../../../redux/actions";

const ShowModule = (props) => {
  const {
    moduleName,
    moduleField,
    numberOfSessions,
    description,
    numberOfConfigurations,
    creationDate,
    clientName,
    businessGame,
    gameLogoPath
  } = props.module;
  const {t} = useTranslation();
  return (
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // backdrop={"static"}
    >
      <Modal.Body>
        <div
          className="card-box project-box p-0 mb-0"
          style={{ backgroundColor: "#fdfdfd" }}
        >
          {businessGame && (
            <div className="float-right">
              <img
                src={gameLogoPath}
                width={25}
                style={{ borderRadius: "50%" }}
                alt=""
              />
            </div>
          )}

          <h4 className="mt-0 mb-0">{moduleName}</h4>
          <p
            className="text-success text-uppercase font-13"
            style={{ marginBottom: "5px", marginTop: "5px" }}
          >
            {moduleField}
          </p>
          <h6
            style={{
              fontSize: "12px",
              color: "#BCBCBC",
              font: "Regular 12px Karla",
              letterSpacing: "0.24px",
              opacity: "1",
              marginTop: "0px",
            }}
          >
             {t('moderatorModule.createdAt')} {creationDate}
          </h6>

          <h5 className="mt-0 mb-2">{t('moderatorModule.clientName')} : {clientName}</h5>

          <p className="text-muted font-13 mb-0 ">{description}</p>

          <ul className="list-inline mb-0">
            <li className="list-inline-item mr-4">
              <h4 className="mb-0">{parse(numberOfSessions)}</h4>
              <p className="text-muted">Sessions</p>
            </li>
            <li className="list-inline-item">
              <h4 className="mb-0">{parse(numberOfConfigurations)}</h4>
              <p className="text-muted">Configurations</p>
            </li>
          </ul>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const CardModule = (props) => {
  const dispatch = useDispatch()
  const {
    moduleAffectationId,
    moduleName,
    moduleField,
    description,
    numberOfConfigurations,
    numberOfSessions,
    creationDate,
    moduleId,
    clientId,
    gameLogoPath,
    clientName,
    businessGame,
    gameName
  } = props;
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

  return (
    <Translation>
      {(t) => (
        <Card>
          <CardBody
            className="card-box project-box mb-0 pb-0"
            style={{ cursor: "pointer" }}
            onClick={() => {
              props.onPress(props.item);
            }}
          >
            {businessGame && (
              <div className="dropdown float-right">
                <div
                  className="dropdown-toggle arrow-none card-drop"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {/* <i className="mdi mdi-dots-vertical"></i> */}
                  <img
                    src={gameLogoPath}
                    width={25}
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                </div>
              </div>
            )}
            <h4 className="mt-0 mb-0" style={{ 
              'overflow': 'hidden',
              'text-overflow': 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '1',
              '-webkit-box-orient': 'vertical'
            }}>{moduleName}</h4>
            <p
              className="text-success text-uppercase font-13"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              {moduleField}
            </p>
            <h6
              style={{
                fontSize: "12px",
                color: "#BCBCBC",
                font: "Regular 12px Karla",
                letterSpacing: "0.24px",
                opacity: "1",
                marginTop: "0px",
              }}
            >
              {t('moderatorModule.createdAt')}  {creationDate}
            </h6>

            <p
              className="text-muted font-13 mb-0 about-container"
              style={{ height: "3.0em" }}
            >
              {description}...
            </p>

            <ul className="list-inline mb-0">
              <li className="list-inline-item mr-4">
                <h4 className="mb-0">{parse(numberOfSessions)}</h4>
                <p className="text-muted">Sessions</p>
              </li>
              <li className="list-inline-item">
                <h4 className="mb-0">{parse(numberOfConfigurations)}</h4>
                <p className="text-muted">Configurations</p>
              </li>
            </ul>
          </CardBody>
          <div className="tool-box-container">
            <Link
              id="sessions"
               to={ `/moderator/modules/${encrypt(moduleAffectationId)}/sessions`}
              onClick={() => {
                dispatch(
                  getModuleByIDSuccess(
                    {
                      moduleAffectationId,
                      moduleName,
                      moduleField,
                      description,
                      numberOfConfigurations,
                      numberOfSessions,
                      creationDate,
                      moduleId,
                      clientId,
                      gameLogoPath,
                      clientName,
                      businessGame,
                      gameName
                    },
                    []
                  )
                );
              }}
              className="tool-box"
            >
              <i className="fas fa-chalkboard-teacher  fa-2x" />

              <Tooltip
                placement="top"
                isOpen={tooltipOpen}
                target="sessions"
                toggle={toggle}
              >
                sessions
              </Tooltip>
            </Link>

            <Link
              id="config"
              to={`/moderator/modules/${encrypt(moduleAffectationId)}/config`}
              onClick={() => {
                dispatch(
                  getModuleByIDSuccess(
                    {
                      moduleAffectationId,
                      moduleName,
                      moduleField,
                      description,
                      numberOfConfigurations,
                      numberOfSessions,
                      creationDate,
                      moduleId,
                      clientId,
                      gameLogoPath,
                      clientName,
                      businessGame,
                      gameName
                    },
                    []
                  )
                );
              }}
              className="tool-box"
            >
              <i className="fas fa-cogs  fa-2x" />
              <Tooltip
                placement="top"
                isOpen={tooltipOpen2}
                target="config"
                toggle={toggle2}
              >
                configurations
              </Tooltip>
            </Link>
          </div>
        </Card>
      )}
    </Translation>
  );
};

const Module = (props) => {
  const [modules_, setModules] = useState(null);
  const [selectedOption] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [module, setModule] = useState({});

  const dispatch = useDispatch();

  const { modules, loading, fields, user } = useSelector((state) => {
    const fields = [];
    state.Module.modules.forEach((module) => {
      fields.push(module.moduleField);
    });

    return {
      modules: state.Module.modules,
      loading: state.Module.loading,
      fields: [...new Set(fields)],
      user: state.Auth,
    };
  });

  useEffect(() => {
    dispatch(getAllModules(user.id));

    return () => {};
  }, []);

  const handleChange = (selectedOption) => {
    //    setSelectedOption(selectedOption);
    //    setModules(props.modules);
    filter(selectedOption);
  };

  const generateOptions = (t) => {
    const options = [{ value: null, label: t("dashboard.allModules") }];
    fields.map((item) => {
      return options.push({ value: item, label: item });
    });

    return options;
  };

  const searchModules = (value) => {
    const search_ = new RegExp(value, "i"); // prepare a regex object
    const res = modules.filter((item) => {
      return (
        search_.test(item.moduleField) ||
        search_.test(item.description) ||
        search_.test(item.moduleName)
      );
    });

    setModules(res);
  };

  const filter = (selectedOption) => {
    if (selectedOption.value == null) return setModules(modules);

    const search_ = new RegExp(selectedOption.value, "i");
    let res = modules.filter((item) => {
      return search_.test(item.moduleField);
    });

    setModules(res);
  };

  return (
    <Translation>
      {(t) => (
        <React.Fragment>
          <ShowModule
            show={modalShow}
            module={module}
            onHide={() => {
              setModalShow(false);
            }}
          />

          <div className="">
            {loading && <Loader />}
            <Row className="mb-1">
              <Col lg={3}>
                {/* <ul className="list-unstyled topnav-menu topnav-menu-left m-0"> */}
                <h4 className="mt-2">{t("dashboard.modules")}</h4>
                {/* </ul>  */}
              </Col>
              <Col lg={9}>
                <div
                  className="d-flex justify-content-end controls-bar"
                  style={{ flexWrap: "wrap" }}
                >
                  <div className="p-1 flex-grow-1 "></div>
                  <div
                    className="p-1 flex-grow-2 "
                    style={{ maxWidth: "254px" }}
                  >
                    <div className="input-group">
                      <input
                        onChange={(e) => {
                          searchModules(e.target.value);
                        }}
                        type="text"
                        className="form-control search-container"
                        placeholder={t("dashboard.searchLabel") + "..."}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn search-button"
                          type="submit"
                          onClick={searchModules}
                        >
                          <i className="fe-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-1 flex-grow-3">
                    <h5 className="mr-2" style={{ display: "inline-block" }}>
                      {t("dashboard.filterLabel")}
                    </h5>
                    <div
                      className="width170 module-select"
                      style={{ display: "inline-block" }}
                    >
                      <Select
                        menuPlacement="auto"
                        menuPosition="fixed"
                        value={selectedOption}
                        onChange={handleChange}
                        options={generateOptions(t)}
                        placeholder={t("dashboard.allModules")}
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              {modules_
                ? modules_.map((item, index) => {
                    return (
                      <Col xl={4} key={"" + index}>
                        <CardModule {...item} t={t}/>
                      </Col>
                    );
                  })
                : modules.map((item, index) => {
                    return (
                      <Col xl={4} key={"" + index}>
                        <CardModule
                          {...item}
                          item={item}
                          onPress={(item) => {
                            setModule(item);
                            setModalShow(true);
                          }}
                        />
                      </Col>
                    );
                  })}
            </Row>
          </div>
        </React.Fragment>
      )}
    </Translation>
  );
};

export default Module;

import React, { useEffect, useState } from "react";
import {Dropdown, DropdownButton, Modal} from "react-bootstrap";
import { Translation, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import {Button, Card, CardBody, CardImg, Col, DropdownToggle, Row, Tooltip} from "reactstrap";
import { Form } from 'react-bootstrap'
import Loader from "../../../components/Loader";
import { encrypt } from "../../../helpers/crypto";
import { parse } from "../../../helpers/func";
import { getAllModules, getModuleByIDSuccess } from "../../../redux/actions";
import {ModalsTest} from "../../FinEdge/modalsTest";
import ellipsisVSolid from "../../../assets/images/ellipsis-v-solid.svg";

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
            // style={{ cursor: "pointer" }}
            onClick={() => {
              // props.onPress(props.item);
            }}
          >
            <div className="ellipsis-position" style={{zIndex: '100'}}>
              <ModalTestEdit />
              <ModalTestDelete />
              {/*<DropdownButton id="dropdown-basic-button" title="Dropdown button">*/}
              {/*  <ModalTest>Edit</ModalTest>*/}
              {/*  <ModalTest>Create</ModalTest>*/}
              {/*</DropdownButton>*/}

            </div>

            <h4 className="mt-0 mb-0" style={{ 
              'overflow': 'hidden',
              'text-overflow': 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': '1',
              '-webkit-box-orient': 'vertical',
            }}> Nom Du Cours </h4>
            <CardImg top width="250px" src="https://tinyurl.com/fev5whyw" alt="Card image cap" style={{'margin-top': '10px'}}/>
            <p
              className="text-success text-uppercase font-13"
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              {moduleField} Thematique
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
              {t('moderatorModule.createdAt')}  {creationDate} 08/06/2021
            </h6>

            <p
              className="text-muted font-13 mb-0 about-container"
              style={{ height: "3.0em" }}
            >
              Description du cours
              {description}...
            </p>

            <ul className="list-inline mb-0" style={{'display': 'flex', 'justifyContent': 'space-around'}}>
              <li className="list-inline-item mr-4">
                <h4 className="mb-0">10</h4>
                <p className="text-muted">Sessions</p>
              </li>
              <li className="list-inline-item mr-4">
                <h4 className="mb-0">10</h4>
                <p className="text-muted">Modules</p>
              </li>
              <li className="list-inline-item">
                <h4 className="mb-0">10</h4>
                <p className="text-muted">Evaluations</p>
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
                edit
              </Tooltip>
            </Link>
          </div>
        </Card>
      )}
    </Translation>
  );
};
const FormTest = () => {
  return (
      <>
        <Form>
          <Form.Group>
            <Form.File id="exampleFormControlFile1" label="Image file input" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nom Du Cours</Form.Label>
            <Form.Control type="text" placeholder="Enter le nom du cours" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Section</Form.Label>
            <Form.Control type="text" placeholder="Section" />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Enregistrer
          </Button>
        </Form>
      </>
  )
}

const ModalTestCreate = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <button onClick={handleShow} type="button" className="btn btn-primary waves-effect width-md waves-light module-btn float-right" style={{backgroundColor:'#5A97F8'}} >
          <img className="mr-2" src="/static/media/plus-solid.b59f1db3.svg" alt="" title="" />
          Creer un nouveau cours
        </button>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*Form here*/}
            <FormTest />
          </Modal.Body>
        </Modal>
      </>
  );
}

const ModalTestEdit = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <img onClick={handleShow} src="/static/media/ellipsis-v-solid.72a3efd9.svg" alt="" title="" style={{'cursor': "pointer"}}/>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*Form here*/}
            <FormTest />
          </Modal.Body>
        </Modal>
      </>
  );
}

const ModalTestDelete = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <>
        <i onClick={handleShow} className="fa fa-trash" aria-hidden="true" style={{'marginLeft':'20px', 'cursor': 'pointer'}}></i>
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/*Form here*/}
           Vous etes sure que vous voulez supprimer ce cours ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Confirmer
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  );
}

const Cours = (props) => {
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
                {/*<h4 className="mt-2">{t("dashboard.modules")}</h4>*/}
                {/* </ul>  */}
              </Col>
              <Col lg={9}>
                <div
                  className="d-flex justify-content-end controls-bar"
                  style={{ flexWrap: "wrap" }}
                >
                  <div className="p-1 flex-grow-1 ">
                      {/*    Create New Course*/}
                      <ModalTestCreate />
                      {/*<ModalTestCreate />*/}

                  </div>
                  <div
                    className="p-1 flex-grow-2 "
                    style={{ maxWidth: "254px" }}
                  >
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
              <Col xl={4}>
                <CardModule />
              </Col>
              <Col xl={4}>
                <CardModule />
              </Col>
              <Col xl={4}>
                <CardModule />
              </Col>
              <Col xl={4}>
                <CardModule />
              </Col>
              <Col xl={4}>
                <CardModule />
              </Col>
            </Row>
          </div>
        </React.Fragment>
      )}
    </Translation>
  );
};

export default Cours;

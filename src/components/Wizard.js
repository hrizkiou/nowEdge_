import React, { useState, useEffect, Component } from "react";
import {
  Row,
  ButtonGroup,
  Button,
  Col,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import { Tab, Nav, Modal } from "react-bootstrap";
import { ReactComponent as Groupe332 } from "../assets/images/groupe332.svg";
import { ReactComponent as Chimney } from "../assets/images/chimney.svg";
import { ReactComponent as Megaphone } from "../assets/images/megaphone.svg";
import { ReactComponent as Setup } from "../assets/images/setup.svg";
import dollar from "../assets/images/dollar-sign-solid.svg";

import industrySolid from "../assets/images/industry-solid.svg";
import coinsSolid from "../assets/images/coins-solid.svg";
import shipSolid from "../assets/images/ship-solid.svg";
import BarOneExChart from "./charts/BarOneExChart";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Dropzone, { useDropzone } from "react-dropzone";

import {
  updateStratEdgeProduct,
  updateStratEdgeCompetitor,
  updateStratEdgeMarket,
  updateStratEdgeStrategicDecision,
} from "../redux/StratEdge/actions";
import { useHistory } from "react-router-dom";
import { toFixedOnlyFloat } from "../helpers/func";
import SwalModal from "./SwalModal";

const Basic = ({ setImgErro, setImg }) => {
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      // setImg(files[0]);
    },
    accept: ".jpeg,.jpg,.png",
    multiple: false,
    minSize: 0,
    maxSize: 5242880,
    onDropRejected: (e) => {
      // setImgErro(true);
    },
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="container-img"
      >
        <input {...getInputProps()} />
        <i className="fe-upload-cloud" style={{ fontSize: "44px" }}></i>
        <p>Drag and drop a file here, or click to select file</p>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </section>
  );
};

const AnsP = ({ product, t }) => {
  const [show, setShow] = useState(false);

  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );
  const {
    register,
    errors,
    handleSubmit,
    setValue,
    unregister,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      name: product && product.name,
      description: product && product.description,
    },
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      setImg(files[0]);
    },
    accept: ".jpeg,.jpg,.png",
    multiple: false,
    minSize: 0,
    maxSize: 5242880,
    onDropRejected: (e) => {
      register("image", { required: true });
    },
  });
  const dispatch = useDispatch();
  const [image, setImg] = useState(null);

  const files = acceptedFiles.map((file) => {
    return (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    );
  });
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (show) {
      setValue("name", product && product.name);
      setValue("description", product && product.description);
    }
  }, [show]);

  useEffect(() => {
    if (errors.image)
      setTimeout(() => {
        reset({
          name: getValues("name"),
          description: getValues("description"),
        });
        unregister("image");
      }, 3000);
  }, [errors]);

  const onSubmit = (data) => {
    dispatch(
      updateStratEdgeProduct({
        ...data,
        image,
        id: product.id,
        stratEdgeConfigurationId: product.stratEdgeConfigurationId,
        imagePath: product.imagePath,
      })
    );
    setShow(false);
  };

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={"static"}
      >
        <Modal.Body className="p-0">
          <div className="card-box m-0 p-0">
            <form
              id="productF"
              className="p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h4 className="mt-0 mb-3 header-title">
                {t("stratEdge.config.analyseProduct")}
              </h4>
              <FormGroup>
                <Label for="examplePassword">
                  {t("stratEdge.config.AnsP.name")}
                </Label>
                <Input
                  invalid={errors.name ? true : false}
                  name="name"
                  placeholder={t("stratEdge.config.AnsP.name")}
                  innerRef={register({ required: true })}
                />
                <FormFeedback>
                  {t("stratEdge.config.AnsP.nameValidation")}
                </FormFeedback>
              </FormGroup>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">
                  {t("stratEdge.config.AnsP.image")}
                </label>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="container-img"
                >
                  <input {...getInputProps()} name="imagePath" />
                  <i
                    className="fe-upload-cloud"
                    style={{ fontSize: "44px" }}
                  ></i>
                  <p>{t("stratEdge.config.AnsP.imageValidation")}</p>
                </div>
                <section className="container">
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </section>
                {errors.image && (
                  <div className="invalid-feedback d-block">
                    {t("stratEdge.config.AnsP.imageError")}
                  </div>
                )}
              </div>

              <FormGroup>
                <Label for="description">
                  {t("stratEdge.config.AnsP.description")}
                </Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  innerRef={register({ required: true })}
                  rows="5"
                  invalid={errors.description ? true : false}
                />
                <FormFeedback>
                  {t("stratEdge.config.AnsP.descriptionValidation")}
                </FormFeedback>
              </FormGroup>
              <div className="form-group text-right mb-0">
                <button
                  type="reset"
                  onClick={handleClose}
                  className="btn btn-secondary waves-effect waves-light mr-1"
                >
                  {t("stratEdge.config.AnsP.retour")}
                </button>
                <button
                  // onClick={handleClose}
                  className="btn btn-primary waves-effect waves-light "
                  form="productF"
                  type="submit"
                >
                  {t("stratEdge.config.AnsP.save")}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Card className="mb-0">
        <CardBody>
          {selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && (
            <div className="float-right adp-edit-btn" onClick={handleShow}>
              <i className="fas fa-pen"></i>
            </div>
          )}
          <Row>
            <Col lg={2}>
              <img
                src={
                  product &&
                  product.imagePath &&
                  product.imagePath !== null &&
                  product.imagePath !== "null"
                    ? product.imagePath
                    : "https://via.placeholder.com/133"
                }
                className="rounded-circle img-thumbnail avatar-lg adp-img"
                alt="dsdkshd"
              />
            </Col>
            <Col lg={10}>
              <div className="adp-CardTitle"> {product && product.name}</div>
              {/* <div className="adp-CardSubtitle">Description</div> */}
              <div className="adp-CardText">
                {product && product.description}
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  );
};

const Competitor = ({ competitor = {}, t }) => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState();
  const [imgErro, setImgErro] = useState(false);

  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      setImg(files[0]);
    },
    accept: ".jpeg,.jpg,.png",
    multiple: false,
    minSize: 0,
    maxSize: 5242880,
    onDropRejected: (e) => {
      setImgErro(true);
    },
  });
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const { register, errors, setValue, handleSubmit } = useForm({
    defaultValues: {
      name: competitor && competitor.name,
      description: competitor && competitor.description,
      fixedName: competitor && competitor.fixedName,
      chiffresCles: competitor && competitor.chiffresCles,
      productionCost: competitor && competitor.productionCost,
      productionCapacity: competitor && competitor.productionCapacity,
      fretMarket1: competitor && competitor.fretMarket1,
      fretMarket2: competitor && competitor.fretMarket2,
    },
  });

  useEffect(() => {
    setValue("fretMarket1", competitor.fretMarket1);
    setValue("name", competitor.name);
    setValue("description", competitor.description);
    setValue("productionCapacity", competitor.productionCapacity);
    setValue("fretMarket2", competitor.fretMarket2);
    setValue("productionCost", competitor.productionCost);
    setValue("chiffresCles", competitor.chiffresCles);
  }, [show]);

  useEffect(() => {
    setTimeout(() => {
      setImgErro(false);
    }, 3000);
  }, [imgErro]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if (!imgErro) {
      dispatch(
        updateStratEdgeCompetitor({
          ...data,
          id: competitor.id,
          stratEdgeConfigurationId: competitor.stratEdgeConfigurationId,
          imagePath: competitor.imagePath,
          image: img,
        })
      );
      setShow(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const Item = ({ text, nbr, marginLeft = 0, icon = null }) => {
    return (
      <div className="d-flex" style={{ marginLeft: `${marginLeft}px` }}>
        <div>
          <img
            src={icon || "https://via.placeholder.com/34"}
            // className="rounded-circle img-thumbnail avatar-lg adp-img"
            alt="Cardcap"
            style={{
              width: "34px",
              height: "34px",
              marginRight: "7px",
            }}
          />
        </div>
        <div>
          <div className="adc-item-f-title">{nbr}</div>
          <div className="adc-item-s-title">{text}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      {show && (
        <Modal
          //   size="lg"
          show={show}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          backdrop={"static"}
        >
          <Modal.Body className="p-0">
            <div className="card-box m-0 p-0">
              <form
                id="competitorFrom"
                className="p-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <h4 className="mt-0 mb-3 header-title">{competitor.name}</h4>
                <FormGroup>
                  <Label>{t("stratEdge.config.AnsP.name")}</Label>
                  <Input
                    invalid={errors.name ? true : false}
                    name="name"
                    placeholder={t("stratEdge.config.AnsP.name")}
                    innerRef={register({ required: true })}
                  />
                  <FormFeedback>
                    {t("stratEdge.config.AnsP.nameValidation")}
                  </FormFeedback>
                </FormGroup>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">
                    {t("stratEdge.config.AnsP.image")}
                  </label>
                  <div
                    {...getRootProps({ className: "dropzone" })}
                    className="container-img"
                  >
                    <input {...getInputProps()} />
                    <i
                      className="fe-upload-cloud"
                      style={{ fontSize: "44px" }}
                    ></i>
                    <p>{t("stratEdge.config.AnsP.imageValidation")}</p>
                  </div>
                  {imgErro && (
                    <div className="invalid-feedback d-block">
                      {t("stratEdge.config.AnsP.imageError")}
                    </div>
                  )}
                  <section className="container">
                    <aside>
                      <ul>{files}</ul>
                    </aside>
                  </section>
                </div>
                <FormGroup>
                  <Label>{t("stratEdge.config.AnsP.description")}</Label>
                  <Input
                    invalid={errors.description ? true : false}
                    name="description"
                    placeholder="description"
                    type="textarea"
                    rows="3"
                    innerRef={register({ required: true })}
                  />
                  <FormFeedback>
                    {t("stratEdge.config.AnsP.descriptionValidation")}
                  </FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label>{t("stratEdge.config.AnsC.chiffreCles")}</Label>
                  <Input
                    invalid={errors.chiffresCles ? true : false}
                    name="chiffresCles"
                    type="textarea"
                    rows="3"
                    innerRef={register({ required: true })}
                  />
                  <FormFeedback>
                    {t("stratEdge.config.AnsC.chiffreClesValidation")}
                  </FormFeedback>
                </FormGroup>

                <div className="row">
                  <div className="col-md-6">
                    <FormGroup>
                      <Label>{t("stratEdge.config.AnsC.capacity")}</Label>
                      <Input
                        invalid={errors.productionCapacity ? true : false}
                        name="productionCapacity"
                        innerRef={register({ required: true })}
                      />
                      <FormFeedback>
                        {t("stratEdge.config.AnsC.capacityValidation")}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        {t("stratEdge.config.AnsC.costTransportFM")}
                      </Label>
                      <Input
                        invalid={errors.fretMarket1 ? true : false}
                        name="fretMarket1"
                        innerRef={register({ required: true })}
                      />
                      <FormFeedback>
                        {t("stratEdge.config.AnsC.costTransportFMValidation")}
                      </FormFeedback>
                    </FormGroup>
                  </div>

                  <div className="col-md-6">
                    <FormGroup>
                      <Label>{t("stratEdge.config.AnsC.cost")}</Label>
                      <Input
                        invalid={errors.productionCost ? true : false}
                        name="productionCost"
                        innerRef={register({ required: true })}
                      />
                      <FormFeedback>
                        {t("stratEdge.config.AnsC.costValidation")}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        {t("stratEdge.config.AnsC.costTransportSM")}
                      </Label>
                      <Input
                        invalid={errors.fretMarket2 ? true : false}
                        name="fretMarket2"
                        innerRef={register({ required: true })}
                      />
                      <FormFeedback>
                        {t("stratEdge.config.AnsC.costTransportFMValidation")}
                      </FormFeedback>
                    </FormGroup>
                  </div>
                </div>
                <div className="form-group text-right mb-0">
                  <button
                    type="reset"
                    onClick={handleClose}
                    className="btn btn-secondary waves-effect waves-light mr-1"
                  >
                    {t("stratEdge.config.AnsP.retour")}
                  </button>
                  <button
                    // onClick={handleClose}
                    type="submit"
                    className="btn btn-primary waves-effect waves-light "
                  >
                    {t("stratEdge.config.AnsP.save")}
                  </button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      )}
      {selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && (
        <div className="float-right adp-edit-btn" onClick={handleShow}>
          <i className="fas fa-pen"></i>
        </div>
      )}
      <Row>
        <Col lg={2}>
          <img
            src={
              competitor &&
              competitor.imagePath &&
              competitor.imagePath !== null &&
              competitor.imagePath !== "null"
                ? competitor.imagePath
                : "https://via.placeholder.com/133"
            }
            className="rounded-circle img-thumbnail avatar-lg adp-img"
            alt="Cardimagecap"
          />
        </Col>
        <Col lg={10}>
          <div className="adp-CardSubtitle">
            {competitor && competitor.name}
          </div>
          <div className="adp-CardText">
            {t("stratEdge.config.AnsP.description")}
          </div>
          <div className="adp-CardText" style={{ marginBottom: "10px" }}>
            {competitor && competitor.description}
          </div>
          <div className="adp-CardText">
            {t("stratEdge.config.AnsC.chiffreCles")}
          </div>

          <div
            className="adp-CardSubtitle"
            style={{
              font: "16px/17px Karla",
            }}
          >
            {competitor && competitor.chiffresCles}
          </div>

          <div className="d-flex mt-2 ">
            <Item
              text={t("stratEdge.config.AnsC.capacity")}
              nbr={competitor && competitor.productionCapacity}
              icon={industrySolid}
            />
            <Item
              text={t("stratEdge.config.AnsC.cost")}
              nbr={competitor && competitor.productionCost}
              marginLeft="17"
              icon={coinsSolid}
            />
            <Item
              text={t("stratEdge.config.AnsC.costTransportFM")}
              nbr={competitor && competitor.fretMarket1}
              marginLeft="17"
              icon={shipSolid}
            />
            <Item
              text={t("stratEdge.config.AnsC.costTransportSM")}
              nbr={competitor && competitor.fretMarket2}
              marginLeft="17"
              icon={shipSolid}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
const AnsC = ({ competitors = [], t }) => {
  const [competitors_, setCompetitors] = useState(
    competitors.sort((a, b) => {
      const bandA = a.fixedName.toUpperCase();
      const bandB = b.fixedName.toUpperCase();

      let comparison = 0;
      if (bandA > bandB) {
        comparison = 1;
      } else if (bandA < bandB) {
        comparison = -1;
      }
      return comparison;
    }) || [{}, {}, {}, {}]
  );

  useEffect(() => {
    setCompetitors(
      competitors.sort((a, b) => {
        const bandA = a.fixedName.toUpperCase();
        const bandB = b.fixedName.toUpperCase();

        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
      }) || [{}, {}, {}, {}]
    );
  }, [competitors]);

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first-wiz">
        <Row>
          <Col style={{ marginLeft: "1px" }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first-wiz" className="tab-anc">
                  {competitors_[0] && competitors_[0].name}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second-wiz" className="tab-anc">
                  {competitors_[1] && competitors_[1].name}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="try-wiz" className="tab-anc">
                  {competitors_[2] && competitors_[2].name}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="for-wiz" className="tab-anc">
                  {competitors_[3] && competitors_[3].name}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first-wiz">
                <Competitor competitor={competitors_[0]} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="second-wiz">
                <Competitor competitor={competitors_[1]} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="try-wiz">
                <Competitor competitor={competitors_[2]} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="for-wiz">
                <Competitor competitor={competitors_[3]} t={t} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

const Market = ({ market, t }) => {
  const [show, setShow] = useState(false);
  const [img, setImg] = useState(false);
  const [imgErro, setImgErro] = useState(false);

  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: market && market.name,
      description: market && market.description,
      id: market && market.id,
      stratEdgeConfigurationId: market && market.stratEdgeConfigurationId,
      fixedName: market && market.fixedName,
      imagePath: market && market.imagePath,
      //demand0: market && market.demand0,
      demand1: market && market.demand1,
      demand2: market && market.demand2,
      demand3: market && market.demand3,
      demand4: market && market.demand4,
      demand5: market && market.demand5,
    },
  });
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      setImg(files[0]);
    },
    accept: ".jpeg,.jpg,.png",
    multiple: false,
    minSize: 0,
    maxSize: 5242880,
    onDropRejected: () => setImgErro(true),
  });
  const onSubmit = (data) => {
    if (!imgErro) {
      dispatch(
        updateStratEdgeMarket({
          ...market,
          ...data,
          image: img,
        })
      );
      setShow(false);
    }
  };
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    setTimeout(() => {
      setImgErro(false);
    }, 3000);
  }, [imgErro]);

  useEffect(() => {
    setValue("name", market.name);
   // setValue("demand0", market.demand0);
    setValue("description", market.description);
    setValue("demand2", market.demand2);
    setValue("demand4", market.demand4);
    setValue("demand1", market.demand1);
    setValue("demand3", market.demand3);
    setValue("demand5", market.demand5);
  }, [show]);
  return (
    <>
      <Modal
        //   size="lg"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={"static"}
      >
        <Modal.Body className="p-0">
          <div className="card-box m-0 p-0">
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="mt-0 mb-3 header-title">{market.name}</h4>
              <FormGroup>
                <Label for="examplePassword">{t('stratEdge.config.AnsP.name')}</Label>
                <Input
                  invalid={errors.name ? true : false}
                  name="name"
                  innerRef={register({ required: true })}
                />
                <FormFeedback>{t('stratEdge.config.AnsP.nameValidation')}</FormFeedback>
              </FormGroup>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">{t('stratEdge.config.AnsP.image')}</label>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="container-img"
                >
                  <input {...getInputProps()} />
                  <i
                    className="fe-upload-cloud"
                    style={{ fontSize: "44px" }}
                  ></i>
                  <p>{t('stratEdge.config.AnsP.imageValidation')}</p>
                </div>
                {imgErro && (
                  <div className="invalid-feedback d-block">
                    {t('stratEdge.config.AnsP.imageError')}
                  </div>
                )}
                <section className="container">
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </section>
              </div>
              <FormGroup>
                <Label for="examplePassword">{t('stratEdge.config.AnsP.description')}</Label>
                <Input
                  invalid={errors.description ? true : false}
                  name="description"
                  type="textarea"
                  rows={3}
                  innerRef={register({ required: true })}
                />
                <FormFeedback>{t('stratEdge.config.AnsP.descriptionValidation')}</FormFeedback>
              </FormGroup>

              <h4 className="mb-3">{t('stratEdge.config.AnsM.evolutionDemand')}</h4>
              <div className="row">
                <div className="col-md-6">
                  {/* <FormGroup>
                    <Label for="examplePassword">T = 0</Label>
                    <Input
                      invalid={errors.demand0 ? true : false}
                      name="demand0"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 0"})}</FormFeedback>
                  </FormGroup> */}
                  <FormGroup>
                    <Label for="examplePassword">T = 1</Label>
                    <Input
                      invalid={errors.demand1 ? true : false}
                      name="demand1"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 1"})}</FormFeedback>
                  </FormGroup>

                  <FormGroup>
                    <Label for="examplePassword">T = 2</Label>
                    <Input
                      invalid={errors.demand2 ? true : false}
                      name="demand2"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 2"})}</FormFeedback>
                  </FormGroup>

                </div>

                <div className="col-md-6">

                  <FormGroup>
                    <Label for="examplePassword">T = 3</Label>
                    <Input
                      invalid={errors.demand3 ? true : false}
                      name="demand3"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 3"})}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">T = 4</Label>
                    <Input
                      invalid={errors.demand4 ? true : false}
                      name="demand4"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 4"})}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">T = 5</Label>
                    <Input
                      invalid={errors.demand5 ? true : false}
                      name="demand5"
                      innerRef={register({ required: true })}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsM.isRequireT', {value: "T = 5"})}</FormFeedback>
                  </FormGroup>
                </div>
              </div>
              <div className="form-group text-right mb-0">
                <button
                  type="reset"
                  onClick={handleClose}
                  className="btn btn-secondary waves-effect waves-light mr-1"
                >
                  {t('stratEdge.config.AnsP.retour')}
                </button>
                <button
                  className="btn btn-primary waves-effect waves-light "
                  type="submit"
                >
                  {t('stratEdge.config.AnsP.save')}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      {selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && (
        <div className="float-right adp-edit-btn" onClick={handleShow}>
          <i className="fas fa-pen"></i>
        </div>
      )}

      <Row>
        <Col lg={2}>
          <img
            src={
              market &&
              market.imagePath &&
              market.imagePath !== null &&
              market.imagePath !== "null"
                ? market.imagePath
                : "https://via.placeholder.com/133"
            }
            className="rounded-circle img-thumbnail avatar-lg adp-img"
            alt="Cardimagecap"
          />
        </Col>
        <Col lg={10}>
          <div className="adp-CardSubtitle"> {market.name}</div>
          <div className="adp-CardText" style={{ marginBottom: "10px" }}>
            {market.description}
          </div>
          <div className="adp-CardSubtitle mt-4">{t('stratEdge.config.AnsM.evolutionDemand')}</div>
          <div
            style={{
              height: "200px",
            }}
          >
            <BarOneExChart
              labels={[
                // 'T = 0 ',
                "T = 1",
                "T = 2",
                "T = 3",
                "T = 4",
                "T = 5",
              ]}
              datasets={[
                {
                  label: "",
                  backgroundColor: "rgba(24, 138, 226, 1)",
                  borderColor: "rgba(24, 138, 226, 1)",
                  borderWidth: 1,
                  hoverBackgroundColor: "rgba(24, 138, 226, 1)",
                  hoverBorderColor: "rgba(24, 138, 226, 1)",
                  data: [
                    // market.demand0,
                    market.demand1,
                    market.demand2,
                    market.demand3,
                    market.demand4,
                    market.demand5,
                  ],
                },
              ]}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
const AnsM = ({ markets, t }) => {
  return (
    <>
      {" "}
      <Tab.Container id="left-tabs-example" defaultActiveKey="first-wiz">
        <Row>
          <Col style={{ marginLeft: "1px" }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first-wiz" className="tab-anc">
                  {markets[0].name}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second-wiz" className="tab-anc">
                  {markets[1].name}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first-wiz">
                <Market market={markets[0]} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="second-wiz">
                <Market market={markets[1]} t={t} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

const StrategicDecisionTab = ({ strategicDecision, t }) => {
  return (
    <>
      <Row>
        <StrategicDecisionItem
          t={t}
          handleShow={() => null}
          name={strategicDecision[0].name}
          costImpact={strategicDecision[0].costImpact}
          capacityImpact={strategicDecision[0].capacityImpact}
          fretImpactMarket1={strategicDecision[0].fretImpactMarket1}
          fretImpactMarket2={strategicDecision[0].fretImpactMarket2}
          price={strategicDecision[0].price}
          strategicDecision={strategicDecision[0]}
        />
        <StrategicDecisionItem
          t={t}
          handleShow={() => null}
          name={strategicDecision[1].name}
          costImpact={strategicDecision[1].costImpact}
          capacityImpact={strategicDecision[1].capacityImpact}
          fretImpactMarket1={strategicDecision[1].fretImpactMarket1}
          fretImpactMarket2={strategicDecision[1].fretImpactMarket2}
          price={strategicDecision[1].price}
          strategicDecision={strategicDecision[1]}
        />
        <StrategicDecisionItem
          t={t}
          handleShow={() => null}
          name={strategicDecision[2].name}
          costImpact={strategicDecision[2].costImpact}
          capacityImpact={strategicDecision[2].capacityImpact}
          fretImpactMarket1={strategicDecision[2].fretImpactMarket1}
          fretImpactMarket2={strategicDecision[2].fretImpactMarket2}
          price={strategicDecision[2].price}
          strategicDecision={strategicDecision[2]}
        />
      </Row>
    </>
  );
};

const StrategicDecisionItem = (props) => {
  const {
    name,
    costImpact,
    capacityImpact,
    fretImpactMarket1,
    fretImpactMarket2,
    price,
    strategicDecision,
    t
  } = props;
  const [show, setShow] = useState(false);
  const error = useSelector((state) => state.StratEdge.error);
  const [imgError, setImgError] = useState(false);
  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => {
      const file = files[0];
      if (!file) return;
      setImg(files[0]);
    },
    accept: ".jpeg,.jpg,.png",
    multiple: false,
    minSize: 0,
    maxSize: 5242880,
    onDropRejected: () => setImgError(true),
  });
  const dispatch = useDispatch();
  const [img, setImg] = useState(null);
  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const { register, errors, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      name: strategicDecision && strategicDecision.name,
      description: strategicDecision && strategicDecision.description,
      id: strategicDecision && strategicDecision.id,
      stratEdgeConfigurationId:
        strategicDecision && strategicDecision.stratEdgeConfigurationId,
      decisionType: strategicDecision && strategicDecision.decisionType,
      fixedName: strategicDecision && strategicDecision.fixedName,
      price: strategicDecision && strategicDecision.price,
      costImpact: strategicDecision && strategicDecision.costImpact,
      capacityImpact: strategicDecision && strategicDecision.capacityImpact,
      fretImpactMarket1:
        strategicDecision && strategicDecision.fretImpactMarket1,
      fretImpactMarket2:
        strategicDecision && strategicDecision.fretImpactMarket2,
      imagePath: strategicDecision && strategicDecision.imagePath,
    },
  });

  useEffect(() => {
    if (error) {
      SwalModal({
        text:  t('stratEdge.config.AnsS.duplicatedDecisionName'),
        icon: "warning",
      });
    }
    // dispatch
  }, [error]);

  const onSubmit = (data) => {
    if (!imgError) {
      dispatch(
        updateStratEdgeStrategicDecision({
          ...data,
          img,
          id: strategicDecision.id,
          stratEdgeConfigurationId: strategicDecision.stratEdgeConfigurationId,
          decisionType: strategicDecision.decisionType,
          imagePath: strategicDecision.imagePath,
        })
      );
      setShow(false);
    }
  };

  useEffect(() => {
    if (imgError) {
      setTimeout(() => {
        setImgError(false);
      }, 3000);
    }
  }, [imgError]);

  useEffect(() => {
    setValue("name", name);
    setValue("description", strategicDecision.description);
    setValue("price", price);
    setValue("costImpact", costImpact);
    setValue("capacityImpact", capacityImpact);
    setValue("fretImpactMarket1", fretImpactMarket1);
    setValue("fretImpactMarket2", fretImpactMarket2);
  }, [show]);
  return (
    <>
      <Modal
        //   size="lg"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop={"static"}
      >
        <Modal.Body className="p-0">
          <div className="card-box m-0 p-0">
            <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
              <h4 className="mt-0 mb-3 header-title">{getValues("name")}</h4>
              <FormGroup>
                <Label for="description">{t('stratEdge.config.AnsP.name')} </Label>
                <Input
                  name="name"
                  innerRef={register({ required: true })}
                  invalid={errors.name ? true : false}
                />
                <FormFeedback>{t('stratEdge.config.AnsP.nameValidation')}</FormFeedback>
              </FormGroup>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">{t('stratEdge.config.AnsP.image')}</label>
                <div
                  {...getRootProps({ className: "dropzone" })}
                  className="container-img"
                >
                  <input {...getInputProps()} />
                  <i
                    className="fe-upload-cloud"
                    style={{ fontSize: "44px" }}
                  ></i>
                  <p>{t('stratEdge.config.AnsP.imageValidation')}</p>
                </div>
                {imgError && (
                  <div className="invalid-feedback d-block">
                    {t('stratEdge.config.AnsP.imageError')}
                  </div>
                )}
                <section className="container">
                  <aside>
                    <ul>{files}</ul>
                  </aside>
                </section>
              </div>
              <FormGroup>
                <Label>{t('stratEdge.config.AnsP.description')}</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  rows="3"
                  disabled
                  style={{
                    backgroundColor: "#e9ecef",
                  }}
                />
              </FormGroup>
              <div className="row">
                <div className="col-md-6">
                  <FormGroup>
                    <Label>{t('stratEdge.config.AnsS.impactCost')}</Label>
                    <Input
                      name="costImpact"
                      innerRef={register({ required: true })}
                      invalid={errors.costImpact ? true : false}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsS.impactCostValidation')}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('stratEdge.config.AnsS.impactTransport1')} </Label>
                    <Input
                      name="fretImpactMarket1"
                      innerRef={register({ required: true })}
                      invalid={errors.fretImpactMarket1 ? true : false}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsS.impactTransport1Validation')} </FormFeedback>
                  </FormGroup>
                </div>

                <div className="col-md-6">
                  <FormGroup>
                    <Label>{t('stratEdge.config.AnsS.impactCapacity')} </Label>
                    <Input
                      name="capacityImpact"
                      innerRef={register({ required: true })}
                      invalid={errors.capacityImpact ? true : false}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsS.impactCapacityValidation')}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label>{t('stratEdge.config.AnsS.impactTransport1')}</Label>
                    <Input
                      name="fretImpactMarket2"
                      innerRef={register({ required: true })}
                      invalid={errors.fretImpactMarket2 ? true : false}
                    />
                    <FormFeedback>{t('stratEdge.config.AnsS.impactTransport1Validation')}</FormFeedback>
                  </FormGroup>
                </div>
              </div>
              <FormGroup>
                <Label>{t('stratEdge.config.AnsS.budget')}</Label>
                <Input
                  name="price"
                  innerRef={register({ required: true })}
                  invalid={errors.price ? true : false}
                />
                <FormFeedback>{t('stratEdge.config.AnsS.budgetValidation')}</FormFeedback>
              </FormGroup>

              <div className="form-group text-right mb-0">
                <button
                  type="reset"
                  onClick={handleClose}
                  className="btn btn-secondary waves-effect waves-light mr-1"
                >

                  {t('stratEdge.config.AnsP.retour')}
                </button>
                <button
                  // onClick={handleClose}
                  className="btn btn-primary waves-effect waves-light "
                  type="submit"
                >
                  {t('stratEdge.config.AnsP.save')}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Col className="des-block">
        {selectedConfig && selectedConfig.numberOfTrainingSessions === 0 ? (
          <div className="float-right adp-edit-btn" onClick={handleShow}>
            <i className="fas fa-pen"></i>
          </div>
        ) : (
          <div className="float-right adp-edit-btn"></div>
        )}
        <Row>
          <Col
            lg={3}
            className={
              selectedConfig && selectedConfig.numberOfTrainingSessions === 0
                ? "pl-0"
                : ""
            }
          >
            <img
              src={
                strategicDecision &&
                strategicDecision.imagePath &&
                strategicDecision.imagePath !== null &&
                strategicDecision.imagePath !== "null"
                  ? strategicDecision.imagePath
                  : "https://via.placeholder.com/133"
              }
              className="rounded-circle des-img"
              alt="Cardimagecap"
            />
          </Col>
          <Col lg={9}>
            <div className="adp-CardSubtitle">{name}</div>
            <div className="adp-CardText" style={{ marginBottom: "10px" }}>
              {/*Description*/}
            </div>
            <Row style={{ paddingLeft: "12px", marginTop: "15px" }}>
              <Col lg={5} className="p-0">
                <div className="des-item-title">
                  {" "}
                  {toFixedOnlyFloat(costImpact * 100)} %
                </div>
                <div className="des-item-s-title">Impact coûts</div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {toFixedOnlyFloat(capacityImpact * 100)} %
                </div>
                <div className="des-item-s-title">Impact capacité</div>
              </Col>
            </Row>
            <Row style={{ paddingLeft: "12px", marginTop: "7px" }}>
              <Col lg={5} className="p-0">
                <div className="des-item-title">
                  {toFixedOnlyFloat(fretImpactMarket1 * 100)} %
                </div>
                <div className="des-item-s-title">Impact transport 1</div>
              </Col>
              <Col lg={7}>
                <div className="des-item-title">
                  {toFixedOnlyFloat(fretImpactMarket2 * 100)} %
                </div>
                <div className="des-item-s-title">Impact transport 2</div>
              </Col>
            </Row>
            <Row>
              <Col style={{ paddingLeft: "66px", paddingTop: "18px" }}>
                <img
                  src={dollar}
                  alt="img"
                  style={{
                    width: "21px",
                    height: "26px",
                    marginTop: "-17px",
                  }}
                />
                <div className="d-inline-block" style={{ marginLeft: "7px" }}>
                  <div className="des-item-title d-block">{price}</div>
                  <div className="des-item-s-title d-block">Budget</div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </>
  );
};

const StrategicDecision = ({ strategicDecision, t}) => {
  // //console.log("-------strategicDecision----", strategicDecision);
  return (
    <StrategicDecisionTab
      t={t}
      strategicDecision={
        strategicDecision &&
        strategicDecision.decision &&
        strategicDecision.decision.sort((a, b) => {
          const bandA = a.fixedName.toUpperCase();
          const bandB = b.fixedName.toUpperCase();

          let comparison = 0;
          if (bandA > bandB) {
            comparison = 1;
          } else if (bandA < bandB) {
            comparison = -1;
          }
          return comparison;
        })
      }
    />
  );
};
const AnsS = ({ strategicDecisions = [], t }) => {
  // let listType = strategicDecisions.map((item) => {
  //   return item.decisionType;
  // });

  // listType = [...new Set(listType)];

  const type1 = strategicDecisions.filter(
    (item) => item.type === "r_d_cost"
  )[0];
  const type2 = strategicDecisions.filter(
    (item) => item.type === "r_d_capacity"
  )[0];
  const type3 = strategicDecisions.filter(
    (item) => item.type === "marketing"
  )[0];
  const type4 = strategicDecisions.filter(
    (item) => item.type === "human_resources"
  )[0];
  const type5 = strategicDecisions.filter(
    (item) => item.type === "maintenance"
  )[0];

  return (
    <>
      <Tab.Container id="ans-tabs" defaultActiveKey="first-wiz">
        <Row>
          <Col style={{ marginLeft: "1px" }}>
            <Nav variant="pills" className="flex-row">
              <Nav.Item>
                <Nav.Link eventKey="first-wiz" className="tab-anc">
                  <Groupe332 className="tab-icon" />

                  {t('stratEdge.config.AnsS.RDCost')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second-wiz" className="tab-anc">
                  <Chimney className="tab-icon" />
                  {t('stratEdge.config.AnsS.RDCapacity')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="three-wiz" className="tab-anc">
                  <Megaphone className="tab-icon" />
                  {t('stratEdge.config.AnsS.marketing')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="four-wiz" className="tab-anc">
                  <i className=" fas fa-users mr-1 tab-icon"></i>
                  {t('stratEdge.config.AnsS.RessourceHumain')}
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="five-wiz" className="tab-anc">
                  <Setup className="tab-icon" />
                  {t('stratEdge.config.AnsS.maintenance')}
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Tab.Content>
              <Tab.Pane eventKey="first-wiz">
                <StrategicDecision strategicDecision={type1 || {}} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="second-wiz">
                <StrategicDecision strategicDecision={type2 || []} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="three-wiz">
                <StrategicDecision strategicDecision={type3 || []} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="four-wiz">
                <StrategicDecision strategicDecision={type4 || []} t={t} />
              </Tab.Pane>
              <Tab.Pane eventKey="five-wiz">
                <StrategicDecision strategicDecision={type5 || []} t={t} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

function Wizard({ StratEdge, loading = false, t }) {
  let history = useHistory();

  const [index, setIndex] = useState(0);

  const render = (index, StratEdge) => {
    switch (index) {
      case 0:
        return (
          <AnsP product={StratEdge.config && StratEdge.config.product} t={t} />
        );

      case 1:
        return (
          <AnsC
            competitors={StratEdge.config && StratEdge.config.competitors}
            t={t}
          />
        );

      case 2:
        return (
          <AnsM
            t={t}
            markets={
              StratEdge.config &&
              StratEdge.config.markets.sort((a, b) => {
                const bandA = a.fixedName.toUpperCase();
                const bandB = b.fixedName.toUpperCase();

                let comparison = 0;
                if (bandA > bandB) {
                  comparison = 1;
                } else if (bandA < bandB) {
                  comparison = -1;
                }
                return comparison;
              })
            }
          />
        );

      case 3:
        return (
          <AnsS
            t={t}
            strategicDecisions={
              StratEdge.config && StratEdge.config.strategicDecisions
            }
          />
        );
      default:
        break;
    }
  };

  return (
    <Row>
      <Col lg={12}>
        <div
          className="d-flex justify-content-center"
          style={{ marginBottom: "27px" }}
        >
          <ButtonGroup>
            <Button
              className={`adp-btn-group ${
                index === 0 && "adp-btn-group-active"
              }`}
              onClick={() => setIndex(0)}
            >
              {t("stratEdge.config.analyseProduct")}
            </Button>
            <Button
              className={`adp-btn-group ${
                index === 1 && "adp-btn-group-active"
              }`}
              onClick={() => setIndex(1)}
            >
              {t("stratEdge.config.analyseCompetitors")}
            </Button>
            <Button
              className={`adp-btn-group ${
                index === 2 && "adp-btn-group-active"
              }`}
              onClick={() => setIndex(2)}
            >
              {t("stratEdge.config.analyseMarkets")}
            </Button>
            <Button
              className={`adp-btn-group ${
                index === 3 && "adp-btn-group-active"
              }`}
              onClick={() => setIndex(3)}
            >
              {t("stratEdge.config.decisionsStrategy")}
            </Button>
          </ButtonGroup>
        </div>
      </Col>
      <Col lg={12} className="mb-4">
        {render(index, StratEdge)}
      </Col>

      <Col lg={12}>
        <div className="d-flex justify-content-between">
          <Button
            color="secondary"
            size="sm"
            onClick={() => {
              // history.push('/moderator/modules/f78a04MTQ0jj515h/config');
              // history.goBack();
              history.goBack();
            }}
          >
            <i className=" fas fa-arrow-left mr-1"></i>

            {t("stratEdge.config.back")}
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default Wizard;

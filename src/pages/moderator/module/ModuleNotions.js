import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import Select from "react-select";
import plusSolid from "../../../assets/images/plus-solid.svg";
import eyeSolid from "../../../assets/images/eye-solid.svg";
import randomSolid from "../../../assets/images/random-solid.svg";
import ellipsisVSolid from "../../../assets/images/ellipsis-v-solid.svg";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { Modal, Container } from "react-bootstrap";
import {
  getNotionsModuleByID,
  initSuccessNotion,
  initErrorNotion,
  addNotionsModule,
  editNotionsModule,
  deleteNotionsModule,
  orderNotionsModule,
} from "../../../redux/actions";
import { useTranslation } from "react-i18next";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import SwalModal from "../../../components/SwalModal";
import moment from "moment";
import {Tooltip } from "reactstrap";
import {  decrypt } from "../../../helpers/crypto";


import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import "../../../../node_modules/react-quill/dist/quill.snow.css";

import ParentEditor from "../../../components/Editor";

import {Editor, EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import RichEditor from "../../../components/Editor";


const CardNotion = (props) => {
  const { title, creationDate, content, mediaPath, notionId, t } = props;
  const [editNotionModalShow, setEditNotionModalShow] = useState(false);
  const deleteSuccess = useSelector((state) => state.Notion.deleteSuccess);
  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );

  const dispatch = useDispatch();

  const youTubeGetID = (url) => {
    let ID = "";
    if (url) {
      const url_ = url
        .replace(/(>|<)/gi, "")
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if (url_[2] !== undefined) {
        // eslint-disable-next-line no-useless-escape
        ID = url_[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      } else {
        ID = url_;
      }
      return "https://www.youtube.com/embed/" + ID;
    }
  };

  useEffect(() => {
    if (deleteSuccess) {
      SwalModal({
        text: t("moduleNotion.swal.deleteSuccess"),
        icon: "success",
      });

      dispatch(initSuccessNotion());
    }
  }, [deleteSuccess]);

  const deleteNotion = () => {
    SwalModal({
      text: t("moduleNotion.swal.deleteAsk"),
      icon: "warning",
      buttons: [t("moduleNotion.swal.no"), t("moduleNotion.swal.yes")],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteNotionsModule(notionId));
      }
    });
  };
  return (
    <React.Fragment>
      <EditNotionModal
        t={t}
        show={editNotionModalShow}
        name={title}
        content={content}
        mediaPath={mediaPath}
        moduleInstanceId={props.moduleInstanceId}
        notionId={props.notionId}
        notionOrder={props.notionOrder}
        onHide={(value) => {
          setEditNotionModalShow(false);
        }}
      />
      <Col xl={4}>
        <Card>
          <CardBody className="card-box project-box mb-0 pb-0 p-0 ">
            <div className="embed-responsive embed-responsive-16by9 video-content">
              <iframe
                src={youTubeGetID(mediaPath)}
                frameBorder="0"
                width="344"
                height="194"
                title="test"
              ></iframe>
            </div>

            <div className="mt-22 ml-24 mb-18">
              {selectedConfig.numberOfTrainingSessions === 0 && (
                <div className="ellipsis-position-notions">
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
                      <DropdownItem
                        onClick={() => setEditNotionModalShow(true)}
                      >
                        <span>{t("moduleNotion.cardNotion.edit")}</span>
                      </DropdownItem>
                      <DropdownItem onClick={() => deleteNotion()}>
                        <span>{t("moduleNotion.cardNotion.delete")}</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              )}

              <h4 className="mt-0 text-max-1"
              style={{marginRight:'33px'}}
              >{title} </h4>
              <h6 className="date-config">
                {t("moduleNotion.cardNotion.createdAt")} {creationDate}
              </h6>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

const AddNotionModal = (props) => {
  const { show, onHide, moduleInstanceId } = props;
  const addSuccess = useSelector((state) => state.Notion.addSuccess);
  const moduleNotions = useSelector((state) => state.Notion.moduleNotions);
  const [description, setDescription] = useState('')
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [errDesc, setErrDesc] = useState({
    req:false,
    length:false
  })

  useEffect(() => {
    if (addSuccess) {
      SwalModal({
        text: t("moduleNotion.swal.addSuccess"),
        icon: "success",
      });

      dispatch(initSuccessNotion());
    }
  }, [addSuccess]);

  useEffect(() => {
    setDescription("")
  }, [show]);

  const valide = (event, values) => {

    if(description.length < 13 ) return setErrDesc(prv => ({...errDesc ,req:true}) );

    if(description.length > 5000 ) return setErrDesc(prv => ({...errDesc ,length:true}) );


    dispatch(
      addNotionsModule(
        moduleInstanceId,
        moduleNotions.length + 1,
        values.name,
        description,
        values.link
      )
    );
    onHide();
  };



  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <Container>
          <h4>{t("moduleNotion.addModal.title")}</h4>

          <AvForm onValidSubmit={valide}>
            <AvGroup>
              <Label for="name">{t("moduleNotion.addModal.name")} </Label>
              <AvInput name="name" placeholder={"Name"} required />
              <AvFeedback>{t("moduleNotion.addModal.errorField")} </AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="link">{t("moduleNotion.addModal.link")} </Label>
              <AvInput
                type="url"
                pattern="https://www.youtube.com/.+"
                name="link"
                placeholder={t("moduleNotion.addModal.link")}
                required
              />
              <AvFeedback>
                {t("moduleNotion.addModal.errorFieldYoutube")}
              </AvFeedback>
            </AvGroup>

            <RichEditor  val={description}  onChange={(html)=>{
              setErrDesc(prv => ({...errDesc ,req:false}) )
              setDescription(html)
            }} />

              <div style={{display:'inline-block'}}>
                Maximum 5,000 characters.
              </div>

            {
              errDesc.req ?
              <div style={{fontSize: '0.75rem',color:'#ff5b5b',display:'inline-block',marginLeft:'20px'}} >{t("moduleNotion.addModal.errorField")}</div>
              : errDesc.length &&
              <div style={{fontSize: '0.75rem',color:'#ff5b5b',display:'inline-block',marginLeft:'20px'}} >Maximum 5,000 characters.</div>
            }


            <Row className="show-grid justify-content-md-center mt-3 float-right">
              <Col>
                <button
                  type="button"
                  className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                  style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                  onClick={() => props.onHide(false)}
                >
                  {t("moduleNotion.addModal.cancel")}
                </button>
                <Button
                  type="submit"
                  color="blue"
                  className="btn btn-primary waves-effect waves-light width-xs"
                >
                  {t("moduleNotion.addModal.add")}
                </Button>
              </Col>
            </Row>
          </AvForm>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const EditNotionModal = (props) => {
  const {
    t,
    show,
    onHide,
    name,
    content,
    mediaPath,
    moduleInstanceId,
    notionId,
    notionOrder,
  } = props;
  const editSuccess = useSelector((state) => state.Notion.editSuccess);
  const dispatch = useDispatch();

  const [errDesc, setErrDesc] = useState({
    req:false,
    length:false
  })




  const [description, setDescription] = useState();

  useEffect(() => {
    if (editSuccess) {
      SwalModal({
        text: t("moduleNotion.swal.editSuccess"),
        icon: "success",
      });

      dispatch(initSuccessNotion());
    }
  }, [editSuccess]);

  useEffect(() => {
    setErrDesc({
      req:false,
      length:false
    })
    setDescription(content);
  }, [show , content]);


  const valide = (event, values) => {

    if(description.length < 13 ) return setErrDesc(prv => ({...errDesc ,req:true}) );

    if(description.length > 5000 ) return setErrDesc(prv => ({...errDesc ,length:true}) );



    dispatch(
      editNotionsModule(
        notionId,
        moduleInstanceId,
        notionOrder,
        values.name,
        description,
        values.link
      )
    );

    props.onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
      backdrop={"static"}
    >
      <Modal.Body>
        <Container>
          <h4>{t("moduleNotion.editModal.title")}</h4>

          <AvForm onValidSubmit={valide}>
            <AvGroup>
              <Label for="name">{t("moduleNotion.editModal.name")}</Label>
              <AvInput name="name" placeholder={"Name"} value={name} required />
              <AvFeedback>{t("moduleNotion.editModal.errorField")}</AvFeedback>
            </AvGroup>

            <AvGroup>
              <Label for="link">{t("moduleNotion.editModal.link")}</Label>
              <AvInput
                type="url"
                pattern="https://www.youtube.com/.+"
                name="link"
                value={mediaPath}
                placeholder={t("moduleNotion.editModal.link")}
                required
              />
              <AvFeedback>
                {t("moduleNotion.editModal.errorFieldYoutube")}
              </AvFeedback>
            </AvGroup>

            <RichEditor  val={description}  onChange={setDescription} />

            <div style={{display:'inline-block'}}>
            Maximum 5,000 characters.
          </div>

        {
          errDesc.req ?
          <div style={{fontSize: '0.75rem',color:'#ff5b5b',display:'inline-block',marginLeft:'20px'}} >{t("moduleNotion.addModal.errorField")}</div>
          : errDesc.length &&
          <div style={{fontSize: '0.75rem',color:'#ff5b5b',display:'inline-block',marginLeft:'20px'}} >Maximum 5,000 characters.</div>
        }


            <Row className="show-grid justify-content-md-center mt-3 float-right">
              <Col>
                <button
                  type="button"
                  className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                  style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                  onClick={() => props.onHide(false)}
                >
                  {t("moduleNotion.editModal.cancel")}
                </button>
                <Button
                  color="blue"
                  className="btn btn-primary waves-effect waves-light width-xs"
                >
                  {t("moduleNotion.editModal.edit")}
                </Button>
              </Col>
            </Row>
          </AvForm>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const OrderNotionsModal = (props) => {
  const { t, show, onHide, moduleInstanceId } = props;

  const [items, setItems] = useState([]);
  const orderSuccess = useSelector((state) => state.Notion.orderSuccess);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderSuccess) {
      SwalModal({
        text: t("moduleNotion.swal.orderSuccess"),
        icon: "success",
      });

      dispatch(initSuccessNotion());
    }
  }, [orderSuccess]);

  useEffect(() => {
    const array = [];
    for (const iterator of props.items) {
      array.push({
        id: iterator.notionId,
        moduleInstanceId: iterator.moduleInstanceId,
        notionOrder: iterator.notionOrder,
        title: iterator.title,
        content: iterator.content,
        mediaPath: iterator.mediaPath,
      });
    }

    array.sort((a, b) => parseFloat(a.notionOrder) - parseFloat(b.notionOrder));
    setItems(array);
  }, [props.items, show]);

  const itemRenderer = (item, index) => {
    const id = item.notionId;
    return (
      <Row className="item mb-1 mr-1" key={id} style={{backgroundColor:'#8e949b'}} >
        <Col style={{ display: "flex", flexDirection: "row" }}>
          <h5>{item.title} </h5>
        </Col>
      </Row>
    );
  };

  const handleRLDDChange = (reorderedItems) => {
    setItems(reorderedItems);
  };

  const valid = () => {
    const data = [];

    items.forEach((element, index) => {
      data.push({
        notionId: element.id,
        notionOrder: index + 1,
      });
    });

    dispatch(orderNotionsModule(moduleInstanceId, data));

    props.onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      size="sm"
      centered
      backdrop={"static"}
    >
      <Modal.Body style={{ paddingLeft: 20 }}>
        <h4 style={{ marginBottom: 20 }}>
          {t("moduleNotion.orderModal.title")}
        </h4>

        <RLDD
          cssClasses="items-container"
          items={items}
          itemRenderer={itemRenderer}
          onChange={handleRLDDChange}
        />

        <Row className="show-grid justify-content-md-center mt-3 float-right">
          <Col>
            <button
              type="button"
              className="btn btn-secondary waves-effect waves-light width-xs mr-2"
              style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
              onClick={() => props.onHide(false)}
            >
              {t("moduleNotion.orderModal.cancel")}
            </button>
            <button
              color="blue"
              className="btn btn-primary waves-effect waves-light width-xs"
              onClick={() => valid()}
            >
              {t("moduleNotion.orderModal.save")}
            </button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

const ModuleNotions = (props) => {
  const loading = useSelector((state) => state.Notion.loading);
  const moduleNotions = useSelector((state) => state.Notion.moduleNotions);

  const selectedConfig = useSelector(
    (state) => state.Configuration.selectedConfig
  );
  const module = useSelector((state) => state.Module.module);
  const error = useSelector((state) => state.Notion.error);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [addNotionModalShow, setAddNotionModalShow] = useState(false);
  const [orderNotionsModalShow, setOrderNotionsModalShow] = useState(false);
  const [moduleNotionsState, setModuleNotionsState] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: "Select",
  });

  useEffect(() => {
    setModuleNotionsState(moduleNotions);
  }, [moduleNotions]);

  useEffect(() => {
    if (error) {
      SwalModal({
        text: error.message,
        icon: "error",
      });

      dispatch(initErrorNotion());
    }
  }, [error]);

  useEffect(() => {
    sort(selectedOption);
  }, [moduleNotionsState]);

  useEffect(() => {
    dispatch(getNotionsModuleByID(decrypt(props.match.params.moduleID)));
  }, [props.match.params.moduleID]);

  const searchConfiguration = (value) => {
    const search_ = new RegExp(value, "i"); // prepare a regex object
    const res = moduleNotions.filter((item) => {
      return search_.test(item.title) || search_.test(item.createdAt);
    });

    setModuleNotionsState(res);
  };

  const handleChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    sort(selectedValue);
  };

  const showOrderNotion = () => {
    setOrderNotionsModalShow(true);
  };
  const sort = (selectedValue) => {
    const notions = moduleNotionsState;

    if (selectedValue.value === "date") {
      notions.sort((a, b) => moment(a.creationDate).diff(moment(b.creationDate)) );

    } else if (selectedValue.value === "order") {
      notions.sort(
        (a, b) => parseFloat(a.notionOrder) - parseFloat(b.notionOrder)
      );
    }

    setModuleNotionsState(notions);
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

  useEffect(() => {
    setTooltipOpen2(false);
  }, [orderNotionsModalShow])

  return (
    <React.Fragment>
      <AddNotionModal
        t={t}
        show={addNotionModalShow}
        moduleInstanceId={decrypt(props.match.params.moduleID)}
        onHide={(value) => {
          setAddNotionModalShow(false);
        }}
      />
      {moduleNotionsState.length > 0 ? (
        <OrderNotionsModal
          t={t}
          show={orderNotionsModalShow}
          onHide={(value) => {


            setOrderNotionsModalShow(false);
          }}
          items={moduleNotionsState}
          moduleInstanceId={decrypt(props.match.params.moduleID)}
        />
      ) : null}
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
                 id="show"
                  onClick={() => {
                    window.open(`/moderator/modules/${props.match.params.moduleID}/notions/show`, "_blank");
                  }}
                  type="button"
                  className="btn waves-effect waves-light module-btn float-right"
                  style={{ backgroundColor: "#6C757D" }}
                >
                  <img src={eyeSolid} alt="" title="" />
                </button>
                <Tooltip
                  placement="top"
                  isOpen={tooltipOpen}
                  target="show"
                  toggle={toggle}
                >
                  <p style={{ fontSize: "12px", margin: "0px" }}>
                     
                     {t("moduleNotion.apercu")}
                  </p>
                </Tooltip>
              </div>

              {selectedConfig.numberOfTrainingSessions === 0 && (
                <>
                  <div className="p-1  ">
                    <button
                      id="trier"
                      onClick={showOrderNotion}
                      type="button"
                      className="btn   waves-effect waves-light module-btn float-right"
                      style={{ backgroundColor: "#6C757D" }}
                    >
                      <img src={randomSolid} alt="" title="" />
                    </button>
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen2}
                      target="trier"
                      toggle={toggle2}
                      // delay={{ show: 2000, hide: 1000 }}

                    >
                      <p style={{ fontSize: "12px", margin: "0px" }}>
                         
                         {t("moduleNotion.trier")}
                      </p>
                    </Tooltip>
                  </div>

                  <div className="p-1  ">
                    <button
                      onClick={() => {
                        setAddNotionModalShow(true);
                      }}
                      type="button"
                      className="btn btn-primary waves-effect width-md waves-light module-btn float-right"
                      style={{ backgroundColor: "#5A97F8" }}
                    >
                      <img
                        className="mr-2"
                        src={plusSolid}
                        alt=""
                        title=""
                      />

                      {t("moduleNotion.addNotion")}
                    </button>
                  </div>
                </>
              )}
              <div className="p-1 flex-grow-2 search-box">
                <div className="input-group">
                  <input
                    onChange={(e) => {
                      searchConfiguration(e.target.value);
                    }}
                    type="text"
                    className="form-control search-container"
                    placeholder={t("moduleSession.search") + "..."}
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
                    value={selectedOption}
                    onChange={handleChange}
                    options={[
                      { value: "date", label:  t("moduleNotion.withDate") },
                      { value: "order", label:   t("moduleNotion.withOrder") },
                    ]}
                    placeholder={t("moduleNotion.withDate") }
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {moduleNotionsState.length
            ? moduleNotionsState.map((item, index) => (
                <CardNotion key={index} {...item} t={t} />
              ))
            : null}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModuleNotions;

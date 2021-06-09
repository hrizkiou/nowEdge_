import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import ellipsisVSolid from "../../../assets/images/ellipsis-v-solid.svg";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../components/Loader";
import { Modal, Container } from "react-bootstrap";
import {Tooltip } from "reactstrap";
import { useTranslation } from "react-i18next";
import SwalModal from "../../../components/SwalModal";
import {
  getQuizzesModuleByID,
  selectQuiz,
  addQuizModuleByID,
  initSuccessQuiz,
  deleteQuizModuleByID,
  editQuizModuleByID,
  addQuestionQuizModuleByID,
  deleteQuestionQuizModuleByID,
  editQuestionQuizModuleByID,
} from "../../../redux/quiz/actions";
import { encrypt, decrypt } from "../../../helpers/crypto";
import { Link } from 'react-router-dom';


// eslint-disable-next-line no-use-before-define
const XEditable = ({ text = "", setText = () => {} ,fontWeight}) => {
  const [showEdiable, setShowEdiable] = useState(true);
  const [vale, setVale] = useState(text);
  const [valeInput, setValeInput] = useState(text);
  const { t } = useTranslation();

  const onChangeInput = (e) => {
    //console.log(e.target.value);
    setValeInput(e.target.value);
  };

  const onValid = () => {
    setVale(valeInput);
    setShowEdiable(!showEdiable);
    setText(valeInput);
  };
  const onClose = () => {
    setValeInput(vale);
    setShowEdiable(!showEdiable);
    setText(vale);
  };

  return showEdiable ? (
    <label className="text-font-color-p" onClick={() => setShowEdiable(!showEdiable)}  style={{fontWeight: fontWeight ? fontWeight : 'normal'}}  >{vale}</label>
  ) : (
    <div className="form-inline mb-2">
      <div className="form-group" style={{width:'70%'}}>
        <textarea
          style={{width:'100%'}}
          // maxLength="255"
          rows="3"
          className="form-control"
          onChange={onChangeInput}
          value={valeInput}
        />
      </div>
      <div className="editable-buttons">
        <button
          onClick={onValid}
          type="submit"
          className="btn btn-primary editable-submit btn-sm waves-effect waves-light pt-1 pb-1 ml-1"
        >
          <i className="mdi mdi-check"></i>
        </button>
        <button
          onClick={onClose}
          type="button"
          className="btn btn-secondary editable-cancel btn-sm waves-effect pt-1 pb-1 ml-1"
        >
          <i className="mdi mdi-close"></i>
        </button>
      </div>
    </div>
  );
};

const AddQuizModal = (props) => {
  const { t } = useTranslation();
  const { show, onHide } = props;
  const selectQuiz = useSelector((state) => state.Quiz.selectQuiz);
  const addQuestionSuccess = useSelector((state) => state.Quiz.addQuestionSuccess);
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(t('moduleQuiz.addQuestionModal.question'));
  const [answer1, setAnswer1] = useState(t('moduleQuiz.addQuestionModal.response1'));
  const [answer2, setAnswer2] = useState(t('moduleQuiz.addQuestionModal.response2'));
  const [answer3, setAnswer3] = useState(t('moduleQuiz.addQuestionModal.response3'));
  const [answer4, setAnswer4] = useState(t('moduleQuiz.addQuestionModal.response4'));
  const [answerIndex, setAnswerIndex] = useState(1);

  const valid = () => {
    dispatch(addQuestionQuizModuleByID({
      title: question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer: answerIndex,
      quizId: selectQuiz.id,
    }))
    props.onHide()
  }


  useEffect(() => {
    if (addQuestionSuccess) {
      SwalModal({
        text: t('moduleQuiz.swal.addSuccess') ,
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
  }, [addQuestionSuccess]);

  useEffect(() => {
    setQuestion(t('moduleQuiz.addQuestionModal.question'));
    setAnswer1(t('moduleQuiz.addQuestionModal.response1'));
    setAnswer2(t('moduleQuiz.addQuestionModal.response2'));
    setAnswer3(t('moduleQuiz.addQuestionModal.response3'));
    setAnswer4(t('moduleQuiz.addQuestionModal.response4'));
    setAnswerIndex(1);
  }, [show]);

  const onChangeRadio = (e) => { 
    setAnswerIndex(parseInt(e.currentTarget.value));
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body className="pl-0 pr-0">
        <Container className="pl-0 pr-0">
          <h4 className="pl-3 pr-2">{t('moduleQuiz.addQuestionModal.add')}</h4>

          <Row className="show-grid justify-content-md-center mt-2 pl-3">
            <Col lg={12}>
              <XEditable text={question} setText={setQuestion} fontWeight={500} />
            </Col>
          </Row>

          <div
            className="container m-0 pl-3 pr-2 pt-1 pb-1" 
            style={{ flexDirection: "column",backgroundColor:'#F1F5F7' }}
            // onChange={(event) => {
            //   setAnswerIndex(parseInt(event.target.value));
            // }}
          >
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio1"
                  onChange={onChangeRadio} 
                  name="customRadio"
                  className="custom-control-input"
                  value="1"
                  checked={ answerIndex === 1}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio1"
                  
                ></label>
              </div>
              <XEditable text={answer1} setText={setAnswer1} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  className="custom-control-input"
                  onChange={onChangeRadio} 
                  value="2"
                  checked={ answerIndex === 2}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio2"
                ></label>
              </div>
              <XEditable text={answer2} setText={setAnswer2} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio3"
                  name="customRadio"
                  className="custom-control-input"
                  onChange={onChangeRadio} 
                  value="3"
                  checked={ answerIndex === 3}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio3"
                ></label>
              </div>
              <XEditable text={answer3} setText={setAnswer3} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio4"
                  name="customRadio"
                  className="custom-control-input"
                  onChange={onChangeRadio} 
                  value="4"
                  checked={ answerIndex === 4}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio4"
                ></label>
              </div>
              <XEditable text={answer4} setText={setAnswer4} />
            </div>
          </div>

          <Row className="show-grid justify-content-md-center mt-3 float-right pl-2 pr-3">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide()}
              >
                {t("moduleSession.modalAddSession.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valid}
              >
                {t("moduleSession.modalAddSession.save")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const EditQuestionModal = (props) => {
  const { t } = useTranslation();
  const { show, onHide } = props;
  const selectQuiz = useSelector((state) => state.Quiz.selectQuiz);
  const editQuestionSuccess = useSelector((state) => state.Quiz.editQuestionSuccess);
  const dispatch = useDispatch();

  const [question, setQuestion] = useState(props.question.title);
  const [answer1, setAnswer1] = useState(props.question.answer1);
  const [answer2, setAnswer2] = useState(props.question.answer2);
  const [answer3, setAnswer3] = useState(props.question.answer3);
  const [answer4, setAnswer4] = useState(props.question.answer4);
  const [answerIndex, setAnswerIndex] = useState(props.question.correctAnswer);


  useEffect(() => {
    setQuestion(props.question.title);
    setAnswer1(props.question.answer1);
    setAnswer2(props.question.answer2);
    setAnswer3(props.question.answer3);
    setAnswer4(props.question.answer4);
    setAnswerIndex(props.question.correctAnswer);
  }, [props.question]);



  useEffect(() => {
    if (editQuestionSuccess) {
      SwalModal({
        text: t('moduleQuiz.swal.editSuccess'),
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
  }, [editQuestionSuccess]);

  const valid = () => {
    dispatch(editQuestionQuizModuleByID({
      title: question,
      answer1,
      answer2,
      answer3,
      answer4,
      correctAnswer: answerIndex,
      quizId: selectQuiz.id,
      questionId: props.question.questionId,
    }))
    props.onHide()
  }

  const onChangeRadio = (e) => { 
    setAnswerIndex(parseInt(e.currentTarget.value));
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
       <Modal.Body className="pl-0 pr-0">
        <Container className="pl-0 pr-0">
          <h4 className="pl-3 pr-2 text-font-color-p" >{t('moduleQuiz.editQuestionModal.edit')}</h4>

          <Row className="show-grid justify-content-md-center mt-2 pl-3">
            <Col lg={12}>
              <XEditable text={question} setText={setQuestion} fontWeight={500} />
            </Col>
          </Row>

          <div
            className=" m-0 pl-3 pr-2 pt-1 pb-1" 
            style={{ flexDirection: "column",backgroundColor:'#F1F5F7' }}
            // onChange={(event) => {
            //   setAnswerIndex(parseInt(event.target.value));
            // }}
          >
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio1"
                  name="customRadio"
                  className="custom-control-input"
                  value="1"
                  onChange={onChangeRadio} 
                  checked={ answerIndex === 1}


                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio1"
                ></label>
              </div>
              <XEditable text={answer1} setText={setAnswer1} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio2"
                  name="customRadio"
                  className="custom-control-input"
                  value="2"
                  onChange={onChangeRadio} 
                  checked={ answerIndex === 2}
                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio2"
                ></label>
              </div>
              <XEditable text={answer2} setText={setAnswer2} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio3"
                  name="customRadio"
                  className="custom-control-input"
                  value="3"
                  onChange={onChangeRadio} 
                  checked={ answerIndex === 3}

                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio3"
                ></label>
              </div>
              <XEditable text={answer3} setText={setAnswer3} />
            </div>
            <div className="custom-control custom-radio">
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="customRadio4"
                  name="customRadio"
                  className="custom-control-input"
                  value="4"
                  onChange={onChangeRadio} 
                  checked={ answerIndex === 4}

                />
                <label
                  className="custom-control-label"
                  htmlFor="customRadio4"
                ></label>
              </div>
              <XEditable text={answer4} setText={setAnswer4} />
            </div>
          </div>

          <Row className="show-grid justify-content-md-center mt-3 float-right pl-3 pr-2">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide()}
              >
                {t("moduleSession.modalAddSession.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valid}
              >
                {t("moduleSession.modalAddSession.save")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const AddQuestionModal = (props) => {
  const addSuccess = useSelector((state) => state.Quiz.addSuccess);
  const error = useSelector((state) => state.Quiz.error);
  const [displayErro, setDisplayErro] = useState(false);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [invalid, setInvalid] = useState("none");
  const { t } = useTranslation();
  const { show, onHide, moduleInstanceId } = props;

  useEffect(() => {
    if (addSuccess) {
      props.onHide();
      SwalModal({
        text: t('moduleQuiz.swal.addQuizSuccess') ,
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
    else if(error){
      setDisplayErro(true);
    }
  }, [addSuccess,error]);

  useEffect(() => {
    setName("");
    setEstimatedTime(0);
    setInvalid("none");
  }, [show]);

  const valid = () => {
    if (name !== "") {
      dispatch(
        addQuizModuleByID({
          moduleInstanceId,
          name,
          estimatedTime,
        })
      );
      props.setIndex(props.index_)
    } else {
      setInvalid("block");
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
          <h4>{t('moduleQuiz.addQuizModal.new')} </h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t('moduleQuiz.addQuizModal.name')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t('moduleQuiz.addQuizModal.name')}
                  onChange={(e) => {
                    if(displayErro) {setDisplayErro(false); }
                     
                    setName(e.target.value);
                  }}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: `${invalid}` }}
                >
                {t('moduleQuiz.addQuizModal.wrongName')}
                </div>
                <div
                  className="invalid-feedback"
                  style={{ display: `${displayErro ? 'block'  : 'none' }` }}
                >
                {t('moduleQuiz.addQuizModal.errorName')}
                </div>
              </div>
            </Col>
          </Row>
          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
            <label>  {t('moduleQuiz.addQuizModal.estimatedTime')}</label>
            <div className="input-group  bootstrap-touchspin bootstrap-touchspin-injected">
                  <input    placeholder="Exemple :23 minutes" type="text" pattern="[0-9]*" className="form-control" value={estimatedTime}  
                  onChange={(e) => {
                    const financialGoal = (e.target.validity.valid) ? e.target.value : estimatedTime;
                    setEstimatedTime(parseInt(financialGoal))
                    }} /> 
                  <span style={{
                    display:'flex',
                    flexDirection:'column',
                    width:'26px'
                  }}>
                      <button className="btn btn-primary bootstrap-touchspin-up " 
                      onClick={()=>{
                        let estimatedTime_ = estimatedTime +1
                        setEstimatedTime(estimatedTime_)
                      }}
                      style={{
                        height:'19px',
                        padding:'0px',
                        borderRadius:' 0px',
                        borderTopRightRadius:'8px'
                      }}
                      type="button">+</button>
                      <button className="btn btn-primary bootstrap-touchspin-down " type="button"
                      onClick={()=>{

                        if(estimatedTime>0){
                          let estimatedTime_ =  estimatedTime  -1
                        setEstimatedTime(estimatedTime_)
                        }
                      }}
                      style={{
                        height:'19px',
                        padding:'0px',
                        borderRadius:' 0px',
                        borderBottomRightRadius:'8px'
                      }}
                      >-</button>
                  </span>
               </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide()}
              >
                {t("moduleSession.modalAddSession.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valid}
              >
                {t("moduleSession.modalAddSession.save")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const EditQuizModal = (props) => {
  const editSuccess = useSelector((state) => state.Quiz.editSuccess);
  const selectQuiz = useSelector((state) => state.Quiz.selectQuiz);
 
  const dispatch = useDispatch();

  const [name, setName] = useState(selectQuiz.name);
  const [estimatedTime, setEstimatedTime] = useState(selectQuiz.estimatedTime);
  const [invalid, setInvalid] = useState("none");
  const { t } = useTranslation();
  const { show, onHide, moduleInstanceId } = props;

  

  useEffect(() => {
    setName(selectQuiz.name);
    setEstimatedTime(selectQuiz.estimatedTime);
  }, [selectQuiz]);

  useEffect(() => {
    if (editSuccess) {
      SwalModal({
        text:  t('moduleQuiz.swal.editQuizSuccess'),
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
  }, [editSuccess]);
 

  const valid = () => {
    if (name !== "") {
      dispatch(
        editQuizModuleByID({
          id: selectQuiz.id,
          moduleInstanceId,
          name,
          estimatedTime,
        })
      );
      props.onHide();
    } else {
      setInvalid("block");
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
          <h4> { t('moduleQuiz.editQuizModal.edit')} </h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label> { t('moduleQuiz.addQuizModal.name')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder= { t('moduleQuiz.addQuizModal.name')}
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="invalid-feedback"
                  style={{ display: `${invalid}` }}
                >
                   { t('moduleQuiz.addQuizModal.wrongName')}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label> { t('moduleQuiz.addQuizModal.estimatedTime')}</label>
                <input
                  className="form-control"
                  type="number"
                  value={estimatedTime}
                  name="number"
                  id="exampleNumber"
                  onChange={(e) => setEstimatedTime(e.target.value)}
                  placeholder="Exemple :23 minutes"
                />
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{ backgroundColor: "#AAAAAA", borderWidth: "0px" }}
                onClick={() => props.onHide()}
              >
                {t("moduleSession.modalAddSession.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valid}
              >
                {t("moduleSession.modalAddSession.save")}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const ListQuiz = (props) => {
  const { quizzesModule } = props;
  const [showAdd, setShowAdd] = useState(false);
  const [index_, setIndex] = useState(0);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const { t } = useTranslation();

  const selectedConfig = useSelector(state => state.Configuration.selectedConfig)
  const toggle = () => setTooltipOpen(!tooltipOpen);

  return (
    <>
      <AddQuestionModal
        moduleInstanceId={props.moduleInstanceId}
        show={showAdd}
        setIndex={setIndex}
        index_={quizzesModule ? quizzesModule.length : 0}
        onHide={() => setShowAdd(false)}
      />
      <div className="col-xl-4">
        <div className="card-box p-0">
        {
          selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && 
          <div className="dropdown float-right" style={{ top: "15px",right:'12px' }}>
            <button
              id="formation"
              onClick={() => setShowAdd(true)}
              className="btn btn-icon waves-effect waves-light  p-0 pl-1 pr-1"
              style={{ backgroundColor: "#5A97F8" }}
            >
              <i className=" fas fa-plus"></i>{" "}
            </button>
            <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="formation"
              toggle={toggle}
            >
              <p style={{ fontSize: "12px", margin: "0px" }}>
                Ajouter un quiz
              </p>
            </Tooltip>
          </div>
        }
          <h4 className="header-title mb-3" style={{marginLeft:'26px',paddingTop:'21px'}} >{ t('moduleQuiz.listQuiz.title')}</h4>

          <div className="inbox-widget">
            <div
              style={{
                maxHeight: "570px",
                // paddingRight: "15px",
                overflowY: "auto",
              }}
            >
              {quizzesModule.map((item, index) => (
                <ListQuizItem
                  activeIndex={index_}
                  setIndex={setIndex}
                  key={index.toString()}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ListQuizItem = (props) => {
  const { item ,index ,activeIndex } = props;
  const dispatch = useDispatch();
  const isActive  = index === activeIndex ? 'list-std-item-active' : '';


  return (
      <div className={`list-quiz-item ${isActive}`} onClick={()=>{
        dispatch(selectQuiz(item))
        props.setIndex(index)
      }} >
        <div style={{display:'flex',flexDirection:'column' ,marginRight:'26px',marginLeft: '26px',borderBottomStyle:'solid',borderBottomWidth:'1px',borderBottomColor:'#F1F5F7'}} >
            <h5 className="inbox-item-author mt-0 mb-0">
              {item.name} 
            </h5>
            <div style={{
              display:'flex',
              justifyContent:' space-between'
              }}>
              <p className="inbox-item-text">{item.questions.length} questions</p>
              <p className="inbox-item-date" style={{ top: "35px" }}>
                {item.estimatedTime} minutes
              </p>
            </div>
        </div>
      </div>
  );
};

const ListQuestion = (props) => {
  const dispatch = useDispatch();
  const selectQuiz = useSelector((state) => state.Quiz.selectQuiz);
  const deleteSuccess = useSelector((state) => state.Quiz.deleteSuccess);
  const { t } = useTranslation();
  const selectedConfig = useSelector(state => state.Configuration.selectedConfig)
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);




  useEffect(() => {
    if (deleteSuccess) {
      SwalModal({
        text:  t('moduleQuiz.swal.deleteQuizSuccess'),
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
  }, [deleteSuccess]);

  const deleteQuiz = () => {
    SwalModal({
      text: t('moduleQuiz.swal.askDeleteQuizSuccess') ,
      icon: "warning",
      buttons: [t('moduleQuiz.swal.no'),t('moduleQuiz.swal.yes')],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        //console.log("selectQuiz********", selectQuiz);
        dispatch(deleteQuizModuleByID(selectQuiz.id));
      }
    });
  };

  const [tooltipOpen, setTooltipOpen] = useState(false);


  const toggle = () => setTooltipOpen(!tooltipOpen);


  return (
    <div className="col-xl-4col-xl-9 col-lg-8">
      <AddQuizModal show={showAdd} onHide={() => setShowAdd(false)} />

      <EditQuizModal
        moduleInstanceId={props.moduleInstanceId}
        show={showEdit}
        onHide={() => setShowEdit(false)}
      />
      <div className="card-box p-0">
        {  selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && 
        <>
        <div className="dropdown float-right" style={{ top: "14px",right:'26px' }}>        
          <UncontrolledDropdown direction="left">
            <DropdownToggle
              caret
              tag="a"
              className="text-muted"
              style={{ cursor: "pointer" }}
            >
              <img src={ellipsisVSolid}  alt="" />
            </DropdownToggle>
            <DropdownMenu>
            {/* <Link to={`/moderator/modules/${encrypt(props.moduleInstanceId)}/quiz/show`}  target="_blank" >
              <DropdownItem >
              
                  <span> {t('moduleQuiz.listQuestion.overview')} </span>
                </DropdownItem>
            </Link> */}
              
              <DropdownItem onClick={()=> setShowEdit(true)}>
                <span>{t('moduleQuiz.listQuestion.edit')} </span>
              </DropdownItem>
              <DropdownItem onClick={deleteQuiz}>
                <span>{t('moduleQuiz.listQuestion.delete')}</span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>

        <div
          className="dropdown float-right"
          style={{ top: "15px", right: "41px" }}
        >
          <button
            id="addQus"
            onClick={() => setShowAdd(true)}
            className="btn btn-icon waves-effect waves-light  p-0 pl-1 pr-1"
            style={{ backgroundColor: "#5A97F8" }}
          >
           
            <i className=" fas fa-plus"></i>
          </button>
          <Tooltip
              placement="top"
              isOpen={tooltipOpen}
              target="addQus"
              toggle={toggle}
            >
              <p style={{ fontSize: "12px", margin: "0px" }}>
                Ajouter une question
              </p>
            </Tooltip>
        </div>
        </>
      }

        <h4 className="header-title mb-3 " style={{paddingTop:'20px',paddingLeft:'10px'}}>{selectQuiz.name}</h4>

        <div className="inbox-widget">
          <div
            style={{
              maxHeight: "570px",
              // paddingRight: "15px",
              overflowY: "auto",
            }}
          >
            {selectQuiz.questions && selectQuiz.questions.length > 0 &&
              selectQuiz.questions.map((question, index) => (
                <ListQuestionItem key={index.toString()} question={question} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ListQuestionItem = (props) => {
  const { question } = props;
  const selectQuiz = useSelector((state) => state.Quiz.selectQuiz);
  const deleteQuestionSuccess = useSelector((state) => state.Quiz.deleteQuestionSuccess);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const selectedConfig = useSelector(state => state.Configuration.selectedConfig)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    if (deleteQuestionSuccess) {
      SwalModal({
        text: t('moduleQuiz.swal.deleteQuestionSuccess'),
        icon: "success",
      });

      dispatch(initSuccessQuiz());
    }
  }, [deleteQuestionSuccess]);

  const deleteQuestion = () => {
    SwalModal({
      text:  t('moduleQuiz.swal.askDeleteQuestionSuccess'),
      icon: "warning",
      buttons: [t('moduleQuiz.swal.no'),t('moduleQuiz.swal.yes')],
      confirmButtonColor: "#71B6F9",
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteQuestionQuizModuleByID({
          moduleInstanceId: selectQuiz.moduleInstanceId ,
          quizId: selectQuiz.id ,
          questionId: question.questionId
        }));
      }
    });
  }

  return (
    <>
    <EditQuestionModal question={question} show={showEdit} onHide={() => setShowEdit(false)} />

    <div className="inbox-item inbox-item-custom">
      <div  style={{display:'flex'}} className="ml-2 mr-2" >
        <p
          className="inbox-item-author mt-0 mb-1"
          style={{
            textAlign: "left",
            fontSize: "15px",
            letterSpacing: "0.3px",
            opacity: "1",
            fontWeight: "initial",
            fontFamily: "Roboto",
            color: "#3F4351 !important",
            flexGrow: '3'
          }}
        >
          {question.title}
        </p>
        {  selectedConfig && selectedConfig.numberOfTrainingSessions === 0 && 
        <div style={{display:'flex' }} >
            <div className="cont-list-qu" style={{ display:'inline-block' }}>
              <button
                onClick={()=> setShowEdit(true)}
                className="btn btn-icon waves-effect waves-light  p-0 pl-1 pr-1"
                style={{ backgroundColor: "" }}
              >
                <i className="fas fa-pen btn-list-qu" style={{ color: "#D8D8D8" }}></i>
              </button>
            </div>
            <div className="cont-list-qu" style={{ display:'inline-block' }}>
              <button

                onClick={deleteQuestion}
                className="btn btn-icon waves-effect waves-light  p-0 pl-1 pr-1"
                style={{ backgroundColor: "" }}
              >
                <i className=" fas fa-trash-alt btn-delete-list-qu " style={{ color: "#D8D8D8" }}></i>{" "}
              </button>
            </div>
        </div>
        }

      </div>
    </div>
    </>
  );
};

const ModuleQuiz = (props) => {
  const loading = useSelector((state) => state.Quiz.loading);
  const quizzesModule = useSelector((state) => state.Quiz.quizzesModule);
  const module = useSelector((state) => state.Module.module);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [modalShow, setModalShow] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    setQuizzes(quizzesModule);
  }, [quizzesModule]);

  useEffect(() => {
    //console.log("props.match.params.moduleID", props.match.params.moduleID);
    dispatch(getQuizzesModuleByID(decrypt(props.match.params.moduleID)));
  }, [props.match.params.moduleID]);

  return (
    <React.Fragment>
      <AddQuizModal
        t={t}
        show={modalShow}
        onHide={(value) => {
          setModalShow(false);
        }}
      />

      <div>
        {loading && <Loader />}
        <Row className="mb-3">
          <Col lg={3}>
            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
              <h4 className="mb-0">{module.moduleName}</h4>
            </ul>
          </Col>
          <Col lg={9}></Col>
        </Row>
        <Row>
          <ListQuiz
            quizzesModule={quizzes}
            moduleInstanceId={decrypt(props.match.params.moduleID)}
          />

         {
          quizzes && quizzes.length > 0 && 
         <ListQuestion
            moduleInstanceId={decrypt(props.match.params.moduleID)}
          />
         } 
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModuleQuiz;

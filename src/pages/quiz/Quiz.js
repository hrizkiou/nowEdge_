import React ,{useState , useEffect , useRef} from 'react';
import Background from '../../assets/images/group_88.png'
import lost from '../../assets/images/lost.svg'
import reussi from '../../assets/images/reussi.svg'
import getStart from '../../assets/images/getStart.svg'
import logo from "../../assets/images/logo_.png";
import confImg from "../../assets/images/confImg.png";
import { Row, Col } from 'reactstrap';
import { Button , Modal ,Container} from 'react-bootstrap';
import { getQuiz ,saveQuiz} from '../../redux/actions';
import Loader from "../../components/Loader";
import { CSSTransition } from "react-transition-group";
import { useTranslation } from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux'
import {  decrypt } from "../../helpers/crypto";
import profilePic from '../../assets/images/user-1.png';

// Eters vous sur de vouloir valider vos réponses
function QuizContent(props) {

    const {index} = props;
   
    const [indexOption, setIndexOption] = useState(props.indexOption);
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {

      setIndexOption(props.indexOption);
      
      setQuestions([
        props.item.answer1,
        props.item.answer2,
        props.item.answer3,
        props.item.answer4
     ]);


    }, [props]);

    

    return (
        <Row className="justify-content-md-center mt-3 quiz-contenet" >
            <Col lg={10} lx={12} sm={12} md={9} className="col-md-auto ">
                <div className="task-detail">  
                                          
                    <h4 className="text-blue quiz-title mb-3" >QUESTION {index+1}</h4>

                    <p className="text-muted quiz-desc mb-5"  >
                    {props.item.title}
                    </p>

                    <div className="row task-dates mb-3 mt-4 pl-2 pr-2   quiz-line-content">

                    {questions.map((item,index_)=>{
                        const active = index_ === indexOption ? 'quiz-active-option' :''
                        return (
                            <div 
                              key={""+index_} 
                              onClick={()=>{
                                  props.setIndexOption(index_);
                                  setIndexOption(index_)
                              }} 
                              className={`btn-block  mb-2 quiz-btn  quiz-line ${active} `} 
                               >
                             {item}
                            </div>
                        )
                    })}
                    </div>
                    <div className="clearfix"></div>    
                </div>  
            </Col>
        </Row>
    )
}

function Resultat ({answers,questionsLength}){
    const {t} = useTranslation();

    const [valid, setValid] = useState(false);

    const resultsQuiz = useSelector(state => state.Quiz.resultsQuiz)

    const el = useRef(null);

    useEffect(() => {
      el.current.scrollIntoView({ behavior: 'smooth' });
    });

    useEffect(() => {

       
       const ruse = ((resultsQuiz?.numberOfCorrectAnswers * 100) / resultsQuiz?.numberOfQuestions);

       setValid(ruse>=50);

    }, [resultsQuiz]);

    return (
        <Row className="justify-content-md-center mt-4 quiz-contenet" >
            <Col lg={8} className="col-md-auto p-0 quiz-result mb-3">
           
                     <h2 className="text-blue " >{t('quiz.result.title')}</h2>

                       <div className="text-muted mb-0 quiz-desc  mt-5" >
                        <img src={valid ? reussi :lost} width={279} height={159} title="valid-img" alt="" />
                    </div> 
                  
                    <div className="row task-dates mb-0 mt-3 mb-3">
                      <h5 >{valid ?
                       t('quiz.result.successMessage')
                        :
                       t('quiz.result.failedMessage')
                      }</h5>
                    </div>  
                     <div className="clearfix  mt-3 "  ref={el}>
                       <div  className={`btn btn-lighten-${valid ? 'success' : 'danger' } waves-effect  width-md waves-${valid ? 'success' : 'danger' } pl-4 pr-4`}>
                         {t('quiz.result.score') } {resultsQuiz?.numberOfCorrectAnswers}/{resultsQuiz?.numberOfQuestions}
                       </div>
                    </div>  
            </Col>
        </Row>
    )
}


function ConfirmQuiz(props) {
  const {t} = useTranslation();
  return (
    <Modal {...props} 
     aria-labelledby="contained-modal-title-vcenter"
     centered
     backdrop={"static"}
    >
      <Modal.Body>
        <Container className="pt-4">
          <Row className="show-grid">
            <Col  lg={12} className="text-center">
              <img src={confImg} width={154} height={121} alt="" />
            </Col>
            <Col  lg={12} className="text-center">
              <p>{t('quiz.confirmQuiz.title')} </p>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer  style={{borderTop:'0px',justifyContent:'center'}}>
      <Button variant="secondary" onClick={()=>{props.onClose()}} style={{backgroundColor:'#F6F7FC' , color:'#343A40' , borderWidth:'0px'}} >
           {t('quiz.confirmQuiz.no')}
          </Button>
          <Button variant="primary" onClick={()=>{props.onHide()}}>
            {t('quiz.confirmQuiz.yes')}
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

function MyVerticallyCenteredModal(props) {
  const {t} = useTranslation();
  return (
    <Modal
      {...props}
    //   size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={"static"}
    >
      <Modal.Body>  
         <Container>
          <Row className="show-grid justify-content-md-center">
            <Col md={5} className="text-center">
              <img src={getStart} alt="" />
            </Col>
          </Row>
          <Row className="show-grid justify-content-md-center mt-2">
            <Col md={8} className="text-center">
               <h4>{t('quiz.verticallyCenteredModal.title')} </h4>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3">
            <Col  md={5} className="text-center">
               <Button onClick={props.onHide} className="mr-2  pr-5 pl-5" >{t('quiz.verticallyCenteredModal.yes')}</Button>
            </Col>
          </Row>
        </Container>

      </Modal.Body>
    </Modal>
  );
}

//T
function Timer ({secs,start,onStop}){

  const [remainingSecs, setRemainingSecs] = useState(secs);
  const [isActive, setIsActive] = useState(start);
  const [colore, setColore] = useState("");

  useEffect(() => {
    setIsActive(start);
      return () => { };
  }, [start])

  useEffect(() => {
      if(remainingSecs===0){
        setIsActive(false);
        onStop(true);
      }
      if(remainingSecs===10){
        setColore('danger')
      }

    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingSecs(remainingSecs => remainingSecs - 1);

      }, 1000);
    } else if (!isActive && remainingSecs !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);

  }, [isActive, remainingSecs]);



    return (
      <span className="badge badge-gri-chrono badge-pill float-left mr-2">
          <i className={`fa fa-stopwatch fa-2x mr-1 text-${colore}`}></i>
          <div className={`text-${colore} timer-label`} >
                            {remainingSecs} s
          </div>
     </span>
    )
}

const Quiz = (props) => {
    const {t} = useTranslation();
    
    const color_ =  "info" ;   

    const  loading = useSelector(state => state.Quiz.loading);
    const  {quiz,questionsLength,data}    = useSelector(state => {
      const quiz_ = {
        quizDTO:{
          estimatedTime:0,
          name:''
        }
      }
      const empty =  Object.keys(state.Quiz.quiz).length ===  0;

      return  {
        quiz :!empty ? state.Quiz.quiz : quiz_,
        questionsLength:state.Quiz.quiz.quizDTO ? state.Quiz.quiz.quizDTO.questions.length : 0,
        data:state.Quiz.quiz.quizDTO ? state.Quiz.quiz.quizDTO.questions : [],
      }
    });
    const  module    = useSelector(state => state.Module.module);
    const  user      = useSelector(state => state.Auth.user);

    const [index, setIndex] = useState(0);
    const [indexOption, setIndexOption] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [progress, setProgress] = useState(1);
    const [end_, setEnd] = useState(false);
    const [modalShow, setModalShow] = useState(true);
    const [startTimer, setStartTimer] = useState(false);
    const [showQuizContenet, setShowQuizContenet] = useState(true);
    const [btnValide, setBtnValide] = useState(false);
    const [showConfirmQuiz, setShowConfirmQuiz] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
       setProgress((answers.length * 100) / questionsLength)
    }, [answers]); 


  useEffect(() => {
     dispatch(getQuiz(decrypt(props.match.params.quizCompetitionId), decrypt(props.match.params.quizID)));
  }, [])

    const setIndexOption_ = (index)=>{
      setIndexOption(index);
      pushInanswers(index);
    }

    const pushInanswers = (indexOp)=>{
        
        const list = answers;
        let item = {
            index:index,
            indexOption:indexOp,
            valid:data[index].correctAnswer-1 === indexOp,
            questionId:data[index].questionId
        }

        const foundIndex = list.findIndex(x => x.index === item.index);

        if(foundIndex===-1) {
            list.push(item);  
        }else{
            list[foundIndex] = item;
        } 
        //   //console.log(list);

        // if(item.valid){
        //   //console.log('-----pushInanswers------',item);
        // }

        setAnswers(list);
        setProgress(((list.length) * 100) / questionsLength)

        if(questionsLength === 1 ) {setBtnValide(true)}
       
  
      }

    const next = ()=>{

      setIndexOption(null);
      const list = answers;
      const foundIndex = list.findIndex(x => x.index === index+1);
      if(foundIndex!==-1)  setIndexOption(list[foundIndex].indexOption);

      let index_  = index+1;
      if(index_<questionsLength){
        setIndex(index_);
      }
      if(index+1 === questionsLength-1){setBtnValide(true)}
      setShowQuizContenet(!showQuizContenet)

    }

    const preve = ()=>{

      setIndexOption(null);
      const list = answers;
      const foundIndex = list.findIndex(x => x.index === index-1);
      if(foundIndex!==-1)  setIndexOption(list[foundIndex].indexOption);

      let index_  = index-1;
      if(index>=1){
        setIndex(index_);
      }  
        
      setShowQuizContenet(!showQuizContenet)

    }
    const end = ()=>{
      setShowConfirmQuiz(true)
        
    }

    const validQuiz = ()=>{

      
      dispatch(saveQuiz({
        "quizCompetitionId": quiz.quizCompetitionId,
        "quizId": quiz.quizDTO.id,
         "questionResults": answers.map((item)=>{
           return {
                  "questionId": item.questionId,
                  "answerIndex": item.indexOption+1
           }
         })
      },
      module.trainingSessionId
      ))
    
        setShowConfirmQuiz(false);
        // pushInanswers();
        setEnd(true);
        setStartTimer(false);
    }

   
    if(loading) return <Loader />
    return (
    <div className="d-flex flex-column bd-highlight bg-white quiz-container">
                        

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() =>{ 
                    setModalShow(false);
                    setStartTimer(true);
                }}
            />
            <ConfirmQuiz  show={showConfirmQuiz}  onClose={()=>{ setShowConfirmQuiz(false); }}    onHide={()=>{validQuiz()}}   />
           <div className="d-flex flex-row bd-highlight flex11 quiz_content">
                <div className="p-2 bd-highlight groupe-quiz overlay" style={{ 
                    backgroundImage: `url(${Background})`
                    }}>    
                </div>
                
                <div className="bd-highlight flex6">
                    <div className="container-fluid">
                         <Row className="mt-4 mr-4">
                            <Col>
                                <div className="clearfix">
                                    <div className="media mb-3 float-right user-group">
                                        <img className="d-flex mr-2 rounded-circle avatar-md user-photo" alt=""  src={ user.avatarPath ||profilePic}/>
                                        <div className="media-body">
                                            <h4 className="media-heading mt-0 user-name">{user.firstName + ' ' +user.lastName }</h4>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                         </Row>
                         {end_ ?
                            <Resultat  answers={answers} questionsLength={questionsLength} />
                            :
                            questionsLength > 0 &&

                              <CSSTransition
                                in={showQuizContenet}
                                timeout={300}
                                classNames={'alert'}
                                unmountOnExit
                                onExit={()=>{setShowQuizContenet(!showQuizContenet)}}
                              >

                                 <QuizContent t={t} index={index}  data={data}  item={data[index]} setIndexOption={setIndexOption_} indexOption={indexOption} />

                              </CSSTransition>
                         }
                       
                    </div>
                </div>
            </div>
            {/* footer quiz */}
            <div className="d-flex flex-row bd-highlight footer-container quiz_footer">
               
                <div className="p-2 flex-fill bd-highlight module-name-container ">
                   <img src={logo} alt="" height="29" className="mr-2" />
                   <ol className="breadcrumb module-name quiz_footer_progress">
                      <li className="breadcrumb-item">
                        {module.moduleName}
                      </li>
                      <li className="active breadcrumb-item" aria-current="page">{quiz.quizDTO.name}</li>
                    </ol>
                </div>

                <div className="d-flex  bd-highlight flex-row progress-container quiz_footer_progress" >

                    <div className="bd-highlight flex6 quiz-progress">
                        <div className={`progress progress-bar-alt-${color_} progress-sm m-0`}>
                            <div
                            className={`progress-bar bg-${color_} progress-animated wow animated animated animated`}
                            style={{
                                width: `${progress}%`
                            }}
                            ></div>
                        </div>
                    </div>

                    <div className="bd-highlight ml-1 pb-1">
                            <span className="text-white float-left">
                            {answers.length}/{questionsLength}
                            </span>
                    </div>
                
                </div>

                <div className="p-2 flex-fill bd-highlight justify-content-end timer-container">
                   
                        
                   <Timer secs={(quiz.quizDTO.estimatedTime || 1)*60} start={startTimer} onStop={()=>setEnd(true)} />
                 
                    {!end_ ?
                    <>
                        {index>0 &&
                            <button type="button" onClick={preve} className="p-1  btn  waves-effect waves-light width-xs bg-blue mr-2">{t('quiz.previous')} </button>
                        }
                        {index !== questionsLength-1 &&
                          <button type="button" onClick={next} className="p-1  btn waves-effect waves-light width-xs bg-blue">{t('quiz.next')}</button>
                        }
                       { btnValide &&
                        <button type="button" onClick={end} className="p-1  btn waves-effect waves-light width-xs btn-info ml-2">{t('quiz.validate')}</button>
                       }
                    </>
                    :
                      <button onClick={()=>{window.close();}} type="button" className="p-1  btn btn-success waves-effect waves-light width-xs">{t('quiz.completed')}</button>
                    }
                </div>
            </div>
      </div>
    );
}


export default Quiz;
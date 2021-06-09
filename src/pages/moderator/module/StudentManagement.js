import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  UncontrolledDropdown,
  Tooltip,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import ellipsisVSolid from '../../../assets/images/ellipsis-v-solid.svg';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
import {
  Tabs,
  Tab,
  Form,
  Modal,
  Container,
  Dropdown,
  Button,
} from 'react-bootstrap';
import profilePic from '../../../assets/images/user-1.png';

import {
  getParticipants,
  selectParticipant,
  changeStatusParticipant,
  selectQuizStatistics,
  getQuizStatistics,
  getTeams,
  assignmentTeams,
} from '../../../redux/actions';
import {Link} from 'react-router-dom';
import {encrypt, decrypt} from '../../../helpers/crypto';
import {useTranslation} from 'react-i18next';
import _ from 'lodash';
import { useRef } from 'react';

const danger = {
  prog: '#FF5A5B',
  bag: '#FFDEDE',
};
const success = {
  prog: '#0FC469',
  bag: '#CFF2E1',
};
const warning = {
  prog: '#F9C850',
  bag: '#FEF4DC',
};

const ShowKeyModal = (props) => {
  const {show, onHide, trainingSessionCode, t} = props;

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // backdrop={"static"}
    >
      <Modal.Body className="p-4">
        <Container>
          <h4 className="text-center mt-1 mb-3">
            {t('studentManagement.showKeyModal')}
          </h4>
          <h4 className="text-center">{trainingSessionCode}</h4>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const AffectationItem = ({
  user = {},
  group = [],
  item = {},
  block = 1,
  onSelect = () => null,
}) => {
  const [selectVal, setSelectVal] = useState();

  useEffect(() => {
      setSelectVal(item.teamName !== undefined ? item.teamName : group[0].teamName || '');
  }, [item.teamName]);

  return (
    <div className="d-flex affectation-content">
      <div className="test-affectation-l" style={{flex:'6'}} >
        {user.firstName + ' ' + user.lastName}
      </div>
      <div style={{
        flex:'2',
      }} >
        <Dropdown id="affectation-select">
          <Dropdown.Toggle id="dropdown-basic" style={{width:'100%',whiteSpace: 'nowrap'}}>
            {selectVal}
            <i className=" fas fa-angle-down ml-2"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {group.map((item_, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => {
                    setSelectVal(item_.teamName);
                    // //console.log('choise teams', user);

                    onSelect(item.teamId, item_.teamId, user.id, block);
                  }}>
                  {item_.teamName}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

const AffectationList = (props) => {
  const {show, onHide, participants = []} = props;

  const [participants_, setParticipants] = useState([]);

  const dispatch = useDispatch();

  const listF = useRef(null);

  const teams = useSelector((state) => state.StudentManagement.teams);

  useEffect(() => {
    const list = [];
    const listP = [];

    if (
      teams.length > 0 &&
      (teams[0].players.length > 0 ||
        teams[1].players.length > 0 ||
        teams[2].players.length > 0 ||
        teams[3].players.length > 0)
    ) {
      teams.map((item) => {
        item.players.map((elem) => {
          list.push({
            teamId: item.teamId,
            teamName: item.teamName,
            trainingSessionParticipantId: null,
            user: elem.playerUser,
          });
          listP.push({
            teamId: item.teamId,
            gameSessionId: item.gameSessionId,
            userId: elem.playerUser.id,
          })
        });
      });

      listF.current= {
        listP:listP
      }
      // //console.log("--------list------->",list)

      return setParticipants(list)
    }

    //   setSendList(listS);
    //   setParticipants(list);
    // } else {
    //   //console.log('participants data');
    //   setParticipants(participants);
    // }
  }, [teams,show]);

  const rendom = () => {
    const listG = teams.map((item) => {
      return {...item, players: []};
    });
    let list_ = [];
    let list  = [];
    let index = 0;
    while (list_.length !== participants_.length) {
      const item = participants_[Math.floor(Math.random() * participants_.length)];

      const res = list_.find(function (ele) {
        return ele.user.id === item.user.id;
      });
      if (res === undefined) {
        list_.push(item);

        listG[index].players = [...listG[index].players, item.user];
        if (index === 3) index = 0;
        else index += 1;
      }
    }

    listF.current.listP = [];
    listG.map((group, index) => {
      group.players.map((user) => {
        listF.current.listP.push({
          gameSessionId: group.gameSessionId,
          teamId: group.teamId,
          userId: user.id
        });
      });
    });


    listG.map((item) => {
      item.players.map((elem) => {
        list.push({
          teamId: item.teamId,
          teamName: item.teamName,
          trainingSessionParticipantId: null,
          user: elem,
        });
      });
    });

    setParticipants(list);
  };

  const coll = ()=>{

      onHide(false);
      dispatch(getParticipants(props.trainingSessionId));
      dispatch(getTeams(props.teams[0].gameSessionId));

  }
  const save = () => {
    dispatch(assignmentTeams(listF.current.listP,coll));

  };

  const selectTeam = (teamId, newTeamId, userId, block) => {

    const objIndex = listF.current.listP.findIndex((obj => obj.userId === userId));

    listF.current.listP[objIndex].teamId = newTeamId
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // backdrop={"static"}
    >
      <Modal.Body className="p-4">
        <div className="d-flex affectation-title">
          <div className="test-affectation-t">Affectation</div>
          <div>
            <Button variant="secondary" onClick={rendom}>
              <i className="fas fa-random"></i>
            </Button>
          </div>
        </div>

        {
          participants_.map((item, index) => {
              return (
                <AffectationItem
                  key={index}
                  user={item.user}
                  group={teams}
                  onSelect={selectTeam}
                  block={2}
                  item={item}
                />
              );
            })
        }

        <div className="d-flex  flex-row-reverse mt-3">
          <Button variant="primary" className="ml-2" onClick={save}>
            Enregistrer
          </Button>
          <Button variant="secondary" onClick={() => onHide(false)}>
            Retour
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const ListStd = (props) => {
  const participants = useSelector(
    (state) => state.StudentManagement.participants,
  );
  const [index_, setIndex] = useState(0);
  const [show, setShow] = useState(false);

  const {t, trainingSessionId, gameSessionId} = props;

  return (
    <>
      <AffectationList
        show={show}
        onHide={setShow}
        participants={participants}
        teams={props.teams}
        trainingSessionId={trainingSessionId}
        gameSessionId={gameSessionId}
      />
      <div
        className="col-xl-4 listStd"
        style={{
          backgroundColor: '#F1F5F7',
          paddingLeft: '0px',
          paddingRight: '0px',
        }}>
        <div
          className="card-box-custom p-0 mb-0"
          style={{backgroundColor: '#F1F5F7'}}>
          {props.isBusinessGame && participants.length > 0  && (
            <div
              className="dropdown float-right"
              style={{top: '-2px', right: '32px'}}>
              <UncontrolledDropdown direction="left">
                <DropdownToggle
                  caret
                  tag="a"
                  className="text-muted"
                  style={{cursor: 'pointer'}}>
                  <img src={ellipsisVSolid} alt="" />
                </DropdownToggle>
                <DropdownMenu
                  onClick={() => {
                    setShow(true);
                  }}>
                  <DropdownItem>
                    <span> {t('studentManagement.listStd.affectation')}</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          )}

          <h4
            className="header-title "
            style={{
              marginTop: '15px',
              marginLeft: '22px',
              marginBottom: '15px',
            }}>
            {t('studentManagement.listStd.listStudent')}
          </h4>

          <div className="inbox-widget">
            <div
              style={{
                maxHeight: '570px',
                overflowY: 'auto',
                minHeight: '569px',
              }}>
              {participants &&
                participants.length > 0 &&
                participants.map((item, index) => (
                  <ListStdItem
                    setIndex={setIndex}
                    activeIndex={index_}
                    key={index.toString()}
                    index={index}
                    participant={item}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ListStdItem = (props) => {
  const {participant, index, activeIndex} = props;
  const dispatch = useDispatch();
  const isActive = index === activeIndex ? 'list-std-item-active' : '';
  const onClick = () => {
    dispatch(selectParticipant(participant));
    props.setIndex(index);
  };

  return (
    <div
      className={`inbox-item list-std-item ${isActive}`}
      style={{cursor: 'pointer'}}
      onClick={onClick}>
      <div>
        <h5
          className="inbox-item-author mt-0 mb-1"
          style={{
            textAlign: 'left',
            fontSize: '15px',
            letterSpacing: '0.3px',
            opacity: '1',
            fontWeight: 'initial',
            fontFamily: 'Roboto',
            color: '#3F4351 !important',
            boxShadow: 'none',
          }}>
          {participant.user &&
            (participant.user.firstName || participant.user.username) +
              ' ' +
              (participant.user.lastName || '')}
        </h5>

        <div className="inbox-item-date">
          <div className="user float-left mr-3">
            {participant.active ? (
              <i className="mdi mdi-circle text-success"></i>
            ) : (
              <i className="mdi mdi-circle text-danger"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StdProfile = (props) => {
  const participant = useSelector(
    (state) => state.StudentManagement.selectedParticipant || {},
  );
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const {t} = props;

  useEffect(() => {
    setChecked(participant.active);
  }, [participant]);

  const onChangeCheck = () => {
    setChecked(!participant.active);
    dispatch(
      changeStatusParticipant(
        props.trainingSessionId,
        participant.user.id,
        !participant.active ? 1 : 0,
      ),
    );
  };
  if (participant && participant.user)
    return (
      <div className="col-xl-4col-xl-9 col-lg-8 std-profile">
        <Row>
          <Col md={12}>
            <div
              className="bg-picture card-box-custom mb-3"
              style={{
                borderStyle: 'solid',
                borderColor: '#EBEFF2',
                borderWidth: '1px',
              }}>
              <div className="dropdown float-right">
                <Form>
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onChange={onChangeCheck}
                    checked={checked}
                  />
                </Form>
              </div>
              <div className="profile-info-name ">
                <img
                  src={participant.user.avatarPath || profilePic}
                  className="rounded-circle avatar-xl img-thumbnail float-left mr-3"
                  alt=""
                />

                <div className="profile-info-detail overflow-hidden">
                  <h4 className="m-0">
                    {participant.user &&
                      (participant.user.firstName ||
                        participant.user.username) +
                        ' ' +
                        (participant.user.lastName || '')}
                  </h4>
                  <div className="text-left mt-2">
                    <p className="text-muted font-13 mb-0">
                      <strong
                        style={{
                          color: '#6C757D',
                          fontWeight: '400',
                          fontSize: '15px',
                          fontFamily: 'Roboto',
                          letterSpacing: '0px',
                        }}>
                        {t('studentManagement.stdProfile.email')} :
                      </strong>{' '}
                      <span className="ml-2">
                        {participant.user && participant.user.email}
                      </span>
                    </p>
                    {props.isBusinessGame && (
                      <p className="text-muted font-13 mb-0">
                        <strong
                          style={{
                            color: '#6C757D',
                            fontWeight: '400',
                            fontSize: '15px',
                            fontFamily: 'Roboto',
                            letterSpacing: '0px',
                          }}>
                          {' '}
                          {t('studentManagement.stdProfile.equip')} :
                        </strong>{' '}
                        <span className="ml-2">{participant.teamName}</span>
                      </p>
                    )}
                    <p className="text-muted font-13">
                      <strong
                        style={{
                          color: '#6C757D',
                          fontWeight: '400',
                          fontSize: '15px',
                          fontFamily: 'Roboto',
                          letterSpacing: '0px',
                        }}>
                        {' '}
                        {t('studentManagement.stdProfile.status')} :
                      </strong>{' '}
                      <span className="ml-2">
                        {participant.user && participant.user.actif
                          ? t('studentManagement.stdProfile.actif')
                          : t('studentManagement.stdProfile.inactif')}{' '}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={12}>
            <div
              className="card-box mb-0 p-0"
              style={{
                borderStyle: 'solid',
                borderColor: '#EBEFF2',
                borderWidth: '1px',
              }}>
              <h4
                className="header-title"
                style={{
                  margin: '20px 14px 16px 20px',
                }}>
                {t('studentManagement.stdProfile.quizRes')}
              </h4>

              <div className="inbox-widget">
                <div
                  style={{
                    maxHeight: '444px',
                    overflowY: 'auto',
                  }}>
                  {participant.quizResults &&
                    participant.quizResults.length > 0 &&
                    participant.quizResults.map((item, index) => (
                      <ListResItem
                        key={index.toString()}
                        index={index}
                        quizResult={item}
                      />
                    ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  else return null;
};

const ListResItem = (props) => {
  const [score, setScore] = useState(0);
  const {quizResult} = props;
  const color = score < 50 ? danger : score < 80 ? warning : success;

  useEffect(() => {
    const res = ~~((quizResult.score * 100) / quizResult.numberOfQuestions);
    setScore(res);
  }, [quizResult]);

  return (
    <div className="inbox-item inbox-item-std">
      <h5>
        {quizResult.quizName}{' '}
        <span className="float-right" style={{color: `${color.prog}`}}>
          {score} %
        </span>
      </h5>
      <div
        className="progress progress-bar-alt-success progress-sm"
        style={{backgroundColor: `${color.bag}`}}>
        <div
          className="progress-bar  progress-animated wow animated animated"
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{
            width: score + '%',
            visibility: 'visible',
            animationName: 'animationProgress',
            backgroundColor: `${color.prog}`,
          }}></div>
      </div>
    </div>
  );
};

const ListQuiz = (props) => {
  const quizStatistics = useSelector(
    (state) => state.StudentManagement.quizStatistics,
  );
  const [index_, setIndex] = useState(0);
  const {t} = props;
  return (
    <>
      <div className="col-xl-4 list-quiz">
        <div
          className="card-box p-0"
          style={{backgroundColor: '#F1F5F7', height: '100%'}}>
          <h4
            className="header-title m-0"
            style={{
              paddingTop: '15px',
              paddingLeft: '22px',
              paddingBottom: '20px',
            }}>
            {t('studentManagement.listQuiz.title')}
          </h4>

          <div className="inbox-widget">
            <div
              style={{
                maxHeight: '570px',
                overflowY: 'auto',
              }}>
              {quizStatistics.quizStatisticsSet &&
                quizStatistics.quizStatisticsSet.length > 0 &&
                quizStatistics.quizStatisticsSet.map((item, index) => (
                  <ListQuizItem
                    t={t}
                    setIndex={setIndex}
                    activeIndex={index_}
                    key={index.toString()}
                    index={index}
                    quizStatistics={item}
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
  const dispatch = useDispatch();
  const {t} = props;

  const {quizStatistics, activeIndex, index} = props;
  const isActive = index === activeIndex ? 'list-std-item-active' : '';
  const onClick = () => {
    dispatch(selectQuizStatistics(quizStatistics));
    props.setIndex(index);
  };

  return (
    <div className={`inbox-item inbox-item-quiz-item ${isActive}`}>
      <div onClick={onClick} style={{cursor: 'pointer'}}>
        <h5 className="inbox-item-author mt-0 mb-1">
          {quizStatistics.quizName}
        </h5>
        <p className="inbox-item-text">
          {quizStatistics.numberOfQuestions}{' '}
          {t('studentManagement.listQuiz.questions')}
        </p>
        <p className="inbox-item-date" style={{top: '36px', right: '20px'}}>
          {quizStatistics.estimatedTime}{' '}
          {t('studentManagement.listQuiz.minutes')}
        </p>
      </div>
    </div>
  );
};

const ListQuestion = (props) => {
  const [animatedC, setAnimated] = useState('animation-t');
  const selectedQuizStatistics = useSelector(
    (state) => state.StudentManagement.selectedQuizStatistics || [],
  );
  const color =
    selectedQuizStatistics.meanScore || 0 < 50
      ? danger
      : selectedQuizStatistics.meanScore < 80
      ? warning
      : success;
  const {t} = props;

  useEffect(() => {
    setAnimated('');

    setTimeout(() => {
      setAnimated('animation-t');
    }, 40);
  }, [selectedQuizStatistics]);

  return (
    <div className="col-xl-4col-xl-9 col-lg-8">
      <Row>
        <Col md={12}>
          <div
            className="bg-picture card-box pt-0"
            style={{border: '1px solid #EBEFF2'}}>
            <h5>
              {t('studentManagement.listQuestion.moyenneScore')}{' '}
              <span
                className="float-right"
                style={{
                  color: `${color.prog}`,
                }}>
                {selectedQuizStatistics.meanScore || 0} %
              </span>
            </h5>
            <div
              className="progress  progress-sm"
              style={{backgroundColor: `${color.bag}`}}>
              <div
                className="progress-bar  progress-animated wow animated animated"
                role="progressbar"
                aria-valuenow={selectedQuizStatistics.meanScore}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{
                  width: selectedQuizStatistics.meanScore + '%',
                  visibility: 'visible',
                  animationName: 'animationProgress',
                  backgroundColor: `${color.prog}`,
                }}></div>
            </div>
          </div>
        </Col>
        <Col md={12} className={`${animatedC}`} style={{opacity: '0'}}>
          <div
            className="card-box p-0 mb-0"
            style={{border: '1px solid #EBEFF2'}}>
            <h4
              className="header-title "
              style={{
                paddingLeft: '20px',
                paddingBottom: '20px',
                paddingTop: '20px',
              }}>
              {t('studentManagement.listQuestion.moyenneRes')}
            </h4>

            <div className="inbox-widget">
              <div
                style={{
                  maxHeight: '473px',
                  // paddingRight: "15px",
                  overflowY: 'auto',
                  minHeight: '569px',
                }}>
                {selectedQuizStatistics.questionStatisticsSet &&
                  selectedQuizStatistics.questionStatisticsSet.length > 0 &&
                  selectedQuizStatistics.questionStatisticsSet.map(
                    (item, index) => (
                      <ListQuestionItem
                        key={index.toString()}
                        questionStatistics={item}
                      />
                    ),
                  )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const ListQuestionItem = (props) => {
  const {questionStatistics} = props;

  const color =
    questionStatistics.meanScore < 50
      ? danger
      : questionStatistics.meanScore < 80
      ? warning
      : success;

  return (
    <div className="mo-re-quiz">
      <div style={{minWidth: '476px'}}>
        <p>{questionStatistics.questionTitle}</p>
      </div>
      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          marginLeft: '20px',
          paddingBottom: '27px',
        }}>
        <h5>
          <span
            className="float-right"
            style={{
              color: `${color.prog}`,
            }}>
            {questionStatistics.meanScore}%
          </span>
        </h5>
        <div
          className="progress progress-bar-alt-success progress-sm"
          style={{backgroundColor: `${color.bag}`}}>
          <div
            className="progress-bar progress-animated wow animated animated"
            role="progressbar"
            aria-valuenow={questionStatistics.meanScore}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{
              width: questionStatistics.meanScore + '%',
              visibility: 'visible',
              animationName: 'animationProgress',
              backgroundColor: `${color.prog}`,
            }}></div>
        </div>
      </div>
    </div>
  );
};

const StudentManagement = (props) => {
  const loading = useSelector((state) => state.StudentManagement.loading);
  const selectedSession = useSelector((state) => state.Session.selectedSession);
  const module = useSelector((state) => state.Module.module);
  const teams = useSelector((state) => state.StudentManagement.teams);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [showAdd, setShowAdd] = useState(false);
  const trainingSessionId = decrypt(props.match.params.trainingSessionId);
  useEffect(() => {
    dispatch(getParticipants(trainingSessionId));
    dispatch(getQuizStatistics(trainingSessionId));
    dispatch(getTeams(props.location.gameSessionId));
  }, [props.match.params.moduleID]);

  const [tooltipOpen2, setTooltipOpen2] = useState(false);
  const toggle2 = () => setTooltipOpen2(!tooltipOpen2);

  return (
    <React.Fragment>
      <ShowKeyModal
        t={t}
        trainingSessionCode={selectedSession.trainingSessionCode}
        show={showAdd}
        onHide={() => setShowAdd(false)}
      />
      <div>
        {loading && <Loader />}
        <Row className="mb-1">
          <Col lg={3}>
            <ul className="list-unstyled topnav-menu topnav-menu-left m-0">
              <h4 className="mb-0">{selectedSession.trainingSessionName}</h4>
            </ul>
          </Col>
          <Col lg={9}>
            <div className="card card-body p-0 m-0 activity-container mb-2 std-m-btns">
              <div
                id="code"
                className="btn  text-black ml-2 noHover"
                style={{backgroundColor: '#6C757D'}}
                onClick={() => {
                  setShowAdd(true);
                }}>
                <i className="fa fa-key"></i>
              </div>

              <Tooltip
                placement="top"
                isOpen={tooltipOpen2}
                target="code"
                toggle={toggle2}>
                <p style={{fontSize: '12px', margin: '0px'}}>{t('studentManagement.showCode')}</p>
              </Tooltip>

              {module.businessGame && (
                <Link
                  target="_blank"
                  // to="/moderator/StratEdge/analysis"
                  to={module.gameName === "StratEdge" ? "/moderator/StratEdge/analysis" : module.gameName === "PVGame" ? "/moderator/pv-game/classement" : "#"}
                  className="btn btn-test text-black ml-2 noHover">
                  <i className="fa fa-gamepad mr-1"></i>
                  {t('studentManagement.businessGame')}
                </Link>
              )}

              <button
                onClick={() =>
                  window.open(
                    `/moderator/modules/${props.match.params.trainingSessionId}/quiz/show`,
                    '_blank',
                  )
                }
                className="btn btn-indigo text-black">
                <i className="fa fa-trophy mr-1"></i>

                {t('studentManagement.quiz')}
              </button>
              <button
                onClick={() =>
                  window.open(
                    `/moderator/modules/${encrypt(
                      selectedSession.moduleInstanceId,
                    )}/notions/show`,
                    '_blank',
                  )
                }
                className="btn btn-blue text-black mr-2">
                <i className="fa fa-chalkboard-teacher mr-1"></i>

                {t('studentManagement.formation')}
              </button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
              <Tab eventKey="home" title={t('studentManagement.studentManagementTitle')}>
                <Row>
                  <ListStd
                    isBusinessGame={module.businessGame}
                    t={t}
                    teams={teams}
                    trainingSessionId={trainingSessionId}
                    gameSessionId={props.location.gameSessionId}
                  />
                  <StdProfile
                    isBusinessGame={module.businessGame}
                    trainingSessionId={selectedSession.trainingSessionId}
                    t={t}
                  />
                </Row>
              </Tab>
              <Tab eventKey="profile" title={t('studentManagement.quizDashboard')} >
                <Row>
                  <ListQuiz t={t} />
                  <ListQuestion t={t} />
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default StudentManagement;

import React, {useEffect, useState} from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import Select from 'react-select';
import plusSolid from '../../../assets/images/plus-solid.svg';
import linkSolid from '../../../assets/images/link-solid.svg';
import ellipsisVSolid from '../../../assets/images/ellipsis-v-solid.svg';
import {useSelector, useDispatch} from 'react-redux';
import Loader from '../../../components/Loader';
import {Modal, Container} from 'react-bootstrap';
import {
  getSessionsModuleByID,
  addSessionModule,
  initSuccess,
  deleteSessionModule,
  archiveSessionModule,
  editSessionModule,
  selectSession,
} from '../../../redux/actions';
import {useTranslation} from 'react-i18next';
import SwalModal from '../../../components/SwalModal';
import DatePicker, {registerLocale} from 'react-datepicker';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import {parse} from '../../../helpers/func';
import 'react-datepicker/dist/react-datepicker.css';
import {Link, useHistory} from 'react-router-dom';
import {fr, enGB} from 'date-fns/locale';
import detectBrowserLanguage from 'detect-browser-language';
import {encrypt, decrypt} from '../../../helpers/crypto';

registerLocale('fr', fr);
registerLocale('en', enGB);

const moment = extendMoment(Moment);

const CardSession = (props) => {
  const {
    trainingSessionName,
    trainingSessionId,
    gameSessionId,
    startDate,
    endDate,
    numberOfParticipants,
    numberOfQuizzes,
    numberOfNotions,
    moduleInstanceName,
    t,
  } = props;

  const [status, setStatus] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();
  const deleteSuccess = useSelector((state) => state.Session.deleteSuccess);
  const archiveSuccess = useSelector((state) => state.Session.archiveSuccess);

  useEffect(() => {
    getStatus();
  }, [props]);

  useEffect(() => {
    if (deleteSuccess) {
      SwalModal({
        text: t('moduleSession.swal.deleteSuccess'),
        icon: 'success',
      });

      dispatch(initSuccess());
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (archiveSuccess) {
      //Archive session
      SwalModal({
        text: t('moduleSession.swal.archiveSuccess'),
        icon: 'success',
      });

      dispatch(initSuccess());
    }
  }, [archiveSuccess]);

  const getStatus = () => {
    const start = moment(startDate),
      end = moment(endDate),
      date = moment(),
      range = moment().range(start, end);

    if (range.contains(date)) {
      setStatus({
        color: '#F9C851',
        label: t('moduleSession.status.in_progress'),
        slug: 'in_progress',
      });
    } else {
      const diff = date.diff(start);
      if (diff < 0) {
        setStatus({
          color: '#FF5B5B',
          label: t('moduleSession.status.coming'),
          slug: 'coming',
        });
      } else {
        setStatus({
          color: '#10C46E',
          label: t('moduleSession.status.finish'),
          slug: 'finish',
        });
      }
    }
  };

  const deleteSession = () => {
    SwalModal({
      text: t('moduleSession.swal.deleteAsk'),
      icon: 'warning',
      buttons: [t('moduleSession.swal.no'), t('moduleSession.swal.yes')],
      confirmButtonColor: '#71B6F9',
      dangerMode: false,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSessionModule(props.trainingSessionId));
      }
    });
  };

  const onClickSession = () => {
    dispatch(
      selectSession({
        trainingSessionName,
        trainingSessionId,
        trainingSessionCode: props.trainingSessionCode,
        moduleInstanceId: props.moduleInstanceId,
        moduleAffectationId: props.moduleAffectationId,
        startDate,
        gameSessionId,
        endDate,
        numberOfParticipants,
        numberOfQuizzes,
        numberOfNotions,
        moduleInstanceName,
      }),
    );

    // history.push(

    // );
  };

  return (
    <div className="col-xl-4">
      <EditSessionModal
        t={t}
        show={modalShow}
        name={trainingSessionName}
        configuration={{
          label: moduleInstanceName,
          value: props.moduleInstanceId,
        }}
        trainingSessionId={props.trainingSessionId}
        startAt={startDate}
        finishAt={endDate}
        onHide={(value) => {
          setModalShow(false);
        }}
      />

      <Card>
        <CardBody className="card-box project-box mb-0 pb-0 ">
          <div className="ellipsis-position" style={{zIndex: '100'}}>
            <UncontrolledDropdown direction="left">
              <DropdownToggle
                caret
                tag="a"
                className="text-muted"
                style={{cursor: 'pointer'}}>
                <img src={ellipsisVSolid} alt="" title="" />
              </DropdownToggle>
              {status.slug === 'coming' && (
                <DropdownMenu>
                  <DropdownItem onClick={() => setModalShow(true)}>
                    <span>{t('moduleSession.cardSession.edit')}</span>
                  </DropdownItem>
                  <DropdownItem onClick={deleteSession}>
                    <span>{t('moduleSession.cardSession.delete')}</span>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      history.push(
                        `/moderator/modules/${encrypt(
                          props.moduleInstanceId,
                        )}/config`,
                      );
                    }}>
                    <span>config</span>
                  </DropdownItem>
                </DropdownMenu>
              )}
              {status.slug === 'finish' && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      dispatch(archiveSessionModule(props.trainingSessionId));
                    }}>
                    <span>{t('moduleSession.cardSession.archive')}</span>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      history.push(
                        `/moderator/modules/${encrypt(
                          props.moduleInstanceId,
                        )}/config`,
                      );
                    }}>
                    <span>config</span>
                  </DropdownItem>
                </DropdownMenu>
              )}
              {status.slug === 'in_progress' && (
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => {
                      history.push(
                        `/moderator/modules/${encrypt(
                          props.moduleInstanceId,
                        )}/config`,
                      );
                    }}>
                    <span>config</span>
                  </DropdownItem>
                </DropdownMenu>
              )}
            </UncontrolledDropdown>
          </div>

          <Link
            to={{
              pathname: `/moderator/modules/${encrypt(
                trainingSessionId,
              )}/student-management`,
              gameSessionId: gameSessionId,
            }}
            onClick={onClickSession}>
            <h4 className="mt-0">{trainingSessionName}</h4>
            <h5
              className="mt-0"
              style={{
                color: status.color,
                textTransform: 'uppercase',
              }}>
              {status.label}
            </h5>
            <h6 className="date-config">
              {t('moduleSession.cardSession.startAt')} {startDate}
              {t('moduleSession.cardSession.finishAt')} {endDate}
            </h6>
            <Row>
              <Col lg={1}>
                <img className="mr-2" src={linkSolid} alt="" title="" />
              </Col>
              <Col lg={11} className="pl-1">
                <p
                  style={{
                    color: '#323A46',
                    fontSize: '14px',
                    fontFamily: 'Karla',
                    letterSpacing: '0.28px',
                    fontWeight: 'bold',
                  }}>
                  {moduleInstanceName}
                </p>
              </Col>
            </Row>

            <Row>
              <Col>
                <h4 className="m-0">{parse(numberOfParticipants)} </h4>
                <p style={{color: '#6C757D'}}>
                  {t('moduleSession.cardSession.students')}
                </p>
              </Col>
              <Col>
                <h4 className="m-0">{parse(numberOfNotions)} </h4>
                <p style={{color: '#6C757D'}}>
                  {t('moduleSession.cardSession.notions')}
                </p>
              </Col>
              <Col>
                <h4 className="m-0">{parse(numberOfQuizzes)} </h4>
                <p style={{color: '#6C757D'}}>
                  {t('moduleSession.cardSession.quiz')}
                </p>
              </Col>
            </Row>
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

const AddSessionModal = (props) => {
  const addSuccess = useSelector((state) => state.Session.addSuccess);
  const configs = useSelector((state) => state.Configuration.configurations);
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [configuration, setConfiguration] = useState('');
  const [startAt, setStartAt] = useState(new Date());
  const [finishAt, setFinishAt] = useState(new Date());
  const [maxDate, setMaxDate] = useState();
  const [invalid, setInvalid] = useState('none');
  const [userLanguage, setUserLanguage] = useState('fr');

  const {t, show, onHide} = props;

  useEffect(() => {
    setUserLanguage(detectBrowserLanguage());
  }, []);

  useEffect(() => {
    setName('');
    setInvalid('none');
  }, [props.show]);

  useEffect(() => {
    if (addSuccess) {
      SwalModal({
        text: t('moduleSession.swal.addSuccess'),
        icon: 'success',
      });

      dispatch(initSuccess());
    }
  }, [addSuccess]);

  const valide = () => {
    if (name !== '' && configuration !== '') {
      dispatch(
        addSessionModule(
          configuration.value,
          name,
          moment(startAt).format('YYYY-MM-DD'),
          moment(finishAt).format('YYYY-MM-DD'),
        ),
      );
      props.onHide();
    } else {
      setInvalid('initial');
    }
  };

  const handleChange = (selectedOption) => {
    setConfiguration(selectedOption);
  };

  const generateOptions = () => {
    const options = [];

    configs.map((config) =>
      options.push({
        value: config.moduleInstanceId,
        label: config.moduleInstanceName,
      }),
    );

    if (options.length > 0 && configuration === '')
      setConfiguration(options[0]);

    return options;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={'static'}>
      <Modal.Body>
        <Container>
          <h4>{t('moduleSession.modalAddSession.title')}</h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t('moduleSession.modalAddSession.name')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t('moduleSession.modalAddSession.name')}
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="invalid-feedback"
                  style={{display: `${invalid}`}}>
                  {t('moduleSession.modalAddSession.errorName')}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label> {t('moduleSession.modalAddSession.config')}</label>

                <Select
                  menuPlacement="auto"
                  menuPosition="fixed"
                  value={configuration}
                  onChange={handleChange}
                  options={generateOptions()}
                  // placeholder={t(
                  //   "moduleSession.modalAddSession.placeholderConfig"
                  // )}
                />
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>
                  {' '}
                  {t('moduleSession.modalAddSession.startAndFinish')}{' '}
                </label>

                <Row style={{marginLeft: 0}}>
                  <div
                    style={{
                      width: '49%',
                    }}>
                    <DatePicker
                      locale={userLanguage}
                      selected={startAt}
                      onChange={(date) => {
                        setStartAt(date);
                        if (!maxDate) setFinishAt(date);
                      }}
                      maxDate={maxDate}
                      className="form-control start-picker"
                      dateFormat={
                        userLanguage === 'fr-FR' ? 'yyyy-MM-dd' : 'MM-dd-yyyy'
                      }
                    />
                  </div>
                  <div
                    style={{
                      width: '49%',
                    }}>
                    <DatePicker
                      locale={userLanguage}
                      selected={finishAt}
                      onChange={(date) => {
                        setFinishAt(date);
                        setMaxDate(date);
                      }}
                      minDate={startAt}
                      className="form-control finish-picker"
                      dateFormat={
                        userLanguage === 'fr-FR' ? 'yyyy-MM-dd' : 'MM-dd-yyyy'
                      }
                    />
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{backgroundColor: '#AAAAAA', borderWidth: '0px'}}
                onClick={() => props.onHide(false)}>
                {t('moduleSession.modalAddSession.cancel')}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}>
                {t('moduleSession.modalAddSession.save')}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const EditSessionModal = (props) => {
  const editSuccess = useSelector((state) => state.Session.editSuccess);
  const configs = useSelector((state) => state.Configuration.configurations);
  const dispatch = useDispatch();

  const {t, show, onHide} = props;
  const [name, setName] = useState(props.name);
  const [configuration, setConfiguration] = useState(props.configuration);
  const [startAt, setStartAt] = useState(moment(props.startAt).toDate());
  const [finishAt, setFinishAt] = useState(moment(props.finishAt).toDate());
  const [invalid, setInvalid] = useState('none');

  useEffect(() => {
    setInvalid('none');
  }, [props.show]);

  useEffect(() => {
    if (editSuccess) {
      SwalModal({
        text: t('moduleSession.swal.editSuccess'),
        icon: 'success',
      });

      dispatch(initSuccess());
    }
  }, [editSuccess]);

  const valide = () => {
    if (name !== '') {
      dispatch(
        editSessionModule(
          props.trainingSessionId,
          configuration.value,
          name,
          moment(startAt).format('YYYY-MM-DD'),
          moment(finishAt).format('YYYY-MM-DD'),
        ),
      );
      props.onHide();
    } else {
      setInvalid('initial');
    }
  };

  const handleChange = (selectedOption) => {
    setConfiguration(selectedOption);
  };

  const generateOptions = () => {
    const options = [];

    configs.map((config) =>
      options.push({
        value: config.moduleInstanceId,
        label: config.moduleInstanceName,
      }),
    );

    return options;
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={'static'}>
      <Modal.Body>
        <Container>
          <h4>{t('moduleSession.modalAddSession.title')}</h4>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>{t('moduleSession.modalAddSession.name')}</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  placeholder={t('moduleSession.modalAddSession.name')}
                  onChange={(e) => setName(e.target.value)}
                />
                <div
                  className="invalid-feedback"
                  style={{display: `${invalid}`}}>
                  {t('moduleSession.modalAddSession.errorName')}
                </div>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label> {t('moduleSession.modalAddSession.config')}</label>

                <Select
                  menuPlacement="auto"
                  menuPosition="fixed"
                  value={configuration}
                  onChange={handleChange}
                  options={generateOptions()}
                  placeholder={t(
                    'moduleSession.modalAddSession.placeholderConfig',
                  )}
                />
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-2">
            <Col lg={12}>
              <div className="">
                <label>
                  {' '}
                  {t('moduleSession.modalAddSession.startAndFinish')}{' '}
                </label>

                <Row style={{marginLeft: 0}}>
                  <div
                    style={{
                      width: '49%',
                    }}>
                    <DatePicker
                      locale="fr"
                      selected={startAt}
                      onChange={(date) => setStartAt(date)}
                      selectsStart
                      startDate={startAt}
                      endDate={finishAt}
                      className="form-control start-picker"
                    />
                  </div>{' '}
                  <div
                    style={{
                      width: '49%',
                    }}>
                    <DatePicker
                      selected={finishAt}
                      onChange={(date) => setFinishAt(date)}
                      selectsEnd
                      startDate={startAt}
                      className="form-control finish-picker"
                      endDate={finishAt}
                      minDate={startAt}
                    />
                  </div>
                </Row>
              </div>
            </Col>
          </Row>

          <Row className="show-grid justify-content-md-center mt-3 float-right">
            <Col>
              <button
                type="button"
                className="btn btn-secondary waves-effect waves-light width-xs mr-2"
                style={{backgroundColor: '#AAAAAA', borderWidth: '0px'}}
                onClick={() => props.onHide(false)}>
                {t('moduleSession.modalAddSession.cancel')}
              </button>
              <button
                type="button"
                className="btn btn-primary waves-effect waves-light width-xs"
                onClick={valide}>
                {t('moduleSession.modalAddSession.save')}
              </button>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

const ModuleSessions = (props) => {
  const loading = useSelector((state) => state.Session.loading);
  const moduleSessions = useSelector((state) => state.Session.moduleSessions);
  const module = useSelector((state) => state.Module.module);
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const [modalShow, setModalShow] = useState(false);
  const [moduleSessionsState, setModuleSessionsState] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    value: null,
    label: t('moduleSession.status.all_status'),
  });

  useEffect(() => {
    setModuleSessionsState(moduleSessions);
  }, [moduleSessions]);

  useEffect(() => {
    //console.log('props.match.params.moduleID', props.match.params.moduleID);
    dispatch(getSessionsModuleByID(decrypt(props.match.params.moduleID)));
  }, [props.match.params.moduleID]);

  const searchConfiguration = (value) => {
    const search_ = new RegExp(value, 'i'); // prepare a regex object
    const res = moduleSessions.filter((item) => {
      return (
        search_.test(item.trainingSessionName) ||
        search_.test(item.startDate) ||
        search_.test(item.endDate) ||
        search_.test(item.moduleInstanceName) ||
        search_.test(item.status)
      );
    });

    setModuleSessionsState(res);
  };

  const generateOptions = (t) => {
    const options = [
      {value: null, label: t('moduleSession.status.all_status')},
    ];
    options.push({
      value: 'in_progress',
      label: t('moduleSession.status.in_progress'),
    });
    options.push({value: 'coming', label: t('moduleSession.status.coming')});
    options.push({value: 'finish', label: t('moduleSession.status.finish')});

    return options;
  };

  const handleChange = (selectedValue) => {
    setSelectedOption(selectedValue);
    filter(selectedValue);
  };

  const filter = (selectedValue) => {
    if (selectedValue.value == null) {
      setModuleSessionsState(moduleSessions);
      return;
    }

    let res = moduleSessions.filter((item) => {
      const start = moment(item.startDate),
        end = moment(item.endDate),
        date = moment(),
        range = moment().range(start, end);

      if (selectedValue.value === 'in_progress') return range.contains(date);
      else if (selectedValue.value === 'coming') return date.diff(start) < 0;
      else if (selectedValue.value === 'finish') return date.diff(end) > 0;
      else return moduleSessions;
    });
    setModuleSessionsState(res);
  };

  return (
    <React.Fragment>
      <AddSessionModal
        t={t}
        show={modalShow}
        onHide={() => {
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
              style={{flexWrap: 'wrap'}}>
              <div className="p-1 flex-grow-1 ">
                <button
                  onClick={() => {
                    setModalShow(true);
                  }}
                  type="button"
                  className="btn btn-primary waves-effect width-md waves-light module-btn float-right"
                  style={{backgroundColor: '#5A97F8'}}>
                  <img className="mr-2" src={plusSolid} alt="" title="" />

                  {t('moduleSession.addSession')}
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
                    placeholder={t('moduleSession.search') + '...'}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn search-button"
                      type="submit"
                      onClick={() => searchConfiguration}>
                      <i className="fe-search"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-1 flex-grow-3">
                <h5 className="mr-2" style={{display: 'inline-block'}}>
                  {t('moduleSession.filter')}
                </h5>
                <div
                  className="width170 module-select"
                  style={{display: 'inline-block'}}>
                  <Select
                    menuPlacement="auto"
                    menuPosition="fixed"
                    value={selectedOption}
                    onChange={handleChange}
                    options={generateOptions(t)}
                    placeholder={t('moduleSession.status.all_status')}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          {moduleSessionsState.length
            ? moduleSessionsState.map((item, index) => (
                <CardSession key={index} {...item} t={t} />
              ))
            : null}
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ModuleSessions;

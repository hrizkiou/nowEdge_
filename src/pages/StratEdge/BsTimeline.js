import React, {useEffect, useState} from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
// import 'react-vertical-timeline-component/style.min.css';
import {Container, Row, Col, Tooltip} from 'reactstrap';
import NoPathCopie from '../../assets/images/NoPathCopie.png';
import NoPathUser from '../../assets/images/NoPathUser.png';
import Groupeu476 from '../../assets/images/Groupeu476.svg';
import group789 from '../../assets/images/group789.svg';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  getStratEdgeConfigurationParticipant,
  getStratEdgeResultParticipant,
} from '../../redux/StratEdge/actions';
import { useTranslation } from 'react-i18next';

import Loader from '../../components/Loader';
const Item = (props) => {
  const {status, name, stratEdgeSelector, roundId, dispatch, t} = props;
  const [colorStatus, setColorStatus] = useState('#10C46E');
  const [statusName, setStatusName] = useState(t('stratEdge.buisnessGame.round.statusFinish'));
  const [result, setResult] = useState(false);
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId,
  );
  const history = useHistory();

  useEffect(() => {
    switch (status) {
      case -1:
        setColorStatus('#FF5B5B');
        setStatusName(t('stratEdge.buisnessGame.round.statusComing'));
        break;
      case 1:
        setColorStatus('#10C46E');
        setStatusName(t('stratEdge.buisnessGame.round.statusFinish'));
        break;
      case 0:
        setColorStatus('#F9C851');
        setStatusName(t('stratEdge.buisnessGame.round.statusInProgress'));
        break;

      default:
        break;
    }
  }, [props]);

  useEffect(() => {
    if (stratEdgeSelector.resultParticipant.roundScenarios.length > 0) {
      let obj = stratEdgeSelector.resultParticipant.roundScenarios.find(
        (rs) => rs.roundId === roundId,
      );

      if (obj) {
        obj.scenarioResults.sort(function (a, b) {
          
          return (b.reserve )- (a.reserve );
        });
        obj.teamCompetitors =
          (stratEdgeSelector.configParticipant && stratEdgeSelector.configParticipant.teamCompetitors);
        setResult(obj);
      }
    }
  }, [stratEdgeSelector]);
  const colorBackground = status === -1 ? '#D8D8D8' : '#FFFFFF';
  const UnlockState = status === -1 || status === 0 ? false : true;

  const ImageCompetitor = (props) => {
    const {competitor, index} = props;
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    if (UnlockState)
      return (
        <>
          <img
            id={'image' + index + (competitor ?  competitor.id : 0)}
            src={ (competitor && competitor.imagePath !== null && competitor.imagePath !== "null") ? competitor.imagePath : NoPathCopie }
            alt="img"
            width={25}
            style={{marginRight: '2px', borderRadius: 25}}
          />
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={'image' + index + (competitor ?  competitor.id : 0)}
            toggle={toggle}>
            {index} : {competitor && competitor.name}
          </Tooltip>
        </>
      );
    else
      return (
        <>
          <img
            id={'image' + competitor.id}
            src={NoPathUser}
            alt="img"
            width={25}
            style={{marginRight: '2px'}}
          />
        </>
      );
  };

  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      contentStyle={{background: colorBackground, color: '#fff'}}
      contentArrowStyle={{display: 'none'}}
      iconStyle={{
        background: '#FFFFFF 0% 0% no-repeat padding-box',
        border: ' 4px solid ' + colorStatus,
      }}>
      <div
        style={{color: 'black', cursor: status === 0 ? 'pointer' : 'default'}}
        onClick={() => {
          //console.log('***************', gameSessionId);
          status === 0 &&
            dispatch(
              getStratEdgeConfigurationParticipant(gameSessionId, ()=>{}, history),
            );
        }}>
        <div
          style={{
            color: 'black',
            display: 'flex',
            alignContent: 'space-between',
            justifyContent: 'space-between',
          }}>
          <div className="tim-title">{name}</div>
          <div>
            <i
              className={`fas ${UnlockState ? 'fa-unlock' : 'fa-lock'}`}
              style={{
                fontSize: '20px',
                color: UnlockState ? '#71B6F9' : '#9F9F9F',
              }}></i>
          </div>
        </div>
        <div
          className="tim-sou-title"
          style={{
            color: colorStatus,
          }}>
          {statusName}
        </div>
        <div
          style={{
            color: 'black',
            display: 'flex',
            alignContent: 'space-between',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div className="tim-group-title">{t('stratEdge.buisnessGame.round.classement')}</div>
          <div>
            {result
              ?  
                result.scenarioResults &&
                result.scenarioResults.map((sr, index) => {
                  const teamCompetitor = result.teamCompetitors.find(
                    (tc) => tc.teamId === sr.teamId,
                  );

                  const competitor = stratEdgeSelector.configParticipant.competitors.find(
                    (c) => c.id === (teamCompetitor && teamCompetitor.competitorId),
                  ); 

              if(competitor)
                  return (
                    <ImageCompetitor
                      competitor={competitor}
                      index={index + 1}
                    />
                  );

              else return <></>
                })
              : stratEdgeSelector.configParticipant &&
                stratEdgeSelector.configParticipant.competitors.map(
                  (c, index) => (
                    <ImageCompetitor competitor={c} index={index + 1} />
                  ),
                )}
          </div>
        </div>
      </div>
    </VerticalTimelineElement>
  );
};

const BsTimeline = () => {
  const gameSessionId = useSelector(
    (state) => state.Module.module.gameSessionId,
  );
  const stratEdgeSelector = useSelector((state) => state.StratEdge);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStratEdgeConfigurationParticipant(gameSessionId, ()=> {
      dispatch(getStratEdgeResultParticipant(gameSessionId));

    }));
  }, []);
  const { t } = useTranslation();

  return (
    <>
      {stratEdgeSelector.loading && <Loader />}
      <Row>
        <div
          className="d-flex ml-4 mt-3 "
          style={{
            alignItems: 'center',
          }}>
          <img src={group789} alt="img" width={19} height={32} />

          <div className="tim-g-title">{t('stratEdge.title')}</div>
        </div>
      </Row>
      <Container>
        <Row>
          <Col lg={7}>
            <VerticalTimeline>
              {stratEdgeSelector.resultParticipant.rounds &&
                stratEdgeSelector.resultParticipant.rounds.map(
                  (item, index) => (
                    <Item
                      stratEdgeSelector={stratEdgeSelector}
                      roundId={item.id}
                      status={item.status}
                      name={item.name}
                      dispatch={dispatch}
                      key={index}
                      t={t}
                    />
                  ),
                )}
            </VerticalTimeline>
          </Col>
          <Col lg={4}>
          {!stratEdgeSelector.loading &&  
           <img
              src={Groupeu476}
              alt="img"
              style={{
                bottom: '0px',
                position: 'absolute',
              }}
            />
           } 
          </Col>
        </Row>
      </Container>
    </>
  );
};

export {BsTimeline};

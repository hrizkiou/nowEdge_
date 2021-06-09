import React, {useEffect} from 'react';
import {Row, Col} from 'reactstrap';

import Loader from '../../components/Loader';
import {useSelector, useDispatch} from 'react-redux';
import Wizard from '../../components/Wizard';
import {getStratEdgeConfiguration} from '../../redux/StratEdge/actions';
import { useTranslation } from 'react-i18next';

export const Config = (props) => {
  const gameConfigurationId = props.match.params.gameConfigurationId;
  const StratEdge = useSelector((state) => state.StratEdge);
  const loading = useSelector((state) => state.StratEdge.loading);
  const dispatch = useDispatch();
  
  const {t} = useTranslation();
  useEffect(() => {
    dispatch(getStratEdgeConfiguration(gameConfigurationId));
  }, []);

  return (
    <React.Fragment>
      {loading && <Loader />}

      <Row className="mb-4">
        <Col lg={8}>
          <h4 className="mb-0">{t('stratEdge.title')} </h4>
        </Col>
      </Row>

      <Wizard StratEdge={StratEdge} t={t} />
    </React.Fragment>
  );
};

export default Config;

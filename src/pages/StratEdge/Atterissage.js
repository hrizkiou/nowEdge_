import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, Row } from 'reactstrap';

import group789 from '../../assets/images/group789.svg';
import logo from '../../assets/images/groupe484.svg';
import nowEdge from '../../assets/images/nowEdge.png';
import undraw_analysis_ from '../../assets/images/undraw_analysis_.svg';
import undraw_checking_boxes_2ibd from '../../assets/images/undraw_checking_boxes_2ibd.svg';
import undraw_winners from '../../assets/images/undraw_winners.svg';

const Atterissage = () => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className="">
      <Container>
        <div className="text-center mb-5 pt-3 ">
          <img src={nowEdge} alt="img" style={{width: '164px', height: ' 52px'}} />
        </div>
        <Row className="mb-5">
          <Col lg={5}>
            <div className="att-icon mb-4">
              <img src={group789} alt="img" />
              <h4 className="atterissage_title">{t('stratEdge.title')}</h4>
            </div>
            <p>
              <span className="atterissage_s_title1">{t('stratEdge.index.welcome')}</span>
              <br />
              <span className="atterissage_s_title2">
              {t('stratEdge.index.businessGameS')}
              </span>
            </p>
            <p className="atterissage_desc m-0">
            {t('stratEdge.index.descriptionWelcome')}

            </p>
          </Col>
          <Col lg={7}>
            <iframe
              src={'https://nowedge.io/brochures/Teaser_StratEdge.mp4'}
              frameBorder="0"
              style={{
                width: '100%',
                height: '100%',
              }}
              title="test"
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen"
              msallowfullscreen="msallowfullscreen"
              oallowfullscreen="oallowfullscreen"
              webkitallowfullscreen="webkitallowfullscreen"
              ></iframe>
          </Col>
        </Row>
        <Row className="mb-3" style={{alignItems: 'baseline'}} >
          <Col lg={4}  style={{height:'360px'}}>
            <Card style={{height:'100%'}}>
              <CardBody className="att-card-body">
                <img src={undraw_analysis_} alt="img" style={{height:'122px'}} />
                <h5 className="  mt-3">{t('stratEdge.index.title1')}</h5>

                <p className="font-13 text-muted mb-0" style={{minHeight:'153px'}}>
                {t('stratEdge.index.descriptionTitle1')}
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col lg={4} style={{height:'360px'}}>
            <Card style={{height:'100%'}}>
              <CardBody className="att-card-body">
                <img src={undraw_checking_boxes_2ibd} alt="img" style={{height:'122px'}} />
                <h5 className="  mt-3">{t('stratEdge.index.title2')}</h5>
                <p className="font-13 text-muted mb-0" style={{minHeight:'153px'}}>
                {t('stratEdge.index.descriptionTitle2')}
                </p>
              </CardBody>
            </Card>
          </Col><Col lg={4} style={{height:'360px'}}>
            <Card style={{height:'100%'}}>
              <CardBody className="att-card-body">
                <img src={undraw_winners} alt="img" style={{height:'122px'}} />
                <h5 className="  mt-3">{t('stratEdge.index.title3')}</h5>
                <p className="font-13 text-muted mb-0" style={{minHeight:'153px'}}>
                {t('stratEdge.index.descriptionTitle3')}
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div className="text-center m-4">
          <div>
            <Button
              onClick={() => {
                history.push('/moderator/timeline-tours');
              }}
              style={{
                width: '270px',
                height: '58px',
                background:
                  'transparent linear-gradient(150deg, #7750E7 0%, #53A7FD 100%) 0% 0% no-repeat padding-box',
                borderRadius: '4px',
                marginBottom: '10px',
              }}>
              <p
                style={{
                  margin: 0,
                  textAlign: 'center',
                  font: 'Bold 14px/17px Karla',
                  letterSpacing: '0.28px',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  opacity: 1,
                }}>
                {t('stratEdge.index.start')}

              </p>
            </Button>
          </div>
          <Link>{t('stratEdge.index.back')}</Link>
        </div>
      </Container>
    </div>
  );
};

export {Atterissage};

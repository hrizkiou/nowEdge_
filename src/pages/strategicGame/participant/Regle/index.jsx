import React from 'react';

import img1 from '../../../../assets/images/StrategicGame/group-img_7725.png';
import img2 from '../../../../assets/images/StrategicGame/group_7724-112.png';
import badg44 from '../../../../assets/images/StrategicGame/Mask Group 14.svg';
import MaskGroup144 from '../../../../assets/images/StrategicGame/MaskGroup14.svg';

import img3 from '../../../../assets/images/StrategicGame/rapport/group_4456.png';
import img4 from '../../../../assets/images/StrategicGame/rapport/groupe_4637.png';
import img5 from '../../../../assets/images/StrategicGame/rapport/137asset_1.png';
import img6 from '../../../../assets/images/StrategicGame/rapport/137asset_3.png';
import img7 from '../../../../assets/images/StrategicGame/rapport/137sasset_2.png';
import img8 from '../../../../assets/images/StrategicGame/rapport/137sssasset_4.png';
import img9 from '../../../../assets/images/StrategicGame/rapport/137ssasset_2.png';
import img10 from '../../../../assets/images/StrategicGame/rapport/13ee7sssasset_4.png';

import img11 from '../../../../assets/images/StrategicGame/cubes-solid.png';
import img12 from '../../../../assets/images/StrategicGame/cogs-solid (1).png';
import img13 from '../../../../assets/images/StrategicGame/chart-line-solid (1).png';
import img14 from '../../../../assets/images/StrategicGame/e00egroup_4423.png';

import './style.scss';
import {Accordion, Card} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history =  useHistory();

  return (
    <div className="header">
      <div className="d-flex justify-content-center align-content-center align-items-center ">
        <img
          src={badg44}
          alt="user-img"
          width={41}
          height={41}
          style={{
            backgroundColor: '#fff',
            borderRadius: '50px',
            marginRight: '-10px',
          }}
        />
        <img
          src={MaskGroup144}
          alt="user-img"
          width={41}
          height={41}
          style={{
            backgroundColor: '#fff',
            borderRadius: '50px',
          }}
        />
        <span className="sg-menu-item-title" style={{color: '#323A46'}}>
          Rabat PV center
        </span>
      </div>
      <div className="cat-ad" onClick={() => null}>
        <button
        onClick={()=> history.push('/pv-game')}
          type="reset"
          style={{
            backgroundColor: '#FFFFFF',
            color: '#2874B3',
            border: '0px',
            font: 'normal normal bold 14px/17px Karla',
          }}
          className="btn btn-secondary waves-effect waves-light mr-2">
          Quitter
          <i className="fas fa-running ml-1"></i>
        </button>
      </div>
    </div>
  );
};

const Item = ({img, title, text}) => {
  return (
    <li>
      <div className="li-img">
        <img src={img} alt="" />
      </div>
      <div className="li-content">
        <h5>{title}</h5>
        <h3> {text}</h3>
      </div>
    </li>
  );
};
const List = () => {
  return (
    <div className="block-1">
      <header>
        <h3>Liste des journées</h3>
      </header>
      <div className="list-days">
        <ul>
          <Item img={img3} title="NIVEAU 1" text="La mise en place" />
          <Item img={img4} title="NIVEAU 2" text="Le système de collecte " />
          <Item img={img5} title="NIVEAU 3" text="Le circuit de notification" />
          <Item img={img5} title="NIVEAU 4" text="Les études d'imputabilité" />
          <Item img={img6} title="NIVEAU 5" text="La base de données" />
          <Item img={img7} title="NIVEAU 6" text="Génération des signaux" />
          <Item img={img9} title="NIVEAU 7" text="Validation des signaux" />
          <Item
            img={img10}
            title="NIVEAU 8"
            text="Actions de minimisation des risques 1"
          />
          <Item
            img={img10}
            title="NIVEAU 9"
            text="Actions de minimisation des risques 2"
          />
          <Item img={img8} title="NIVEAU 10" text="PV internationale 1" />
          <Item img={img8} title="NIVEAU 11" text="PV internationale 2" />
        </ul>
      </div>
    </div>
  );
};
const GroupBtn = () => {
  return (
    <div className="block-btn-group">
      <span className="block-btn-group-1">+23 Points</span>
      <span className="block-btn-group-2">+23 Points</span>
      <span className="block-btn-group-3">-10 Points</span>
    </div>
  );
};

const Messg = () => {
  return (
    <div className="d-flex flex-row mb-3">
      <div
        className="d-flex"
        style={{
          alignItems: 'flex-end',
        }}>
        <img src={img14} width={42} height={43} alt="" />
      </div>
      <div
        className="pr-3 ml-4 msg-block"
        style={{
          backgroundColor: '#F8F9FA',
          borderRadius: '4px',
          padding: '10px',
        }}>
        <h3>LE MINISTRE</h3>
        <p
          style={{
            textAlign: 'left',
            font: 'normal normal normal 14px/17px Karla',
            letterSpacing: '0.28px',
            color: '#3F4351',
            opacity: '1',
          }}>
          Toutes vos demandes en terme de réglementation, de personnel,
          d’équipement et de financement ont été satisfaites, vous avez
          maintenant tous les moyens à votre disposition et votre centre est
          prêt à fonctionner. Ce premier semestre est{' '}
        </p>
        <GroupBtn />
      </div>
    </div>
  );
};

const Container = () => {
  return (
    <>
      <div
        className="d-flex flex-column justify-content align-content text-center header-rsdlk34"
        style={{margin: '0px auto', width: '50%'}}>
        <h4>règle du jeu</h4>
        <p>
          Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez ce
          vieux whisky au juge blond qui fume sur son île intérieure, à côté de
          l"alcôve ovoïde, où les bûches se consument dans l"âtre, ce qui lui.
        </p>
        <div>
          <button
            type="button"
            className="btn btn-primary waves-effect width-md waves-light">
            Voir les règles du jeu <i className=" fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="container-rap">
        <List />
        <div className="block-2">
          <div className="container-blk pl-1 pr-1 pt-2">
            <Accordion defaultActiveKey="0">
              <Card style={{border: '1px solid #E4E7EB'}}>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  What is lorem
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>Hello! I'm the body</Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card style={{border: '1px solid #E4E7EB'}}>
                <Accordion.Toggle
                  as={Card.Header}
                  eventKey="1"></Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

function Regle() {
  return (
    <div className="regle-activite">
      <Header />
      <Container />
    </div>
  );
}

export default Regle;

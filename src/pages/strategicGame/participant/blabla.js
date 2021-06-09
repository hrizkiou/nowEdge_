import React, {useEffect, useState} from 'react';

import startI from '../../../assets/images/StrategicGame/Group 5180.svg';
import startII from '../../../assets/images/StrategicGame/Group 5181.svg';
import startIII from '../../../assets/images/StrategicGame/Group 5183.svg';
import startIV from '../../../assets/images/StrategicGame/Group 5184.svg';

import img1 from '../../../assets/images/StrategicGame/Component52–2@2x.jpg';
import img2 from '../../../assets/images/StrategicGame/Component53–1.svg';
import img3 from '../../../assets/images/StrategicGame/Group 5174.svg';
import img4 from '../../../assets/images/StrategicGame/Group5175.svg';
import img5 from '../../../assets/images/StrategicGame/Group5176.svg';
import img6 from '../../../assets/images/StrategicGame/Group5177.svg';
import img7 from '../../../assets/images/StrategicGame/MaskGroup18.svg';
import img8 from '../../../assets/images/StrategicGame/fAsset1@2x.svg';
import img9 from '../../../assets/images/StrategicGame/Mask Group 18.svg';
import img10 from '../../../assets/images/StrategicGame/MaskGroup18-2.svg';
import img11 from '../../../assets/images/StrategicGame/Component 52 – 1.svg';
import img12 from '../../../assets/images/StrategicGame/Group 5179.svg';
import badg44 from '../../../assets/images/StrategicGame/Mask Group 14.svg';
import MaskGroup144 from '../../../assets/images/StrategicGame/MaskGroup14.svg';
import runningSolid from '../../../assets/images/StrategicGame/running-solid.svg';

var symbols = /[\r\n"%#()<>?\[\\\]^`{|}]/g;
function addNameSpace(data) {
  if (data.indexOf('http://www.w3.org/2000/svg') < 0) {
    data = data.replace(/<svg/g, "<svg xmlns='http://www.w3.org/2000/svg'");
  }

  return data;
}
function encodeSVG(data) {
  if (data.indexOf('"') >= 0) {
    data = data.replace(/"/g, "'");
  }

  data = data.replace(/>\s{1,}</g, '><');
  data = data.replace(/\s{2,}/g, ' ');

  return data.replace(symbols, encodeURIComponent);
}

const StartN = ({nbrS, position = true, hover = true}) => {
  const [state, setState] = useState(startI);
  useEffect(() => {
    switch (nbrS) {
      case 0:
        setState(startI);
        break;
      case 1:
        setState(startIV);
        break;
      case 2:
        setState(startIII);
        break;
      case 3:
        setState(startII);
        break;

      default:
        break;
    }
  }, [nbrS]);

  const style = position
    ? {
        position: 'absolute',
        marginTop: '-150px',
      }
    : {};

  if (nbrS !== -1)
    return (
      <div style={style} className={`${hover ? 'show-starts' : ''}`}>
        <img src={state} />
      </div>
    );

  return (
    <div
      style={{
        position: 'absolute',
        marginTop: '-150px',
      }}></div>
  );
};

const ItemSercl = ({img = img1, top, left, nbrS}) => {
  return (
    <div
      className="hhkjshd"
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
      }}>
      <div className="example-contene">
        <StartN nbrS={nbrS} />
        <img src={img} className="parc-box-img" />
      </div>
      <div className="exampleContene-s">
        <img src={img} className="parc-box-img-2" />
        <div className="d-flex flex-column ml-2 pb-3 pt-3 ">
          <div>Day 3</div>
          <div
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              fontFamily: 'Karla',
              color: '#3F4351',
              lineHeight: '1',
            }}>
            La collaboration internationale
          </div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: 'Karla',
              color: '#10C469',
              fontWeight: '400',
              textTransform: 'uppercase',
              letterSpacing: '20',
              marginTop: '4px',
              marginBottom: '4px',
            }}>
            Términé
          </div>
          <StartN nbrS={nbrS} position={false} hover={false} />
        </div>
      </div>
    </div>
  );
};
export default function Blabla() {
  return (
    <div className="mainBackground">
      <div className="par-row1">
        <div className="d-flex flex-column sg-onHover">
          <div className="d-flex justify-content-center align-items-center">
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
            <span className="sg-menu-item-title">Rabat PV center</span>
          </div>
          <div className="sg-menu-item-btn-config-p" onClick={() => null}>
            <div className="sg-menu-item-btn-config-sp">
              <i className=" fas fa-cubes"></i> 120 Points
            </div>
            <div className="sg-menu-item-btn-config-sp">
              <i className="   fas fa-cogs"></i> 140 Points
            </div>
            <div className="sg-menu-item-btn-config-sp">
              <i className=" fas fa-chart-line"></i> 140 Points
            </div>
          </div>
        </div>
        <div className="parc-btnQ">
          Quitter
          <img src={runningSolid} style={{marginLeft: '5px'}} />
        </div>
      </div>
      <div className="par-row2">
        <h3>
          <span>Bienvenue dans</span>{' '}
          <span className="title-x">l'Aventure</span>
        </h3>
        <p
          style={{
            margin: '0px 27%',
          }}>
          Voyez ce jeu exquis wallon, de graphie en kit mais bref. Portez ce
          vieux whisky au juge blond qui fume sur son île intérieure, à côté de
          l"alcôve ovoïde, où les bûches se consument dans l"âtre, ce qui lui.
        </p>
      </div>
      <ItemSercl img={img1} left={12} top={78} nbrS={2} />
      <ItemSercl img={img2} left={17} top={54} nbrS={2} />
      <ItemSercl img={img3} left={22} top={28} nbrS={2} />
      <ItemSercl img={img4} left={28} top={50} nbrS={1} />
      <ItemSercl img={img5} left={27} top={79} nbrS={2} />
      <ItemSercl img={img6} left={44} top={72} nbrS={3} />
      <ItemSercl img={img7} left={46} top={45} nbrS={0} />
      <ItemSercl img={img8} left={57} top={55} nbrS={0} />
      <ItemSercl img={img9} left={65} top={79} nbrS={3} />
      <ItemSercl img={img10} left={65} top={28} nbrS={-1} />
      <ItemSercl img={img11} left={76} top={47} nbrS={-1} />
      <ItemSercl img={img12} left={79} top={74} nbrS={-1} />
    </div>
  );
}

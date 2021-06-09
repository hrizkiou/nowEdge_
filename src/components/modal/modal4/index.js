import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';

import img from '../../../assets/images/StrategicGame/mask_group_12_13932.png';
import './style.scss';

const Modal4 = ({
  show,
  title = `Le ministre`,
  text = ` sdlskl;skdl;k`,
  btnText = 'Primary',
  btnDefText = 'Pas encore',
  valid = () => null,
  reset = () => null,
  showTowBtn = false,
}) => {
  return (
    <Modal show={show} dialogClassName={'daysModal'} centered>
      <Modal.Body style={{minWidth: '100%', backgroundColor: 'transparent'}}>
        <div className={'dayOneModal-cost'}>
          <div className="block-1">
            <img
              src={img}
              style={{width: '132%', height: '90%', marginTop: '53px'}}
            />
          </div>

          <div className="block-2">
            <div className="block-2-black"></div>
            <div className={'discussMessageCustom'}>
              <span>{title}</span>
              <p dangerouslySetInnerHTML={{__html: text}} />
            </div>
            <div className="btns-group">
              {showTowBtn && (
                <button onClick={reset} type="button " className="btn btn-def mr-1">
                  {btnDefText}
                </button>
              )}
              <button
                onClick={valid}
                type="button"
                className="btn btn-primary waves-effect width-md waves-light">
                {btnText}
                <i className=" fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal4;

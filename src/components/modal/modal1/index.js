import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import './style.scss';

const Modal1 = ({
  show,
  title = "", //`Le ministre`,
  text = "", 
//    ` Bienvenue au Ministère de la Santé, nous sommes heureux de pouvoir
// enfin compter sur un centre de Pharmacovigilance pour notre pays.
// Nous mesurons l'importance de cette structure.au Ministère de la Santé, nous sommes heureux de pouvoir
// enfin compter sur un centre de Pharmacovigilance pour notre pays.
// Nous mesurons l'importance de cette structure.au Ministère de la Santé, nous sommes heureux de pouvoir
// enfin compter sur un centre de Pharmacovigilance pour notre pays.
// Nous mesurons l'importance de cette structure.`,
  btnText = 'Primary',
  close = () => null,
}) => {
  return (
    <Modal show={show} dialogClassName={'daysModal'} centered>
      <Modal.Body style={{minWidth: '100%', backgroundColor: 'transparent'}}>
        <div className={'dayOneModal'}>
          <div className={'discussMessageCustom'}>
            <span>{title}</span>
            <p dangerouslySetInnerHTML={{__html: text}} />
          </div>
          <div className={'budget_restant-mod'}>
            <button
              onClick={close}
              type="button"
              className="btn btn-primary waves-effect width-md waves-light">
              {btnText}
              <i className=" fas fa-arrow-right ml-1"></i>
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Modal1;

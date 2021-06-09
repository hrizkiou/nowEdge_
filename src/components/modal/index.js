import React from 'react';

import './style.scss';

function Modal({children, show = false,onHide=()=>null , style={}}) {
  return (
    <div style={{display: `${show ? 'block' : 'none'}`}}>
      <div id="myModal" className="custom-modal">
        <div className="custom-modal-content" style={style} >{children}</div>
      </div>
    </div>
  );
}

export default Modal;

import Modal from '../index';
import style from './style.module.scss'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';

const PharmacienneModal = ({
  show ,
  showIcon = true ,
  close = ()=>null ,
  message = 'XXXX' ,
  btnText= "Commencer",
  textCancel="Pas encore" ,
  cancel=null
}) => {

 const ref_btn1 = useRef();
 const ref_btn2 = useRef();
 const [WidthBtn, setWidthBtn] = useState();

 const { t } = useTranslation();
 useEffect(() => {

  if(ref_btn1.current !== undefined && ref_btn2.current !== undefined){
    if(ref_btn1.current.offsetWidth > ref_btn2.current.offsetWidth ){
      setWidthBtn(ref_btn1.current.offsetWidth +1);
    }else{
      setWidthBtn(ref_btn2.current.offsetWidth +1 );
    }
  }
 }, [])
  return (
    <Modal show={show} style={{borderRadius:'15px'}}>
    <div className={style.modal_block_1}></div>
        <div className={style.modal_block_2}>
        <div className={style.msg}>
            <h3>{t("modals.day5.startModal.title")}</h3>
            <p>
            {message}
            </p>
        </div>


        <div className={style.btns_contents}>

        {cancel instanceof Function &&  <button
         ref={ref_btn1}
            onClick={cancel}
            style={{
              width:WidthBtn && WidthBtn
            }}
            className={['btn  waves-effect waves-light', style.btn_default ].join(" ")}
            type="submit">
             {textCancel}
        </button>}
        <button
            ref={ref_btn2}
            onClick={close}
            style={{
              width:WidthBtn && WidthBtn
            }}
            className={['btn btn-primary waves-effect waves-light ml-2' ].join(" ")}
            type="submit">
             {btnText}
            {showIcon && <i className="fas fa-arrow-right ml-1"></i>}
        </button>

        </div>


    </div>
    </Modal>
  )
}


export default PharmacienneModal

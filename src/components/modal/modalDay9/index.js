import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '../index';
import style from './style.module.scss';

const RadioBtn = ({idDes,id , text , index ,indexCheck,onCheck ,ValidIndex ,validat=true,selectedIndex})=>{
    const [isValid, setIsValid] = useState(null);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setIsValid(_=>{

             if(validat === null) 
            return null
            else
            setChecked(ValidIndex === index );
            return ValidIndex === index
        });
    }, [validat]);
    // const checked=validat === true? ValidIndex === index : false;
    return (
        <div className={["radio " , isValid === null ? "radio-primary" : isValid === true  ?  "radio-success":""].join(" ")}  >
            <input type="radio" id={id}  checked={index === indexCheck || checked} onChange={()=>{
                if(validat === null)
                onCheck(index);
                selectedIndex(idDes)
                }}  />
            <label className={style.label} htmlFor={id}>
                {text}
            </label>
        </div>
    )
}
const ListRadioBtn = ({isValid , setCheck , valid_rep , list,selectedIndex})=>{

    const [IndexCheck, setIndexCheck] = useState(0);

    const onCheck = (val)=>{
        setIndexCheck(val)
        setCheck(val)
    }
    return (
        <>
        {
            list.map((item,index) => {
               return <RadioBtn id={"radio"+index} 
               key={index}
               indexCheck={IndexCheck} 
               index={index} 
               text={item.decision} 
               onCheck={onCheck} 
               ValidIndex={valid_rep}
               validat={isValid}
               idDes={item.id_decision}
               selectedIndex={selectedIndex}
               />
            })
        }
        </>
      
    )

}


const ModalDAy9 = ({show , setShowM = _=>null , rollBack=()=>null,list, selectedIndexId}) => {
    const [check, setCheck] = useState(0);
    const [isValid, setIsValid] = useState(null);
    
    const {t} = useTranslation();

    const maxVal =  list.reduce((min, b) => Math.max(min, b.score_3), 0);
    const valid_rep = list.findIndex(elem=> elem.score_3 === maxVal);

    const [id_, setId] = useState(list[0].id_decision);

    const validate = ()=>{

       if(isValid === null){
            if(check === valid_rep){
                setIsValid(true)
            }
            else{
                setIsValid(false)
            }
       }
       else{
        selectedIndexId(id_)

        setShowM(false);
       }
   }

   const selectedIndex = (id) =>{
    //    //console.log('----id----',id)
        setId(id)
   }

  return (
    <Modal show={show}>
    <div className={style.modal_block_1}></div>
        <div className={style.modal_block_2}>
        <div className={style.msg}>
            <h3>{t("pvgame.day9.la_pharmacienne_de_equipe")}:</h3>
            <p>
              {t("pvgame.day9.msg_signal")}            
            </p>
        </div>
        <p className={style.msg3}>
          ({t("pvgame.day9.select_option")})
        </p>
        <div className={style.msg2}>
            <ListRadioBtn isValid={isValid} setCheck={setCheck} valid_rep={valid_rep} list={list} selectedIndex={selectedIndex}/>
        </div>
            {isValid !== null &&
                <span className={['badge  badge-pill',isValid ? style.valid_resp : style.no_valid_resp,style.block_rep].join(" ")} >
                    <i className={['fas  mr-1', isValid ? 'fa-check' : 'fa-times '].join(" ")} ></i>
                    {isValid ? t("pvgame.day9.bonnes_reponses")  : t("pvgame.day9.mauvaise_reponse")}
                </span>
            }
        <button
            onClick={ validate}
            className={['btn btn-primary waves-effect waves-light',style.btn_msg ].join(" ")}
            type="submit">
            { isValid === null ? t("pvgame.day9.validChoice")   : t("pvgame.day9.next")}
            <i className="fas fa-arrow-right ml-1"></i>
        </button>
       {isValid === null && <button
            onClick={() => {
            // setShowM(false);
            rollBack();
            }}
            className={['btn  waves-effect waves-light',style.btn_msg2].join(" ")}
            type="submit">
            {t("pvgame.day9.roll_back")}
        </button>}
    </div>
    </Modal>
  )
}

ModalDAy9.propTypes = {

}

export default ModalDAy9

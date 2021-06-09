import i18n from "i18next";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import img13 from "../../../../assets/images/StrategicGame/chart-line-solid (1).png";
import img12 from "../../../../assets/images/StrategicGame/cogs-solid (1).png";
import img11 from "../../../../assets/images/StrategicGame/cubes-solid.png";
import img1Gris from "../../../../assets/images/StrategicGame/days/1.png";
import img10 from "../../../../assets/images/StrategicGame/days/10-color.png";
import img11_ from "../../../../assets/images/StrategicGame/days/11-color.png";
import img2Gris from "../../../../assets/images/StrategicGame/days/2.png";
import img3Gris from "../../../../assets/images/StrategicGame/days/3.png";
import img4Gris from "../../../../assets/images/StrategicGame/days/4.png";
import img5Gris from "../../../../assets/images/StrategicGame/days/5.png";
import img6Gris from "../../../../assets/images/StrategicGame/days/7.png";
import img8Gris from "../../../../assets/images/StrategicGame/days/8.png";
import img9Gris from "../../../../assets/images/StrategicGame/days/9.png";
import img1 from "../../../../assets/images/StrategicGame/days/day1.png";
import img10Gris from "../../../../assets/images/StrategicGame/days/day10.png";
import img11Gris from "../../../../assets/images/StrategicGame/days/day11.png";
import img2 from "../../../../assets/images/StrategicGame/days/day2.png";
import img4 from "../../../../assets/images/StrategicGame/days/day4.png";
import img5 from "../../../../assets/images/StrategicGame/days/day5.png";
import img6 from "../../../../assets/images/StrategicGame/days/day7.png";
import img8 from "../../../../assets/images/StrategicGame/days/day8.png";
import img9 from "../../../../assets/images/StrategicGame/days/day9.png";
import img14 from "../../../../assets/images/StrategicGame/e00egroup_4423.png";
import img3 from "../../../../assets/images/StrategicGame/Group 5174.svg";
import img2rt from "../../../../assets/images/StrategicGame/group_7724-112.png";
import img1lt from "../../../../assets/images/StrategicGame/group-img_7725.png";
// import img4 from "../../../../assets/images/StrategicGame/rapport/groupe_4637.png";
import { avatars, countries, getLogoById } from "../../../../helpers/centerData";
import { getCenterInfo, getscore } from "../../../../redux/actions";
import { getHistoricScores } from "../../../../redux/days/service";
import data_history from "./data.json";

import "./style.scss";

const loadImg = (key)=>{
  switch (key) {
    case 1:
      return {img:img1,imgGris:img1Gris}

    case 2:
      return {img:img2,imgGris:img2Gris}

    case 3:
    return {img:img3,imgGris:img3Gris}

    case 4:
    return {img:img4,imgGris:img4Gris}

    case 5:
    return {img:img5,imgGris:img5Gris}

    case 6:
    return {img:img6,imgGris:img6Gris}

    case 7:
    return {img:img8,imgGris:img8Gris}

    case 8:
    return {img:img9,imgGris:img9Gris}

    case 9:
    return {img:img10,imgGris:img10Gris}
    case 10:
    return {img:img11_,imgGris:img11Gris}

    default:
      return {img:img11,imgGris:img11Gris}
      break;
  }
}


const Header = (props) => {
  const center = useSelector((state) => state.PvGame.center);

  return (
    <div className="header" style={{ padding: "28px 75px 0px 75px" }}>
      <div className="d-flex flex-column sg-onHover">
        <div className="d-flex justify-content-center align-items-center">
          <img
            src={getLogoById(center.countryId, countries)?.logo}
            alt="user-img"
            width={41}
            height={41}
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
              marginRight: "-10px",
            }}
          />
          <img
            src={getLogoById(center.avatarId, avatars)?.logo}
            alt="user-img"
            width={41}
            height={41}
            style={{
              backgroundColor: "#fff",
              borderRadius: "50px",
            }}
          />
          <span className="sg-menu-item-title" style={{ color: "#fff" }}>
            {center.name}
          </span>
        </div>
        <div className="sg-menu-item-btn-config-p" onClick={() => null}>
          <div className="sg-menu-item-btn-config-sp">
            <i className=" fas fa-cubes"></i> {props.score.score1}  {props.t(`pvgame.parcour.point`)}
          </div>
          <div className="sg-menu-item-btn-config-sp">
            <i className="   fas fa-cogs"></i> {props.score.score2}  {props.t(`pvgame.parcour.point`)}
          </div>
          <div className="sg-menu-item-btn-config-sp">
            <i className=" fas fa-chart-line"></i> {props.score.score3}  {props.t(`pvgame.parcour.point`)}
          </div>
        </div>
      </div>
      <button
        onClick={() => props.history.push("/pv-game")}
        type="reset"
        style={{
          backgroundColor: "#FFFFFF",
          color: "#2874B3",
          border: "0px",
          font: "normal normal bold 14px/17px Karla",
          width: "95px",
          height: "40px",
        }}
        className="btn btn-secondary"
      >
        {props.t(`pvgame.parcour.quitter`)}
        <i className="fas fa-running ml-1"></i>
      </button>
    </div>
  );
};

const Item = ({item, title, text , onClick , index , activeIndex}) => {

  const {img,imgGris} = loadImg(index)
  return (
    <li onClick={()=>{
      if(item.status === 1){
        onClick(index)
      }
    }}

    style={{backgroundColor:`${activeIndex === index ? '#f1f5f7':''}`}}
    >
      <div className="li-img" >
        <img src={item.status === 1 ? img :imgGris} alt="" />
      </div>
      <div className="li-content">
        <h5>{title}</h5>
        <h3> {item.text}</h3>
      </div>
    </li>
  );
};
const List = ({days =[], clickDay , t}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onClickItem = (index)=>{
    clickDay(index)
    setActiveIndex(index)
  }
  return (
    <div className="block-1-rep">
      <header>
        <h3>{t(`pvgame.activityReport.Liste_des_niveaux`)}</h3>
      </header>
      <div className="list-days">
        <ul>
        {
          days.map((elem,index)=>{

            return (<Item
                            key={index}
                            item={elem}
                            index={index+1}
                            activeIndex={activeIndex}
                            img={img4}
                            title={`NIVEAU ${elem.dayId}`}
                            text="Le système de collecte "
                            onClick={onClickItem} />)
          })

        }
        </ul>
      </div>
    </div>
  );
};
const GroupBtn = () => {
  return (
    <div className="block-btn-group">
      <span className="block-btn-group-1">
        <i className="fas fa-cubes mr-1 " style={{ fontSize: "20px" }}></i>+23
        Points
      </span>
      <span className="block-btn-group-2">
        <i className=" fas fa-cogs  mr-1" style={{ fontSize: "20px" }}></i>+23
        Points
      </span>
      <span className="block-btn-group-3">
        <i className="fas fa-chart-line mr-1" style={{ fontSize: "20px" }}></i>
        -10 Points
      </span>
    </div>
  );
};

const Messg = ({item}) => {
  return (
    <div className="d-flex flex-row mb-3">
      <div
        className="d-flex"
        style={{
          alignItems: "flex-end",
        }}
      >
        <img src={img14} width={42} height={43} alt="" />
      </div>
      <div
        className="pr-3 ml-4 msg-block"
        style={{
          backgroundColor: "#F8F9FA",
          borderRadius: "4px",
          padding: "10px",
          width: "100%"
        }}
      >
        <h3 style={{ font: " normal normal bold 16px/17px Karla" }}>
          LE MINISTRE
        </h3>
        <p
          style={{
            textAlign: "left",
            font: "normal normal normal 14px/17px Karla",
            letterSpacing: "0.28px",
            color: "#3F4351",
            opacity: "1",
          }}
        >
          {/* Toutes vos demandes en terme de réglementation, de personnel,
          d’équipement et de financement ont été satisfaites, vous avez
          maintenant tous les moyens à votre disposition et votre centre est
          prêt à fonctionner. Ce premier semestre est{" "} */}
          {item.description}
        </p>
        {/* <GroupBtn /> */}
      </div>
    </div>
  );
};



const Container = ({days , listDescriptions , score , t}) => {

  const [state, setState] = useState(0)
  const clickDay = (day) => {

     setState(day)
  }

  return (
    <>
      <h4> {t(`pvgame.activityReport.rapport_activite`)} </h4>
      <div className="container-rap">
        <List days={days}  clickDay={clickDay} t={t}/>
        <div className="block-2">
          <header>
            <div className="img-block">
              <img src={img11} alt="" />
              <div className="img-block-text">
                <span>Score de Structure</span>
                <h4>{score.score1} Points</h4>
              </div>
            </div>
            <div className="img-block">
              <img src={img12} alt="" />
              <div className="img-block-text">
                <span>Score de Notification</span>
                <h4>{score.score2} Points</h4>
              </div>
            </div>
            <div className="img-block mr-0">
              <img src={img13} alt="" />
              <div className="img-block-text">
                <span>Score d'Action</span>
                <h4>{score.score3} Points</h4>
              </div>
            </div>
          </header>
          <div className="container-blk pl-4 pr-4 pt-2">
            {listDescriptions[state-1]?.desc?.map((elem,index)=>{
              return <Messg key={index} item={elem} />
            })}

          </div>
        </div>
      </div>
    </>
  );
};

function RapportActivite(props) {

  const [data, setData] = useState([]);
  const [days_ ,setDays]  =  useState([]);
  const [listDescriptions, setListDescriptions] = useState([]);
  const score = useSelector((state) => state.PvGame.score);
  const days = useSelector((state) => state.PvGame.center.days) ;
  const centerId = useSelector((state) => state.PvGame.center.centerId);
  const { gameSessionId } = useSelector((state) => state.Module.module);
    const { t } = useTranslation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getscore(centerId));
    if (!days) {
      dispatch(getCenterInfo(gameSessionId));
    }
  }, [centerId]);

  useEffect(() => {
    getHistoricScores(centerId).then((res) => {
      setData(res);

    const data_history_ = data_history[i18n.language].map((elem,index)=>{
     
      const res_ = res.find(item=> item.storyId === elem.id)
      let  desc ;
      if(elem.day === 7 && elem.id === 22 && res_){  
        const nev = res_.X === 0 ? t("pvgame.day7.novice") : res_.X === 1 ? t("pvgame.day7.intermediaire") : t("pvgame.day7.expert")
         desc = elem.description.replace(/##/gi, res_ ? nev : ""  )

      }else{
         desc = elem.description.replace(/##/gi, res_ ? res_.X : 0  ).replace(/@@/gi, res_ ? res_.Y : 0 );

      }
      return {...elem,description:desc}
    })

   const list =  _.chain(data_history_)
    .groupBy("day")
    .map((value, key) => ({ day: key, desc:  value}))
    .value();




    setListDescriptions(list);
  })
    const days_title = [
     "La mise en place",
     "La formation du staff" ,
     "La collaboration internationale" ,
     "La fiche de notification",
     "Le circuit de notification",
     "La validation des cas",
     "L’imputabilité",
     "Les bases de données",
     "La génération et la validation des signaux",
     "Le comité technique"
  ]

     if(days !== null) {
       const days__ = days.map((elem,index)=>{
          return {...elem ,text:days_title[index] }
        })
        setDays(days__)
      }

  }, []);

  return (
    <div className="rapport-activite">
      <Header {...props} score={score} t={t}/>
      <Container  t={t}  days={days_} listDescriptions={listDescriptions} score={score} />

      <img src={img1lt} alt="" className="img1" />
      <img src={img2rt} alt="" className="img2" />
    </div>
  );
}

export default RapportActivite;

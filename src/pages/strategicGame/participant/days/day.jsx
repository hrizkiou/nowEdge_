import React, { useContext, useEffect, useReducer, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import img2 from "../../../../assets/images/StrategicGame/image_37.png";
import img from "../../../../assets/images/StrategicGame/phone.png";
import PreLoaderWidget from "../../../../components/Loader";
import Modalexpert from "../../../../components/modal/modalexpert";
import ModalMinisterValidation from "../../../../components/modal/modalMinisterValidation";
import { closeDayService, getDetailsService, saveDecisionsService, saveDetailsService } from "../../../../redux/days/service";
import { closeDaySuccess } from "../../../../redux/pvgame/actions";
import store_ from "../../../../redux/store.js";

import "./style.scss";

const initialState = {
  total: 110000,
  list: [
    {
      title: "ReglementationTitle",
      s_title: "ReglementationSTitle",
      total: 150,
      unit: "ReglementationUnit",

      options: [
        {
          id_decision: 16,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision16",
          budget: 35,
          unit:"heures"
        },
        {
          id_decision: 17,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision17",
          budget: 40,
          unit:"heures"
        },
        {
          id_decision: 18,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision18",
          budget: 35,
           unit:"heures"
        },
        {
          id_decision: 19,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision19",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 20,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision20",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 21,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision21",
          budget: 40,
           unit:"heures"
        },
        {
          id_decision: 22,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision22",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 23,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision23",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 24,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision24",
          budget: 35,
           unit:"heures"
        },
        {
          id_decision: 25,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision25",
          budget: 35,
           unit:"heures"
        },
        {
          id_decision: 26,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision26",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 27,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision27",
          budget: 35,
           unit:"heures"
        },
        {
          id_decision: 28,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision28",
          budget: 40,
           unit:"heures"
        },
        {
          id_decision: 29,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision29",
          budget: 20,
           unit:"heures"
        },
        {
          id_decision: 30,
          // Catégorie: "Réglementation et procédures",
          Decision: "ReglementationoptionsDecision30",
          budget: 35,
           unit:"heures"
        },
      ],
    },
    {
      title: "FinancementTitle",
      s_title: "FinancementSTitle",
      limit: 5,
      unit: "FinancementUnit",
      options: [
        {
          id_decision: 1,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision1",
          budget: 5000,
        },
        {
          id_decision: 2,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision2",
          budget: 4000,
        },
        {
          id_decision: 3,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision3",
          budget: 1000,
        },
        {
          id_decision: 4,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision4",
          budget: 2000,
        },
        {
          id_decision: 5,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision5",
          budget: 3000,
        },
        {
          id_decision: 6,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision6",
          budget: 5000,
        },
        {
          id_decision: 7,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision7",
          budget: 4000,
        },
        {
          id_decision: 8,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision8",
          budget: 2000,
        },
        {
          id_decision: 9,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision9",
          budget: 3000,
        },
        {
          id_decision: 10,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision10",
          budget: 1000,
        },
        {
          id_decision: 11,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision11",
          budget: 3000,
        },
        {
          id_decision: 12,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision12",
          budget: 1000,
        },
        {
          id_decision: 13,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision13",
          budget: 5000,
        },
        {
          id_decision: 14,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision14",
          budget: 2000,
        },
        {
          id_decision: 15,
          // Catégorie: "Financement",
          Decision: "FinancementOptionsDecision15",
          budget: 4000,
        },
      ],
    },
    {
      title: "EquipementTitle",
      s_title: "EquipementSTitle",

      unit: "EquipementUnit",
      options: [
        {
          id_decision: 31,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision31",
          budget: -4000,
        },
        {
          id_decision: 32,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision32",
          budget: -17000,
        },
        {
          id_decision: 33,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision33",
          budget: -500,
        },
        {
          id_decision: 34,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision34",
          budget: -500,
        },
        {
          id_decision: 35,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision35",
          budget: -2000,
        },
        {
          id_decision: 36,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision36",
          budget: -1000,
        },
        {
          id_decision: 37,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision37",
          budget: -10000,
        },
        {
          id_decision: 38,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision38",
          budget: -4000,
        },
        {
          id_decision: 39,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision39",
          budget: -2000,
        },
        {
          id_decision: 40,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision40",
          budget: -8000,
        },
        {
          id_decision: 41,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision41",
          budget: -3500,
        },
        {
          id_decision: 42,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision42",
          budget: -1500,
        },
        {
          id_decision: 43,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision43",
          budget: -16000,
        },
        {
          id_decision: 44,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision44",
          budget: -700,
        },
        {
          id_decision: 45,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision45",
          budget: -1500,
        },
        {
          id_decision: 46,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision46",
          budget: -10000,
        },
        {
          id_decision: 47,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision47",
          budget: -1600,
        },
        {
          id_decision: 48,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision48",
          budget: -20000,
        },
        {
          id_decision: 49,
          // Catégorie: "Equipement",
          Decision: "EquipementOptionsDecision49",
          budget: -1200,
        },
      ],
    },
    {
      title: "RessourcesTitle",
      s_title: "RessourcesSTitle",

      unit: "RessourcesUnit",
      options: [
        {
          id_decision: 50,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision50",
          budget: -15000,
        },
        {
          id_decision: 51,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision51",
          budget: -7000,
        },
        {
          id_decision: 52,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision52",
          budget: -2000,
        },
        {
          id_decision: 53,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision53",
          budget: -7000,
        },
        {
          id_decision: 54,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision54",
          budget: -9000,
        },
        {
          id_decision: 55,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision55",
          budget: -13000,
        },
        {
          id_decision: 56,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision56",
          budget: -3000,
        },
        {
          id_decision: 57,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision57",
          budget: -8000,
        },
        {
          id_decision: 58,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision58",
          budget: -10000,
        },
        {
          id_decision: 59,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision59",
          budget: -3000,
        },
        {
          id_decision: 60,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision60",
          budget: -3000,
        },
        {
          id_decision: 61,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision61",
          budget: -2000,
        },
        {
          id_decision: 62,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision62",
          budget: -9000,
        },
        {
          id_decision: 63,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision63",
          budget: -2000,
        },
        {
          id_decision: 64,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision64",
          budget: -20000,
        },
        {
          id_decision: 65,
          // Catégorie: "Ressources humaines",
          Decision: "RessourcesOptionsDecision65",
          budget: -7000,
        },
      ],
    },
  ],
  savedecisions: {
    centerId: store_.store.getState().PvGame.center.id,
    dayId: 1,
    decisions: [],
  },
};

function reducer(state, action) {
  let savedecisions_, index;
  switch (action.type) {
    case "CHANGE_TOTAL":
      savedecisions_ = state.savedecisions;

      index = savedecisions_.decisions.findIndex(
        (elem) => elem === action.decisions_id
      );

      if (index === -1) {
        savedecisions_.decisions.push(action.decisions_id);
      } else {
        savedecisions_.decisions.splice(index, 1);
      }
      return {
        ...state,
        total: state.total + action.payload,
        savedecisions: savedecisions_,
      };
    case "CHANGE_TOTAL_DSS":
      const list_ = state.list;
      list_[0].total += action.payload;

      savedecisions_ = state.savedecisions;

      index = savedecisions_.decisions.findIndex(
        (elem) => elem === action.decisions_id
      );

      if (index === -1) {
        savedecisions_.decisions.push(action.decisions_id);
      } else {
        savedecisions_.decisions.splice(index, 1);
      }

      return { ...state, list: list_, savedecisions: savedecisions_ };

     case "R_SET_TOTAL":

     return {
        ...state,
        total: 60000
     };

     case "RESET_STEP_2":
      
      let t =  0;

      const list = state.savedecisions.decisions.filter(item_=>{
         const item = state.list[1].options.find(el=> el.id_decision === item_ );

         if(item){
            t += item.budget;


            return false;
         }

         return true;
      });



     return {
        ...state,
        total:state.total - t  ,
        savedecisions: {
          ...state.savedecisions,
          decisions: list
        }
     };

    default:
      return state;
  }
}

const Context = React.createContext();

const useDossier = () => {
  const contextValue = useContext(Context);
  return contextValue;
};

const StepModal = ({ show, close = () => null , total =0}) => {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div className={"dayOneModal"}>
          <div className={"discussMessage"}>
            <span>Le ministre</span>
            <p className={"mt-2"}>
              {step === 1
                ? t("pvgame.day1.StepModalstep1").replace(/@@/,total)
                : t("pvgame.day1.StepModalstep2")}
            </p>
          </div>
          <div
            className={"budget_restant-mod"}
            onClick={() => {
              // if (step === 1)
              close(false);

              // setStep((prv) => prv + 1);
            }}
          >
            <div style={{ width: "115px" }}>
              <span>
                {t("pvgame.day1.StepModalNote")}{" "}
                <i className=" fas fa-arrow-right "></i>
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const StepModalFolder = ({ show, close = () => null , text=""}) => {
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div className={"dayOneModal"}>
          <div className={"discussMessage"} style={{height:'160px'}}>
            <span>Le ministre</span>
            <p className={"mt-2"}>
              {text}
            </p>
          </div>
          <div
            className={"budget_restant-mod"}
            onClick={() => {
              // if (step === 1)
              close(false);

              // setStep((prv) => prv + 1);
            }}
          >
            <div style={{ width: "115px" }}>
              <span>
                {t("pvgame.day1.StepModalNote")}{" "}
                <i className=" fas fa-arrow-right "></i>
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const PhoneModal = ({ show, close = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div className={"dayOneModal"}>
          <div className={"discussMessage"} style={{ height: "200px" }}>
            <span > {t("pvgame.day1.PhoneModalTitle")}</span>
            <p className="mt-2">{t("pvgame.day1.PhoneModalP1")}</p>
            <p>{t("pvgame.day1.PhoneModalP2")}</p>
          </div>
          <div
            className={"budget_restant-mod"}
            onClick={() => {
              close(false);
            }}
          >
            <div style={{ width: "130px", paddingLeft: "12px" }}>
              <span>
                {t("pvgame.day1.PhoneModalCommencer")}{" "}
                <i className=" fas fa-arrow-right ml-1"></i>{" "}
              </span>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
const NotifyModal = ({ show, close = () => null }) => {
  const { t } = useTranslation();
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div className={"notifyModal"}>
          <div className={"content-md"}>
            <div className="pack-img">
              <img src={img2} width="100%" />
            </div>
            <div className="text-content">
              <span>{t("pvgame.day1.NotifyModalspan")}</span>
              <p>"{t("pvgame.day1.NotifyModalp")}"</p>
            </div>
          </div>
          <div
            style={{
              right: "37%",
              bottom: "4%",
              cursor: "pointer",
            }}
            className={"budget_restant-mod"}
            onClick={() => {
              close(false);
            }}
          >
            <div style={{ width: "115px", color: "white" }}>
              <span>C'est noté</span>
              <i className=" fas fa-arrow-right ml-1"></i>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

// const ValidChoixModal = ({ show, close = () => null, history }) => {
//   return (
//     <Modal show={show} dialogClassName={"daysModal"} centered>
//       <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
//         <div className={"dayOneModal"}>
//           <div className={"discussMessage"} style={{ height: "116px" }}>
//             <span>Le ministre</span>
//             <p>Êtes-vous sur de vouloir valider vos choix ?</p>
//           </div>
//           <div
//             className={"budget_restant-mod"}
//             onClick={() => {
//               close(false);
//             }}
//           >
//             <div style={{ width: "113px" }} onClick={() => history.push("/")}>
//               <span>
//                 Terminer <i className=" fas fa-arrow-right ml-1"></i>{" "}
//               </span>
//             </div>
//           </div>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

const Item = ({
  limit,
  elem,
  total,
  onchangeTotal,
  max,
  add,
  onChangeLimit,
  details,
  active = true
}) => {
  const [isClick, setIsClick] = useState(false);
  const [redData, dispatch] = useDossier();
  const [exist, setExist] = useState(false);

  const { t } = useTranslation();
  const change = (val) => {
    dispatch({
      type: "CHANGE_TOTAL",
      payload: val,
      decisions_id: elem.id_decision,
    });
  };
  const click = () => {
    if (details.length === 0 && active) {
      if (!isClick) {
        if (limit === undefined || limit > 0) {
          if (redData.total + elem.budget < 0) return;
          setIsClick(true);
          add ? change(+elem.budget) : change(-elem.budget);
          if (limit !== undefined) onChangeLimit(limit - 1);
        }
      } else {
        setIsClick(false);
        add ? change(-elem.budget) : change(+elem.budget);
        if (limit !== undefined) onChangeLimit(limit + 1);
      }
    }
  };

  useEffect(() => {
    const exist_sv = details.findIndex((elem_) => elem_ === elem.id_decision);

    const exist_cr = redData.savedecisions.decisions.findIndex( _elem => elem.id_decision === _elem);

    const exist = exist_sv !== -1 ? true : exist_cr !== -1 ? true : false;
    // setExist(exist);
    setIsClick(exist)
  }, [])

  // const exist = details.findIndex((elem_) => elem_ === elem.id_decision);
  return (
    <div
      className={`item ${
        isClick
          ? "color-white b-color-blue"

          : ""
      }`}
      onClick={click}
    >
      <p className="">{t(`pvgame.day1.initialState.${elem.Decision}`)}</p>

      <div className="block " style={{ textAlign: "right" }}>
        <div className={`${isClick ? "color-white" : ""}`}>{elem.budget}</div>
        <p
          style={{ textAlign: "right" }}
          className={`${isClick ? "color-white" : ""}`}
        >
          {t("pvgame.day1.PVcoins")}
        </p>
      </div>
    </div>
  );
};

const Item1 = ({ elem, details }) => {
  const [isClick, setIsClick] = useState(false);
  const [exist, setExist] = useState(false);
  const [redData, dispatch] = useDossier();
  const { t } = useTranslation();





  const change = (val) => {
    dispatch({
      type: "CHANGE_TOTAL_DSS",
      payload: val,
      decisions_id: elem.id_decision,
    });
  };
  const click = () => {
    // //console.log("-",details)
    if (details.length === 0) {
      if (!isClick) {
        if (redData.list[0].total - elem.budget >= 0) {
          setIsClick(true);
          change(-elem.budget);
        }
      } else {
        setIsClick(false);

        change(+elem.budget);
      }
    }
  };

  useEffect(() => {
    const exist_sv = details.findIndex((elem_) => elem_ === elem.id_decision);

    const exist_cr = redData.savedecisions.decisions.findIndex( _elem => elem.id_decision === _elem);

    const exist = exist_sv !== -1 ? true : exist_cr !== -1 ? true : false;
    // setExist(exist);
    setIsClick(exist)
  }, [])



  // //console.log("-exist---",exist_cr , elem.id_decision , redData.savedecisions.decisions)

  // //console.log("----exist--->>",exist)
  return (
    <div
      className={`item ${
        isClick
          ? "color-white b-color-blue"
          : ""
      }`}
      onClick={click}
    >
      <p className="">
        {t(`pvgame.day1.initialState.${elem.Decision}`)}
      </p>
      <div className="block " style={{ textAlign: "right" }}>
        <div className={`${isClick ? "color-white" : ""}`}>{elem.budget}</div>
        <p
          style={{ textAlign: "right" }}
          className={`${isClick ? "color-white" : ""}`}
        >
        {elem.unit}
          {/* {t("pvgame.day1.PVcoins")} */}
        </p>
      </div>
    </div>
  );
};

const ListRow = ({ data, total, max, add = false, limit, type, details  , indexItem}) => {
  const [limit_, setlimit] = useState(limit);
  const [redData, dispatch] = useDossier();
  const [active, setActive] = useState(true);
  const [rnData, setRnData] = useState([]);
// let active = true;

  useEffect(() => {
    const rnData_ = data.sort(() => Math.random() - 0.5)
    setRnData(rnData_)
    if(indexItem === 1){

      const promise = new Promise((resolve, reject) => {

        const res =  data.reduce((accumulator, currentValue) => {
          var test = redData.savedecisions.decisions.find(element => element === currentValue.id_decision)
          if(test) return accumulator + 1;
          return accumulator;
       } , 0);

          resolve(res);

      });


      promise.then((value) => {
        // //console.log(">---promise--->", value)

        if(value >= 5){
          //  active = false
          setActive(false);
         }
      });

    //  //console.log(">---res--->", res , res >= 5)

    }
  }, []);

  // //console.log(">---active---> 10101")




  return (
    <div className="content-row">
      {rnData.map((elem, index) => {
        return (
          <React.Fragment key={index}>
            {type === 1 ? (
              <Item
                add={add}
                elem={elem}
                limit={limit_}
                onChangeLimit={setlimit}
                max={max}
                total={total}
                details={details}
                active={active}
              />
            ) : (
              <Item1 elem={elem} details={details} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const Dossier1 = ({ data, indexItem, close, details , cancel }) => {
  // const [total, setTotal] = useState(data.list[indexItem].total);
  const [redData, dispatch] = useDossier();
  const { t } = useTranslation();
  return (
    <div className={"desiModal"}>
      <div className={"header pb-2"}>
        <h3>{t(`pvgame.day1.initialState.${data.list[indexItem].title}`)}</h3>
        <span>
          {t(`pvgame.day1.initialState.${data.list[indexItem].s_title}`)}
        </span>
      </div>
      <div className={"content"}>
        <ListRow
          data={data.list[indexItem].options}
          total={redData.total}
          max={data.list[indexItem].total}
          dispatch={dispatch}
          type={2}
          details={details}
          redData={redData}
        />
      </div>
      <div className={"footer-m"}>
        <div className="budget-restant-pup">
          <span className="money-m">
            {redData.list[0].total}{" "}
            {t(`pvgame.day1.initialState.${redData.list[0].unit}`)}
          </span>
          <span>{t("pvgame.day1.BudgetR")}</span>
        </div>
        <div className="group-btn-f">
          <button
            onClick={()=>cancel(indexItem)}
            type="reset"
            className="btn btn-secondary waves-effect waves-light mr-1"
          >
            {t("pvgame.day1.Annuler")}
          </button>
          <button
            onClick={()=>close(indexItem)}
            className="btn btn-primary waves-effect waves-light "
            type="submit"
          >
            {t("pvgame.day1.Enregistrer")}
          </button>
        </div>
      </div>
    </div>
  );
};
const Dossier2 = ({ data, indexItem, close, details , cancel  }) => {
  const [total, setTotal] = useState(data.total);
  const [redData, dispatch] = useDossier();

  const { t } = useTranslation();
  return (
    <div className={"desiModal"}>
      <div className={"header pb-2"} >
        <h3>{t(`pvgame.day1.initialState.${data.list[indexItem].title}`)}</h3>
        <span>
          {t(`pvgame.day1.initialState.${data.list[indexItem].s_title}`)}
        </span>
      </div>
      <div className={"content"}>
        <ListRow
          add={true}
          data={data.list[indexItem].options}
          limit={data.list[indexItem].limit}
          total={total}
          max={false}
          dispatch={dispatch}
          type={1}
          details={details}
          indexItem={indexItem}
        />
      </div>
      <div className={"footer-m"}>
        <div className="budget-restant-pup">
          <span className="money-m">
            <i className=" fas fa-money-bill"></i> {redData.total}
          </span>
          <span>{t("pvgame.day1.BudgetR")}</span>
        </div>
        <div className="group-btn-f">
          <button
             onClick={()=>cancel(indexItem)}

            type="reset"
            className="btn btn-secondary waves-effect waves-light mr-1"
          >
            {t("pvgame.day1.Annuler")}
          </button>
          <button
            onClick={()=>close(indexItem)}
            className="btn btn-primary waves-effect waves-light "
            type="submit"
          >
            {t("pvgame.day1.Enregistrer")}
          </button>
        </div>
      </div>
    </div>
  );
};

const ModalDesision = ({
  data = [],
  show,
  close,
  step,
  indexItem = 1,
  details,
  cancel
}) => {
  // const [Total, setTotal] = useState(data[indexItem].total)
  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        {(() => {
          switch (indexItem) {
            case 1:
              return (
                <Dossier2
                  data={data}
                  indexItem={indexItem}
                  close={close}
                  details={details}
                  cancel={(index)=>cancel(index)}
                />
              );
            case 2:
              return (
                <Dossier2
                  data={data}
                  indexItem={indexItem}
                  close={close}
                  details={details}
                  cancel={(index)=>cancel(index)}
                />
              );
            case 3:
              return (
                <Dossier2
                  data={data}
                  indexItem={indexItem}
                  close={close}
                  details={details}
                  cancel={(index)=>cancel(index)}
                />
              );
            default:
              return (
                <Dossier1
                  data={data}
                  indexItem={indexItem}
                  close={close}
                  details={details}
                  cancel={(index)=>cancel(index)}
                />
              );
          }
        })()}
      </Modal.Body>
    </Modal>
  );
};

const DayOne = (props) => {
  const [showStart, setShowStart] = useState(true);
  const [phoneModal, setPhoneModal] = useState(false);
  const [notifyModal, setNotifyModal] = useState(false);
  const [notify, setNotify] = useState(true);
  const [activeSteps, setActiveSteps] = useState(false);
  const [validate, setValidate] = useState(false);
  const [showValidChoix, setShowValidChoix] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [step, setStep] = useState("");

  const contextValue = useReducer(reducer, initialState);
  const [data, dispatch] = contextValue;
  const centerId = useSelector((store) => store.PvGame.center.centerId);
  const [details, setDetails] = useState([]);

  const { t } = useTranslation();
  const dispatchRedux = useDispatch();

  useEffect(() => {
    getDetailsService(1, centerId, false)
      .then((data) => {
        const list1 = data.details.split("#").map((elem) => parseInt(elem, 10));

        setDetails(list1);
      })
      .catch((error) => {
        //console.log("----saveDecisionsService--error-", error);
      });
  }, []);

  const clickPhone = () => {
    setNotify(false);
    setActiveSteps(true);
    setNotifyModal(true);
    setStep("start");
  };
  const notifyModalCols = () => {
    setNotifyModal(false);
    setPhoneModal(true);
  };

  const phoneModalCols = () => {
    // setNotifyModal(false);
    setPhoneModal(false);
  };

  const validChoix = () => {
    if (validate) {
      setLoading(true);
      saveDetailsService(1, centerId, data.savedecisions.decisions.join("#"));
      saveDecisionsService(1, data.savedecisions.decisions, centerId)
        .then((data) => {
          closeDayService(1, centerId)
            .then((data) => {
              setLoading(false);
              setShowValidChoix(true);
              dispatchRedux(closeDaySuccess(data));
            })
            .catch((error) => {
              setLoading(false);
            });
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };

  const onStepChange_ = (val) => {
    setStep(val);
  };

  return (
    <Context.Provider value={contextValue}>
      {loading && <PreLoaderWidget />}
      <div className={"DayOneBackground"}>
        <div
          style={{
            position: "absolute",
            top: "2rem",
            right: "3rem",
          }}
        >
          <button
            onClick={() => {
              history.push("/pv-game/parcours");
            }}
            type="reset"
            className="btn btn-secondary waves-effect waves-light"
            style={{
              color: "#2874b3",
              backgroundColor: "#ffff",
              borderColor: "#ffff",
            }}
          >
            {t("pvgame.day1.Quitter")}
            <i className="ml-2 fas fa-running"></i>
          </button>
        </div>

        <StepModal show={showStart} close={setShowStart} t={t} total={data.total}/>
        <NotifyModal show={notifyModal} close={notifyModalCols} t={t} />
        <PhoneModal show={phoneModal} close={phoneModalCols} t={t} />
        <Modalexpert
          show={showValidChoix}
          history={props.history}
          onValidate={() => {
            props.history.push("/pv-game");
          }}
          close={() => null}
          text={t("pvgame.day1.ModalexpertText")}
        />

        <CenterButtons
          t={t}
          active={activeSteps}
          onFinch={() => {
            setValidate(true);
          }}
          onStepChange={onStepChange_}
          centerId={centerId}
          details={details}
        />

        <div className="phone-img" onClick={clickPhone}>
          <img src={img} alt="phone" />
          {notify && (
            <i
              className="fas fa-bell"
              style={{ top: "64%", right: "-12%" }}
            ></i>
          )}
        </div>

        <span
          style={{
            textAlign: "center",
            font: "normal normal bold 15px/17px Karla",
            letterSpacing: "0.3px",
            color: " #9B9B9B",
            opacity: 1,
            position: "absolute",
            top: "69%",
            left: "38%",
          }}
        >
          {t("pvgame.day1.title")}
        </span>
        <div className={"budget_restant"}>
          <span>PV COINS {data.total}</span>
          <p> {t("pvgame.day1.BudgetR")}</p>
          {details.length === 0 && (
            <div
              style={{
                backgroundColor: `${!validate ? "#71b6f991" : ""}`,
                cursor: "pointer",
              }}
              onClick={validChoix}
            >
              <span>
                {t("pvgame.day1.ValideNiveau")}{" "}
                <i className=" fas fa-arrow-right ml-1"></i>
              </span>
            </div>
          )}
        </div>
        <DiscussMessage step={step} t={t} total={data.total} />
      </div>
    </Context.Provider>
  );
};
const CenterButtons = ({
  active = false,
  onFinch = () => null,
  onStepChange = () => null,
  centerId,
  details,
  t
}) => {
  const [step, setStep] = useState("step1");
  const [modalDesision, setModalDesision] = useState(false);
  const [modalDesision2, setModalDesision2] = useState(false);
  const [index_, setIndex] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [showStepModalFolder, setShowStepModalFolder] = useState(false);


  const next = (e,i) => {
    e.stopPropagation();

    setShowStepModalFolder(true);
    setIndex(i);

  };

  const [data, dispatch] = useDossier();



  let index;
  let text = "";


      switch (step) {
        case "step1":
          index = 0;
          text = t("pvgame.day1.DiscussMessagemsgstart")
          if(data.total === 110000) {
            dispatch({
              type: "R_SET_TOTAL",
              payload:""
            })
          }

          break;
        case "step2":
          index = 1;
          text = t("pvgame.day1.choisissez_5")
         
          
          break;
        case "step3":
          index = 2;
          text = t("pvgame.day1.choisissez_autant")
          break;
        case "step4":
          index = 3;
          text = t("pvgame.day1.derniere_etape")  
          break;
        case "step5":
          index = 4;
          break;

        default:
          // index = true;
          break;
      }


  // //console.log("---index----",index)

  const backTo = (i)=> {

    if(i < index || index === undefined ){
      setIndex2(i)
      setModalDesision2(true)
    }

  }

  return (
    <>
      {modalDesision && (
        <ModalDesision
          t={t}
          data={data}
          show={modalDesision}
          indexItem={index}
          details={details}
          close={() => {
            setModalDesision(false);
            setStep("step" + index_);
            onStepChange("step" + index_);
            if (active && step === "step4") {
              setStep("step-");
              onFinch();
            }
          }}
          cancel={(index)=>{


            if(index === 1){

              dispatch({type:"RESET_STEP_2", payload:0})
            }
            setModalDesision(false);

          }}
        />
      )}
      {modalDesision2 && (
        <ModalDesision
          t={t}
          data={data}
          show={modalDesision2}
          indexItem={index2}
          details={details}
          close={() => {
            setModalDesision2(false);
          }}
          cancel={()=>setModalDesision2(false)}
        />
      )}

       {showStepModalFolder &&
          <StepModalFolder
             show={showStepModalFolder}
             text={text}
             close={()=>{
                setModalDesision(true);
                setShowStepModalFolder(false);
             }}
             t={t}
          />

        }
      <div className={"centerButtons"}>
        <div>
        <div style={{width:'150px' , top: "0%", left: "0%",cursor:`${index>0 ? 'pointer' : ''}` }} onClick={() => backTo(0)} >
          {active && step === "step1" && (

           <span style={{ top: "0%", left: "14%" }} onClick={(e) => {
             next(e,2)
             }}>
              <i className="fas fa-bell" style={{}}></i>
            </span>

          )}
          </div>
          <div style={{width:'150px',left:'20px',top: "0%", left: "24%",position:'absolute',cursor:`${index>1 ? 'pointer' : ''}` }} onClick={() => backTo(1)}>
          {active && step === "step2" && (

            <span style={{ top: "8%", left: "40%" }} onClick={(e) => next(e,3)}>
              <i className="fas fa-bell"></i>
            </span>

          )}
          </div>
          <div style={{width:'150px',left:'20px',top: "0%", left: "47%",position:'absolute',cursor:`${index>2 ? 'pointer' : ''}` }} onClick={() => backTo(2)}>
            {active && step === "step3" && (
              <span style={{ top: "5%", right: "30%" }} onClick={(e) => next(e,4)}>
                <i className="fas fa-bell"></i>
              </span>
            )}
          </div>
          <div style={{width:'150px',left:'20px',top: "0%", left: "72%",position:'absolute',cursor:`${index>3 ? 'pointer' : ''}` }} onClick={() => backTo(3)}>

          {active && step === "step4" && (
            <span style={{ top: "0%", right: "10%" }} onClick={(e) => next(e,5)}>
              <i className="fas fa-bell "></i>
            </span>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

const DiscussMessage = ({ step ,total=0}) => {
  const { t } = useTranslation();
  const [msg, setMsg] = useState(t("pvgame.day1.DiscussMessagemsg"));

  useEffect(() => {
    switch (step) {
      case "start":
        setMsg(t("pvgame.day1.DiscussMessagemsg"));
        break;
      case "step2":
        setMsg(t("pvgame.day1.DiscussMessagemsgstep2"));
        break;
      case "step3":
        let msg = t("pvgame.day1.DiscussMessagemsgstep3");

        setMsg(msg.replace(/@@/g, total));
        break;
      case "step4":
        setMsg(t("pvgame.day1.DiscussMessagemsgstep4"));
        break;
      case "step5":
        setMsg(t("pvgame.day1.DiscussMessagemsgstep5"));
        break;
      default:
        break;
    }
  }, [step]);

  return (
    <>
      <div className="presonDayOne" />
      <div
        className={"discussMessage"}
        style={{ width: step === "" ? "340px" : "" }}
      >
        <span>{t("pvgame.day1.PhoneModalTitle")}</span>
        <p>{msg}</p>
      </div>
    </>
  );
};

export default DayOne;

//dd

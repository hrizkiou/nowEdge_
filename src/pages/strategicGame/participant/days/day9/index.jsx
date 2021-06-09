import classnames from "classnames";
import i18n from "i18next";
import _ from 'lodash';
import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap";

import ModalDAy9 from "../../../../../components/modal/modalDay9";
import Modalexpert from "../../../../../components/modal/modalexpert";
import PharmacienneModal from "../../../../../components/modal/pharmacienne";
import { avatars, countries, getLogoById } from "../../../../../helpers/centerData";
import { closeDayService, getDetailsService, saveDecisionsService, saveDetailsService } from "../../../../../redux/days/service";
import { closeDaySuccess } from "../../../../../redux/pvgame/actions";
import data from "./data.json";

import "./style.scss";

function getDecisions (numero_cas,categorie , decision="Yes"){

  const list = data.decisions.filter((elem)=> elem.numero_cas === numero_cas && elem.categorie === categorie  );


  // //console.log('||>>>----list---',list)

  let item_score_ =list.find(elem=> elem.decision === decision);
  let item_score =list.find(elem=> elem.score_3 >= 1);

  if(item_score_ === undefined) return ;

  if(item_score.score_3 >= 1  && item_score.decision === "Yes"){
    return true;
  }
  if(item_score_.score_3 === 0 && decision==="Yes"){
    return false;
  }else{
    return -1;
  }
}




function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_TOTAL":
      return { ...state, total: state.total + action.payload };

    case "LOAD_SAVE_DECISION":
      // //console.log('-------LOAD_SAVE_DECISION--------',action.payload)
      return { ...state, save_decision: action.payload };
    case "CHANGE_TOTAL_DSS":
      const list_ = state.list;
      list_[0].total += action.payload;
      return { ...state, list: list_ };
    case "ADD_SELECT_DES_SIGNAL":
    const list_des_ =  state.select_des ;
    // action.payload
    list_des_.push({
      id:action.payload, check: -1
    })

    // //console.log('---select_des???--->',action.payload);
    // //console.log('---select_des???--->',list_des_);


    return {...state,select_des:[...list_des_]}
    case "SET_SELECT_DES":

    return {...state,select_des:[...action.payload]}
    case "SELECT_DES":
      // //console.log('----action.payload----',action.payload)
      let select_des_ = state.select_des;
      const {database,item,check} = action.payload;
      const list =  state.decisions.filter((elem )=> elem.categorie === `Database ${database}` && elem.numero_cas === item.numero_cas)

      let categories = {
        'Database 1': "Database 1",
        'Database 2': "Database 2",
        'Database 3': "Database 3",
        'Database 4': "Database 4",
        'Database 5': "Database 5",
    };
    let grouped = _.groupBy(state.decisions,  (n) => {

      let key = 'Database 1';

      _.forEach(categories,  (g, letter) => {
          if (n.categorie === letter && n.numero_cas !== "signal") {
              key = letter;
              return false;
          }
      });

      return key;

    });

    const desYes =  list.find((elem)=> elem.decision === "Yes" );
    const desNo =  list.find((elem)=> elem.decision === "No" );

      if(!check){

        select_des_ =  select_des_.filter(elem => elem.id !== desNo.id_decision);
        select_des_.push({
            id:desYes.id_decision,
            check:!check
        })


      }else{

        select_des_ =  select_des_.filter(elem => elem.id !== desYes.id_decision);
        // select_des_.push(desNo.id_decision);
        select_des_.push({
          id:desNo.id_decision,
          check:!check
      })


      }
            //console.log('----action.select_des----',select_des_)


    return { ...state,select_des: [...new Set(select_des_)] }

    default:
      return state;
  }
}

const Context = React.createContext();

const useData = () => {
  const contextValue = useContext(Context);
  return contextValue;
};

const TableTd = ({ text, children , width = null ,textAlign}) => {
  const rtref_ = useRef();

  useEffect(() => {
    if(width)
      rtref_.current.style.minWidth = width+'px'
      if(textAlign)
      rtref_.current.style.textAlign = textAlign


  }, []);


  return (
    <td ref={rtref_} >
       {text &&<div  dangerouslySetInnerHTML={{__html: `${text}`}} />}
      {children}
    </td>
  );
};
const TableTr = ({
  index = 0,
  tIndex,
  item,
  onCheck = () => null,
  setValidateData = () => null,
  listCheck = [],
  validateData = null,
}) => {
  const [data, dispatch] = useData();

  const [state, setState] = useState(false);
  const [color, setColor] = useState("");
  // let color = "";

  useEffect(() => {

    if(data.save_decision.length > 0) {

      setValidateData(true);
      const decisions_selected = data.decisions.filter(elem => elem.numero_cas === item.numero_cas && elem.categorie=== `Database ${tIndex}` )

      const res = data.save_decision.find(elem => decisions_selected[0].id_decision === elem.id )

      let select;
      if(res){
         select = decisions_selected[0];
      }else{
        select = decisions_selected[1];
      }

      const des_score = decisions_selected[1].score_3 > decisions_selected[0].score_3 ?decisions_selected[1] :decisions_selected[0]


      const item_2 =  data.save_decision.find(elem => select.id_decision === elem.id )

      // setColor(() => (item_?.valid ? "#CFF3E1" : "#FFDEDE"));
      // if(item_2 && item_2.id === 430)
      // if(item_2.categorie === "Database 3"){

        // //console.log('----item--1--->res>',item_2 , des_score.decision)

        if(des_score.decision === "Yes" ) setColor("#CFF3E1");
        if(des_score.decision === "No" &&  item_2.valid) setColor("#FFDEDE");


      // }
      setState( item_2.valid)
    }
  },[data.save_decision])
  useEffect(() => {


      color_();

  }, [state, validateData]);

  const color_ = () => {

    if (validateData) {
        const des = state ? "Yes" : "No";
        const decisions = getDecisions(item.numero_cas , `Database ${tIndex}` ,des);
        setColor(() => ( decisions === -1 ? ""  : decisions === true ?   "#CFF3E1": "#FFDEDE"));
    } else {
      // setColor(() => (state ? "#D2E3F3" : ""));
    }


  };




  return (
    <tr style={{ backgroundColor: `${color}` }}>
      <TableTd>
        <div
          className="custom-control custom-checkbox"
          style={{ paddingLeft: "2.5rem", display: "flex"}}
        >

          <input
            style={{ marginLeft: "20px" }}
            type="checkbox"
            className="custom-control-input"
            id={`autoSizingCheck${index}-${tIndex}`}
            checked={state}
            disabled={validateData}
            onChange={() => {
              dispatch({type:'SELECT_DES',payload:{
                item,
                database:tIndex,
                check:state
              }})
              onCheck(index, !state);
              setState((prv) => !prv);
            }}
          />
          <label
            className="custom-control-label"
            htmlFor={`autoSizingCheck${index}-${tIndex}`}
          ></label>
         <span style={{paddingTop:'3px'}} >
         {index}
         </span>
        </div>
      </TableTd>
      <TableTd text={item.titre_declaration} />
      <TableTd text={item.date_initiale} />
      <TableTd text={item.age} />
      <TableTd text={item.sexe} />
      <TableTd text={item.recit_cas} width={(906)} textAlign="start" />
      <TableTd text={item.effet_evenement} width={(300)}  />
      <TableTd text={item.grave} />
      <TableTd text={item.critere_gravite} />
      <TableTd text={item.evolution} />
      <TableTd text={item.role_medicament} />
      <TableTd text={item.nom_medicament} />
      <TableTd text={item.actions_prises} />
    </tr>
  );
};

const Table = ({
  index,
  dataName = "data_base_1",
  validateData,
  activeTab = -1,
}) => {
  const [data, dispatch] = useData();

  const listCheck_ = useRef({ list: [] });

  const [listCheck, setListCheck] = useState([]);
  const [validateData_, setValidateData] = useState(false);
  const {t} = useTranslation();

  const saveCheck = (index, check) => {
    if (check) listCheck_.current.list.push(index);
    else
      listCheck_.current.list = listCheck_.current.list.filter(
        (item) => item !== index
      );

    setListCheck(listCheck_.current.list);
  };

  useEffect(() => {
    if (validateData !== null) {
      if (+activeTab === +index) setValidateData(validateData);
    }
  }, [validateData, activeTab]);

  return (
    <div className="table-responsive table_werg">
      <table
        className="table table-centered mb-0 table-custom-r"
        id="inline-editable"
        style={{ overflow: "auto"  }}

      >
        <thead>
          <tr>
            <th>{t("pvgame.day9.N_cas")}</th>
            <th>{t("pvgame.day9.titre_declaration")}</th>
            <th>{t("pvgame.day9.date_de_reception_initiale")}</th>
            <th>{t("pvgame.day9.age")}</th>
            <th>{t("pvgame.day9.sexe")}</th>
            <th>{t("pvgame.day9.recit_du_cas")}</th>
            <th>{t("pvgame.day9.MedDRA")}</th>
            <th>{t("pvgame.day9.grave")}</th>
            <th>{t("pvgame.day9.critere_de_gravite")}</th>
            <th>{t("pvgame.day9.evolution")}</th>
            <th>{t("pvgame.day9.role_medicament")}</th>
            <th>{t("pvgame.day9.WHODrug")}</th>
            <th>{t("pvgame.day9.actions_prises")}</th>
          </tr>
        </thead>

        <tbody>
          {data[i18n.language][dataName].data.map((item, index_) => {
            return (
              <TableTr
                key={index_}
                index={index_ + 1}
                tIndex={index}
                item={item}
                onCheck={saveCheck}
                listCheck={listCheck}
                validateData={validateData_}
                setValidateData={setValidateData}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Day9 = (props) => {
  const [showM, setShowM] = useState(true);
  const [showM2, setShowM2] = useState(false);
  const history = useHistory();

  const [validateData, setValidateData] = useState(null);
  const [nextStep, setNextStep] = useState(false);
  const [validation, setValidation] = useState(false);
  const [showTermin, setShowTermin] = useState(false);
  const centerId = useSelector((store) => store.PvGame.center.centerId);

  const {t} = useTranslation();


  const stp_ = 1;

  const [activeTab, setActiveTab] = useState(1);
  const center = useSelector((state) => state.PvGame.center);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const steps = () => {
    setValidateData(false);
    setNextStep(false);
    switch (activeTab) {
      case 1:
        toggle(2);
        setShowM2(true);
        break;
      case 2:
        toggle(3);
        break;
      case 3:
        toggle(4);
        setShowM2(true);
        break;
      case 4:
        toggle(5);
        // setShowM2(true);
        break;
      case 5:
        toggle(5);
        setShowM2(true);
      case 6:
        toggle(6);

      default:
        break;
    }
  };

  const contextValue = useReducer(reducer, data);
  const _decisions = data.decisions.filter((elem)=> elem.categorie === `Database ${activeTab-1}/signal`)
  const [data_,dispatch] = contextValue;
  const [save_decision__, setSave_decision__] = useState(false)
  useEffect(() => {

     let list = data_.decisions.map((elem)=>{
       if(elem.numero_cas !== "signal" && elem.decision === "No" )
          return {id:elem.id_decision , check : false}
     })
    //  //console.log('----list-----',list.filter(elem => elem !== undefined))
    list = list.filter(elem => elem !== undefined);
    dispatch({type: 'SET_SELECT_DES',payload:list})

    getDetailsService(9, centerId , false)
      .then((data) => {

        dispatch({type: 'LOAD_SAVE_DECISION',payload:JSON.parse(data.details || [])})

        // //console.log('----JSON.parse(data.details || [])----',JSON.parse(data.details || []))
        // dispatch({type: 'LOAD_SAVE_DECISION',payload:[]})

        if(data.details.length> 0)setSave_decision__(true)
        // setSave_decision__(false)
      })
      .catch((error) => {
        //console.log('----saveDecisionsService--error-',error)
      });


  }, []);

  const dispatchRedux = useDispatch();


  const closeDay = ()=>{

   const sedDes =  data_.select_des.map(elem=>{

       const id =   elem.id ?    elem.id : elem;
      const item =  data_.decisions.find(el => el.id_decision === id);
      // //console.log('---item->>',elem,item)

      if(item === undefined) return {id:elem.id , numero_cas:item.numero_cas,categorie:item.categorie ,valid: true};

      if(item.decision === "Yes") return {id:elem.id , numero_cas:item.numero_cas,categorie:item.categorie ,valid:elem.check };

      else return {id:elem.id , numero_cas:item.numero_cas,categorie:item.categorie ,valid:elem.check};
    })
    // //console.log("-sedDes---",sedDes)
    // //console.log("-sedDes---",JSON.stringify(sedDes))

    saveDetailsService(9, centerId , JSON.stringify(sedDes))

    const list_ids = data_.select_des.map((el)=>el.id)
    
    // //console.log('---item->>',list_ids)

    saveDecisionsService(9,list_ids , centerId)
    .then((data) => {
      closeDayService(9, centerId).then((data) => {
        // setLoading(false);
        // setShowValidChoix(true);
        dispatchRedux(closeDaySuccess(data));

      }).catch((error) => {
        // setLoading(false);
      });
    })
    .catch((error) => {
      // setLoading(false);
    });

  }


// "La détection de signal est une des missions essentielles de la pharmacovigilance. Nous devons étudier avec précision les bases de données constituées pour ne rien laisser passer"
  return (
    <Context.Provider value={contextValue}>
      <div className="container-day9">


        <Modalexpert
          show={showTermin}
          history={props.history}
          close={() => null}
          text={t("modals.day9.expert.text")}
        />

        <PharmacienneModal
          show={showM}
          close={() => setShowM(false)}
          message={t("pvgame.day9.msg4")}
          textCancel={t("pvgame.day9.notyet")}
          btnText={t("pvgame.day9.commencer")}

        />

        {showM2 && (
          <ModalDAy9
           list ={_decisions}
            show={showM2}
            setShowM={(val) => {
              setShowM2(val);
              if (activeTab === 6) {
                closeDay();
                setShowTermin(true);
              }
            }}
            rollBack={() => {
              setActiveTab(activeTab - 1);
              setShowM2(false);
              setNextStep(true);
              setValidateData(true);
            }}
            selectedIndexId={(id)=>{
              dispatch({type:"ADD_SELECT_DES_SIGNAL",payload:id});
            }}
          />
        )}

        {validation && (
          <PharmacienneModal
            message={t("pvgame.day9.msg1")}
            show={validation}
            btnText={t("pvgame.day9.yes")}
            textCancel={t("pvgame.day9.notyet")}
            showIcon={false}
            cancel={() => {
              setValidation(false);
            }}
            close={() => {
              setValidateData(true);
              setNextStep(true);
              setValidation(false);
            }}
          />
        )}

        <div className="box box-2">
          <div className="box-2-1">
            <div className="d-flex justify-content-center align-content-center align-items-center ">
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
              <span className="sg-menu-item-title">{center.name}</span>
            </div>
            {/* <div className="cat-ad" onClick={() => null}>
            <i className=" fas fa-book-open mr-1"></i>
            Catalogue des décisions
          </div> */}

            <button
              style={{
                marginTop: "2rem",
              }}
              onClick={() => {
                history.push("/pv-game/parcours");
              }}
              type="reset"
              className="btn btn-secondary waves-effect waves-light mb-4"
            >
              {t("pvgame.day9.quitter")}
              <i className="fas fa-running ml-1"></i>
            </button>
          </div>
          <div className="box-2-2 pt-0 pb-0">
            <h3>{t("pvgame.day9.title")} </h3>
            <p style={{ width: `${stp_ === 2 ? "598px" : ""}` }}>{t("pvgame.day9.subTitle1")}</p>
            <h4>{t("pvgame.day9.subTitle2")}</h4>

            {validateData && (
              <div className="d-flex mt-1">
                <div className="bn_resp">
                  <i className="fas fa-check mr-1"></i>
                  {activeTab !== "2"
                    ? t("pvgame.day9.bonnes_reponses_msg")
                    : t("pvgame.day9.aucun_signal")}
                </div>
              </div>
            )}
          </div>

          <div className="box-2-3">
            <div>
              <Nav tabs>
                <NavItem className="navLink-br-cost">
                  <NavLink
                    className={classnames({ active_tab_day9: activeTab === 1 })}
                    style={{
                     'cursor':save_decision__ ? "pointer"  :"",
                    }}
                    onClick={() => {
                      if(save_decision__)  {
                        toggle('1');
                        setActiveTab(1)
                        }
                    }}
                  >
                    <h4 className="NavItem-NavLink-cost">{t("pvgame.day9.base_de_donnees")} #1</h4>
                  </NavLink>
                </NavItem>
                <NavItem className="navLink-br-cost " disabled={true}>
                  <NavLink
                    className={classnames({ active_tab_day9: activeTab === 2 })}
                    style={{
                     'cursor':save_decision__ ? "pointer"  :"",
                    }}
                    onClick={() => {
                      if(save_decision__)  {toggle('2')
                      setActiveTab(2)
                      }
                    }}
                  >
                    <h4 className="NavItem-NavLink-cost">{t("pvgame.day9.base_de_donnees")} #2</h4>
                  </NavLink>
                </NavItem>
                <NavItem className="navLink-br-cost">
                  <NavLink
                    className={classnames({ active_tab_day9: activeTab === 3 })}
                    style={{
                     'cursor':save_decision__ ? "pointer"  :"",
                    }}
                    onClick={() => {
                      if(save_decision__) { toggle('3');
                      setActiveTab(3)
                      }
                    }}
                  >
                    <h4 className="NavItem-NavLink-cost">{t("pvgame.day9.base_de_donnees")} #3</h4>
                  </NavLink>
                </NavItem>
                <NavItem className="navLink-br-cost">
                  <NavLink
                    className={classnames({ active_tab_day9: activeTab === 4 })}
                    style={{
                     'cursor':save_decision__ ? "pointer"  :"",
                    }}
                    onClick={() => {
                       if(save_decision__) {toggle('4');
                       setActiveTab(4)
                       }
                    }}
                  >
                    <h4 className="NavItem-NavLink-cost">{t("pvgame.day9.base_de_donnees")} #4</h4>
                  </NavLink>
                </NavItem>
                <NavItem className="navLink-br-cost">
                  <NavLink
                    className={classnames({ active_tab_day9: activeTab === 5 })}
                    style={{
                     'cursor':save_decision__ ? "pointer"  :"",
                    }}
                    onClick={() => {
                      if(save_decision__){toggle('5');
                      setActiveTab(5)
                      }
                    }}
                  >
                    <h4 className="NavItem-NavLink-cost">{t("pvgame.day9.base_de_donnees")} #5</h4>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={"" + activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Table
                      activeTab={activeTab}
                      dataName="data_base_1"
                      index={1}
                      validateData={validateData}
                    />
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Table
                      activeTab={activeTab}
                      dataName="data_base_2"
                      index={2}
                      validateData={validateData}
                    />
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Table
                      activeTab={activeTab}
                      dataName="data_base_3"
                      index={3}
                      validateData={validateData}
                    />
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Table
                      activeTab={activeTab}
                      dataName="data_base_4"
                      index={4}
                      validateData={validateData}
                    />
                  </Row>
                </TabPane>
                <TabPane tabId="5">
                  <Row>
                    <Table
                      activeTab={activeTab}
                      dataName="data_base_5"
                      index={5}
                      validateData={validateData}
                    />
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </div>

          {!save_decision__ &&<div className="box-2-1" style={{ justifyContent: "flex-end" }}>
            {!nextStep ? (
              <button
                onClick={() => {
                  setValidation(true);
                }}
                className="btn btn-primary waves-effect waves-light  mb-4"
                type="submit"
              >

                {t("pvgame.day9.validChoice")}

                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            ) : (
              <button
                onClick={steps}
                className="btn btn-primary waves-effect waves-light  mb-4"
                type="submit"
              >
                {t("pvgame.day9.next")}
                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            )}
          </div>}
        </div>
      </div>
    </Context.Provider>
  );
};

export default Day9;

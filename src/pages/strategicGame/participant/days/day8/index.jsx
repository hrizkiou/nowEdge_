import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Prev } from "react-bootstrap/PageItem";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// import 0750128762657L from "../../../../../assets/images/0750128762657L.jpg";
import artrotec from "../../../../../assets/images/0750128762657L.jpg";
import Amoxicilline from "../../../../../assets/images/Amoxicilline.jpg";
import anafranil from "../../../../../assets/images/anafranil.jpg";
import Brexin from "../../../../../assets/images/Brexin.jpg";
import depakine from "../../../../../assets/images/depakine-810x425.jpg";
import Dextran from "../../../../../assets/images/Dextran.jpg";
import lamictal from "../../../../../assets/images/lamictal.jpg";
import paracetamol from "../../../../../assets/images/paracetamol-1-gr-biogaran-boite-de-8-cps.jpg";
import Zyloric from "../../../../../assets/images/Zyloric.jpg";
import Modal4 from "../../../../../components/modal/modal4";
import { avatars, countries, getLogoById } from "../../../../../helpers/centerData";
import { validDay8 } from "../../../../../redux/days/actions";
import { getDetailsService } from "../../../../../redux/days/service";
import Select from "./Select";
import style from "./style.module.scss";

const initialState = {
  dataMedicaments: [
    {
      id: "2388723",
      title: "paracetamol",
      input: ["", "", "", "", ""],
      valid: false,
      img: paracetamol,
    },
    {
      id: "2388724",
      title: "zyloric",
      input: ["", "", "", "", ""],
      img: Zyloric,
      valid: false,
    },
    {
      id: "2388725",
      title: "artotec",
      input: ["", "", "", "", ""],
      img: artrotec,
      valid: false,
    },
    {
      id: "2388726",
      title: "amoxil",
      input: ["", "", "", "", ""],
      img: lamictal,
      valid: false,
    },
    {
      id: "2388727",
      title: "amoxicilline",
      input: ["", "", "", "", ""],
      img: Amoxicilline,
      valid: false,
    },
    {
      id: "2388728",
      title: "brexin",
      input: ["", "", "", "", ""],
      img: Brexin,
      valid: false,
    },
    {
      id: "2388729",
      title: "dextran",
      input: ["", "", "", "", ""],
      img: Dextran,
      valid: false,
    },
    {
      id: "2388730",
      title: "depakine",
      input: ["", "", "", "", ""],
      img: depakine,
      valid: false,
    },
    {
      id: "2388731",
      title: "anafranil",
      input: ["", "", "", "", ""],
      img: anafranil,
      valid: false,
    },
  ],
  validateDataMedicaments: false,
  isValidateDataMedicaments: false,
  effetsIndesirables: [
    {
      id: "12",
      title: "augmentation",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "13",
      title: "metrorragies",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "14",
      title: "vomissements",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "15",
      title: "douleurs",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "16",
      title: "choc",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "17",
      title: "eruption",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "18",
      title: "cheilite",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "19",
      title: "poly",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
    {
      id: "20",
      title: "syndrome",
      valid: false,
      slectedPT: "",
      slectedSOC: "",
    },
  ],
  validateDataEffect: false,
  isValidateDataEffect: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "VALIDATE_DATA_MEDICAMENTS":
      return { ...state, validateDataMedicaments: action.payload };
    case "VALIDATE_DATA_EFFECT":
      return { ...state, validateDataEffect: action.payload };
    case "SET_INPUT":
      let list = state.dataMedicaments.map((val, index) => {
        if (val.id === action.payload.idMed) {
          let list = val.input;

          //console.log(
          //   "-------action.payload.typeInput--------",
          //   action.payload.typeInput,
          //   action.payload.value.length
          // );
          if (
            action.payload.typeInput === 2 ||
            action.payload.typeInput === 1
          ) {
            list[action.payload.index] = action.payload.value;
          }
          // if (
          //   action.payload.typeInput === 1
          //   // action.payload.value.length === 2
          // ) {
          //   list[action.payload.index] = action.payload.value;
          // }

          let valid_ = list.find((element) => element === "");

          return { ...val, input: list, valid: valid_ !== "" ? true : false };
        }
        return val;
      });
      let val = list.find((element) => element.valid === false);

      return {
        ...state,
        dataMedicaments: list,
        isValidateDataMedicaments: val === undefined ? true : false,
      };
    case "SET_SELECT":
      let list_ = state.effetsIndesirables.map((val, index) => {
        if (val.id === action.payload.idEffect) {
          if (action.payload.type === "pt")
            val.slectedPT = action.payload.value;
          if (action.payload.type === "soc")
            val.slectedSOC = action.payload.value;

          if (val.slectedPT !== "" && val.slectedSOC !== "") val.valid = true;
          else val.valid = false;
        }

        return val;
      });
      let val_ = list_.find((element) => element.valid === false);

      return {
        ...state,
        effetsIndesirables: list_,
        isValidateDataEffect: val_ === undefined ? true : false,
      };

    case "GET_DETAIL_DATA":
      return action.payload;
    default:
      return state;
  }
}

const MedicamentContext = React.createContext();

const useMedicament = () => {
  const contextValue = useContext(MedicamentContext);
  return contextValue;
};

const Header = ({ history, t }) => {
  const center = useSelector((state) => state.PvGame.center);

  return (
    <div className={style.header_days}>
      <div className={style.header_days_content_img}>
        {/* <img src={badg44} alt="user-img" className={style.header_days_img1} />
        <img
          src={MaskGroup144}
          alt="user-img"
          className={style.header_days_img2}
        />
        <span className={style.header_days_title}>Rabat PV center</span> */}

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
      <button
        onClick={() => {
          history.push("/pv-game/parcours");
        }}
        type="reset"
        className="btn btn-secondary waves-effect waves-light"
      >
        {t("pvgame.parcour.quitter")}
        <i className="fas fa-running ml-1"></i>
      </button>
    </div>
  );
};

const Sidebar = ({ etap, t }) => {
  return (
    <div className={style.sidebar_days}>
      <h3 className={style.sidebar_days_title}>{t("pvgame.day8.niveau")}</h3>
      <p className={style.sidebar_days_p}>
        {etap === 1
          ? t("pvgame.day8.part1.niveauTitle")
          : t("pvgame.day8.part2.niveauTitle")}
      </p>
    </div>
  );
};

const InputMedicament = ({
  typeInput = 2,
  validate = false,
  dispatch = () => null,
  idMed,
  index,
}) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const center = useSelector((state) => state.PvGame.center);
  const [medicaments] = useMedicament();
  const [modeEdit, setModeEdit] = useState(true);
  const handleChange = (evt) => {
    const financialGoal = evt.target.validity.valid ? evt.target.value : value;
    //console.log(
    //   "financialGoal",
    //   evt.target.validity,
    //   financialGoal,
    //   typeof financialGoal
    // );

    setValue(evt.target.value);
    dispatch({
      type: "SET_INPUT",
      payload: { idMed, index, value: financialGoal, typeInput },
    });

    const medic = medicaments.dataMedicaments.find((dm) => dm.id === idMed);

    //console.log("medic", medic);
  };

  useEffect(() => {
    if (validate) {
      setIsValid((_) => {
        if (value === "") return true;

        if (typeInput === 1) {
          return value.length !== 2 ? true : false;
        }
      });
    } else {
      setIsValid(false);
    }
  }, [validate, value]);

  useEffect(() => {
    const medic = medicaments.dataMedicaments.find((dm) => dm.id === idMed);
    setValue(medic.input[index]);
    const currentDay = center.days.find((d) => d.dayId === 8);

    if (currentDay.status === 1) {
      setModeEdit(false);
    }
  }, [index, medicaments]);

  return (
    <div
      style={{
        height: "65px",
        width: "50px",
        display: "inline-block",
        flexDirection: "column",
        marginRight: "7px",
        color: !isValid ? "" : "red",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        maxLength={typeInput === 1 ? 2 : 1}
        pattern={typeInput === 1 ? "[0-9]*" : "[A-Za-z]*"}
        style={{ border: !isValid ? "" : "1px solid red" }}
        disabled={!modeEdit}
      />

      {isValid && (
        <span style={{ color: !isValid ? "" : "red", position: "absolute" }}>
          X
        </span>
      )}
    </div>
  );
};

const Medicament = ({ val, validation, dispatch, img }) => {
  const { t } = useTranslation();
  return (
    <div className={style.medicament}>
      <div className={style.medicament_block1}>
        <img className={style.medicament_img} src={img} />
      </div>
      <div className={style.medicament_block2}>
        <div className={style.medicament_block2_container}>
          <h2 className="m-0">{t(`pvgame.day8.part1.${val.title}`)}</h2>
          <div className={style.medicament_block_inputs}>
            <InputMedicament
              typeInput={2}
              idMed={val.id}
              validate={validation}
              index={0}
              dispatch={dispatch}
            />
            <InputMedicament
              typeInput={1}
              idMed={val.id}
              validate={validation}
              index={1}
              dispatch={dispatch}
            />
            <InputMedicament
              typeInput={2}
              idMed={val.id}
              validate={validation}
              index={2}
              dispatch={dispatch}
            />
            <InputMedicament
              typeInput={2}
              idMed={val.id}
              validate={validation}
              index={3}
              dispatch={dispatch}
            />
            <InputMedicament
              typeInput={1}
              idMed={val.id}
              validate={validation}
              index={4}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Main = ({ validation, onValidate }) => {
  const [medicaments, dispatch] = useMedicament();

  return (
    <div className={style.main_day8}>
      {medicaments.dataMedicaments?.map((val, index) => {
        return (
          <div key={index} className={style["item_block" + (index + 1)]}>
            <Medicament
              img={val.img}
              val={val}
              validation={medicaments.validateDataMedicaments}
              dispatch={dispatch}
            />
          </div>
        );
      })}
    </div>
  );
};

const SelectEffet = ({
  title,
  onChange = () => null,
  data,
  validate,
  dispatch,
  type,
  idEffect,
  val,
}) => {
  const [state, setstate] = useState(null);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const center = useSelector((state) => state.PvGame.center);
  const [modeEdit, setModeEdit] = useState(true);
  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 8);

    if (currentDay.status === 1) {
      setModeEdit(false);
    }
  }, []);
  useEffect(() => {
    if (validate) {
      if (state === null) setError(true);
      else setError(false);
    }
  }, [validate, state]);

  useEffect(() => {
    setstate(val);
  }, [val]);

  useEffect(() => {
    if (state !== null) {
      dispatch({
        type: "SET_SELECT",
        payload: { value: state, type, idEffect },
      });
    }
  }, [state]);

  return (
    <>
      <p className={style.effet_subTitle}>{title}</p>
      <Select
        data={modeEdit ? data : []}
        onChange={setstate}
        value={
          state
            ? { value: state, label: t(`pvgame.day8.part2.${state}`) }
            : null
        }
      />
      {error && <span style={{ color: "red" }}>X</span>}
    </>
  );
};

const Effet = ({ val, dispatch, validateData }) => {
  const [SelectPT, setSelectPT] = useState(null);
  const [SelectSOC, setSelectSOC] = useState(null);

  const [options_soc, setOptionsSoc] = useState([]);
  const [options_pt, setOptionsPt] = useState([]);

  const { t } = useTranslation();

  // let pt = [412, 414, 416, 418, 420, 422, 424, 426, 428].sort(
  //   () => Math.random() - 0.5
  // );
  // let soc = [413, 415, 417, 421, 425, 427].sort(() => Math.random() - 0.5);

  useEffect(() => {
    let pt = [];
    let soc = [];

    switch (val.title) {
      case "augmentation":
        pt = ["pt_1", "pt_2", 412].sort(() => Math.random() - 0.5);
        soc = ["soc_1", "soc_2", 413].sort(() => Math.random() - 0.5);
        break;
      case "metrorragies":
        pt = ["pt_3", "pt_4", 414].sort(() => Math.random() - 0.5);
        soc = ["soc_3", "soc_4", 415].sort(() => Math.random() - 0.5);
        break;
      case "vomissements":
        pt = ["pt_5", "pt_6", 416].sort(() => Math.random() - 0.5);
        soc = ["soc_5", "soc_6", 417].sort(() => Math.random() - 0.5);
        break;
      case "douleurs":
        pt = ["pt_7", "pt_8", 418].sort(() => Math.random() - 0.5);
        soc = ["soc_7", "soc_8", 417].sort(() => Math.random() - 0.5);
        break;
      case "choc":
        pt = ["pt_9", "pt_10", 420].sort(() => Math.random() - 0.5);
        soc = ["soc_9", "soc_10", 421].sort(() => Math.random() - 0.5);
        break;
      case "eruption":
        pt = ["pt_11", "pt_12", 422].sort(() => Math.random() - 0.5);
        soc = ["soc_11", "soc_12", 425].sort(() => Math.random() - 0.5);
        break;
      case "cheilite":
        pt = ["pt_13", "pt_14", 424].sort(() => Math.random() - 0.5);
        soc = ["soc_13", "soc_14", 425].sort(() => Math.random() - 0.5);
        break;
      case "poly":
        pt = ["pt_15", "pt_16", 426].sort(() => Math.random() - 0.5);
        soc = ["soc_15", "soc_16", 427].sort(() => Math.random() - 0.5);
        break;
      case "syndrome":
        pt = ["pt_17", "pt_18", 428].sort(() => Math.random() - 0.5);
        soc = ["soc_17", "soc_18", 425].sort(() => Math.random() - 0.5);
        break;

      default:
        break;
    }
   //console.log('pt', pt, val)
    const option_pt = pt.map((elem) => {
      return { value: elem, label: t(`pvgame.day8.part2.${elem}`) };
    });

    const option_soc = soc.map((elem) => {
      return { value: elem, label: t(`pvgame.day8.part2.${elem}`) };
    });

    setOptionsSoc(option_soc);
    setOptionsPt(option_pt);
  }, [val]);

  return (
    <div className={style.effet_c}>
      <p className={style.effet_title}>{t(`pvgame.day8.part2.${val.title}`)}</p>
      <SelectEffet
        title="PT"
        type="pt"
        idEffect={val.id}
        data={options_pt}
        val={val.slectedPT}
        onChange={setSelectPT}
        validate={validateData}
        dispatch={dispatch}
      />
      <SelectEffet
        title="SOC"
        type="soc"
        idEffect={val.id}
        val={val.slectedSOC}
        data={options_soc}
        onChange={setSelectSOC}
        validate={validateData}
        dispatch={dispatch}
      />
    </div>
  );
};

const Step2 = () => {
  const [effets, dispatch] = useMedicament();

  return (
    <div className={style.step2_day8}>
      {effets.effetsIndesirables.map((val, index) => {
        return (
          <div key={index} className={style[`item_block${index + 1}`]}>
            <Effet
              val={val}
              dispatch={dispatch}
              validateData={effets.validateDataEffect}
            />
          </div>
        );
      })}
    </div>
  );
};
const Day8 = (props) => {
  const [Step, setStep] = useState(1);
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);
  const [validationStep1, setValidationStep1] = useState(false);
  const [goToStep1, setGoToStep1] = useState(false);
  const [lastStep, setLastStep] = useState(false);
  const { t } = useTranslation();
  const [textMsgBtn, setTextMsgBtn] = useState(
    t("modals.day3.startModal.btnText")
  );
  const contextValue = useReducer(reducer, initialState);
  const [data, dispatch] = contextValue;

  const { centerId } = useSelector((state) => state.PvGame.center);
  const { center } = useSelector((state) => state.PvGame);
  const [modeEdit, setModeEdit] = useState(true);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 8);

    if (currentDay.status === -1) {
      props.history.push("/pv-game/parcours");
    }

    if (currentDay.status === 1) {
      setModeEdit(false);
      getDetailsService(8, centerId).then((result) => {
        //console.log("result ************", result);
        dispatch({
          type: "GET_DETAIL_DATA",
          payload: { ...result.details },
        });
      });
    }
  }, []);
  const dispatchRedux = useDispatch();
  const steps = (next) => {
    //console.log("--------|data|---------", data);

    //console.log("--------|jsiwjsw|---------", JSON.stringify(data));
    dispatch({ type: "VALIDATE_DATA_MEDICAMENTS", payload: true });
    if (!data.isValidateDataMedicaments) return;

    switch (Step) {
      case 1:
        if (next) return setShow2(true);
        setShow2(false);
        setStep((prev) => prev + 1);
        setTextMsgBtn(t("modals.notee"));
        break;
      case 2:
        dispatch({ type: "VALIDATE_DATA_EFFECT", payload: true });
        if (!data.isValidateDataEffect) return;
        if (next) return setShow2(true);

        setShow2(false);
        if (modeEdit) {
          dispatchRedux(
            validDay8(centerId, data, () => {
              setShow(true);
              setLastStep(true);
            })
          );
        } else {
          props.history.push("/pv-game");
        }

        break;

      default:
        break;
    }
  };

  return (
    <>
      <Modal4
        show={show}
        reset={() => {
          setShow(false);
        }}
        valid={() => {
          setShow(false);

          lastStep && props.history.push("/pv-game");
        }}
        title={t("modals.day8.startModal.title")}
        text={t("modals.day8.startModal.text")}
        btnText={textMsgBtn}
      />
      <Modal4
        show={show2}
        reset={() => {
          setShow2(false);
        }}
        valid={() => {
          steps();
        }}
        title={t("modals.day8.confirmationModal.title")}
        text={t("modals.day8.confirmationModal.text")}
        btnDefText={t("modals.notyet")}
        btnText={t("pvgame.validChoice")}
        showTowBtn
      />
      <div className={style.container_day8}>
        <div className={style.item_header}>
          <Header {...props} t={t} />
        </div>
        <div className={style.item_sidebar}>
          <Sidebar etap={Step} t={t} />
        </div>
        <div className={style.item_main}>
          <MedicamentContext.Provider value={contextValue}>
            {Step === 1 ? (
              <Main
                validation={validationStep1}
                onValidate={setGoToStep1}
                t={t}
              />
            ) : (
              <Step2 t={t} />
            )}
          </MedicamentContext.Provider>
        </div>

        <div className={style.item_footer}>
          {modeEdit && (
            <button
              onClick={() => steps(true)}
              className="btn btn-primary waves-effect waves-light"
              type="submit"
            >
              {t("pvgame.validChoice")}
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          )}

          {!modeEdit && Step === 1 && (
            <button
              onClick={() => {
                if (Step === 1) {
                  setStep(2);
                }
              }}
              className="btn btn-primary waves-effect waves-light"
              type="submit"
            >
              {t("pvgame.day10.suivant")}
              <i className="fas fa-arrow-right ml-1"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Day8;

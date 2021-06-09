import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import badg44 from "../../../../../assets/images/StrategicGame/Mask Group 14.svg";
import MaskGroup144 from "../../../../../assets/images/StrategicGame/MaskGroup14.svg";
import Modal1 from "../../../../../components/modal/modal1/index";
import Img1 from "../../../../../assets/images/StrategicGame/fasset_2_2311.png";
import "./style.scss";
import { tr } from "date-fns/locale";
import { useHistory } from "react-router-dom";
import ModalMinisterValidation from "../../../../../components/modal/modalMinisterValidation";
import { useDispatch, useSelector } from "react-redux";
import {
  Day10getDetail,
  day10Validations,
  onChangePartOneDay10,
  onChangePartTwoDay10,
  resetPartTwoDay10,
} from "../../../../../redux/days/actions";
import { Button, Tooltip } from "reactstrap";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import Modalexpert from "../../../../../components/modal/modalexpert";
import {
  avatars,
  countries,
  getLogoById,
} from "../../../../../helpers/centerData";

import { useTranslation } from "react-i18next";
const SelectComite = ({ options = [], index, itemIndex, modeEdit }) => {
  const dispatch = useDispatch();

  const part1 = useSelector((state) => state.Days.day10.part1);

  const onChange = (event) => {
    dispatch(onChangePartOneDay10(event.value, index, itemIndex));
  };
  return (
    <div style={{ flex: "1", marginRight: "25px", maxWidth: "215px" }}>
      <Select
        options={modeEdit ? options.sort(() => Math.random() - 0.5) : []}
        id={+new Date()}
        defaultValue={options.find((o) => o.value === part1[index][itemIndex])}
        onChange={onChange}
      />
    </div>
  );
};

const Page = ({
  index = 0,
  c_index,
  List1,
  List2,
  List3,
  List4,
  List5,
  List6,
  List7,
  List8,
  List9,
  modeEdit,
}) => {
  const { t } = useTranslation();
  return (
    <section
      style={
        index !== c_index
          ? { opacity: "0", display: "none", visibility: "hidden" }
          : { display: "block", visibility: "visible", animation: "fade 1s " }
      }
    >
      <h4 className="text-center m-auto">{t(`pvgame.day10.title${index}`)}</h4>
      <div
        className="d-flex mt-4 "
        style={{
          width: index === 3 ? "80%" : "60%",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: index === 3 ? "flex-start" : "center",
        }}
      >
        {List1?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List1}
            index={index}
            itemIndex={1}
          />
        )}
        {List2?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List2}
            index={index}
            itemIndex={2}
          />
        )}
        {List3?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List3}
            index={index}
            itemIndex={3}
          />
        )}
        {List4?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List4}
            index={index}
            itemIndex={4}
          />
        )}
        {List9?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List9}
            index={index}
            itemIndex={9}
          />
        )}
      </div>
      <div
        className="d-flex   mt-4"
        style={{
          width: index === 3 ? "80%" : "60%",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: index === 1 ? "center" : "flex-start",
        }}
      >
        {List5?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List5}
            index={index}
            itemIndex={5}
          />
        )}
        {List6?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List6}
            index={index}
            itemIndex={6}
          />
        )}
        {List7?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List7}
            index={index}
            itemIndex={7}
          />
        )}
        {List8?.length > 0 && (
          <SelectComite
            modeEdit={modeEdit}
            options={List8}
            index={index}
            itemIndex={8}
          />
        )}
      </div>
    </section>
  );
};

const FacteurCategory = ({ title, items, currentIndex, axe, modeEdit }) => {
  return (
    <div className="facteur-cat-contanier">
      <div className="facteur-cat-header">{title}</div>
      <div className="facteur-cat-body">
        {items.map((item, index) => (
          <CheckedInput
            modeEdit={modeEdit}
            key={index}
            item={item}
            index={index + 1}
            currentIndex={currentIndex}
            axe={axe}
          />
        ))}
      </div>
    </div>
  );
};

const CheckedInput = (props) => {
  const { index, item, currentIndex, axe, modeEdit } = props;
  const [Checked, setChecked] = useState(true);
  const days = useSelector((state) => state.Days);

  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(days.day10.part2[currentIndex][axe][index]);
  }, [props, days]);

  return (
    <div className="checkbox checkbox-primary facteur-item" key={index}>
      <input
        id={"notions-checkbox" + index + item}
        type="checkbox"
        checked={Checked}
        onClick={() => {
          const responses = [
            days.day10.part2[currentIndex]["1"]["1"],
            days.day10.part2[currentIndex]["1"]["2"],

            days.day10.part2[currentIndex]["2"]["1"],
            days.day10.part2[currentIndex]["2"]["2"],
            days.day10.part2[currentIndex]["2"]["3"],

            days.day10.part2[currentIndex]["3"]["1"],
            days.day10.part2[currentIndex]["3"]["2"],
            days.day10.part2[currentIndex]["3"]["3"],

            days.day10.part2[currentIndex]["4"]["1"],
            days.day10.part2[currentIndex]["4"]["2"],
            days.day10.part2[currentIndex]["4"]["3"],

            days.day10.part2[currentIndex]["5"]["1"],
            days.day10.part2[currentIndex]["5"]["2"],
            days.day10.part2[currentIndex]["5"]["3"],

            days.day10.part2[currentIndex]["6"]["1"],
            days.day10.part2[currentIndex]["6"]["2"],

            days.day10.part2[currentIndex]["7"]["1"],
            days.day10.part2[currentIndex]["7"]["2"],

            days.day10.part2[currentIndex]["8"]["1"],
            days.day10.part2[currentIndex]["8"]["2"],
            days.day10.part2[currentIndex]["8"]["3"],

            days.day10.part2[currentIndex]["9"]["1"],
            days.day10.part2[currentIndex]["9"]["2"],
            days.day10.part2[currentIndex]["9"]["3"],

            days.day10.part2[currentIndex]["10"]["1"],
            days.day10.part2[currentIndex]["10"]["2"],
            days.day10.part2[currentIndex]["10"]["3"],
          ];
          const cas = currentIndex === 1 ? 9 : 7;
          const r = responses.filter((e) => e);

          if (r.length < cas || days.day10.part2[currentIndex][axe][index]) {
            dispatch(onChangePartTwoDay10(currentIndex, axe, index, !Checked));
            setChecked(!Checked);
          }
        }}
        disabled={!modeEdit}
      />
      <label htmlFor={"notions-checkbox" + index + item}>{item}</label>
    </div>
  );
};

const PartTwo = ({ title1, title2, currentIndex, modeEdit }) => {
  const [state, setState] = React.useState(true);
  const [init, setInit] = React.useState(null);

  const { t } = useTranslation();
  useEffect(() => {
    if (init !== null) {
      setState((state) => !state);
    }

    setInit(1);
  }, [title1, title2]);

  return (
    <CSSTransition
      in={state}
      timeout={300}
      classNames="alert"
      unmountOnExit
      // onEnter={() => setShowButton(false)}
      onExited={() => setState((state) => !state)}
    >
      <div>
        <div className="facteur-top-container">
          <div className="grid-1-top">
            <div className="absF-top-0">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={1}
                title={t(`pvgame.day10.Activite`)}
                items={[
                  t(`pvgame.day10.effet_principal`),
                  t(`pvgame.day10.effet_lateral`),
                ]}
              />
            </div>
          </div>

          <div className="grid-2-top">
            <div className="absF-top-1">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={2}
                title={t(`pvgame.day10.Qualite`)}
                items={[
                  t(`pvgame.day10.matiere_prem`),
                  t(`pvgame.day10.generiques_bios`),
                  t(`pvgame.day10.contrefacon`),
                ]}
              />
            </div>
          </div>
          <div className="grid-2-top">
            <div className="absF-top-2">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={3}
                title={t(`pvgame.day10.Patient`)}
                items={[
                  t(`pvgame.day10.niveau_socio_eco`),
                  t(`pvgame.day10.terrain`),
                  t(`pvgame.day10.facteurs_risque`),
                ]}
              />
            </div>
          </div>
          <div className="grid-2-top">
            <div className="absF-top-3">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={4}
                title={t(`pvgame.day10.Professionnels_sante`)}
                items={
                  // currentIndex === 1
                  //   ?
                  [
                    t(`pvgame.day10.formation`),
                    t(`pvgame.day10.respect_regle_prescription`),
                    t(`pvgame.day10.charge_travail`),
                  ]
                  // : [
                  //     t(`pvgame.day10.implication`),
                  //     t(`pvgame.day10.respect_regle_prescription`),
                  //     t(`pvgame.day10.charge_travail`),
                  //   ]
                }
              />
            </div>
          </div>
          <div className="grid-2-top">
            <div className="absF-top-4">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={5}
                title={t(`pvgame.day10.Evaluation_risque`)}
                items={
                  currentIndex === 0
                    ? [
                        t(`pvgame.day10.etudes_pre_post_AMM`),
                        t(`pvgame.day10.sur_consommation`),
                        t(`pvgame.day10.pharmaco_epidemiologie`),
                      ]
                    : currentIndex === 1
                    ? [
                        t(`pvgame.day10.modalites_AMM`),
                        t(`pvgame.day10.sur_consommation`),
                        t(`pvgame.day10.notification_spontanees`),
                      ]
                    : [
                        t(`pvgame.day10.etudes_pre_post_AMM`),
                        t(`pvgame.day10.pharmaco_epidemiologie`),
                        t(`pvgame.day10.notification_spontanees`),
                      ]
                }
              />
            </div>
          </div>
          <div className="grid-3-top"></div>
        </div>
        <div className="facteur-middle-container">
          <div className="title1">{t(`pvgame.day10.${title1}`)}</div>
          <div className="title1">{t(`pvgame.day10.${title2}`)}</div>
        </div>

        <div className="facteur-bottom-container">
          <div className="grid-1-bottom">
            <div className="absF-bottom-0">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={6}
                title={t(`pvgame.day10.Effet_immunogene`)}
                items={[
                  t(`pvgame.day10.pouvoir_allergene`),
                  t(`pvgame.day10.immunisation_prealable`),
                ]}
              />
            </div>
          </div>
          <div className="grid-2-bottom">
            <div className="absF-bottom-1">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={7}
                title={t(`pvgame.day10.Distribution_Stockage`)}
                items={[
                  t(`pvgame.day10.hors_circuit`),
                  t(`pvgame.day10.circuit_conventionnel`),
                ]}
              />
            </div>
          </div>
          <div className="grid-2-bottom">
            <div className="absF-bottom-2">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={8}
                title={t(`pvgame.day10.Modalites_utilisation`)}
                items={
                  currentIndex === 0
                    ? [
                        t(`pvgame.day10.surdosage`),
                        t(`pvgame.day10.pharmaco_dependance`),
                        t(`pvgame.day10.mesusage`),
                      ]
                    : currentIndex === 1
                    ? [
                        t(`pvgame.day10.surdosage`),
                        t(`pvgame.day10.erreur_medicamenteuse`),
                        t(`pvgame.day10.mesusage`),
                      ]
                    : [
                        t(`pvgame.day10.pharmaco_dependance`),
                        t(`pvgame.day10.erreur_medicamenteuse`),
                        t(`pvgame.day10.mesusage`),
                      ]
                }
              />
            </div>
          </div>
          <div className="grid-2-bottom">
            <div className="absF-bottom-3">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={9}
                title={t(`pvgame.day10.Systeme_sante`)}
                items={[
                  t(`pvgame.day10.reglementation`),
                  t(`pvgame.day10.procedures_protocoles`),
                  t(`pvgame.day10.organisation`),
                ]}
              />
            </div>
          </div>
          <div className="grid-2-bottom">
            <div className="absF-bottom-4">
              <FacteurCategory
                modeEdit={modeEdit}
                currentIndex={currentIndex + 1}
                axe={10}
                title={t(`pvgame.day10.Gestion_risque`)}
                items={
                  currentIndex === 0
                    ? [
                        t(`pvgame.day10.mediatisation`),
                        t(`pvgame.day10.information`),
                        t(`pvgame.day10.transparence`),
                      ]
                    : currentIndex === 1
                    ? [
                        t(`pvgame.day10.mediatisation`),
                        t(`pvgame.day10.plan_minimisation_risque`),
                        t(`pvgame.day10.prise_decision`),
                      ]
                    : [
                        t(`pvgame.day10.transparence`),
                        t(`pvgame.day10.information`),
                        t(`pvgame.day10.prise_decision`),
                      ]
                }
              />
            </div>
          </div>
          <div className="grid-3-bottom"></div>
        </div>
      </div>
    </CSSTransition>
  );
};

const Day10 = (props) => {
  const [showM, setShowM] = useState(true);
  const [showMValidation, setShowMValidation] = useState(false);
  const [index, setIndex] = useState(1);
  const [part, setPart] = useState(1);
  const [showQuizContenet, setShowQuizContenet] = useState(true);
  const [showTermin, setShowTermin] = useState(false);
  const [modeEdit, setModeEdit] = useState(true);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [stp_, setStp] = useState(1);

  const [activeTab, setActiveTab] = useState("1");
  const [currentData, setCurrentData] = useState(data[0]);

  const [tooltipOpen1, setTooltipOpen1] = useState(false);
  const history = useHistory();
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const center = useSelector((state) => state.PvGame.center);
  const day10 = useSelector((state) => state.Days.day10);

  useEffect(() => {
    const currentDay = center.days.find((d) => d.dayId === 10);
    if (currentDay.status === -1) {
      props.history.push("/pv-game/parcours");
    }
    if (currentDay.status === 1) {
      setModeEdit(false);
      dispatch(Day10getDetail(center.centerId));
    }
  }, []);

  const artotecSelectOption = [
    { value: 639, label: t(`pvgame.day10.639`) },
    { value: 640, label: t(`pvgame.day10.640`) },
    { value: 641, label: t(`pvgame.day10.641`) },
    { value: 642, label: t(`pvgame.day10.642`) },
    { value: 643, label: t(`pvgame.day10.643`) },
    { value: 644, label: t(`pvgame.day10.644`) },
    { value: 645, label: t(`pvgame.day10.645`) },
    { value: 646, label: t(`pvgame.day10.646`) },
    { value: 647, label: t(`pvgame.day10.647`) },
    { value: 648, label: t(`pvgame.day10.648`) },
    { value: 649, label: t(`pvgame.day10.649`) },
    { value: 650, label: t(`pvgame.day10.650`) },
  ];
  const zyloricSelectOption = [
    { value: 651, label: t(`pvgame.day10.651`) },
    { value: 652, label: t(`pvgame.day10.652`) },
    { value: 653, label: t(`pvgame.day10.653`) },
    { value: 654, label: t(`pvgame.day10.654`) },
    { value: 655, label: t(`pvgame.day10.655`) },
    { value: 656, label: t(`pvgame.day10.656`) },
    { value: 657, label: t(`pvgame.day10.657`) },
    { value: 658, label: t(`pvgame.day10.658`) },
    { value: 659, label: t(`pvgame.day10.659`) },
    { value: 660, label: t(`pvgame.day10.660`) },
    { value: 661, label: t(`pvgame.day10.661`) },
    { value: 662, label: t(`pvgame.day10.662`) },
    { value: 663, label: t(`pvgame.day10.663`) },
  ];
  const ferSelectOption = [
    { value: 664, label: t(`pvgame.day10.664`) },
    { value: 665, label: t(`pvgame.day10.665`) },
    { value: 666, label: t(`pvgame.day10.666`) },
    { value: 667, label: t(`pvgame.day10.667`) },
    { value: 668, label: t(`pvgame.day10.668`) },
    { value: 669, label: t(`pvgame.day10.669`) },
    { value: 670, label: t(`pvgame.day10.670`) },
    { value: 671, label: t(`pvgame.day10.671`) },
    { value: 672, label: t(`pvgame.day10.672`) },
    { value: 673, label: t(`pvgame.day10.673`) },
    { value: 674, label: t(`pvgame.day10.674`) },
    { value: 675, label: t(`pvgame.day10.675`) },
    { value: 676, label: t(`pvgame.day10.676`) },
    { value: 677, label: t(`pvgame.day10.677`) },
    { value: 678, label: t(`pvgame.day10.678`) },
    { value: 679, label: t(`pvgame.day10.679`) },
  ];
  const toggle1 = () => setTooltipOpen1(!tooltipOpen1);
  return (
    <>
      <Modalexpert
        show={showTermin}
        history={props.history}
        close={() => null}
        text={t("modals.day10.expert.text")}
      />

      <div
        className="container-day10"
        style={
          part === 2
            ? {
                height: "auto",
                minHeight: "auto",
              }
            : {}
        }
      >
        <ModalMinisterValidation
          show={showMValidation}
          close={() => {
            if (part === 2) {
              if (modeEdit) {
                dispatch(
                  day10Validations(center.centerId, day10, () => {
                    setShowTermin(true);
                    setShowMValidation(false);
                  })
                );
              } else {
                setShowTermin(true);
                setShowMValidation(false);
              }
            } else {
              setShowMValidation(false);
              setPart(2);
            }
          }}
          title={t(`pvgame.day10.ModalMinisterValidationTitle`)}
          text={t(`pvgame.day10.ModalMinisterValidationText`)}
          btnText={t(`pvgame.day10.ModalMinisterValidationBtnText`)}
          cancelBtnText={t(`pvgame.day10.ModalMinisterValidationCancelBtnText`)}
          cancel={() => {
            setShowMValidation(false);
          }}
        />
        <Modal1
          show={showM}
          close={() => setShowM(false)}
          title={t(`pvgame.day10.Modal1Title`)}
          text={t(`pvgame.day10.Modal1Text`)}
          btnText={t(`pvgame.day10.Modal1BtnText`)}
        />

        <div
          className="box box-2"
          style={
            part === 2
              ? {
                  height: 200,
                }
              : {}
          }
        >
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

            <div className="cat-ad" onClick={() => null}>
              <button
                type="reset"
                onClick={() => history.push("/pv-game/parcours")}
                className="btn btn-secondary waves-effect waves-light mr-2"
              >
                {t(`pvgame.day10.quitter`)}
                <i className="fas fa-running ml-1"></i>
              </button>
            </div>
          </div>
          <div className="box-2-2 pt-0 pb-0">
            <h3>{t(`pvgame.day10.title`)} </h3>
            <p style={{ width: `${stp_ === 2 ? "598px" : ""}` }}>
              {part === 1 && t(`pvgame.day10.titlePart1`)}
              {part === 2 && t(`pvgame.day10.titlePart2`)}
            </p>
            <p style={{ width: `${stp_ === 2 ? "598px" : ""}` }}>
              {part === 2 && t(`pvgame.day10.titlePart22`)}
            </p>
          </div>
          <div
            className="box-2-2 pt-0 pb-0"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: 14,
                font: "normal normal normal 14px/17px Karla",
                marginRight: 10,
              }}
            >
              {t(`pvgame.day10.subTitle`)}
            </p>{" "}
            <a
              className="dw-pdf"
              href="http://www.nowedge.io/bg/ressources/Aide_Signaux.pdf"
              style={{
                textAlign: "left",
                font: "normal normal bold 25px/29px Karla",
                letterSpacing: "0.5px",
                color: "#3f4351",
                opacity: 1,
                marginBottom: " 4px",
                marginTop: "4px",
              }}
              target="_blank"
            >
              {" "}
              {t(`pvgame.day10.titlePDF`)}
            </a>
          </div>

          {part === 1 && (
            <div
              className="box-2-3"
              style={{
                paddingLeft: "40px",
                paddingRight: "40px",
                height: "70vh",
              }}
            >
              <div className="wizard" style={{ marginTop: "20px" }}>
                <header>
                  <div className={`${index === 1 ? "activeIndex" : ""}`}>
                    {t(`pvgame.day10.Artotec_Hemorragie_uterine`)}
                  </div>
                  <div className={`${index === 2 ? "activeIndex" : ""}`}>
                    {t(`pvgame.day10.Zyloric_DRESS_syndrome`)}
                  </div>
                  <div className={`${index === 3 ? "activeIndex" : ""}`}>
                    {t(`pvgame.day10.Fer_injectable_Reaction_anaphylactique`)}
                  </div>
                </header>

                <div className="mt-3">
                  <Page
                    modeEdit={modeEdit}
                    index={1}
                    c_index={index}
                    List1={artotecSelectOption}
                    List2={artotecSelectOption}
                    List3={artotecSelectOption}
                    List5={artotecSelectOption}
                    List6={artotecSelectOption}
                    List7={artotecSelectOption}
                  />

                  <Page
                    modeEdit={modeEdit}
                    index={2}
                    c_index={index}
                    List1={zyloricSelectOption}
                    List2={zyloricSelectOption}
                    List3={zyloricSelectOption}
                    List4={zyloricSelectOption}
                    List5={zyloricSelectOption}
                    List6={zyloricSelectOption}
                    List7={zyloricSelectOption}
                  />

                  <Page
                    modeEdit={modeEdit}
                    index={3}
                    c_index={index}
                    List1={ferSelectOption}
                    List2={ferSelectOption}
                    List3={ferSelectOption}
                    List4={ferSelectOption}
                    List5={ferSelectOption}
                    List6={ferSelectOption}
                    List7={ferSelectOption}
                    List8={ferSelectOption}
                    List9={ferSelectOption}
                  />
                </div>

                <div className="footer-wiz" style={{ zIndex: 0 }}>
                  <button
                    onClick={() => {
                      if (index > 1) setIndex((prv) => prv - 1);
                    }}
                    type="button"
                    className="btn btn-secondary waves-effect width-md"
                  >
                    {t(`pvgame.day10.Precedent`)}
                  </button>
                  <button
                    onClick={() => {
                      if (index < 3) setIndex((prv) => prv + 1);
                      else if (index === 3 && modeEdit)
                        setShowMValidation(true);
                      else {
                        setPart(2);
                      }
                    }}
                    type="button"
                    className="btn btn-primary waves-effect width-md"
                  >
                    {index === 3
                      ? t(`pvgame.day10.validerChoix`)
                      : t(`pvgame.day10.suivant`)}
                  </button>
                </div>
                <img src={Img1} alt="" />
              </div>
            </div>
          )}
        </div>
      </div>

      {part === 2 && (
        <>
          <div className="part-two-title">
            {t(`pvgame.day10.${currentData?.titleGlobal}`)}{" "}
            {currentData?.titleGlobal === "Artotec_Hemorragie_uterine"
              ?  t(`pvgame.day10.9cas`)
              :  t(`pvgame.day10.7cas`)
            }
          </div>
          <div
            className="box-2-3"
            style={{
              marginLeft: "28px",
              marginRight: "28px",
              height: "30rem",
              flexDirection: "column",
              marginTop: 5,
            }}
          >
            <PartTwo
              modeEdit={modeEdit}
              title1={currentData?.title1}
              title2={currentData?.title2}
              currentIndex={currentData?.currentIndex}
            />
          </div>
          <div
            style={{
              marginLeft: 40,
              marginRight: 40,
              marginBottom: 20,
              height: 40,
              display: "flex",
              flexDirection: "row",
              justifyContent:
                currentData.currentIndex === 0 ? "flex-end" : "space-between",
            }}
          >
            {currentData.currentIndex !== 0 && (
              <button
                style={{
                  width: 115,
                }}
                onClick={() => {
                  if (
                    currentData.currentIndex > 0 &&
                    currentData.currentIndex <= 2
                  ) {
                    setCurrentData(data[currentData.currentIndex - 1]);
                    setShowQuizContenet(!showQuizContenet);
                  }
                }}
                type="button"
                className="btn btn-secondary waves-effect width-md"
              >
                {t(`pvgame.day10.Precedent`)}
              </button>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {modeEdit && (
                <button
                  id="resett"
                  type="reset"
                  onClick={() => {
                    dispatch(resetPartTwoDay10(currentData.currentIndex + 1));
                  }}
                  className="btn btn-secondary waves-effect waves-light mr-2"
                  style={{
                    width: 50,
                    marginRight: 10,
                  }}
                >
                  <Tooltip
                    placement="top"
                    isOpen={tooltipOpen1}
                    target="resett"
                    toggle={toggle1}
                  >
                    {t(`pvgame.day10.reset`)}
                  </Tooltip>
                  <i className="fas fa-undo-alt"></i>
                </button>
              )}
              {modeEdit && (
                <button
                  style={{
                    backgroundColor: "#71B6F9",
                    borderColor: "#71B6F9",
                  }}
                  onClick={() => {
                    if (
                      currentData.currentIndex >= 0 &&
                      currentData.currentIndex < 2
                    ) {
                      setCurrentData(data[currentData.currentIndex + 1]);
                      setShowQuizContenet(!showQuizContenet);
                    }

                    if (currentData.currentIndex === 2) {
                      setShowMValidation(true);
                    }
                  }}
                  type="button"
                  className="btn btn-secondary waves-effect width-md"
                >
                  {currentData.currentIndex === 2
                    ? t(`pvgame.day10.validerChoix`)
                    : t(`pvgame.day10.suivant`)}
                  <i className=" fas fa-arrow-right ml-1"></i>
                </button>
              )}
              {!modeEdit && currentData.currentIndex !== 2 && (
                <button
                  style={{
                    backgroundColor: "#71B6F9",
                    borderColor: "#71B6F9",
                  }}
                  onClick={() => {
                    if (
                      currentData.currentIndex >= 0 &&
                      currentData.currentIndex < 2
                    ) {
                      setCurrentData(data[currentData.currentIndex + 1]);
                      setShowQuizContenet(!showQuizContenet);
                    }

                    if (currentData.currentIndex === 2) {
                      setShowMValidation(true);
                    }
                  }}
                  type="button"
                  className="btn btn-secondary waves-effect width-md"
                >
                  {currentData.currentIndex === 2
                    ? t(`pvgame.day10.validerChoix`)
                    : t(`pvgame.day10.suivant`)}
                  <i className=" fas fa-arrow-right ml-1"></i>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const data = [
  {
    currentIndex: 0,
    titleGlobal: "Artotec_Hemorragie_uterine",

    title1: "Artotec",
    title2: "Hemorragie_uterine",
  },
  {
    currentIndex: 1,
    titleGlobal: "Zyloric_DRESS_syndrome",

    title1: "Zyloric",
    title2: "DRESS_syndrome",
  },
  {
    currentIndex: 2,
    titleGlobal: "Fer_injectable_Reaction_anaphylactique",

    title1: "Fer_injectable",
    title2: "Reaction_anaphylactique",
  },
];
export default Day10;

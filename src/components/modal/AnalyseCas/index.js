import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { onChangeCasValue, validCas } from "../../../redux/days/actions";
import SwalModal from "../../SwalModal";

import "./style.scss";

const ItemSelect = (props) => {
  // const [, ] = useState(-1);
  const {
    _idCas,
    _idLevel,
    title,
    response,
    options = [],
    isValid,
    axe,
    dispatch,
  } = props;

  const [selectValue, setSelect] = useState(
    options.find((o) => o.value === response)
  );

  useEffect(() => {
    // //console.log("props *****************************************", props);
    setSelect(options.find((o) => o.value === response));
  }, [props]);

  return (
    <div className="mr-2" style={{ flex: "1" }}>
      <span className="icon">{title}</span>

      {isValid === -1 ? (
        <Select
          options={options}
          defaultValue={selectValue}
          value={selectValue}
          onChange={(ev) => {
            dispatch(onChangeCasValue(ev.value, axe, _idCas, _idLevel));
            setSelect(ev);
          }}
        />
      ) : isValid === 1 ? (
        <h4 className="valid-chose">{selectValue?.label}</h4>
      ) : (
        <h4 className="not-valid-chose">{selectValue?.label}</h4>
      )}
    </div>
  );
};

const AnalyseCas = ({ _idLevel, cas, index, show, close = () => null, t }) => {
  const [validateChios, setValidateChios] = useState(false);
  const [IsValid, setIsValid] = useState(false);
  const [currentCas, setCurrentCas] = useState({});

  const levels = useSelector((state) => state.Days.day7.levels);

  const dispatch = useDispatch();
  useEffect(() => {
    const currentLevel = levels.find((l) => l._id === _idLevel);
    const searchCas = currentLevel.cas.find((c) => c._id === cas._id);
    setCurrentCas(searchCas);

    // //console.log("searchCas +++++++++++++++++", searchCas);
    if (searchCas.isValid === -1) setValidateChios(false);
    else {
      setValidateChios(true);
      if (searchCas.isValid === 0) setIsValid(false);
      else setIsValid(true);
    }
  }, [levels]);

  useEffect(() => {
    // //console.log("currentCas +++++++++++++++++", currentCas);
    if (currentCas.isValid === -1) setValidateChios(false);
    else {
      setValidateChios(true);
      if (currentCas.isValid === 0) setIsValid(false);
      else setIsValid(true);
    }
  }, [currentCas]);

  const init = () => {
    setIsValid(false);
    setValidateChios(false);
  };

  return (
    <Modal show={show} dialogClassName={"daysModal"} centered>
      <Modal.Body style={{ minWidth: "100%", backgroundColor: "transparent" }}>
        <div className={"dayOneModalPV"}>
          <div className="title">
            {t("pvgame.day7.notification")} {index}
          </div>
          <div className="mt-3 mb-3">
            <ul
              style={{
                paddingInlineStart: 0,
              }}
            >
              {cas.content.map((c) => (
                <>
                  <i
                    className="fas fa-check"
                    style={{
                      fontSize: 8,
                      color: "#71B6F9",
                      paddingRight: "1rem",
                    }}
                  ></i>
                  <li> {t(`pvgame.day7.${c}`)}</li> <br />
                </>
              ))}
            </ul>
            {currentCas.isComplicated && (
              <h4> {t(`pvgame.day7.${currentCas.medic1}`)} </h4>
            )}
            <div className="d-flex flex-column">
              <div className="d-flex " style={{ flex: "1" }}>
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.classificationEIM?.response}
                  isValid={currentCas.classificationEIM?.isValid}
                  axe={"classificationEIM"}
                  title={t("pvgame.day7.EIM")}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  options={[
                    { value: "A", label: t("pvgame.day7.Augmented") },
                    { value: "B", label: t("pvgame.day7.Bizarre") },
                    { value: "C", label: t("pvgame.day7.Chronic") },
                    { value: "D", label: t("pvgame.day7.Delayed") },
                    { value: "E ", label: t("pvgame.day7.End_of_use") },
                    { value: "F", label: t("pvgame.day7.Failure") },
                    { value: "G", label: t("pvgame.day7.Genetic") },
                    { value: "", label: "N/A" },
                  ]}
                />
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.delai?.response}
                  isValid={currentCas.delai?.isValid}
                  axe={"delai"}
                  title={t("pvgame.day7.delai")}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  options={[
                    { value: "suggestif", label: t("pvgame.day7.Suggestif") },
                    { value: "compatible", label: t("pvgame.day7.Compatible") },
                    {
                      value: "incompatible",
                      label: t("pvgame.day7.Incompatible"),
                    },
                    { value: "", label: "N/A" },
                  ]}
                />
              </div>

              <div className="d-flex mt-2" style={{ flex: "1" }}>
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.evolution?.response}
                  isValid={currentCas.evolution?.isValid}
                  axe={"evolution"}
                  title={t("pvgame.day7.Evolution")}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  options={[
                    { value: "suggestive", label: t("pvgame.day7.Suggestive") },
                    {
                      value: "non_concluante",
                      label: t("pvgame.day7.Non_concluante"),
                    },
                    {
                      value: "non_suggestive",
                      label: t("pvgame.day7.Non_suggestive"),
                    },
                    { value: "", label: "N/A" },
                  ]}
                />
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.rechallenge?.response}
                  isValid={currentCas.rechallenge?.isValid}
                  axe={"rechallenge"}
                  title={t("pvgame.day7.Rechallenge")}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  options={[
                    { value: "R+", label: t("pvgame.day7.R+") },
                    { value: "R0", label: t("pvgame.day7.R0") },
                    { value: "R-", label: t("pvgame.day7.R-") },
                    { value: "", label: "N/A" },
                  ]}
                />
              </div>
              <div className="d-flex mt-2" style={{ flex: "1" }}>
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.evocateurRole?.response}
                  isValid={currentCas.evocateurRole?.isValid}
                  axe={"evocateurRole"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Evocateur")}
                  options={[
                    { value: "oui", label: t("modals.yes") },
                    { value: "non", label: t("modals.no") },
                    { value: "", label: "N/A" },
                  ]}
                />
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.facteursFav?.response}
                  isValid={currentCas.facteursFav?.isValid}
                  axe={"facteursFav"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Facteurs_favorisants")}
                  options={[
                    { value: "oui", label: t("modals.yes") },
                    { value: "non", label: t("modals.no") },
                    { value: "", label: "N/A" },
                  ]}
                />
              </div>
              <div className="d-flex mt-2" style={{ flex: "1" }}>
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.autresEtiologies?.response}
                  isValid={currentCas.autresEtiologies?.isValid}
                  axe={"autresEtiologies"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Autres_etiologies")}
                  options={[
                    {
                      value: "absentes_apres_bilan_appropries",
                      label: t("pvgame.day7.absentes_apres_bilan_appropries"),
                    },
                    {
                      value: "non_recherchees",
                      label: t("pvgame.day7.Non_recherchees"),
                    },
                    { value: "presentes", label: t("pvgame.day7.Presentes") },
                    { value: "", label: "N/A" },
                  ]}
                />
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.testSpecifiques?.response}
                  isValid={currentCas.testSpecifiques?.isValid}
                  axe={"testSpecifiques"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Test_specifiques")}
                  options={[
                    { value: "L+", label: t("pvgame.day7.L+") },
                    { value: "L0", label: t("pvgame.day7.L0") },
                    { value: "L-", label: t("pvgame.day7.L-") },
                    { value: "", label: "N/A" },
                  ]}
                />
              </div>
              <div className="d-flex mt-2" style={{ flex: "1" }}>
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.scoreBiblio?.response}
                  isValid={currentCas.scoreBiblio?.isValid}
                  axe={"scoreBiblio"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Score_bibliographique")}
                  options={[
                    { value: "B4", label: t("pvgame.day7.B4") },
                    { value: "B3", label: t("pvgame.day7.B3") },
                    { value: "B2", label: t("pvgame.day7.B2") },
                    { value: "B1", label: t("pvgame.day7.B1") },
                    { value: "B0", label: t("pvgame.day7.B0") },
                    { value: "", label: "N/A" },
                  ]}
                />
                <ItemSelect
                  dispatch={dispatch}
                  response={currentCas.inputOMS?.response}
                  isValid={currentCas.inputOMS?.isValid}
                  axe={"inputOMS"}
                  _idCas={currentCas._id}
                  _idLevel={_idLevel}
                  title={t("pvgame.day7.Input_OMS")}
                  options={[
                    { value: "certain", label: t("pvgame.day7.Certain") },
                    { value: "probable", label: t("pvgame.day7.Probable") },
                    { value: "possible", label: t("pvgame.day7.Possible") },
                    { value: "improbable", label: t("pvgame.day7.Improbable") },
                    {
                      value: "conditionnel",
                      label: t("pvgame.day7.Conditionnel"),
                    },
                    {
                      value: "non_evaluable",
                      label: t("pvgame.day7.Non_evaluable"),
                    },
                    { value: "", label: "N/A" },
                  ]}
                />
              </div>
            </div>

            {currentCas.isComplicated && (
              <h4>{t(`pvgame.day7.${currentCas.medic2}`)} </h4>
            )}
            {currentCas.isComplicated && (
              <div className="d-flex flex-column">
                <div className="d-flex " style={{ flex: "1" }}>
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.classificationEIM2?.response}
                    isValid={currentCas.classificationEIM2?.isValid}
                    axe={"classificationEIM2"}
                    title={t("pvgame.day7.EIM")}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    options={[
                      { value: "A", label: t("pvgame.day7.Augmented") },
                      { value: "B", label: t("pvgame.day7.Bizarre") },
                      { value: "C", label: t("pvgame.day7.Chronic") },
                      { value: "D", label: t("pvgame.day7.Delayed") },
                      { value: "E ", label: t("pvgame.day7.End_of_use") },
                      { value: "F", label: t("pvgame.day7.Failure") },
                      { value: "G", label: t("pvgame.day7.Genetic") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.delai2?.response}
                    isValid={currentCas.delai2?.isValid}
                    axe={"delai2"}
                    title={t("pvgame.day7.delai")}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    options={[
                      { value: "suggestif", label: t("pvgame.day7.Suggestif") },
                      {
                        value: "compatible",
                        label: t("pvgame.day7.Compatible"),
                      },
                      {
                        value: "incompatible",
                        label: t("pvgame.day7.Incompatible"),
                      },
                      { value: "", label: "N/A" },
                    ]}
                  />
                </div>

                <div className="d-flex mt-2" style={{ flex: "1" }}>
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.evolution2?.response}
                    isValid={currentCas.evolution2?.isValid}
                    axe={"evolution2"}
                    title={t("pvgame.day7.Evolution")}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    options={[
                      {
                        value: "suggestive",
                        label: t("pvgame.day7.Suggestive"),
                      },
                      {
                        value: "non_concluante",
                        label: t("pvgame.day7.Non_concluante"),
                      },
                      {
                        value: "non_suggestive",
                        label: t("pvgame.day7.Non_suggestive"),
                      },
                      { value: "", label: "N/A" },
                    ]}
                  />
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.rechallenge2?.response}
                    isValid={currentCas.rechallenge2?.isValid}
                    axe={"rechallenge2"}
                    title={t("pvgame.day7.Rechallenge")}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    options={[
                      { value: "R+", label: t("pvgame.day7.R+") },
                      { value: "R0", label: t("pvgame.day7.R0") },
                      { value: "R-", label: t("pvgame.day7.R-") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                </div>
                <div className="d-flex mt-2" style={{ flex: "1" }}>
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.evocateurRole2?.response}
                    isValid={currentCas.evocateurRole2?.isValid}
                    axe={"evocateurRole2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Evocateur")}
                    options={[
                      { value: "oui", label: t("modals.yes") },
                      { value: "non", label: t("modals.no") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.facteursFav2?.response}
                    isValid={currentCas.facteursFav2?.isValid}
                    axe={"facteursFav2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Facteurs_favorisants")}
                    options={[
                      { value: "oui", label: t("modals.yes") },
                      { value: "non", label: t("modals.no") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                </div>
                <div className="d-flex mt-2" style={{ flex: "1" }}>
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.autresEtiologies2?.response}
                    isValid={currentCas.autresEtiologies2?.isValid}
                    axe={"autresEtiologies2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Autres_etiologies")}
                    options={[
                      {
                        value: "absentes_apres_bilan_appropries",
                        label: t("pvgame.day7.absentes_apres_bilan_appropries"),
                      },
                      {
                        value: "non_recherchees",
                        label: t("pvgame.day7.Non_recherchees"),
                      },
                      { value: "presentes", label: t("pvgame.day7.Presentes") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.testSpecifiques2?.response}
                    isValid={currentCas.testSpecifiques2?.isValid}
                    axe={"testSpecifiques2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Test_specifiques")}
                    options={[
                      { value: "L+", label: t("pvgame.day7.L+") },
                      { value: "L0", label: t("pvgame.day7.L0") },
                      { value: "L-", label: t("pvgame.day7.L-") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                </div>
                <div className="d-flex mt-2" style={{ flex: "1" }}>
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.scoreBiblio2?.response}
                    isValid={currentCas.scoreBiblio2?.isValid}
                    axe={"scoreBiblio2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Score_bibliographique")}
                    options={[
                      { value: "B4", label: t("pvgame.day7.B4") },
                      { value: "B3", label: t("pvgame.day7.B3") },
                      { value: "B2", label: t("pvgame.day7.B2") },
                      { value: "B1", label: t("pvgame.day7.B1") },
                      { value: "B0", label: t("pvgame.day7.B0") },
                      { value: "", label: "N/A" },
                    ]}
                  />
                  <ItemSelect
                    dispatch={dispatch}
                    response={currentCas.inputOMS2?.response}
                    isValid={currentCas.inputOMS2?.isValid}
                    axe={"inputOMS2"}
                    _idCas={currentCas._id}
                    _idLevel={_idLevel}
                    title={t("pvgame.day7.Input_OMS")}
                    options={[
                      { value: "certain", label: t("pvgame.day7.Certain") },
                      { value: "probable", label: t("pvgame.day7.Probable") },
                      { value: "possible", label: t("pvgame.day7.Possible") },
                      {
                        value: "improbable",
                        label: t("pvgame.day7.Improbable"),
                      },
                      {
                        value: "conditionnel",
                        label: t("pvgame.day7.Conditionnel"),
                      },
                      {
                        value: "non_evaluable",
                        label: t("pvgame.day7.Non_evaluable"),
                      },
                      { value: "", label: "N/A" },
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
          {!validateChios ? (
            <div className="box-btn">
              <button
                onClick={() => {
                  init();
                  close();
                }}
                type="reset"
                className="btn btn-secondary waves-effect waves-light  mr-1 "
              >
                {t("pvgame.day5.cancel")}
              </button>

              <button
                onClick={() => {
                  ///setValidateChios(true);
                  // //console.log("++++++++", currentCas);
                  dispatch(validCas(currentCas, currentCas._id, _idLevel));
                }}
                className="btn btn-primary waves-effect waves-light "
                type="submit"
              >
                {t("pvgame.day5.validate")}
                <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
          ) : (
            <div className="box-btn">
              <div
                className={`d-inline-block  mr-2 ${
                  IsValid ? "cas-check-valid" : "cas-check"
                }`}
              >
                {IsValid ? t("pvgame.day7.cas_on") : t("pvgame.day7.cas_off")}
                <span className="ml-1">
                  <i className={IsValid ? "fas fa-check" : "fas fa-times"}></i>
                </span>
              </div>
              <button
                onClick={() => {
                  init();
                  close();
                }}
                type="reset"
                className="btn btn-secondary waves-effect waves-light  mr-1 "
              >
                {t("pvgame.day7.ok")}
              </button>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AnalyseCas;

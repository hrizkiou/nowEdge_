import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactFormatter } from "react-tabulator";

import DoughnutChart from "../../../components/charts/DoughnutChart";
import { ColumnNegativeChart } from "../../../components/charts/highcharts/ColumnNegativeChart";
import { HeatMapChart } from "../../../components/charts/highcharts/HeatMapChart";
import { LineZoomChart } from "../../../components/charts/highcharts/LineZoomChart";
import Loader from "../../../components/Loader";
import TableGrid from "../../../components/tables/tablegrid";
import TableGroup from "../../../components/tables/TableGroup";
import TableList from "../../../components/tables/TableList";
import TableFinEdge from "../../../components/tables/tableVueActifs";
import { useWindowSize } from "../../../helpers/hooks/useWindowSize";
import { toFixedOnlyFloat } from "../../../helpers/loops";
import { getGlobalRiskView } from "../../../redux/FinEdge/actions";
import style from "./style.module.scss";

function gArray(length) {
  return Array.from(Array(length).keys());
}

const colums = [
  "Actif",
  "Quantité",
  "Prix d'achat",
  "Dernier cours",
  "Volatilité",
  "VaR 95%",
  "Var 99%",
  "Poids"
]
const data =  [
  {
      "id":1,
      "num": 1,
      "title": "Equity",
      "totalP&L": "-1 088,04",
      "totalVariation": "-9 982,00",
      "totalValorisation": "-4 157 430,00",
      "list": [
          [
              
              "Air Liquide",
              "-9 982,00",
              "138,831",
              "140,34",
              "+0,08%",
              "-1 385 810,00 €",
              "-1 088,04",
              "-1 088,04"
          ]
      ]
  },
  {
    "id":2,
    "num": 2,
    "title": "alfa",
    "totalP&L": "-1 088,04",
    "totalVariation": "-9 982,00",
    "totalValorisation": "-4 157 430,00",
    "list": [
        [
            "Atos",
            "-9 982,00",
            "138,831",
            "140,34",
            "+0,08%",
            "-1 385 810,00 €",
            "-1 088,04",
            "-1 088,04"
        ]
      
    ]
}
]
const options1 = [
  {
    type: "search",
    width: 100,
  },
];

const head = [
  "Actif",
  "Quantité",
  "Prix d'achat",
  "Dernier cours",
  "Volatilité",
  "VaR 95%",
  "Var 99%",
  "Poids"
];
const listRow = [
  {
    num: 1,
    title: "Actions",
    total: "323.231,22",
    list: gArray(5).map((elm) => [
      "Nokia",
      1000,
      "32, 231",
      "42,213",
      "+3,23%",
      "323.231,22",
      "323.231,22",
    ]),
  },
  {
    num: 2,
    title: "Obligations",
    total: "323.231,22",
    list: gArray(5).map((elm) => [
      "Nokia",
      1000,
      "32, 231",
      "42,213",
      "-3,23%",
      "323.231,22",
      "323.231,22",
    ]),
  },
];
const Risks = () => {
  const { portfolio, assets } = useSelector(
    (state) => state.FinEdge.initialData
  );
  const {
    loading,
    globalRiskData,
    variationVolatilityBetaRisk,
    volatilityValueRisk,
    betaValueRisk,
    analyseRisk
  } = useSelector((state) => state.FinEdge);
  const [width, height] = useWindowSize();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGlobalRiskView(portfolio.id));
  }, []);

  const volatility = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 9
  );
  const sharpRatio = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 4
  );
  const maxDD = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 8
  );
  const vaR95 = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 5
  );
  const vaR99 = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 6
  );
  const beta = globalRiskData?.last_portfolio_indicators?.find(
    (pi) => pi.indicator_id === 7
  );

  return (
    <div>
      {loading && <Loader />}
      <h4>Indicateurs de risque </h4>

      <div className={style.riskContainer}>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>Volatilité</h5>
          <h3 className={style.percentageIndicateur}>
            {volatility
              ? toFixedOnlyFloat(volatility.value * 100) + "%"
              : "N/A"}
          </h3>

          {volatility ? (
            volatility.variation > 0 ? (
              <span class="badge badge-success badge-pill float-left pl-2 pr-2">
                {toFixedOnlyFloat(volatility.variation * 100)} %{" "}
                <i class="ml-2 fas fa-caret-up"></i>{" "}
              </span>
            ) : (
              <span class="badge badge-danger badge-pill float-left  pl-2 pr-2">
                {toFixedOnlyFloat(volatility.variation * 100)}%{" "}
                <i class="ml-2 fas fa-caret-down"></i>{" "}
              </span>
            )
          ) : (
            <span class="badge badge-info badge-pill float-left   pl-2 pr-2">
              N/A
            </span>
          )}
        </div>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>Ratio de Sharpe</h5>
          <h3 className={style.percentageIndicateur}>
            {sharpRatio ? sharpRatio.value : "N/A"}
          </h3>
          {sharpRatio ? (
            sharpRatio.variation > 0 ? (
              <span
                class="badge badge-success badge-pill float-left pl-2 pr-2"
                style={{ backgroundColor: "#E04040" }}
              >
                {toFixedOnlyFloat(sharpRatio.variation * 100)} %{" "}
                <i class="ml-2 fas fa-caret-up"></i>{" "}
              </span>
            ) : (
              <span class="badge badge-danger badge-pill float-left  pl-2 pr-2">
                {toFixedOnlyFloat(sharpRatio.variation * 100)}%{" "}
                <i class="ml-2 fas fa-caret-down"></i>{" "}
              </span>
            )
          ) : (
            <span class="badge badge-info badge-pill float-left   pl-2 pr-2">
              N/A
            </span>
          )}
        </div>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>Max DD</h5>
          <h3
            className={style.percentageIndicateur}
            style={{ color: "#E04040" }}
          >
            {maxDD ? toFixedOnlyFloat(sharpRatio.value * 100) + "%" : "N/A"}
          </h3>
        </div>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>VaR 95%</h5>

          <h3
            className={style.percentageIndicateur}
            style={{ color: "#E04040" }}
          >
            {vaR95
              ? vaR95.value.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "EUR",
                })
              : "N/A"}
          </h3>
          {vaR95 ? (
            vaR95.variation > 0 ? (
              <span
                class="badge badge-success badge-pill float-left pl-2 pr-2"
                style={{ backgroundColor: "#E04040" }}
              >
                {toFixedOnlyFloat(vaR95.variation * 100)} %{" "}
                <i class="ml-2 fas fa-caret-up"></i>{" "}
              </span>
            ) : (
              <span class="badge badge-danger badge-pill float-left  pl-2 pr-2">
                {toFixedOnlyFloat(vaR95.variation * 100)}%{" "}
                <i class="ml-2 fas fa-caret-down"></i>{" "}
              </span>
            )
          ) : (
            <span class="badge badge-info badge-pill float-left   pl-2 pr-2">
              N/A
            </span>
          )}
        </div>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>VaR 99%</h5>
          <h3
            className={style.percentageIndicateur}
            style={{ color: "#E04040" }}
          >
            {vaR99
              ? vaR99.value.toLocaleString("fr-FR", {
                  minimumFractionDigits: 2,
                  style: "currency",
                  currency: "EUR",
                })
              : "N/A"}
          </h3>
          {vaR99 ? (
            vaR99.variation > 0 ? (
              <span
                class="badge badge-success badge-pill float-left pl-2 pr-2"
                style={{ backgroundColor: "#E04040" }}
              >
                {toFixedOnlyFloat(vaR99.variation * 100)} %{" "}
                <i class="ml-2 fas fa-caret-up"></i>{" "}
              </span>
            ) : (
              <span class="badge badge-danger badge-pill float-left  pl-2 pr-2">
                {toFixedOnlyFloat(vaR99.variation * 100)}%{" "}
                <i class="ml-2 fas fa-caret-down"></i>{" "}
              </span>
            )
          ) : (
            <span class="badge badge-info badge-pill float-left   pl-2 pr-2">
              N/A
            </span>
          )}
        </div>
        <div className={style.riskRows}>
          <h5 className={style.textIndicateur}>Beta</h5>
          <h3 className={style.percentageIndicateur}>
            {beta ? beta.value : "N/A"}
          </h3>
          {beta ? (
            beta.variation > 0 ? (
              <span
                class="badge badge-success badge-pill float-left pl-2 pr-2"
                style={{ backgroundColor: "#E04040" }}
              >
                {toFixedOnlyFloat(beta.variation * 100)} %{" "}
                <i class="ml-2 fas fa-caret-up"></i>{" "}
              </span>
            ) : (
              <span class="badge badge-danger badge-pill float-left  pl-2 pr-2">
                {toFixedOnlyFloat(beta.variation * 100)}%{" "}
                <i class="ml-2 fas fa-caret-down"></i>{" "}
              </span>
            )
          ) : (
            <span class="badge badge-info badge-pill float-left   pl-2 pr-2">
              N/A
            </span>
          )}
        </div>
      </div>
      <h5
        style={{
          paddingLeft: 20,
          fontSize: 18,
          fontWeight: "bold",
          marginTop: "1.5rem",
        }}
      >
        Evolution de la volatilité et Beta
      </h5>
      <div className={style.performanceContainer}>
        <div className={[style.row1, "mr-4"].join(" ")}>
          {/* <div
            style={{
              height: "383px",
              backgroundColor: "thistle",
              marginLeft: 20,
              marginBottom: 20,
              marginRight: 20,
            }}
          ></div> */}
          {/* <TableGrid
            data={variationVolatilityBetaRisk}
            options={options1}
            bodyStyle={{ height: "290px" }}
          /> */}
          <TableEvolution
            data_={variationVolatilityBetaRisk}
            // options={options1}
            // bodyStyle={{ height: "290px" }}

          />
        </div>
        <div className={style.row2}>
          <div className={style.priceChart}>
            <h5
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 16,
                alignSelf: "flex-start",
                fontWeight: "bold",
              }}
            >
              Evolution de la volatilité du ptf + Beta
            </h5>
            <LineZoomChart
              height={320}
              name1={"Evolution de la volatilité"}
              data1={volatilityValueRisk}
              color1={"#BEBEBE"}
              name2={"Evolution du Beta vs benchmark"}
              data2={betaValueRisk}
              color2={"#E5AB6B"}
              legendEnabled
              disableZoom
            />
          </div>
        </div>
      </div>
      <h5
        style={{
          paddingLeft: 20,
          fontSize: 18,
          fontWeight: "bold",
          marginTop: "1.5rem",
        }}
      >
        Analyse détaillé des risques du portefeuille
      </h5>
      <div className={style.riskAnalyseContainer}>
        {/* <div
          style={{
            height: "540px",
            backgroundColor: "thistle",
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 20,
            flex: 1,
          }}
        ></div> */}
        {/* <TableFinEdge head={head} listRow={analyseRisk} /> */}


        <TableGroup columns_p={colums} data_p={analyseRisk} />
      </div>

      <h5
        style={{
          paddingLeft: 20,
          fontSize: 18,
          fontWeight: "bold",
          marginTop: "1.5rem",
        }}
      >
        Matrice de corrélation
      </h5>

      <div className={style.matriceContainer}>
        <div
          style={{
            height: "540px",
            marginLeft: 20,
            marginBottom: 20,
            marginRight: 20,
            flex: 1,
          }}
        >
          {width > 0 && (
            <HeatMapChart
              data={globalRiskData?.correlation_matrix?.data}
              categories={globalRiskData?.correlation_matrix?.asset_ids?.map(
                (id) => assets.find((a) => a.id === id).name
              )}
              height={540}
              width={width - width * 0.1}
            />
          )}
        </div>
      </div>
    </div>
  );
};

function customHeaderFilter(headerValue, rowValue, rowData, filterParams){

  return rowValue.toString().toUpperCase().includes(headerValue.toString().toUpperCase()); 
}

const  Cell = ({cell})=> {
  const cellValue = cell._cell.value || "";
  return <div  className="rtl"  >{cellValue}  </div>;
}


const TableEvolution = ({data_}) => {
  const [columns, setColumns ] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
     if(data_.length>0){
    
      const columns_ = Object.keys(data_[0]).map((elem) =>{

        return { 
          title:elem, 
          field:elem, 
          hozAlign:"left", 
          formatter:reactFormatter(
            <Cell value={elem} />
          ),
          ...( elem === "Date " &&
            
            {
              headerFilter: "input",
              headerFilterFunc:customHeaderFilter,
              headerFilterPlaceholder:" ", 
              width:"110"
            }
          )
        }

      })
      
      setColumns(columns_);
      setData(data_)


     }
  }, [data_])

  

  return (
    <>
      <TableList columns_p={columns} data_p={data} /> 
    </>
  );
};
export { Risks };

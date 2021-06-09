import React, { useEffect, useState } from "react";
import { reactFormatter } from "react-tabulator";

import DoughnutChart from "../../../components/charts/DoughnutChart";
import { ColumnNegativeChart } from "../../../components/charts/highcharts/ColumnNegativeChart";
import { LineZoomChart } from "../../../components/charts/highcharts/LineZoomChart";
import TableGrid from "../../../components/tables/tablegrid";
import { useDispatch, useSelector } from "react-redux";
import { getGlobalStatisticView } from "../../../redux/actions";

import TableList from "../../../components/tables/TableList";
import style from "./style.module.scss";

const data1 = [
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "+0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "+1,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,21%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-3,45%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-1,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-5,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "+4,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
  {
    "Date ": "01/02/2021",
    "Rdts benchmark": "-0,06%",
    "Rdts portfeuille": "-0,33%",
    "Perf bench": "100%",
    "Perf ptf": "100%",
  },
];
const options1 = [
  {
    type: "search",
    width: 100,
  },
];

const Label = ({ cell }) => {
  const rowData = cell._cell.row.data;
  const cellValue = cell._cell.value || "";
  if (rowData.type === "group_") return cellValue;
  return (
    <span
      className={`badge ${
        cellValue.includes("+") ? "badge-success" : "badge-danger"
      } badge-pill`}
    >
      {cellValue}
      <i
        className={`ml-1 fas   ${
          cellValue.includes("+") ? "fa-caret-up" : "fa-angle-down"
        }`}
      ></i>
    </span>
  );
};

const TableStatistic = ({ data, options, onPressRow = () => {} }) => {
  const [columns, setColumns] = useState([]);

  const [data_, setData] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const columns_ = Object.keys(data[0]).map((elem) => {
        if (elem === "Date ")
          return {
            title: elem,
            field: elem,
            hozAlign: "center",
            headerFilter: "input",
            headerFilterPlaceholder: " ",
          };

        // if(elem === 'Rdts portfeuille')
        // return {
        //   title:elem,
        //   field:elem,
        //   hozAlign:"center",
        //   formatter:reactFormatter(
        //       <Label value={elem} />
        //     )
        // }

        return {
          title: elem,
          field: elem,
          hozAlign: "center",
        };
      });

      setColumns(columns_);
      setData(data);
    }
  }, [data]);
  return (
    <TableList
      columns_p={columns}
      data_p={data_}
      height="797px"
      onPressRow={onPressRow}
    />
  );
};

const Statistics = () => {
  const { portfolio, assets } = useSelector(
    (state) => state.FinEdge.initialData
  );
  const {
    assetClassConcentrationStatisticData,
    assetConcentrationStatisticData,
    sectorConcentrationStatisticData,
    yieldsAndPerfsArray,
    comparisonPtfBench,
    comparisonYield,
  } = useSelector((state) => state.FinEdge);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGlobalStatisticView(portfolio?.id));
  }, []);

  return (
    <div>
      <h4>Analyse des positions de portefeuille </h4>

      <div className={style.statisticsContainer}>
        <div className={style.statisticsRow1}>
          <h5
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#111137",
              marginBottom: "2rem",
              paddingLeft: 10,
            }}
          >
            Concentration par classe d'actifs
          </h5>
          <DoughnutChart
            data={assetClassConcentrationStatisticData.data}
            labels={assetClassConcentrationStatisticData.labels}
            colors={assetClassConcentrationStatisticData.colors}
          />
        </div>

        <div className={style.statisticsRow2}>
          <h5
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#111137",
              marginBottom: "2rem",
              paddingLeft: 10,
            }}
          >
            Concentration par secteur
          </h5>
          <DoughnutChart
            data={sectorConcentrationStatisticData.data}
            labels={sectorConcentrationStatisticData.labels}
            colors={sectorConcentrationStatisticData.colors}
          />
        </div>

        <div className={style.statisticsRow3}>
          <h5
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: "#111137",
              marginBottom: "2rem",
              paddingLeft: 10,
            }}
          >
            Pondération actifs
          </h5>
          <DoughnutChart
            data={assetConcentrationStatisticData.data}
            labels={assetConcentrationStatisticData.labels}
            colors={assetConcentrationStatisticData.colors}
          />
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
        Comparaison de la performance Vs Benchmark
      </h5>
      <div className={style.performanceContainer}>
        <div className={[style.row1, "mr-4 pl-2"].join(" ")}>
          {/* <div
            style={{
              height: "795px",
              backgroundColor: "teal",
              marginLeft: 20,
              marginBottom: 20,
              marginRight: 20,
            }}
          ></div> */}
          {/* <TableGrid  data={data1} options={options1} bodyStyle={{height:'740px'}} /> */}
          <TableStatistic data={yieldsAndPerfsArray} />
        </div>
        <div className={style.row2}>
          <div className={[style.priceChart].join(" ")}>
            <h5
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Comparaison de la performance par rapport à l'indice de référence
            </h5>
            <LineZoomChart
              height={320}
              name1={"Perf bench"}
              data1={comparisonPtfBench.bench}
              color1={"#BEBEBE"}
              name2={"Perf ptf"}
              data2={comparisonPtfBench.ptf}
              color2={"#E5AB6B"}
              legendEnabled
              // disableZoom
            />
          </div>

          <div className={style.priceChart} style={{ marginTop: 30 }}>
            <h5
              style={{
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 16,
                alignSelf: "center",
                fontWeight: "bold",
              }}
            >
              Comparaison des rendements par rapport à l'indice de référence
            </h5>

            <ColumnNegativeChart
              categoriesDates={comparisonYield.keys}
              dataPort={comparisonYield.ptf}
              dataBench={comparisonYield.bench}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Statistics };

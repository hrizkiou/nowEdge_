import Highcharts from "highcharts/highstock";
import React, { useState } from "react";
import { useRef } from "react";
import DoughnutChart from "../../components/charts/DoughnutChart";
import { ColumnChart } from "../../components/charts/highcharts/ColumnChart";
import { ColumnNegativeChart } from "../../components/charts/highcharts/ColumnNegativeChart";
import { HeatMapChart } from "../../components/charts/highcharts/HeatMapChart";
import { LineZoomChart } from "../../components/charts/highcharts/LineZoomChart";
import { OrderModal } from "../../components/modal/FinEdgeModals/OerderModal/OrderModal";
import { RankingStatsModal } from "../../components/modal/FinEdgeModals/RankingStatsModal/RankingStatsModal";

require("highcharts/indicators/indicators")(Highcharts);
require("highcharts/indicators/pivot-points")(Highcharts);
require("highcharts/indicators/macd")(Highcharts);
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/map")(Highcharts);

const dataSet = [
  {
    name: "Jan",
    y: 62.74,
  },
  {
    name: "Feb",
    y: 10.57,
  },
  {
    name: "Mar",
    y: 7.23,
  },
  {
    name: "Apr",
    y: 5.58,
  },
  {
    name: "May",
    y: 4.02,
  },
  {
    name: "Jun",
    y: 1.92,
  },
  {
    name: "Jul",
    y: 10.62,
  },
  {
    name: "Aug",
    y: 70.62,
  },
  {
    name: "Sep",
    y: 1.62,
  },
  {
    name: "Oct",
    y: 45.2,
  },
  {
    name: "Nov",
    y: 12,
  },
  {
    name: "Dec",
    y: 54.3,
  },
];

const ModalsTest = () => {
  const [showClassement, setShowClassement] = useState(false);
  const [showAchat, setShowAchat] = useState(false);
  const [data, setData] = useState(dataSet);

  const onZoomed = (min, max) => {

    ColumnChartRef.current.chart.series[0].setData([
      // {
      //   name: "Jan",
      //   y: 62.74,
      // },
      // {
      //   name: "Feb",
      //   y: 10.57,
      // },
      // {
      //   name: "Mar",
      //   y: 7.23,
      // },
      {
        name: "Apr",
        y: 5.58,
      },
      {
        name: "May",
        y: 4.02,
      },
      {
        name: "Jun",
        y: 1.92,
      },
      {
        name: "Jul",
        y: 10.62,
      },
      {
        name: "Aug",
        y: 70.62,
      },
      // {
      //   name: "Sep",
      //   y: 1.62,
      // },
      // {
      //   name: "Oct",
      //   y: 45.2,
      // },
      // {
      //   name: "Nov",
      //   y: 12,
      // },
      // {
      //   name: "Dec",
      //   y: 54.3,
      // },
    ]);
  };

  const ColumnChartRef = useRef();
  const LineZoomAbleChartRef = useRef();

  const onResetZoom = () => {
    ColumnChartRef.current.chart.series[0].setData(dataSet);
  };
  return (
    <div>
      {showAchat && (
        <OrderModal
          show={showAchat}
          onHide={() => {
            setShowAchat(false);
          }}
        />
      )}
      {showClassement && (
        <RankingStatsModal
          show={showClassement}
          onHide={() => {
            setShowClassement(false);
          }}
        />
      )}

      <button
        onClick={() => {
          //console.log("#############", LineZoomAbleChartRef.current.chart.series[0].setData(dataSet));
        }}
      >
        SHOW MODAL ORDER
      </button>

      <button
        onClick={() => {
          setShowClassement(true);
        }}
      >
        SHOW MODAL CLASSEMENT
      </button>

      {/* <HeatMapChart
        data={[
          [0, 0, 100],
          [0, 1, -20],
          [0, 2, 80],
          [0, 3, 99],
          [1, 0, -20],
          [1, 1, 100],
          [1, 2, 10],
          [1, 3, -100],
          [2, 0, 80],
          [2, 1, 10],
          [2, 2, 100],
          [2, 3, 88],
          [3, 0, 99],
          [3, 1, -100],
          [3, 2, 88],
          [3, 3, 100],
        ]}
        categories={["A", "B", "C", "D"]}
      />
*/}
      {/* <ColumnNegativeChart /> */}

      {/* <DoughnutChart />  */}
      <LineZoomChart
        data1={[
          7.0,
          6.9,
          9.5,
          14.5,
          18.2,
          21.5,
          25.2,
          26.5,
          23.3,
          18.3,
          13.9,
          9.6,
        ]}
        onZoomed={onZoomed}
        onResetZoom={onResetZoom}
        LineZoomAbleChartRef={LineZoomAbleChartRef}
      />
      <ColumnChart data={data} ColumnChartRef={ColumnChartRef} />
    </div>
  );
};

export { ModalsTest };

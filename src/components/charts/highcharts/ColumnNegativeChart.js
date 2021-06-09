import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const ColumnNegativeChart = ({
  categoriesDates = [
    "01 Jan",
    "02 Jan",
    "03 Jan",
    "04 Jan",
    "05 Jan",
    "06 Jan",
    "07 Jan",
    "08 Jan",
    "09 Jan",
    "10 Jan",
    "11 Jan",
    "12 Jan",
  ],
  dataPort = [-2, -2, -3, -2, -1, -1, -2, -5, -7, -4, -3, -5],
  dataBench = [5, 3, 4, 7, 2, 3, 5, 4, 2, 3, 1, 2],
}) => {
  const timezone = new Date().getTimezoneOffset();

  Highcharts.setOptions({
    global: {
      timezoneOffset: timezone,
    },
  });

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categoriesDates,
    },
    credits: {
      enabled: false,
    },

    legend: {
      enabled: true,

      align: "center",
      verticalAlign: "top",
      borderWidth: 0,
    },

    series: [
      {
        name: "Rdts benchmark",
        data: dataBench,
        color: "#1F78B4",
      },
      {
        name: "Rdts portfeuille",
        data: dataPort,
        color: "#ED7D31",
      },
    ],
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height: "100%", width: "100%" } }}
    />
  );
};

export { ColumnNegativeChart };

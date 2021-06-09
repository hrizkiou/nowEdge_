import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const dataSet = [
  [0, 0, -100],
  [0, 1, 30],
  [0, 2, -43],
  [0, 3, -98],
  [0, 4, 78],
  [0, 5, -93],
  [0, 6, 70],

  [1, 0, -20],
  [1, 1, -40],
  [1, 2, 78],
  [1, 3, 100],
  [1, 4, 48],
  [1, 5, 48],
  [1, 6, 48],

  [2, 0, 35],
  [2, 1, 15],
  [2, 2, 100],
  [2, 3, 64],
  [2, 4, 52],
  [2, 5, 48],
  [2, 6, 48],

  [3, 0, 72],
  [3, 1, -50],
  [3, 2, -100],
  [3, 3, 19],
  [3, 4, 16],
  [3, 5, 48],
  [3, 6, 48],

  [4, 0, 38],
  [4, 1, 5],
  [4, 2, 8],
  [4, 3, 3],
  [4, 4, -44],
  [4, 5, 48],
  [4, 6, 48],

  [5, 0, 88],
  [5, 1, 32],
  [5, 2, 12],
  [5, 3, 6],
  [5, 4, -12],
  [5, 5, 48],
  [5, 6, 48],

  [6, 0, 13],
  [6, 1, 44],
  [6, 2, 88],
  [6, 3, 98],
  [6, 4, 96],
  [6, 5, 48],
  [6, 6, 48],
];
const HeatMapChart = ({
  data = dataSet,
  categories = [
    "Actif 1",
    "Actif 2",
    "Actif 3",
    "Actif 4",
    "Actif 5",
    "Actif 6",
    "Actif 7",
  ],
  height,
  width,
}) => {
  const options = {
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },

    title: {
      text: "",
    },

    xAxis: {
      opposite: true,
      categories,
    },

    yAxis: {
      categories,
      reversed: true,
      title: null,
    },

    // accessibility: {
    //     point: {
    //       descriptionFormatter: function (point) {
    //         var ix = point.index + 1,
    //           xName = getPointCategoryName(point, "x"),
    //           yName = getPointCategoryName(point, "y"),
    //           val = point.value;
    //         return ix + ". " + xName + " sales " + yName + ", " + val + ".";
    //       },
    //     },
    //   },

    colorAxis: {
      min: -100,
      minColor: "#1041A4",
      maxColor: "#F12B1D",
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280,
    },

    tooltip: {
      formatter: function () {
        return `<b> ${getPointCategoryName(
          this.point,
          "x"
        )}</b>  <b> ${getPointCategoryName(this.point, "y")}</b>  ${
          this.point.value
        } %`;
      },
    },

    series: [
      {
        name: "",
        borderWidth: 1,
        data,
        dataLabels: {
          enabled: true,
          color: "#000000",
        },
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            yAxis: {
              labels: {
                formatter: function () {
                  return this.value.charAt(0);
                },
              },
            },
          },
        },
      ],
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { height, width } }}
    />
  );
};

export { HeatMapChart };

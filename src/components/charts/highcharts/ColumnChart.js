import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
function getPointCategoryName(point, dimension) {
  var series = point.series,
    isY = dimension === "y",
    axis = series[isY ? "yAxis" : "xAxis"];
  return axis.categories[point[isY ? "y" : "x"]];
}

const dataSet = [ [1294012800000, 47.08],
[1294095600000, 50.08],
[1294092000000, 55.08],


[1294099200000, 47.33],
[1294185600000, 47.71],
[1294272000000, 47.68],
[1294358400000, 48.02],
[1294617600000, 48.92],
[1294704000000, 48.81],
[1294790400000, 49.20], ]

const ColumnChart = ({ data = dataSet, height= 150, width= "100%", ColumnChartRef }) => {
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

    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
     type: "datetime",
      // labels: {
      //   formatter: () => {
      //     const myDate = new Date(this.value);
      //     const newDateMs = Date.UTC(
      //       myDate.getUTCFullYear(),
      //       myDate.getUTCMonth() - 1,
      //       myDate.getUTCDate(),
      //       myDate.getHours(),
      //       myDate.getMinutes(),
      //       myDate.getSeconds()
      //     );
      //     return Highcharts.dateFormat("%e. %b", newDateMs);
      //   },
      // },
      // labels: {
      //   formatter: function (e) {
      //     //console.log(`this`, this, e)
      //     // return Highcharts.dateFormat("%b/%e/%Y", this.value);
      //   },
      // },
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: false,
          format: "{point.y:.1f}%",
        },
      },
    },

    tooltip: {
      formatter: function() {
        return '<b>' + this.series.name + '</b><br/>' +
          Highcharts.dateFormat('%e-%b-%Y',this.x) +
          '<br/><b>' + this.y + '</b><br/>' 
      }

    },

    series: [
      {
        name: "",
         

        colorByPoint: false,
        color: "#CCEBA3",
        data,
      },
    ],
  };

  return (
    <HighchartsReact
      ref={ColumnChartRef}
      highcharts={Highcharts}
      options={options}
      containerProps={{
        style: { height, width  },
      }}
    />
  );
};

export { ColumnChart };

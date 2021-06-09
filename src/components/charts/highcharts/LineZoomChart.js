import React, { useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

const dataSet1 = [
  [7609, 0.7537],
  [7696, 0.7537],
  [7782, 0.7559],
  [7868, 0.7631],
  [7955, 0.7644],
  [8214, 0.769],
  [8300, 0.7683],
  [8387, 0.77],
  [8473, 0.7703],
];
const dataSet2 = [
  [7609, 0.7703],
  [7696, 0.7696],
  [7782, 0.7782],
  [7868, 0.7868],
  [7955, 0.7955],
  [8214, 0.8214],
  [8300, 0.83],
  [8387, 0.77],
  [8473, 0.8473],
];
const LineZoomChart = ({
  height= 150,
  width= "100%",
  data1 = dataSet1,
  name1 = "",
  color1 = "#000",
  data2,
  name2 = "",
  color2 = "#1F78B4",
  disableZoom,
  legendEnabled,
  getMinMax,
  onZoomed = () => {},
  onResetZoom = () => {},
  LineZoomAbleChartRef,
}) => {
  const timezone = new Date().getTimezoneOffset();

  Highcharts.setOptions({
    global: {
      timezoneOffset: timezone,
    },
  });

  const options = {
    chart: {
      zoomType: disableZoom ? "none" : "x",

      // events: {
      //   selection: function (event) {
      //     // log the min and max of the primary, datetime x-axis
      //     alert("öööööö");

      //     // log the min and max of the y axis
      //     //console.log(event);
      //   },

      // },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: disableZoom
        ? ""
        : document.ontouchstart === undefined
        ? "Click and drag in the plot area to zoom in"
        : "Pinch the chart to zoom in",
    },
    xAxis: {
      type: "datetime",
      events: {
        afterSetExtremes: function (e) {
          onZoomed(this.min, this.max);
        },
        setExtremes: function (e) {
          // //console.log(`this.min`, this.min);
          // //console.log(`this.max`, this.max);
          // //console.log(`this.dataMax`, this.dataMax);
          // //console.log(`this.dataMin`, this.dataMin);
          if (typeof e.min == "undefined" && typeof e.max == "undefined")
            onResetZoom();
          // else onZoomed();
        },
      },
    },
    tooltip: {
      formatter: function () {
        return (
          "<b>" +
          this.series.name +
          "</b><br/>" +
          Highcharts.dateFormat("%e-%b-%Y", this.x) +
          "<br/><b>" +
          this.y +
          "</b><br/>"
        );
      },
    },

    yAxis: {
      title: {
        text: "",
      },
    },
    legend: {
      enabled: legendEnabled,

      align: "center",
      verticalAlign: "top",
      borderWidth: 0,
    },
    series: [
      {
        type: "",
        name: name1,
        data: data1,
        color: color1,
      },
    ],
    
  };

  data2 &&
    options.series.push({
      type: "",
      name: name2,
      data: data2,
      color: color2,
    });

  return (
    <HighchartsReact
      ref={LineZoomAbleChartRef}
      highcharts={Highcharts}
      options={options}
      immutable
      containerProps={{
        style: { height, width  },
      }}
    />
  );
};

export { LineZoomChart };

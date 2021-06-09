import React from 'react';

import {Line} from 'react-chartjs-2';

const LineChart = ({labels, datasets, max, min}) => {
  const data = {
    labels: labels || ['Tour 1', 'Tour 2', 'Tour 3', 'Tour 4', 'Tour 5'],
    datasets: datasets || [
      {
        label: 'Wizard',
        fill: false,
        pointRadius: 4,
        lineTension: 0,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        data: [102, 90, 110, 90, 80],
        backgroundColor: 'rgba(24, 138, 226, 1)',
        borderColor: 'rgba(24, 138, 226, 1)',
      },
      {
        label: 'Bears',
        fill: false,
        pointRadius: 4,
        lineTension: 0,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        data: [120, 80, 150, 105, 80],
        backgroundColor: 'rgba(216, 122, 243, 1)',
        borderColor: 'rgba(216, 122, 243, 1)',
      },
      {
        label: 'Company x',
        fill: false,
        pointRadius: 4,
        lineTension: 0,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        data: [100, 120, 60, 120, 140],
        backgroundColor: 'rgba(16, 196, 105, 1)',
        borderColor: 'rgba(16, 196, 105, 1)',
      },
      {
        label: 'Tigers',
        fill: false,
        pointRadius: 4,
        lineTension: 0,
        pointBorderWidth: 1,
        borderWidth: 1.5,
        data: [98, 110, 75, 110, 120],
        backgroundColor: 'rgba(243, 231, 122, 1)',
        borderColor: 'rgba(243, 231, 122, 1)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: min || 0,
            max: max || undefined,
            fontColor: 'rgba(198, 198, 198, 1)',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'rgba(198, 198, 198, 1)',
          },
        },
      ],
    },
    legend: {
      display: true,
      align: 'end',
      labels: {
        fontColor: 'rgba(168, 180, 186, 1)',
        // fontStyle: "bold",
        boxWidth: 5,
        usePointStyle: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;

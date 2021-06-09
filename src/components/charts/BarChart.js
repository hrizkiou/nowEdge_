import React from 'react';

import {Bar} from 'react-chartjs-2';

const BarChart = ({labels, datasets}) => {
  const data = {
    labels: labels || ['Tour 1', 'Tour 2', 'Tour 3', 'Tour 4', 'Tour 5'],
    datasets: datasets || [
      {
        label: 'Wizard',
        backgroundColor: 'rgba(24, 138, 226, 1)',
        borderColor: 'rgba(24, 138, 226, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(24, 138, 226, 1)',
        hoverBorderColor: 'rgba(24, 138, 226, 1)',
        data: [100, 90, 110, 100, 80],
      },
      {
        label: 'Bears',
        backgroundColor: 'rgba(216, 122, 243, 1)',
        borderColor: 'rgba(216, 122, 243, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(216, 122, 243, 1)',
        hoverBorderColor: 'rgba(216, 122, 243, 1)',
        data: [120, 80, 150, 100, 80],
      },
      {
        label: 'Company x',
        backgroundColor: 'rgba(16, 196, 105, 1)',
        borderColor: 'rgba(16, 196, 105, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(16, 196, 105, 1)',
        hoverBorderColor: 'rgba(16, 196, 105, 1)',
        data: [100, 120, 60, 110, 140],
      },
      {
        label: 'Tigers',
        backgroundColor: 'rgba(243, 231, 122, 1)',
        borderColor: 'rgba(243, 231, 122, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(243, 231, 122, 1)',
        hoverBorderColor: 'rgba(243, 231, 122, 1)',
        data: [99, 110, 75, 110, 120],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: (datasets && datasets.length > 0 ) ? parseInt(Math.min( ...datasets[0].data) - (Math.min(...datasets[0].data) * 0.05)) : 0   ,
            max: (datasets && datasets.length > 0 ) ? parseInt(Math.max( ...datasets[0].data) + (Math.max(...datasets[0].data) * 0.05)) : 0   ,
            
            fontColor: 'rgba(198, 198, 198, 1)',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: 'rgba(198, 198, 198, 1)',
          },
          barPercentage: 0.6,
        },
      ],
    },
    legend: {
      display: true,
      // align: 'end',
      labels: {
        // fontColor: 'rgba(168, 180, 186, 1)',
        // fontStyle: "bold",
        // boxWidth: 5,
        // usePointStyle: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;

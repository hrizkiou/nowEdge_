import React from 'react';

import {Bar} from 'react-chartjs-2';

const BarOneExChart = ({labels, datasets}) => {
  const data = {
    labels: labels || ['Wizard', 'Bears', 'Company x', 'Tigers'],
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
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
            min: (datasets && datasets.length > 0 ) ? parseInt(Math.min( ...datasets[0].data) - (Math.min(...datasets[0].data) * 0.1)) : 0   ,
            max: (datasets && datasets.length > 0 ) ? parseInt(Math.max( ...datasets[0].data) + (Math.max(...datasets[0].data) * 0.15)) : 0   ,
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
      display: false,
      align: 'end',
      labels: {
        fontColor: 'rgba(168, 180, 186, 1)',
        // fontStyle: "bold",
        boxWidth: 5,
        usePointStyle: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarOneExChart;

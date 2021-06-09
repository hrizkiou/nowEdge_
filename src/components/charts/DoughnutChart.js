import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const DoughnutChart = (props) => {
  const data = {
    labels: props.labels ||  ['Red', 'Green', 'Yellow', "jjjj"],
    datasets: [
      {
        data: props.data || [300, 50, 100, 100],
        backgroundColor: props.colors || ['#86BD44', '#4FABFC', '#9A5AB5', "#506893"],
        hoverBackgroundColor: props.colors || ['#86BD44', '#4FABFC', '#9A5AB5', "#506893"], 
      },
    ],
  };

  const options = {
    responsive: true,
    legend: {
      display: true,
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;

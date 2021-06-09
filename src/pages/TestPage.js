import React from 'react';

import {Container, Row, Col} from 'reactstrap';

import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';
import DoughnutChart from '../components/charts/DoughnutChart';
const TestPage = () => {
  // const data = {
  //   labels: ['Tour 1', 'Tour 2', 'Tour 3', 'Tour 4', 'Tour 5'],
  //   datasets: [
  //     {
  //       label: 'Wizard',
  //       backgroundColor: 'rgba(24, 138, 226, 1)',
  //       borderColor: 'rgba(24, 138, 226, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(24, 138, 226, 1)',
  //       hoverBorderColor: 'rgba(24, 138, 226, 1)',
  //       data: [100, 90, 110, 100, 80],
  //     },
  //     {
  //       label: 'Bears',
  //       backgroundColor: 'rgba(216, 122, 243, 1)',
  //       borderColor: 'rgba(216, 122, 243, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(216, 122, 243, 1)',
  //       hoverBorderColor: 'rgba(216, 122, 243, 1)',
  //       data: [120, 80, 150, 100, 80],
  //     },
  //     {
  //       label: 'Company x',
  //       backgroundColor: 'rgba(16, 196, 105, 1)',
  //       borderColor: 'rgba(16, 196, 105, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(16, 196, 105, 1)',
  //       hoverBorderColor: 'rgba(16, 196, 105, 1)',
  //       data: [100, 120, 60, 110, 140],
  //     },
  //     {
  //       label: 'Tigers',
  //       backgroundColor: 'rgba(243, 231, 122, 1)',
  //       borderColor: 'rgba(243, 231, 122, 1)',
  //       borderWidth: 1,
  //       hoverBackgroundColor: 'rgba(243, 231, 122, 1)',
  //       hoverBorderColor: 'rgba(243, 231, 122, 1)',
  //       data: [99, 110, 75, 110, 120],
  //     },
  //   ],
  // };

  // const options = {
  //   maintainAspectRatio: false,
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //           min: 0,
  //           fontColor: 'rgba(198, 198, 198, 1)',
  //         },
  //       },
  //     ],
  //     xAxes: [
  //       {
  //         ticks: {
  //           fontColor: 'rgba(198, 198, 198, 1)',
  //         },
  //         barPercentage: 0.6,
  //       },
  //     ],
  //   },
  //   legend: {
  //     display: true,
  //     labels: {
  //       fontColor: 'rgba(168, 180, 186, 1)',
  //       fontStyle: 'bold',
  //       boxWidth: 5,
  //       usePointStyle: true,
  //     },
  //   },
  // };
  return (
    <div className="account-pages mt-5 mb-5">
      <Container>
        <div>
          <h2>Line Example</h2>
          <Row>
            <Col md={6}>
              <LineChart />
            </Col>
            <Col md={6}>
              <BarChart />
            </Col>
            <Col md={6}>
              <DoughnutChart />
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default TestPage;

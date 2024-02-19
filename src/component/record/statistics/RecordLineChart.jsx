import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import Typography from '@mui/material/Typography';
import StatisticsCard from '@src/component/admin/statistics/StatisticsCard.jsx';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  aspectRatio: 1.5,
  maintainAspectRatio: false,  // Add this
};

const labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};
const ChartContainer = styled.div`
    margin-bottom: 30px;
`;

export function RecordLineChart() {
  return (
    <ChartContainer>
      <StatisticsCard title="가입자 현황" paddingbottom={40}>
        <Line options={options} data={data} />
      </StatisticsCard>
    </ChartContainer>
  );
}

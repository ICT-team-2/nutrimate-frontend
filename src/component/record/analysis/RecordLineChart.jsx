import React, { useEffect, useState } from 'react';
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
import UseFetchRecordAnalysisGraph from '@src/hooks/record/analysis/useFetchRecordAnalysisGraph.jsx';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import dayjs from 'dayjs';

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

const data = {
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


export function RecordLineChart({ graphData }) {

  const [dataSet, setDataSet] = useState();

  useEffect(() => {
    if (!graphData) return;
    setDataSet({
      labels: graphData?.map((data) => data.endDate),
      datasets: [
        {
          label: '섭취 칼로리(음식)',
          data: graphData?.map((data) => data.totalDietCal),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: '소모 칼로리(운동)',
          data: graphData?.map((data) => data.totalSportCal),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
          label: '종합 섭취 칼로리',
          data: graphData?.map((data) => data.totalDietCal - data.totalSportCal),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ],

    });
  }, [graphData]);


  return (
    <ChartContainer>
      <StatisticsCard title="기록 통계" paddingbottom={40}>
        <Line options={options} data={dataSet} />
      </StatisticsCard>
    </ChartContainer>
  );
}

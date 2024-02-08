import React, { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  ChartContainer,
  ChartOuterContainer,
  ChartPaper,
  ChartTitleTypo,
} from '@src/component/admin/statistics/CommonComponents.jsx';
import Typography from '@mui/material/Typography';
import StatisticsCard from '@src/component/admin/statistics/StatisticsCard.jsx';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
const options = {
  maintainAspectRatio: false,  // Add this
  plugins: {
    legend: {
      position: 'right', // 원하는 위치로 변경해주세요.
    },
  },
};
const DoughnutChartContainer = styled.div`
    padding-bottom: 55%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
`;
const TitleTypo = styled(Typography)`
    padding: 20px 0 0 20px;
`;
const SubTitleTypo = styled(TitleTypo)`
    color: ${({ theme }) => theme['gray-light-text']};
`;

export function CategoricalBoardDoughnutChart() {
  return (
    <StatisticsCard
      titleComponent={(<><SubTitleTypo variant="h6">
          오늘 신규회원: 0&nbsp;&nbsp;&nbsp; 오늘 방문자: 0
        </SubTitleTypo>
          <TitleTypo variant="h6">카테고리 별 게시글 수</TitleTypo>
        </>
      )}
    >
      <DoughnutChartContainer>
        <Doughnut data={data} options={options} />
      </DoughnutChartContainer>
    </StatisticsCard>
  );
}

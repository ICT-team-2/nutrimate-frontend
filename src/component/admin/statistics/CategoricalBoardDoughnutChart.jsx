import React, { Fragment,useEffect,useState } from 'react';
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
import axios from 'axios';
import dayjs from 'dayjs';

ChartJS.register(ArcElement, Tooltip, Legend);


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
  const [boardData,setBoardData] =useState([]);
  const [labels,setLabels] =useState(['피드', '운동 게시판', '음식 게시판']);


  const data = {
    labels: labels,
    datasets: [
      {
        label: dayjs(new Date()).format('YYYY-MM'),
        data: boardData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
  
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
  
        ],
        borderWidth: 1,
      },
    ],
  };


  useEffect(() => {
    axios.get('http://localhost:9999/statistic/list/category/month')
    .then(response => {
      const data = response.data;
      // 통계 데이터를 가져온 후, 적절한 형식으로 가공하여 boardData를 설정합니다.
      const label=['FEED','exercise','FOOD']
      setBoardData(label.map(label => {
        const item = response.data.find(item => item.boardcategory === label);
        return item ? item.count : 0;
       }));

    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  return (
    <StatisticsCard
      titleComponent={(<><SubTitleTypo variant="h6">
        </SubTitleTypo>
          <TitleTypo variant="h6">월별 카테고리 게시글 수</TitleTypo>
        </>
      )}
    >
      <DoughnutChartContainer>
        <Doughnut data={data} options={options} />
      </DoughnutChartContainer>
    </StatisticsCard>
  );
}

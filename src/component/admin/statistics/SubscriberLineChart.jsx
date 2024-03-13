import React, { useState, useEffect } from 'react';
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
import {
  ChartContainer,
  ChartOuterContainer,
  ChartPaper,
  ChartTitleTypo,
} from '@src/component/admin/statistics/CommonComponents.jsx';
import Typography from '@mui/material/Typography';
import StatisticsCard from '@src/component/admin/statistics/StatisticsCard.jsx';
import axios from 'axios';
import styled from 'styled-components';
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


const StatisticsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StatisticsCardWrapper = styled.div`
    flex: 1;
    margin-right: 10px;
`;


export function SubscriberLineChart({ chart }) {
  const [borderColor, setBorderColor] = useState('rgb(53, 162, 235)');
  const [backgroundColor, setBackgroundColor] = useState('rgba(53, 162, 235, 0.5)');
  const [title, setTitle] = useState('주간 가입자 현황');
  const [labels, setLabels] = useState([]);
  const [label, setLabel] = useState([]);
  const [datas, setDatas] = useState([]);
  let url = '';

  useEffect(() => {
    if (chart === 'week') {
      setBorderColor('rgb(53, 162, 235)');
      setBackgroundColor('rgba(53, 162, 235, 0.5)');
      setTitle('주간 가입자 현황');
      setLabel('주간 가입자');
      url = `${import.meta.env.REACT_APP_BACKEND_URL}/statistic/list/member/week`;
      const startDate = dayjs().subtract(6, 'day');
      const endDate = dayjs() + 1;
      const dates = [];
      let currentDate = startDate;
      while (currentDate.isBefore(endDate)) {
        dates.push(currentDate.format('YY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
      }
      axios.get(url)
        .then(response => {
          setDatas(response.data);
          setLabels(dates);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });

    } else if (chart === 'month') {
      setBorderColor('rgb(255, 99, 132)');
      setBackgroundColor('rgba(255, 99, 132, 0.5)');
      setTitle('월간 가입자 현황');
      setLabel('월간 가입자');
      url = `${import.meta.env.REACT_APP_BACKEND_URL}/statistic/list/member/month`;
      const today = dayjs(); // 현재 날짜를 가져옵니다.
      const dates = []; // 날짜들을 저장할 배열을 생성합니다.

      for (let i = 11; i > -1; i--) {
        const date = today.subtract(i, 'month'); // 오늘로부터 i개월 전의 날짜를 계산합니다.
        dates.push(date.format('YY-MM')); // 형식에 맞게 날짜를 배열에 추가합니다.
      }
      axios.get(url)
        .then(response => {
          setDatas(response.data);
          setLabels(dates);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });


    }

  }, [chart]);


  useEffect(() => {
    setDatas(labels.map(label => {
      const item = datas.find(item => chart == 'week' ? dayjs(item.day).format('YY-MM-DD') === label : dayjs(item.month).format('YY-MM') === label);
      return item ? item.count : 0;
    }));
  }, [labels]);


  const data = {
    labels,
    datasets: [

      {
        label: label,
        data: datas,
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  };
  return (
    <StatisticsCard title={title}>
      <Line options={options} data={data} />
    </StatisticsCard>
  );
}


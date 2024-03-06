import React,{useState,useEffect} from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import {
  ChartContainer,
  ChartOuterContainer,
  ChartPaper,
  ChartTitleTypo,
} from '@src/component/admin/statistics/CommonComponents.jsx';
import StatisticsCard from '@src/component/admin/statistics/StatisticsCard.jsx';
import styled from 'styled-components';
import dayjs from 'dayjs';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  maintainAspectRatio: false,  // Add this
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },

};



export function WeeklyCategoricalBarChart() {
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
  const [food, setFoodDatas] = useState([]);
  const [exercise, setExercise] = useState([]);

      const data = {
        labels,
        datasets: [
          {
            label: 'FOOD',
            data: food,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'EXERCISE',
            data: exercise,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      useEffect(() => {  
        const startDate = dayjs().subtract(6, 'day');
        const endDate = dayjs()+1;
        const dates = [];
        let currentDate = startDate;
            while (currentDate.isBefore(endDate)) {
                dates.push(currentDate.format('YY-MM-DD'));
                currentDate = currentDate.add(1, 'day');
            }

        console.log(datas)

            axios.get('http://localhost:9999/statistic/list/category')
            .then(response => {
              setLabels(dates);
              setDatas(response.data)
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });

      }, []);
      useEffect(() => {  
        if(datas.length !== 0) {
            const groupedData = datas.reduce((acc, item) => {
                const { boardcategory } = item;
                if (!acc[boardcategory]) {
                    acc[boardcategory] = [];
                }
                acc[boardcategory].push(item);
                return acc;
            }, {});
            console.log(groupedData);
    
            if (groupedData['FOOD']) {
                setFoodDatas(labels.map(label => {
                    const item = groupedData['FOOD'].find(item => dayjs(item.day).format('YY-MM-DD') === label);
                    return item ? item.count : 0;
                }));
            } else {
                setFoodDatas(labels.map(() => 0)); // If no FOOD data found, set all counts to 0
            
            }
            console.log(food)

            if (groupedData['exercise']) {
              setExercise(labels.map(label => {
                  const item = groupedData['exercise'].find(item => dayjs(item.day).format('YY-MM-DD') === label);
                  return item ? item.count : 0;
              }));
          } else {
            setExercise(labels.map(() => 0)); // If no FOOD data found, set all counts to 0
          
          }
        }
    }, [datas]);

  return (
    <StatisticsCard title="주간 게시물 수 변화 추이">
      <Bar options={options} data={data} />
    </StatisticsCard>

  );
}

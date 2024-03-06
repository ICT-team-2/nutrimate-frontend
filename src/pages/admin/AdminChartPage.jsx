import React from 'react';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { FlexDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { ADMIN_CONTAINER_WIDTH } from '@src/component/admin/const.js';
import { SubscriberLineChart } from '@src/component/admin/statistics/SubscriberLineChart.jsx';
import { CategoricalBoardDoughnutChart } from '@src/component/admin/statistics/CategoricalBoardDoughnutChart.jsx';
import { WeeklyCategoricalBarChart } from '@src/component/admin/statistics/WeeklyCategoricalBarChart.jsx';
import WeeklyPopularPostsTable from '@src/component/admin/statistics/WeeklyPopularPostsTable.jsx';


const ChartContainer = styled.div`
    margin: 20px auto;
    width: ${ADMIN_CONTAINER_WIDTH};
`;
const TitleH1 = styled.h1`
    margin: 20px 0;
`;

const AdminChartPage = () => {
  return (
    <FlexDiv>
      <ChartContainer>
        <TitleH1>통계</TitleH1>
        <Grid
          container spacing={1}
          alignItems="center">
          <Grid item xs={12} lg={6} xl={6}>
          <SubscriberLineChart chart={'week'}/>
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
          <SubscriberLineChart chart={'month'} />
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <CategoricalBoardDoughnutChart />
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <WeeklyPopularPostsTable />
          </Grid>
          <Grid item xs={12} lg={6} xl={6}>
            <WeeklyCategoricalBarChart />
          </Grid>
        </Grid>
      </ChartContainer>
    </FlexDiv>
  );
};

export default AdminChartPage;

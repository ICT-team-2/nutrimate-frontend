import React from 'react';
import { FlexDiv } from '@src/component/common/GlobalComponents.jsx';
import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { ADMIN_CONTAINER_WIDTH } from '@src/component/admin/const.js';
import { SubscriberLineChart } from '@src/component/admin/statistics/SubscriberLineChart.jsx';
import { CategoricalBoardDoughnutChart } from '@src/component/admin/statistics/CategoricalBoardDoughnutChart.jsx';
import WeeklyPopularPostsTable from '@src/component/admin/statistics/WeeklyPopularPostsTable.jsx';
import { WeeklyCategoricalBarChart } from '@src/component/admin/statistics/WeeklyCategoricalBarChart.jsx';

const TitleH1 = styled.h1`
    margin: 20px 0;
`;
const AdminManageContainer = styled.div`
    margin: 20px auto;
    width: ${ADMIN_CONTAINER_WIDTH};
`;
const AdminManagePage = () => {
  return (
    <FlexDiv>
      <AdminManageContainer>
        <TitleH1>회원 관리</TitleH1>

      </AdminManageContainer>
    </FlexDiv>
  );
};

export default AdminManagePage;

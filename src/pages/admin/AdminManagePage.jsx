import React from 'react';
import { FlexDiv } from '@src/component/common/GlobalComponents.jsx';
import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { ADMIN_CONTAINER_WIDTH } from '@src/component/admin/const.js';
import { SubscriberLineChart } from '@src/component/admin/statistics/SubscriberLineChart.jsx';
import { CategoricalBoardDoughnutChart } from '@src/component/admin/statistics/CategoricalBoardDoughnutChart.jsx';
import WeeklyPopularPostsTable from '@src/component/admin/statistics/WeeklyPopularPostsTable.jsx';
import { WeeklyCategoricalBarChart } from '@src/component/admin/statistics/WeeklyCategoricalBarChart.jsx';
import ReportedContents from '@src/component/admin/manage/ReportedContents.jsx';

const TitleH1 = styled.h1`
    margin: 20px 0;
`;
const AdminManageContainer = styled.div`
    margin: 20px auto;
    width: ${ADMIN_CONTAINER_WIDTH};
`;
const StyledContainer = styled(Container)`
    max-width: 1500px;
`;
const AdminManagePage = () => {
  return (
    <StyledContainer>
      <FlexDiv>
        <AdminManageContainer>
          <TitleH1>회원 관리</TitleH1>
          <ReportedContents title="신고 게시글" property='board'/>
          <ReportedContents title="신고 댓글" property='comment'/>
        </AdminManageContainer>
      </FlexDiv>
    </StyledContainer>

  );
};

export default AdminManagePage;

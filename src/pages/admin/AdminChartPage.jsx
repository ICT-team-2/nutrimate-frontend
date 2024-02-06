import React from 'react';
import Paper from '@mui/material/Paper';
import { Container, Grid } from '@mui/material';
import styled from 'styled-components';
import { FlexDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { adminContainerWidth } from '@src/component/admin/const.js';

const StyledPaper = styled(Paper)`
    min-width: 30%;
`;
const ChartContainer = styled.div`
    margin: 0 auto;
    width: ${adminContainerWidth};

`;

const AdminChartPage = () => {
  return (
    <FlexDiv>
      <ChartContainer>
        <h1>통계</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6">가입자 현황</Typography>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={6}>
            <StyledPaper>
              <Typography variant="h6">차트</Typography>
            </StyledPaper>
          </Grid>
        </Grid>
      </ChartContainer>
    </FlexDiv>
  );
};

export default AdminChartPage;

import React from 'react';
import styled from 'styled-components';
import { Button, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';


const ManualRecordContainer = styled.div`
    width: 100%;
    margin-right: auto;
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    margin-left: auto;
`;
const StyledTextField = styled(TextField)`
    display: inline-block;
`;
const StyledTypography = styled(Typography)`
    display: inline-block;
    margin-top: 22px;
    margin-right: 20px;
`;
const StyledGrid = styled(Grid)`
    display: flex;
`;

const ManualRecordDiet = () => {
  return (
    <ManualRecordContainer>
      <Grid container spacing={2}>
        <StyledGrid item xs={12}>
          <StyledTypography variant="subtitle1">음식명</StyledTypography>
          <StyledTextField variant={'standard'} label={'음식명'} />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">섭취 칼로리</StyledTypography>
          <StyledTextField variant={'standard'} label={'섭취 칼로리(kcal)'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">섭취량</StyledTypography>
          <StyledTextField variant={'standard'} label={'섭취량(g)'} type="number" />
        </StyledGrid>
        <Grid item xs={4} />
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">탄수화물</StyledTypography>
          <StyledTextField variant={'standard'} label={'탄수화물'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">단백질</StyledTypography>
          <StyledTextField variant={'standard'} label={'단백질'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">지방</StyledTypography>
          <StyledTextField variant={'standard'} label={'지방'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">콜레스테롤</StyledTypography>
          <StyledTextField variant={'standard'} label={'콜레스테롤'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">나트륨</StyledTypography>
          <StyledTextField variant={'standard'} label={'나트륨'} type="number" />
        </StyledGrid>
        <Grid item xs={4}>
        </Grid>
      </Grid>

      <StyledButton variant="contained">등록</StyledButton>
    </ManualRecordContainer>
  );
};

export default ManualRecordDiet;

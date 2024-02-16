import React from 'react';
import styled from 'styled-components';
import { Grid, TextField } from '@mui/material';


const ManualRecordContainer = styled.div`
    width: 80%;
    margin: 0 auto;
`;
const StyledTextField = styled(TextField)`

`;

const ManualRecordDiet = () => {
  return (
    <ManualRecordContainer>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <StyledTextField variant={'standard'} label={'음식명'} />
        </Grid>
        <Grid item xs={12}>
          <StyledTextField variant={'standard'} label={'섭취 칼로리'} type="number" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField variant={'standard'} label={'탄수화물'} type="number" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField variant={'standard'} label={'단백질'} type="number" />
        </Grid>
        <Grid item xs={4}>
          <StyledTextField variant={'standard'} label={'지방'} type="number" />
        </Grid>
      </Grid>
    </ManualRecordContainer>
  );
};

export default ManualRecordDiet;

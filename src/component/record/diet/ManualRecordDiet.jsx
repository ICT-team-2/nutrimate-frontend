import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';


const ManualRecordContainer = styled.div`
    margin-top: 50px;
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
  const [foodName, setFoodName] = useState('');
  const [foodCal, setFoodCal] = useState('');
  const [foodIntake, setFoodIntake] = useState('');
  const [carbo, setCarbo] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [userId, setUserId] = useAtom(userIdAtom); 

  const handleSubmit = async () => {
    const dietSportRecordDto = {
      foodName,
      foodCal,
      foodIntake,
      carbo,
      fat,
      protein,
      userId: sessionStorage.userId
    };

    try {
      const response = await axios.post('/record/food/custom', {
        userId: sessionStorage.userId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ManualRecordContainer>
      <Grid container spacing={2}>
        <StyledGrid item xs={12}>
          <StyledTypography variant="subtitle1">음식명</StyledTypography>
          <StyledTextField variant={'standard'} label={'음식명'} value={foodName} onChange={e => setFoodName(e.target.value)} />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">섭취 칼로리</StyledTypography>
          <StyledTextField variant={'standard'} label={'섭취칼로리'} value={foodCal} type="number" onChange={e => setFoodCal(e.target.value)}/>
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">섭취량</StyledTypography>
          <StyledTextField variant={'standard'} label={'섭취량'} value={foodIntake} type="number" onChange={e => setFoodIntake(e.target.value)}/>
        </StyledGrid>
        <Grid item xs={4} />
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">탄수화물</StyledTypography>
          <StyledTextField variant={'standard'} label={'탄수화물'} value={carbo} type="number" onChange={e => setCarbo(e.target.value)}/>
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">단백질</StyledTypography>
          <StyledTextField variant={'standard'} label={'단백질'} value={protein} type="number" onChange={e => setProtein(e.target.value)}/>
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">지방</StyledTypography>
          <StyledTextField variant={'standard'} label={'지방'} value={fat} type="number" onChange={e => setFat(e.target.value)}/>
        </StyledGrid>
        {/* <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">콜레스테롤</StyledTypography>
          <StyledTextField variant={'standard'} label={'콜레스테롤'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={4}>
          <StyledTypography variant="subtitle1">나트륨</StyledTypography>
          <StyledTextField variant={'standard'} label={'나트륨'} type="number" />
        </StyledGrid> */}
        <Grid item xs={4}>
        </Grid>
      </Grid>

      <StyledButton variant="contained" onClick={handleSubmit}>등록</StyledButton>
    </ManualRecordContainer>
  );
};

export default ManualRecordDiet;

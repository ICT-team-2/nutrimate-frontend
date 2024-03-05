import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { useAtom } from 'jotai';
import { foodsAtom, selectedMealTimeAtom, calAtom } from '../atom';
import { carboAtom, fatAtom, proteinAtom, dietStateAtom } from '@src/component/setting/atom';
import { userIdAtom } from '@src/pages/login/atom';
import axios from 'axios';

const ContainerDiv = styled(FlexDiv)`
    margin: 20px 0;
`;
const FirstContainerDiv = styled(FlexGrowDiv)`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  margin-top: 35px;   
  margin-bottom: 35px;
`;
const SecondContainerDiv = styled(FlexGrowDiv)`
  display: flex;
  justify-content: center;
`;
const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;
`;
const CircleDivContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CircleDiv = styled.div`
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23124E23FF' stroke-width='7' stroke-dasharray='23' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 100px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DietTypography = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`;
const FoodRecordItemContianer = styled.div`
    display: flex;
`;
const StyledIconButton = styled(IconButton)`
    padding: 0;
`;
const FoodRecordContainer = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const FoodRecordList = () => {
  const [foods, setFoods] = useAtom(foodsAtom);
  const [selectedMealTime] = useAtom(selectedMealTimeAtom);
  const [carbo] = useAtom(carboAtom);
  const [protein] = useAtom(proteinAtom);
  const [fat] = useAtom(fatAtom);
  const [userCal, setUserCal] = useAtom(calAtom);
  const [userId, setUserId] = useAtom(userIdAtom);


  useEffect(() => {
    axios.get('/member/mypage', {
      params: {
        userId: sessionStorage.userId,
      },
    })
      .then(response => {
        console.log('Response:', response.data);
        console.log(response.data.memberDto.userCal);
        const userCal = response.data.memberDto.userCal;
        setUserCal(userCal);
        console.log('UserCal:', userCal);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleRemoveClick = (foodName) => {
    setFoods(foods.filter(food => food.foodName !== foodName));
  };

  //const filteredFoods = foods.filter(food => food.mealTime === selectedMealTime);
  console.log('Foods list:', foods);

  const totalCarvo = parseFloat(foods.reduce((total, food) => total + (food.foodCarvo || food.Carbo), 0)).toFixed(1);
  const totalProtein = parseFloat(foods.reduce((total, food) => total + (food.foodProtein || food.Protein), 0)).toFixed(1);
  const totalProvi = parseFloat(foods.reduce((total, food) => total + (food.foodProvi || food.Province), 0)).toFixed(1);

  
  const carbCal = userCal * (carbo / 100 / 4);
  const proteinCal = userCal * (protein / 100 / 4);
  const fatCal = userCal * (fat / 100 / 4);

  console.log(carbCal, proteinCal, fatCal);

  // 칼로리 값을 g으로 변환합니다.
  const maxCarbG = carbCal / 4;
  const maxProteinG = proteinCal / 4;
  const maxFatG = fatCal / 9;


  

  // FoodRecordList 컴포넌트에서
return (
  <ContainerDiv>
    <FirstContainerDiv>
      <FoodRecordContainer>
        <FoodRecordItemContianer>
          <RecordItemTypography variant="body1">{selectedMealTime.LABEL}</RecordItemTypography>
        </FoodRecordItemContianer>
        {foods.map((food, index) => 
          <FoodRecordItemContianer key={index}>
            <RecordItemTypography variant="body1">{food.foodName}</RecordItemTypography>
            <FlexGrowDiv grow={3} />
            <RecordItemTypography variant="body1">{food.foodCal}kcal</RecordItemTypography>
            <StyledIconButton onClick={() => handleRemoveClick(food.foodName)}>
              <CloseRoundedIcon />
            </StyledIconButton>
          </FoodRecordItemContianer>
        )}
      </FoodRecordContainer>
    </FirstContainerDiv>
      <SecondContainerDiv>
      <SecondContainerDiv>
        <DietItem title="탄수화물" value={totalCarvo} maxValue={maxCarbG.toFixed(1)} />
        <DietItem title="단백질" value={totalProtein} maxValue={maxProteinG.toFixed(1)} />
        <DietItem title="지방" value={totalProvi} maxValue={maxFatG.toFixed(1)} />
    </SecondContainerDiv>
      </SecondContainerDiv>
    </ContainerDiv>
  );
};
const RecordItemTypography = styled(Typography)`
    display: inline-block;
    flex-grow: 1;
`;

const DietItem = (props) => {
  const { title, value, maxValue } = props;
  return (
    <ItemContainer>
      <DietTypography variant="subtitle2">
        {title}
      </DietTypography>         
      <CircleDivContainer>
        <CircleDiv>{Math.round(value / maxValue * 100)}%</CircleDiv>
      </CircleDivContainer>
      <DietTypography variant="body1">
        {value}/{maxValue}g
      </DietTypography>

    </ItemContainer>
  );
};

// const FoodRecordItem = (props) => {
//   const { title, calory } = props;
//   return (
//     <FoodRecordItemContianer>
//       <RecordItemTypography variant="body1">{title}</RecordItemTypography>
//       <FlexGrowDiv grow={3} />
//       {calory && (<>
//         <RecordItemTypography variant="body1">{calory}kcal</RecordItemTypography>
//         <StyledIconButton onClick={onRemoveClick}>
//           <CloseRoundedIcon />
//         </StyledIconButton>
//       </>)}
//     </FoodRecordItemContianer>
//   );
// };


export default FoodRecordList;

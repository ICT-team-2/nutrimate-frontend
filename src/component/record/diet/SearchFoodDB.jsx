import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAtom } from 'jotai';
import { foodsAtom} from '../atom';
import { isTotalIntakeUpdatedAtom } from '../atom.js';
import { fontSize } from '@mui/system';


const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
    height: 100%;
`;
// const NoData = styled.div`
//     width: 100%;
//     height: 100%;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;
const SearchFoodDBContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const SearchFoodDB = () => {
  const [foodsList, setFoodsList] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [foods, setFoods] = useAtom(foodsAtom);
  const [isTotalIntakeUpdated, setIsTotalIntakeUpdated] = useAtom(isTotalIntakeUpdatedAtom);
  const [dbreceivedFoods, setDbReceivedFoods] = useState([]); // 새로운 상태 dbreceivedFoods를 추가합니다.
  const [selectedFood, setSelectedFood] = useState(null);  // 사용자가 선택한 음식을 저장하는 상태를 추가합니다.

  useEffect(() => {
    console.log("Foods: ", foods);
  }, [foods]);

  useEffect(() => {
    if (selectedFood) {
      setFoods([...dbreceivedFoods, selectedFood]);  // 선택한 음식을 dbreceivedFoods 상태에 추가합니다.
    }
  }, [selectedFood]);  // selectedFood 상태가 변경될 때마다 이 useEffect 훅이 실행됩니다.
  
  const getFoods = async (searchWord) => {
    try {
      const response = await axios.get(`http://localhost:9999/record/foodlist?searchWord=${searchWord}`);
    
      return response.data.slice(0,5);
      
    } catch (error) {
      console.error('Failed to fetch foods', error);
      return [];
    }
  };

  const handleSearch = async (event, food) => { // 엔터키로 검색
    event.preventDefault(); 
    setFoods([...dbreceivedFoods, food]);  // 선택한 음식을 dbreceivedFoods 상태에 추가합니다.
  };

  const handleFoodClick = (event, food) => {
    event.preventDefault();
    setSelectedFood(food);  // 선택한 음식을 selectedFood 상태에 저장합니다.
  };

  // const handleRegisterClick = () => {
  //   if (selectedFood) {
  //     setFoods([...dbreceivedFoods, selectedFood]);  // 선택한 음식을 dbreceivedFoods 상태에 추가합니다.
  //     const data={
  //       userId: sessionStorage.userId,
  //       foodName: selectedFood.foodName,
  //     };
  //     axios.post('/record/food', data, {
  //       headers: {
  //         'Content-Type':'application/json'
  //       },
  //       withCredentials: true
  //     })
  //     .then(response => {
  //       console.log(response.data);
  //       alert('식단이 기록되었습니다!');
  //       setIsTotalIntakeUpdated(true);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  //     setSelectedFood(null);  // 등록 후에는 selectedFood 상태를 초기화합니다.
  //   }
  // };

  return (
    <SearchFoodDBContainer>
      <form onSubmit={handleSearch}>
      <InputContainer>
        <TextField 
          label={'음식 검색'} 
          size="small" 
          style={{ width: '500px', textAlign: 'center', marginBottom: '10px' }}
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)} 
        />
        <StyledButton
          variant="contained"
          onClick={async () => {
            const foods = await getFoods(foodName);
            setFoodsList(foods);
          }}
        >검색</StyledButton>
      </InputContainer>
      </form>
      <div style={{ marginLeft: '270px', textAlign: 'center' }}>
  {foodsList.length > 0 && (
    <table style={{ width: '500px' }}>
      <thead>
        <tr style={{ fontWeight: 'bold' }}>
          <th style={{ width: '20%' }}>음식 이름</th>
          <th style={{ width: '20%' }}>칼로리</th>
          {/* <th style={{ width: '20%' }}>탄수화물</th>
          <th style={{ width: '20%' }}>단백질</th>
          <th style={{ width: '20%' }}>지방</th> */}
        </tr>
      </thead>
      <tbody>
        {foodsList.map((food) => (
          <tr key={food.foodId} onClick={(event) => handleFoodClick(event, food)}>
            <td style={{ width: '30%' }}>{food.foodName}</td>
            <td style={{ width: '20%' }}>{food.foodCal} kcal</td>
            {/* <td style={{ width: '20%' }}>{food.foodCarvo}</td>
            <td style={{ width: '20%' }}>{food.foodProtein}</td>
            <td style={{ width: '20%' }}>{food.foodProvi}</td> */}
            <td style={{ width: '5%', fontSize: '10px'}} onClick={handleFoodClick}>선택</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
</div>

      {/* <NoData>음식을 검색해주세요.</NoData> */}
    </SearchFoodDBContainer>
  );
};

export default SearchFoodDB;

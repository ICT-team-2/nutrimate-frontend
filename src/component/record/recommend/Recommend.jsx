import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { RECOMMEND_CATEGORY } from '@src/component/record/const.js';
import {
  InfoContentContainer,
} from '@src/component/infomation/CommonComponents.jsx';
import PriceCategory from './PriceCategory';
import PriceFoodCard from './PriceFoodCard';
import AllergyFoodCard from './AllergyFoodCard';
import MyDietPayment from './MyDietPayment';
import axios from 'axios';
import { useAtom } from 'jotai';
import { AllergyAtom } from '../atom';
import { userIdAtom } from '@src/pages/login/atom';

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const Recommend = () => {
  const [category, setCategory] = useState(RECOMMEND_CATEGORY.PRICE);
  const [price, setPrice] = useState(2500);
  const [diets, setDiets] = useState({});
  const [allergyDiets, setAllergyDiets] = useState({});
  const [isAllergyCategorySelected, setIsAllergyCategorySelected] = useState(false);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [userAllergy, setUserAllergy] = useAtom(AllergyAtom);

  useEffect(() => { // 가격별
    if (price !== null) {
      fetch(`${import.meta.env.REACT_APP_FLASK_URL}/price?price=${price}`)
        .then((response) => response.json())
        .then((data) => setDiets(data));
    }
  }, [price]);

  useEffect(() => { // 알레르기별
    if (isAllergyCategorySelected) {
      axios.get('/member/mypage', {
        params: {
          userId: sessionStorage.userId,
        },
      })
        .then((response) => {
          const userAllergy = response.data.memberDto.userAllergy;
          setUserAllergy(userAllergy);
        });

      fetch(`${import.meta.env.REACT_APP_FLASK_URL}/allergy?userId=${userId}`, {
        credentials: 'include',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => setAllergyDiets(data))
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [isAllergyCategorySelected]);

  const handleSelectPrice = (price) => {
    setPrice(price);
  };

  const handleNewFood = () => {
    setPrice(price + 1);
  };

  const isPriceCategory = category === RECOMMEND_CATEGORY.PRICE;
  const isAllergyCategory = category === RECOMMEND_CATEGORY.ALLERGY;
  const isSubscriptionCategory = category === RECOMMEND_CATEGORY.DIET;
  return (
    <InfoContentContainer style={{ marginTop: '0px' }}>
      {Object.values(RECOMMEND_CATEGORY).map((value) => (
        <StyledButton
          onClick={() => {
            setCategory(value);
            if (value === RECOMMEND_CATEGORY.ALLERGY) {  // 알레르기 카테고리를 선택했다면
              setIsAllergyCategorySelected(true);  // 알레르기 카테고리 선택 상태를 true로 변경
            }
          }}
          variant={value === category ? 'contained' : 'outlined'}
          key={value}>
          {value}
        </StyledButton>
      ))}
      {isPriceCategory && (
        <>
          <PriceCategory onSelectPrice={handleSelectPrice} />
          <StyledButton onClick={handleNewFood} style={{ marginLeft: '965px', fontSize: '10px' }}>
            새로운 음식 보기
          </StyledButton>
          <PriceFoodCard diets={diets} />
        </>
      )}
      {isAllergyCategory && (
        <>
          <AllergyFoodCard diets={allergyDiets} userAllergy={userAllergy} />
        </>
      )}
      {isSubscriptionCategory && (
        <>
          <MyDietPayment />
        </>
      )}
    </InfoContentContainer>
  );
};

export default Recommend;
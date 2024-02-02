import React from 'react';
import { CategoryButtonContainer } from '@src/component/infomation/CommonComponents.jsx';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { NUTRIENTS_AGE_CATEGORY, NUTRIENTS_GENDER_CATEGORY } from '@src/component/infomation/const.js';
import {
  selectedNutrientsAgeCategoryAtom,
  selectedNutrientsGenderCategoryAtom,
} from '@src/component/infomation/atom.js';
import { useAtom } from 'jotai/react';
import Paper from '@mui/material/Paper';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

const StyledButton = styled(Button)`
    margin-right: 10px;
`;
const AgeContainer = styled(Paper)`
    display: flex;
    width: calc(100% - 20px);
    padding: 10px;
`;
const NutrientCategory = () => {

  const [gender, setGender] = useAtom(selectedNutrientsGenderCategoryAtom);
  const [age, setAge] = useAtom(selectedNutrientsAgeCategoryAtom);

  return (
    <>
      <CategoryButtonContainer>
        <StyledButton
          variant={gender === NUTRIENTS_GENDER_CATEGORY.ALL ? 'contained' : 'outlined'}
          onClick={() => {
            setGender(NUTRIENTS_GENDER_CATEGORY.ALL);
          }}
        >전체</StyledButton>
        <StyledButton
          variant={gender === NUTRIENTS_GENDER_CATEGORY.FEMALE ? 'contained' : 'outlined'}
          onClick={() => {
            setGender(NUTRIENTS_GENDER_CATEGORY.FEMALE);
          }}
        >여성</StyledButton>
        <StyledButton
          variant={gender === NUTRIENTS_GENDER_CATEGORY.MALE ? 'contained' : 'outlined'}
          onClick={() => {
            setGender(NUTRIENTS_GENDER_CATEGORY.MALE);
          }}
        >남성</StyledButton>
      </CategoryButtonContainer>
      <AgeContainer>
        <SelectAgeButton
          title="전체"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.ALL);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.ALL}
        />
        <SelectAgeButton
          title="20대 이하"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.TWENTY);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.TWENTY}
        />
        <SelectAgeButton
          title="30대"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.THIRTY);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.THIRTY}
        />
        <SelectAgeButton
          title="40대"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.FOURTY);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.FOURTY}
        />
        <SelectAgeButton
          title="50대"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.FIFTY);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.FIFTY}
        />
        <SelectAgeButton
          title="60대 이상"
          onClick={() => {
            setAge(NUTRIENTS_AGE_CATEGORY.SIXTY);
          }}
          disabled={age !== NUTRIENTS_AGE_CATEGORY.SIXTY}
        />
      </AgeContainer>
    </>
  );
};

const SelectAgeButton = (props) => {
  const { title, disabled, onClick } = props;
  return (
    <StyledButton onClick={onClick}>
      {disabled
        ? <CheckCircleOutlineRoundedIcon color="disabled" />
        : <CheckCircleRoundedIcon />}
      {title}
    </StyledButton>
  );
};

export default NutrientCategory;

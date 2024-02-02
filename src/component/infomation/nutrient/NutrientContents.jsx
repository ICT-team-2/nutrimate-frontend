import React from 'react';
import { InfoContentContainer } from '@src/component/infomation/CommonComponents.jsx';
import {
  selectedNutrientsAgeCategoryAtom,
  selectedNutrientsGenderCategoryAtom,
} from '@src/component/infomation/atom.js';
import { useAtom } from 'jotai/react';
import NutrientCategory from '@src/component/infomation/nutrient/NutrientCategory.jsx';
import NutrientCard from '@src/component/infomation/nutrient/NutrientCard.jsx';
import styled from 'styled-components';

const CardContainer = styled.div`
    margin-top: 40px;
`;

const NutrientContents = () => {

  const [gender, setGender] = useAtom(selectedNutrientsGenderCategoryAtom);
  const [age, setAge] = useAtom(selectedNutrientsAgeCategoryAtom);

  return (
    <InfoContentContainer>
      <NutrientCategory />
      <CardContainer>
        <NutrientCard />
      </CardContainer>
    </InfoContentContainer>
  );
};


export default NutrientContents;

import React from 'react';
import { InfoContentContainer, PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import {
  selectedNutrientsAgeCategoryAtom,
  selectedNutrientsGenderCategoryAtom,
} from '@src/component/infomation/atom.js';
import { useAtom } from 'jotai/react';
import NutrientCategory from '@src/component/infomation/nutrient/NutrientCategory.jsx';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import NutrientCard from '@src/component/infomation/nutrient/NutrientCard.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';

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
        <Grid container spacing={3}>
          {
            new Array(12).fill(0).map((d, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={d + index}>
                  <NutrientCard ranking={index + 1} />
                </Grid>
              );
            })
          }
        </Grid>
        <PagingContainer>
          <PagnationComponent />
        </PagingContainer>
      </CardContainer>
    </InfoContentContainer>
  );
};


export default NutrientContents;

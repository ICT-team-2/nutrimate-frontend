import React from 'react';
import { InfoContentContainer, PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import { Grid } from '@mui/material';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import RecipeCard from '@src/component/infomation/recipe/RecipeCard.jsx';

const RecipeContents = () => {
  return (
    <InfoContentContainer>
      <Grid container spacing={3}>
        {
          new Array(12).fill(0).map((d, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={d + index}>
                <RecipeCard />
              </Grid>
            );
          })
        }
      </Grid>
      <PagingContainer>
        <PagnationComponent />
      </PagingContainer>
    </InfoContentContainer>
  );
};

export default RecipeContents;

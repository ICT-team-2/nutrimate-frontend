import React from 'react';
import NewsCard from '@src/component/infomation/news/NewsCard.jsx';
import { Button, Grid } from '@mui/material';
import styled from 'styled-components';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import {
  CategoryButtonContainer,
  InfoContentContainer,
  PagingContainer,
} from '@src/component/infomation/CommonComponents.jsx';
import { useAtom } from 'jotai/react';
import { selectedNewsCategoryAtom } from '@src/component/infomation/atom.js';
import { NEWS_CATEGORY } from '@src/component/infomation/const.js';


const StyledButton = styled(Button)`
    margin-right: 10px;
`;

const NewsContents = () => {
  const [category, setCategory] = useAtom(selectedNewsCategoryAtom);
  return (
    <>
      <InfoContentContainer>
        <CategoryButtonContainer>
          <StyledButton
            variant={category === NEWS_CATEGORY.FOOD ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.FOOD);
            }}
          >식단</StyledButton>
          <StyledButton
            variant={category === NEWS_CATEGORY.SPORT ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.SPORT);
            }}
          >운동</StyledButton>
          <StyledButton
            variant={category === NEWS_CATEGORY.NUTRIENTS ? 'contained' : 'outlined'}
            onClick={() => {
              setCategory(NEWS_CATEGORY.NUTRIENTS);
            }}
          >영양제</StyledButton>
        </CategoryButtonContainer>
        <Grid container spacing={3}>
          {
            new Array(12).fill(0).map((d, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <NewsCard />
                </Grid>
              );
            })
          }
        </Grid>
        {/*<PagnationComponent />*/}
      </InfoContentContainer>
      <PagingContainer>
        <PagnationComponent />
      </PagingContainer>
    </>
  );
};

export default NewsContents;

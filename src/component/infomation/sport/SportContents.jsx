import React from 'react';
import { InfoContentContainer, PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import { Grid } from '@mui/material';
import SportCard from '@src/component/infomation/sport/SportCard.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';

const SportContents = () => {
  return (
    <InfoContentContainer>
      <Grid container spacing={4}>
        {
          new Array(12).fill(0).map((d, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={d + index}>
                <SportCard />
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

export default SportContents;

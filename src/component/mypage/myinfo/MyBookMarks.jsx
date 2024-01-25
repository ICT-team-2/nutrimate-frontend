import React from 'react';
import { Grid } from '@mui/material';
import FeedCard from '@src/component/mypage/myinfo/FeedCard.jsx';

const MyBookMarks = () => {
  return (
    <Grid container spacing={3}>
      {
        Array.from({ length: 9 }).map((_, index) => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
              <FeedCard />
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default MyBookMarks;

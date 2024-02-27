import React from 'react';
import { Grid } from '@mui/material';
import MyFeedCard from '@src/component/mypage/myinfo/MyFeedCard.jsx';
import useFetchBookmarkFeedList from '@src/hooks/mypage/useFetchBookmarkFeedList.jsx';
import { useParams } from 'react-router-dom';

const MyFeedBookMarks = () => {

  const { profileUserId } = useParams();
  const { data, isLoading, isError, error } = useFetchBookmarkFeedList(profileUserId);

  return (
    <Grid container spacing={3}>
      {
        data?.pages.map((feedPage, index) => {
          return feedPage?.feedList.map((feed, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <MyFeedCard data={feed} isBookmark />
              </Grid>
            );
          });
        })
      }
    </Grid>
  );
};

export default MyFeedBookMarks;

import { Grid } from '@mui/material';
import MyFeedCard from '@src/component/mypage/myinfo/MyFeedCard.jsx';
import useFetchProfileFeedList from '@src/hooks/mypage/useFetchProfileFeedList.jsx';
import { useEffect } from 'react';


function MyFeedPosts({ profileUserId }) {

  const { data, isLoading, isError, error } = useFetchProfileFeedList(profileUserId);

  return (
    <Grid container spacing={3}>
      {
        data?.pages.map((feedPage, index) => {
          return feedPage?.feedList.map((feed, index) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <MyFeedCard data={feed} />
              </Grid>
            );
          });
        })
      }
    </Grid>


  );
}

export default MyFeedPosts;
import { Grid } from '@mui/material';
import MyFeedCard from '@src/component/mypage/myinfo/MyFeedCard.jsx';
import useFetchProfileFeedList
  from '@src/hooks/common/useFetchProfileFeedList.jsx';
import { useEffect } from 'react';
import * as React from 'react';
import { useParams } from 'react-router-dom';

function MyFeedPosts() {

  const { profileUserId } = useParams();

  const { data } = useFetchProfileFeedList(
    profileUserId);

  if (data?.pages[0]?.feedList?.length === 0) {
    return <div>등록된 글이 없습니다.</div>;
  }

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
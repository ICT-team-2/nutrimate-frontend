import React from 'react';
import MyInfomations from '@src/component/mypage/myinfo/MyInfomations.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import CenteredTabs from '@src/component/mypage/myinfo/CenteredTabs.jsx';
import styled from 'styled-components';
import { useAtomValue } from 'jotai/react';
import { myPageTabAtom } from '@src/component/mypage/atom.js';
import MyInfoPosts from '@src/component/mypage/myinfo/MyInfoPosts.jsx';
import { MY_PAGE_TAB } from '@src/component/mypage/const.js';
import MyFeedPosts from '@src/component/mypage/myinfo/MyFeedPosts.jsx';
import MyBookMarks from '@src/component/mypage/myinfo/MyBookMarks.jsx';


const MyInfoPageContainer = muiStyled(Container)`
  margin-top: 20px;
  width: 60%;
`;
const ContentContainer = styled.div`
    margin-top: 40px;
`;

const MyInfoPage = () => {

  const tab = useAtomValue(myPageTabAtom);

  const contents = () => {
    switch (tab) {
      case MY_PAGE_TAB.INFO:
        return <MyInfoPosts />;
      case MY_PAGE_TAB.FEED:
        return <MyFeedPosts />;
      case MY_PAGE_TAB.BOOKMARK:
        return <MyBookMarks />;
      default:
        return;
    }
  };

  return (
    <MyInfoPageContainer>
      <MyInfomations />
      <hr />
      <CenteredTabs />
      <ContentContainer>
        {contents()}
      </ContentContainer>
    </MyInfoPageContainer>
  );
};

export default MyInfoPage;

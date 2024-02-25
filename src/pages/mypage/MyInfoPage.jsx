import React, { useEffect } from 'react';
import MyInfomations from '@src/component/mypage/myinfo/MyInfomations.jsx';
import { Container } from '@mui/material';
import CenteredTabs from '@src/component/mypage/myinfo/CenteredTabs.jsx';
import styled from 'styled-components';
import { useAtomValue } from 'jotai/react';
import { bookmarkMenuAtom, myPageTabAtom } from '@src/component/mypage/atom.js';
import MyInfoPosts from '@src/component/mypage/myinfo/MyInfoPosts.jsx';
import { BOOKMARK_MENU, MY_PAGE_TAB } from '@src/component/mypage/const.js';
import MyFeedPosts from '@src/component/mypage/myinfo/MyFeedPosts.jsx';
import MyFeedBookMarks from '@src/component/mypage/myinfo/MyFeedBookMarks.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { LINKS, REACT_QUERY_KEYS } from '@src/utils/const.js';
import MyInfoBookmarks from '@src/component/mypage/myinfo/MyInfoBookmarks.jsx';

const OuterContainer = styled.div`
    padding: 0 70px;
    width: 100%;
`;

const MyInfoPageContainer = styled(Container)`
    margin: 20px auto 0;
    max-width: 960px;
`;
const ContentContainer = styled.div`
    margin-top: 40px;
`;

const MyInfoPage = () => {

  const tab = useAtomValue(myPageTabAtom);
  const { profileUserId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(parseInt(profileUserId))) {
      navigate(LINKS.MYINFO + `/${sessionStorage.getItem('userId')}`);
    }
  }, []);


  return (
    <OuterContainer>
      <MyInfoPageContainer>
        <MyInfomations />
        <hr />
        <CenteredTabs />
        <ContentContainer>
          <MyPagePost />
        </ContentContainer>
      </MyInfoPageContainer>
    </OuterContainer>
  );
};

const MyPagePost = () => {
  const tab = useAtomValue(myPageTabAtom);
  const bookmarkMenu = useAtomValue(bookmarkMenuAtom);

  if (tab === MY_PAGE_TAB.INFO) {
    return <MyInfoPosts />;
  }
  if (tab === MY_PAGE_TAB.FEED) {
    return <MyFeedPosts />;
  }
  if (tab === MY_PAGE_TAB.BOOKMARK && bookmarkMenu === BOOKMARK_MENU.INFO) {
    return <MyInfoBookmarks />;
  }
  if (tab === MY_PAGE_TAB.BOOKMARK && bookmarkMenu === BOOKMARK_MENU.FEED) {
    return <MyFeedBookMarks />;
  }
};

export default MyInfoPage;

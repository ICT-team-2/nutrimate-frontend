import React, { useEffect, useRef, useState } from 'react';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import styled from 'styled-components';
import { CustomSearchInput, FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import useFetchFeedList from '@src/component/board/feed/hooks/useFetchFeedList';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver.jsx';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;

`;
const StyledWidthDiv = styled.div`
    width: 500px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;
const ObserveDiv = styled.div`
    height: 30px;
    width: 100%;
`;

/**
 * 피드 상세보기 컴포넌트를 나타내는 함수입니다.
 * @return {JSX.Element} 피드 뷰 컴포넌트
 */
const FeedView = () => {
  const [searchValue, setSearchValue] = useState('');
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchFeedList(searchValue);
  const [observe, unobserve] = useIntersectionObserver(
    () => fetchNextPage(),
    1);
  const observerRef = useRef(null);

  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate(LINKS.FEEDBOARD_WRITE);
  };
  const gotoFeed = () => {
    navigate(LINKS.FEED_BOARD);
  };

  useEffect(() => {
    const observeDiv = observerRef.current;
    if (observeDiv === null) return;
    observe(observeDiv);
    return () => {
      unobserve(observeDiv);
    };
  }, [isLoading]);


  return (
    <ViewContainer>
      <StyledWidthDiv>
        <FlexDiv>
          <CustomSearchInput
            searchValue={searchValue} setSearchValue={setSearchValue}
          />
          <FlexGrowDiv />
          <Button
            variant="contained"
            onClick={gotoFeed}
          >탐색</Button>
          <StyledButton
            variant="contained"
            onClick={gotoWrite}
          >글 작성</StyledButton>
        </FlexDiv>


        {isLoading ? <LoadingComponent /> :
          data && data.pages.map((feedPages, index) => {
            if (feedPages.feedList != null && feedPages.feedList.length > 0)
              return (
                feedPages.feedList.map((feed, index) => (
                  <FeedViewContent key={feed.boardId} {...feed} />
                )));
          })}
      </StyledWidthDiv>
      {hasNextPage && <ObserveDiv ref={observerRef} />}
    </ViewContainer>
  );
};


export default FeedView;

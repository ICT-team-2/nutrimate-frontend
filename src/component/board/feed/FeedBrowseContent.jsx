import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS, NO_IMAGE_PATH } from '@src/utils/const.js';
import useFetchFeedList from '@src/hooks/board/feed/useFetchFeedList.jsx';
import { useEffect, useRef, useState } from 'react';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import useIntersectionObserver from '@src/hooks/useIntersectionObserver.jsx';
import FeedDetailContent from '@src/component/board/feed/FeedDetailContent.jsx';
import FeedBrowseItem from '@src/component/board/feed/FeedBrowseItem.jsx';

const rowCols = [
  {
    rows: 3,
    cols: 4,
  },
  {
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
  {
    rows: 2,
    cols: 2,
  },
];

const ContentContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

const StyledImageList = styled(ImageList)`
    width: 80%;
`;

const StyledButton = styled(Button)`
    margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 80%;
`;

const ObserveDiv = styled.div`
    height: 30px;
    width: 100%;
`;

/**
 * 피드 컨텐츠를 렌더링하는 함수입니다.
 * @return {JSX.Element} 피드 컨텐츠 컴포넌트
 */
const FeedBrowseContent = () => {

  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchFeedList('', 6);
  const navigate = useNavigate();
  const [observe, unobserve] = useIntersectionObserver(
    () => fetchNextPage(),
    1);
  const observerRef = useRef(null);

  const gotoWrite = () => {
    navigate(LINKS.FEED_BOARD_WRITE);
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
    <ContentContainer>
      <ButtonContainer>
        <StyledButton
          variant="contained"
          onClick={gotoWrite}>
          글 작성
        </StyledButton>
      </ButtonContainer>
      <StyledImageList variant="quilted" cols={6} rowHeight={121}>
        {isLoading ? <LoadingComponent /> :
          data && data.pages.map((feedPages, index) => {
            if (feedPages.feedList != null && feedPages.feedList.length > 0)
              return (
                feedPages.feedList.map((feed, index) => (
                  <FeedBrowseItem
                    key={feed.boardId}
                    index={index}
                    item={feed} />
                )));
          })}
      </StyledImageList>

      {hasNextPage && <ObserveDiv ref={observerRef} />}
    </ContentContainer>

  );
};
export default FeedBrowseContent;



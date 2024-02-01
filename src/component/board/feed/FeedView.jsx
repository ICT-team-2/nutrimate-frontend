import React from 'react';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import styled from 'styled-components';
import { CustomSearchInput, FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;

`;
const StyledWidthDiv = styled.div`
    max-width: 600px;
    width: 60%;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

/**
 * 피드 상세보기 컴포넌트를 나타내는 함수입니다.
 * @return {JSX.Element} 피드 뷰 컴포넌트
 */
const FeedView = () => {

  const navigate = useNavigate();
  const gotoWrite = () => {
    navigate(LINKS.FEEDBOARD_WRITE);
  };
  const gotoFeed = () => {
    navigate(LINKS.FEED_BOARD);
  };


  return (
    <ViewContainer>
      <StyledWidthDiv>
        <FlexDiv>
          <CustomSearchInput />
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
        <FeedViewContent />
        <FeedViewContent />
        <FeedViewContent />
      </StyledWidthDiv>
    </ViewContainer>

  );
};

export default FeedView;

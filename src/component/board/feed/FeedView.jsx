import React from 'react';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import styled from 'styled-components';
import {
  CustomSearchInput, FlexDiv,
  FlexGrowDiv,
} from '@src/component/common/GlobalComponents.jsx';

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

/**
 * 피드 상세보기 컴포넌트를 나타내는 함수입니다.
 * @return {JSX.Element} 피드 뷰 컴포넌트
 */
const FeedView = () => {
  return (
    <ViewContainer>
      <StyledWidthDiv>
        <FlexDiv>
          <FlexGrowDiv />
          <CustomSearchInput />
        </FlexDiv>
        <FeedViewContent />
        <FeedViewContent />
        <FeedViewContent />
      </StyledWidthDiv>
    </ViewContainer>
  
  );
};

export default FeedView;

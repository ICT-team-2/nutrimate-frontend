import React from 'react';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import styled from 'styled-components';

const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
/**
 * 피드 상세보기 컴포넌트를 나타내는 함수입니다.
 * @return {JSX.Element} 피드 뷰 컴포넌트
 */
const FeedView = () => {
  return (
    <ViewContainer>
      <FeedViewContent />
      <FeedViewContent />
      <FeedViewContent />
    </ViewContainer>
  );
};

export default FeedView;

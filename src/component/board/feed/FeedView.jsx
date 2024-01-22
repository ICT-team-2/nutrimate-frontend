import React from 'react';
import FeedViewContent from '@src/component/board/feed/FeedViewContent.jsx';
import styled from 'styled-components';
 
const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

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

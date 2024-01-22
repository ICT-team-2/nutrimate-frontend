import React from 'react';
import FeedWrite from '@src/component/board/feed/FeedWrite.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';


const FeedBoardWriteContainer = muiStyled(Container)`
    margin-top: 20px;
`;

const FeedBoardWritePage = () => {
  return (
    <FeedBoardWriteContainer>
      <FeedWrite />
    </FeedBoardWriteContainer>
  );
};

export default FeedBoardWritePage;

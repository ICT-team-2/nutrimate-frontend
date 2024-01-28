import React from 'react';
import styled from 'styled-components';
import CommentInput from '@src/component/board/info/view/CommentInput.jsx';
import InfoCommentList from '@src/component/board/info/view/InfoCommentList.jsx';
import Typography from '@mui/material/Typography';

const CommentContainer = styled.div`
    margin-bottom: 30px;
`;

const InfoComments = () => {
  return (
    <CommentContainer>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>댓글 목록</Typography>
      <CommentInput />
      <InfoCommentList />
    </CommentContainer>
  );
};

export default InfoComments;

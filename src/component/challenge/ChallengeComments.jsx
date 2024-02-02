import React from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import ChallengeCommentList
  from '@src/component/challenge/ChallengeCommentList.jsx';
import ChallengeCommentInput
  from '@src/component/challenge/ChallengeCommentInput.jsx';
import Paper from '@mui/material/Paper';

const CommentContainer = styled(Paper)`
    margin-bottom: 30px;
    padding: 30px;
`;

const TitleTypography = styled(Typography)`
    font-weight: bold;
    margin-bottom: 10px;
`;

const ChallengeComments = () => {
  return (
    <CommentContainer>
      <TitleTypography
        variant='subtitle1'>댓글 목록</TitleTypography>
      <ChallengeCommentInput />
      <ChallengeCommentList />
    </CommentContainer>
  );
};

export default ChallengeComments;

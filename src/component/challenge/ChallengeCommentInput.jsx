import React from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';

const MIN_HEIGHT = 40;

const CommentInputContainer = styled.div`
    min-height: ${MIN_HEIGHT}px;
    display: flex;
    justify-content: space-between;
`;
const StyledSendButton = muiStyled(Button)`
  margin-left: 10px;
  min-height: ${MIN_HEIGHT}px;
`;
const CommentInputTextField = muiStyled(TextField)`
  min-height: ${MIN_HEIGHT}px;
  width: 95%;
`;

const ChallengeCommentInput = () => {
  return (
    <CommentInputContainer>
      <CommentInputTextField multiline size='small' label='댓글' />
      <StyledSendButton variant='contained'>
        <SendIcon />
      </StyledSendButton>
    </CommentInputContainer>
  );
};

export default ChallengeCommentInput;

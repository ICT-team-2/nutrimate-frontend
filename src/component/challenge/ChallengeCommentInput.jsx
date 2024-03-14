import React, { useState, useAtom, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import axios from 'axios';
import { TOAST_OPTIONS } from '@src/utils/const.js';
import { toast } from 'react-toastify';

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


const ChallengeCommentInput = (props) => {
  const { userId, onhandleComment, commentMessage, cmtId, onhandleEdit } = props;
  const [comment, setComment] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      setComment('');
      event.preventDefault();
    }
  };

  const sendMessage = () => {

    if (typeof commentMessage === 'string') {

      onhandleEdit(comment);
      axios.put(`${import.meta.env.REACT_APP_BACKEND_URL}/challenge/comment/list/edit`, {
        'cmtContent': comment,
        'cmtId': cmtId,

      }).then(data => {
        if (data.data.SUCCESSNOT) {
          toast.warn('수정에 실패했습니다.');
        }
        setComment('');
      })
        .catch(error => {
          toast.warn('수정에 실패했습니다.');
        });


    } else {
      axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/challenge/comment/record`, {
        'cmtContent': comment,
        'userId': userId,

      }).then(data => {
        onhandleComment(comment, data.data.cmtId);
        if (data.data.SUCCESSNOT) {
          toast.error('입력에 실패했습니다.', TOAST_OPTIONS.ERROR);
        }
        setComment('');
      })
        .catch(error => {
          toast.error('입력에 실패했습니다.', TOAST_OPTIONS.ERROR);
        });
    }
  };

  useEffect(() => {
    setComment(commentMessage);

  }, [commentMessage]);


  const handleInputChange = (event) => {
    setComment(event.target.value);
  };
  return (
    <CommentInputContainer>
      <CommentInputTextField
        size="small"
        label={typeof commentMessage === 'string' ? '' : '메세지를 입력하세요'}
        multiline
        value={comment}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp} />

      <StyledSendButton variant="contained" onClick={sendMessage}>
        {typeof commentMessage === 'string' ? '수정' : <SendIcon />}
      </StyledSendButton>
    </CommentInputContainer>
  );
};

export default ChallengeCommentInput;

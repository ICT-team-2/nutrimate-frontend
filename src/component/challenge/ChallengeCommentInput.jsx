import React, { useState, useAtom, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import axios from 'axios';

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
        console.log(data);
        if (data.data.SUCCESSNOT) {
          alert('수정에 실패했습니다.');
        }
        setComment('');
      })
        .catch(error => {
          alert('수정에 실패했습니다.');
        });


    } else {
      axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/challenge/comment/record`, {
        'cmtContent': comment,
        'userId': userId,

      }).then(data => {

        console.log(data.data.cmtId);
        onhandleComment(comment, data.data.cmtId);
        if (data.data.SUCCESSNOT) {
          alert('입력에 실패했습니다.');
        }
        setComment('');
      })
        .catch(error => {
          alert('입력에 실패했습니다.');
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

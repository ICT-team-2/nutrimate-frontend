import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { commentEditDataAtom, isCommentEditAtom, replyChipDataAtom } from '@src/component/board/atom.js';
import Chip from '@mui/material/Chip';
import useInputComment from '@src/hooks/board/common/comment/useInputComment.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { INIT_EDIT_COMMENT_STATE } from '@src/component/board/const.js';
import useEditComment from '@src/hooks/board/common/comment/useEditComment.jsx';
import useInputReply from '@src/hooks/board/common/comment/useInputReply.jsx';
import { useSetAtom } from 'jotai/react';

const CommentInputContainer = styled.div`
    display: flex;
`;

const StyledTextField = styled(TextField)`
    width: calc(100% - 100px);


`;
const StyledButton = styled(Button)`
    height: 40px;
    margin-left: 5px;
`;

const CommentEditTextField = (props) => {
  const [commentEditData, setCommentEditData] = useAtom(commentEditDataAtom);
  const [inputValue, setInputValue] = useState('');
  const { boardId } = props;
  const editComment = useEditComment(boardId);
  const setIsCommentEdit = useSetAtom(isCommentEditAtom);

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '') {
      setCommentEditData(INIT_EDIT_COMMENT_STATE);
      setIsCommentEdit(false);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      clickEditCommentButton(event);
    }
  };

  const clickEditCommentButton = (e) => {
    e.stopPropagation();
    //댓글 수정
    editComment.mutate({
      cmtId: commentEditData.cmtId,
      cmtContent: inputValue,
    });
    setInputValue('');
    setIsCommentEdit(false);
    setCommentEditData(INIT_EDIT_COMMENT_STATE);
  };


  useEffect(() => {
    if (commentEditData.cmtContent === '') return;
    setInputValue(commentEditData.cmtContent);
  }, [commentEditData.cmtContent]);


  return (
    <CommentInputContainer>
      <StyledTextField
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        size="small"
        inputRef={props.inputRef}
      />
      <FlexGrowDiv />
      <StyledButton
        variant="contained"
        onClick={(e) => {
          clickEditCommentButton(e);
        }}
      >댓글수정</StyledButton>
    </CommentInputContainer>
  );
};

export default CommentEditTextField;

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import CommentInput from '@src/component/board/info/view/CommentInput.jsx';
import InfoCommentList from '@src/component/board/info/view/InfoCommentList.jsx';
import Typography from '@mui/material/Typography';
import { useAtom } from 'jotai';
import { isCommentEditAtom } from '@src/component/board/atom.js';
import CommentInputTextField from '@src/component/board/CommentInputTextField.jsx';
import CommentEditTextField from '@src/component/board/CommentEditTextField.jsx';

const CommentContainer = styled.div`
    margin-bottom: 30px;
`;

const InfoComments = ({ boardId }) => {
  const [isEdit, setIsEdit] = useAtom(isCommentEditAtom);//댓글 수정 모드인지
  const commentInputRef = useRef(null);
  const commentEditRef = useRef(null);

  useEffect(() => {
    setIsEdit(false);
  }, []);
  
  return (
    <CommentContainer>
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>댓글 목록</Typography>
      {!isEdit ? <CommentInputTextField
          inputRef={commentInputRef}
          size="small"
          boardId={boardId}
        /> :
        <CommentEditTextField
          inputRef={commentEditRef}
          size="small"
          boardId={boardId}
        />}
      <InfoCommentList
        inputRef={commentInputRef}
        editRef={commentEditRef}
      />
    </CommentContainer>
  );
};

export default InfoComments;

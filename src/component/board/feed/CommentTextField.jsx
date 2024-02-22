import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { commentEditDataAtom, replyChipDataAtom } from '@src/component/board/atom.js';
import Chip from '@mui/material/Chip';
import useInputComment from '@src/component/board/feed/hooks/useInputComment.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { INIT_EDIT_COMMENT_STATE } from '@src/component/board/const.js';
import useEditComment from '@src/component/board/feed/hooks/useEditComment.jsx';
import useInputReply from '@src/component/board/feed/hooks/useInputReply.jsx';

const CommentInputContainer = styled.div`
    display: flex;
`;

const StyledTextField = styled(TextField)`
    width: calc(100% - 100px);

    & input {
        padding-left: ${({ isreply }) => isreply === 'true' ? '10px' : 0};
    }
`;
const StyledButton = styled(Button)`
    height: 40px;
    margin-left: 5px;
`;

const CommentTextField = (props) => {
  const [chipData, setChipData] = useAtom(replyChipDataAtom);
  const [commentEditData, setCommentEditData] = useAtom(commentEditDataAtom);
  const [inputValue, setInputValue] = useState('');
  const { boardId } = props;
  const inputComment = useInputComment(boardId);
  const editComment = useEditComment(boardId);
  const inputReply = useInputReply(boardId);

  const handleDelete = () => () => {
    setChipData([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '') {
      setChipData([]);
      setCommentEditData(INIT_EDIT_COMMENT_STATE);
    }
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      // 여기에 mutate 추가
      uploadComment();
    }
  };
  const clickCommentButton = () => {
    if (inputValue.trim() !== '') {
      uploadComment();
    }
  };

  const uploadComment = () => {
    //댓글 달기
    if (chipData.length === 0) {
      inputComment.mutate({ cmtContent: inputValue });
      setInputValue('');
      return;
    }
    //대댓글 달기
    inputReply.mutate({
      ...chipData[0]
      , cmtContent: inputValue,
    });
    setInputValue('');
    setChipData([]);
  };

  const clickEditCommentButton = () => {
    //댓글 수정
    editComment.mutate({
      cmtId: commentEditData.cmtId,
      cmtContent: inputValue,
    });
    setInputValue('');
    setCommentEditData(INIT_EDIT_COMMENT_STATE);
  };

  useEffect(() => {
    if (chipData.length === 0) {
      setInputValue('');
    }
  }, [chipData]);

  useEffect(() => {
    setChipData([]);
    setCommentEditData(INIT_EDIT_COMMENT_STATE);
  }, []);

  useEffect(() => {
    if (chipData.length === 0) return;
    setInputValue(chipData[0]?.cmtContent);
  }, [chipData[0]?.cmtContent]);

  useEffect(() => {
    if (commentEditData.cmtContent === '') return;
    setInputValue(commentEditData.cmtContent);
  }, [commentEditData?.cmtContent]);


  return (
    <CommentInputContainer>
      <StyledTextField
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        isreply={(chipData.length > 0) + ''}
        InputProps={{
          startAdornment: (chipData.map((data, index) => (
              <Chip
                key={`${data.cmtRef}-${index}`}
                label={data.replyNick}
                onDelete={handleDelete()}
              />))
          ),
        }}
        size="small"
        inputRef={props.inputRef}
      />
      <FlexGrowDiv />
      {commentEditData.cmtContent === '' ?
        <StyledButton
          variant="contained"
          onClick={() => {
            clickCommentButton();
          }}
        >{chipData.length === 0 ? '댓글달기' : '답글달기'}</StyledButton>
        :
        <StyledButton
          variant="contained"
          onClick={() => {
            clickEditCommentButton();
          }}
        >댓글수정</StyledButton>
      }
    </CommentInputContainer>
  );
};

export default CommentTextField;

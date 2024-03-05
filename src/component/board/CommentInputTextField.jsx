import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { useAtom } from 'jotai';
import { commentEditDataAtom, isCommentEditAtom, replyChipDataAtom } from '@src/component/board/atom.js';
import Chip from '@mui/material/Chip';
import useInputComment from '@src/hooks/board/common/comment/useInputComment.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import useInputReply from '@src/hooks/board/common/comment/useInputReply.jsx';
import { useSetAtom } from 'jotai/react';
import { INIT_EDIT_COMMENT_STATE } from '@src/component/board/const.js';

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

const CommentInputTextField = (props) => {
  const [chipData, setChipData] = useAtom(replyChipDataAtom);
  const [inputValue, setInputValue] = useState('');
  const { boardId } = props;
  const inputComment = useInputComment(boardId);
  const inputReply = useInputReply(boardId);
  const setIsCommentEdit = useSetAtom(isCommentEditAtom);
  const setCommentEditData = useSetAtom(commentEditDataAtom);

  const handleDelete = () => () => {
    setChipData([]);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace' && inputValue === '') {
      setChipData([]);
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
  const clickCommentButton = (e) => {
    e.stopPropagation();
    uploadComment();
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
    setIsCommentEdit(false);
  };


  useEffect(() => {
    if (chipData.length === 0) {
      setInputValue('');
    }
  }, [chipData]);

  useEffect(() => {
    setChipData([]);
  }, []);

  useEffect(() => {
    if (chipData.length === 0) return;
    setInputValue(chipData[0]?.cmtContent);
  }, [chipData[0]?.cmtContent]);
  useEffect(() => {
    setCommentEditData(INIT_EDIT_COMMENT_STATE);
  }, []);

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
      <StyledButton
        variant="contained"
        onClick={(e) => {
          clickCommentButton(e);
        }}
      >{chipData.length === 0 ? '댓글달기' : '답글달기'}</StyledButton>
    </CommentInputContainer>
  );
};

export default CommentInputTextField;

import React, { useState } from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EDITOR_HEIGHT, TITLE } from '@src/utils/const.js';
import { useLocation } from 'react-router-dom';
import { styled as muiStyled } from '@mui/material/styles';
import BoardEditor from '@src/component/board/info/write/BoardEditor.jsx';
import styled from 'styled-components';
import WriteCategoryMenu from '@src/component/board/info/write/WriteCategoryMenu.jsx';

const InlineTypography = muiStyled(Typography)`
    display: inline-block;
    margin-right: 10px;
`;
const InfoBoardContainer = muiStyled(Container)`
    margin-top: 20px;
    width: 90%;
    margin-left: 65px;
`;
const EditorContainer = styled.div`
    margin-top: 20px;
    height: ${EDITOR_HEIGHT + 100}px;
`;


//정보 공유 게시판 글 작성 내용
const InfoBoardWrite = (props) => {
  // console.log(useLocation());
  const [title, setTitle] = useState(useLocation()?.state.title);

  return (
    <InfoBoardContainer>
      {/* 제목 */}
      <InlineTypography variant="h5">{TITLE.BOARD_WRITE}</InlineTypography>
      {/*카테고리 */}
      <WriteCategoryMenu setTitle={setTitle} title={title} />

      {/* 식단 or 운동코스 등록(지도) */}

      {/* 에디터 */}
      <EditorContainer>
        <BoardEditor />
      </EditorContainer>

    </InfoBoardContainer>
  );
};

export default InfoBoardWrite;

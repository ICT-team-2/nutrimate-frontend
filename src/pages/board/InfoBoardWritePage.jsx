import React, { useState } from 'react';
import { Button, Container, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EDITOR_HEIGHT, TITLE } from '@src/utils/const.js';
import { useLocation } from 'react-router-dom';
import { styled as muiStyled } from '@mui/material/styles';
import BoardEditor from '@src/component/board/info/write/BoardEditor.jsx';
import styled from 'styled-components';
import FoodImgAnaylsis from '@src/component/board/info/write/FoodImgAnaylsis.jsx';
import InputHashtag from '@src/component/board/InputHashtag.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { BOARD } from '@src/component/board/const.js';
import loadable from '@loadable/component';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import WriteCategoryButtons from '@src/component/board/info/write/WriteCategoryButtons.jsx';

const LoadableMap = loadable(
  () => import('@src/component/board/info/write/KakaoMap.jsx'),
  {
    fallback: <LoadingComponent />,
  });

const InlineTypography = muiStyled(Typography)`
    display: inline-block;
    margin-right: 10px;
`;
const InfoBoardContainer = muiStyled(Container)`
    margin-top: 20px;
    width: 90%;
`;
const EditorContainer = styled.div`
    margin-top: 20px;
    min-height: ${EDITOR_HEIGHT + 70}px;
`;
const BottomContainer = styled.div`
    margin: 30px 0;
`;
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const InputHashtagContainer = styled.div`
    padding: 20px 0;
`;

//정보 공유 게시판 글 작성 내용
const InfoBoardWritePage = (props) => {
  const [title, setTitle] = useState(useLocation()?.state.title);

  return (
    <InfoBoardContainer>
      <TitleContainer>
        {/* 제목 */}
        <InlineTypography variant="h5">{TITLE.BOARD_WRITE}</InlineTypography>
        {/*카테고리 */}
        <WriteCategoryButtons title={title} setTitle={setTitle} />
        {/* <WriteCategoryMenu setTitle={setTitle} title={title} /> */}
        <FlexGrowDiv />
        <Button variant="contained">등록</Button>
      </TitleContainer>
      <TextField label="제목" size="small" />
      {/* 식단 or 운동코스 등록(지도) */}
      {title !== BOARD.INFO.FOOD.TITLE ?
        <LoadableMap /> : <FoodImgAnaylsis />
      }

      {/* 해시태그 입력 */}
      <InputHashtagContainer>
        <InputHashtag />
      </InputHashtagContainer>
      {/* 에디터 */}
      <EditorContainer>
        <BoardEditor />

      </EditorContainer>

      <BottomContainer>
      </BottomContainer>
    </InfoBoardContainer>
  );
};

export default InfoBoardWritePage;

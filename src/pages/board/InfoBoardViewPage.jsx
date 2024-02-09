import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { FlexGrowDiv, Seperator } from '@src/component/common/GlobalComponents.jsx';
import LikeButton from '@src/component/board/LikeButton.jsx';
import styled from 'styled-components';
import { EDITOR_HEIGHT } from '@src/utils/const.js';
import ViewHashtag from '@src/component/board/info/view/ViewHashtag.jsx';
import InfoComments from '@src/component/board/info/view/InfoComments.jsx';
import KakaoMap from '@src/component/board/KakaoMap';

const InfoBoardViewContainer = muiStyled(Container)`
  margin-top: 20px;
`;

const WriterTypo = muiStyled(Typography)`

  margin: 10px 0 ;
  display: flex;
  align-items: center;
`;

const Categorydiv = styled.div`
    color: ${({ theme }) => theme['light-color']};
    margin-left: 5px;
`;
const BodyTypo = muiStyled(Typography)`
  margin-top: 30px;
  min-height: ${EDITOR_HEIGHT}px;
`;
const HashtagContainer = styled.div`
    display: flex;
`;

const InfoBoardViewPage = () => {
  const { boardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(boardId)) {
      navigate('/404NotFound');
    }
  }, [boardId]);

  return (
    <InfoBoardViewContainer>
      <Typography variant="h6">제목1</Typography>
      {/* 작성자, 카테고리, 좋아요 버튼, 작성일 */}
      <WriterTypo variant="subtitle2">
        <div>작성자 {Seperator} </div>
        <Categorydiv>식단</Categorydiv>
        <FlexGrowDiv />
        <LikeButton viewCount />
        <div>작성일: 2022.01.01</div>
      </WriterTypo>
      {/* 해시태그 */}
      <HashtagContainer>
        <ViewHashtag />
      </HashtagContainer>
      {/* 내용 */}
      <BodyTypo variant="body1">
    
      내용1
      </BodyTypo>
      <InfoComments />
    </InfoBoardViewContainer>
  );
};

export default InfoBoardViewPage;

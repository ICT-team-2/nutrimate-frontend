import React, { useState, useEffect } from 'react';
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

import KakaoMap from '@src/component/board/KakaoMap';
import axios from 'axios';


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

  const [board, setBoard] = useState(null);

  useEffect(() => {
    if (isNaN(boardId)) {
      navigate('/404NotFound');
    }
  }, [boardId]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(`/boards/sport/${boardId}`); 
        setBoard(response.data);
      } catch (error) {
        console.error(error);
        alert('게시글을 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchBoard();
  }, [boardId]);

  if (!board) return null;  // 게시글 데이터가 아직 없는 경우 렌더링을 하지 않습니다.

  return (
    <InfoBoardViewContainer>

    <Typography variant="h6">{board.title}</Typography>
    <WriterTypo variant="subtitle2">
      <div>{board.writer} {Seperator} </div>
      <Categorydiv>{board.category}</Categorydiv>
      <FlexGrowDiv />
      <LikeButton viewCount />
      <div>{board.mapPaths}</div>  
    </WriterTypo>
    <HashtagContainer>
      <ViewHashtag hashtag={board.hashtag} />  
    </HashtagContainer>
    <BodyTypo variant="body1">
      {board.content}
    </BodyTypo>
    <InfoComments />
  </InfoBoardViewContainer>

  );
};

export default InfoBoardViewPage;

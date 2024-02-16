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
import axios from 'axios';
import useInitMapData from '@src/component/board/hooks/useInitMapData.jsx';
import { DUMMY_USER } from '@src/utils/const.js';

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
  const [hashtag, setHashTag] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  //const [likeId, setLikeId] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // useInitMapData(JSON.parse(board?.mapPaths ?? '[]'), board?.mapDistances, { lat: board?.mapCenterLat, lng: board?.mapCenterLng });
  const initMapData = useInitMapData();

  const fetchBoard = async () => {
    try {
      const response = await axios.get(`/boards/sport/${boardId}`);
      console.log(response.data);
      setBoard(response.data.current);  // current만 저장
      setLikeCount(response.data.current.likeCount);
      return response.data.current;
    } catch (error) {
      console.error(error);
      alert('게시글을 불러오는 중 오류가 발생했습니다.');
    }
  };

  const fetchHashtags = async () => {
    try {
      const response = await axios.get(`/boards/sport/${boardId}/hashtag`);
      if (response.data[0]?.message !== '해시태그가 없습니다') { // 해시태그가 있으면 상태 업데이트
        setHashTag(response.data);
      } else {
        setHashTag(null); // 해시태그가 없으면 상태를 null로 설정
      }
    } catch (error) {
      console.error(error);
      alert('해시태그를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const response = await axios.post(`boards/sport/like/check`, {
        userId: DUMMY_USER.USER_ID,
        boardId: boardId,
      });
      setIsLiked(response.data.message === '좋아요를 이미 눌렀어요');
      // setLikeId(response.data.likeId);
    } catch (error) {
      console.error(error);
      alert('좋아요 상태를 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleLikeClick = async (e) => {

    setDisabled(true);
    try {
      const likeDto = {
        //likeId,
        userId: DUMMY_USER.USER_ID,
        boardId: boardId,
      };
      let response;
      if (isLiked) {
        console.log('likeDto:', likeDto);
        response = await axios.delete(`/boards/sport/${boardId}/likes`, { data: likeDto });
      } else {
        response = await axios.post(`/boards/sport/${boardId}/likes`, likeDto);
      }
      await fetchLikeStatus();
      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error('좋아요 업데이트 중 오류 발생:', error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [boardResponse, hashtagsResponse] = await Promise.all([fetchBoard(), fetchHashtags()]);
      setBoard(boardResponse);
      // setHashTag(hashtagsResponse);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   fetchBoard();
  //   fetchLikeStatus();
  // }, []);

  useEffect(() => {
    if (board == null) return;
    initMapData(JSON.parse(board?.mapPaths), JSON.parse(board?.mapDistances), {
      lat: board?.mapCenterLat,
      lng: board?.mapCenterLng,
    });
  }, [board]);

  useEffect(() => {
    if (isNaN(boardId)) {
      navigate('/404NotFound');
    }
  }, [boardId]);

  useEffect(() => {
    fetchBoard().then((board) => {
      console.log('BOARD:', board);
    });
    fetchLikeStatus().then((likeStatus) => {

    });
  }, [boardId]);

  useEffect(() => {
    console.log('HASHTAG', hashtag);
  }, [hashtag]);

  if (!board) return null;  // 게시글 데이터가 아직 없는 경우

  return (
    <InfoBoardViewContainer>
      <Typography variant="h6">{board.boardTitle}</Typography>
      <WriterTypo variant="subtitle2">
        <div>{board.userNick} {Seperator} </div>
        <Categorydiv>{board.boardCategory === 'exercise' ? '운동' : category}</Categorydiv>
        <FlexGrowDiv />
        <LikeButton
          viewCount
          like={likeCount}
          clicked={isLiked}
          boardId={boardId}
          onClick={handleLikeClick}
          disabled={disabled}
        /> {/* 좋아요 수 */}
        <div>{board.createdDate}</div>
        {/* 작성일 */}
      </WriterTypo>
      {hashtag && (
        <HashtagContainer>
          <ViewHashtag hashtags={hashtag} />
        </HashtagContainer>
      )}
      <KakaoMap
        nogps
        mapZoomlevel={board.mapZoomlevel}
        readonly={true}
      />
      <BodyTypo variant="body3">
        {board.boardContent}
      </BodyTypo>
      <InfoComments />
    </InfoBoardViewContainer>
  );
};

export default InfoBoardViewPage;

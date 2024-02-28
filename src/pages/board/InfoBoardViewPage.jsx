import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import { FlexGrowDiv, Seperator } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import ViewHashtag from '@src/component/board/info/view/ViewHashtag.jsx';
import InfoComments from '@src/component/board/info/view/InfoComments.jsx';
import KakaoMap from '@src/component/board/KakaoMap';
import useInitMapData from '@src/component/board/info/hooks/useInitMapData.jsx';
import BoardBookmarkButton from '@src/component/board/BoardBookmarkButton.jsx';
import { BOARD } from '@src/component/board/const.js';
import BoardLikeButton from '@src/component/board/BoardLikeButton.jsx';
import useFetchDietBoardDetail from '@src/hooks/board/info/diet/useFetchDietBoardDetail.jsx';
import useFetchSportBoardDetail from '@src/hooks/board/info/sport/useFetchSportBoardDetail.jsx';
import { NO_IMAGE_PATH } from '@src/utils/const.js';

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

const BodyTypo = styled(Typography)`
    margin: 40px 0;
    min-height: 200px;
`;

const HashtagContainer = styled.div`
    display: flex;
`;

const FoodImage = styled.img`
    max-width: 50%;
    margin-right: 20px;
`;
const FoodImageContainer = styled.div`
    display: flex;
    margin-top: 20px;
    max-width: 100%;
`;

const InfoBoardViewPage = (props) => {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { category } = state;
  const {
    isLoading: dietLoading,
    refetch: dietRefetch,
  } = useFetchDietBoardDetail(parseInt(boardId), category);
  const {
    isLoading: sportLoading,
    refetch: sportRefetch,
  } = useFetchSportBoardDetail(parseInt(boardId), category);
  const [data, setData] = useState(null);

  // useInitMapData(JSON.parse(board?.mapPaths ?? '[]'),
  // board?.mapDistances,
  // { lat: board?.mapCenterLat, lng: board?.mapCenterLng });
  const initMapData = useInitMapData();

  useEffect(() => {
    initMapData();
    if (isNaN(parseInt(boardId))) {
      navigate('/404NotFound');
    }
    if (category === BOARD.INFO.FOOD.CATEGORY) {
      dietRefetch()
        .then((res) => {
          setData(res.data);
        });
    } else {
      sportRefetch()
        .then((res) => {
          setData(res.data);
        });
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);


  return (
    <InfoBoardViewContainer>
      <Typography variant="h6">{data?.boardTitle}</Typography>
      <WriterTypo variant="subtitle2">
        <div>{data?.userNick} {Seperator} </div>
        <Categorydiv>{convertCategoryToTitle(category)}</Categorydiv>
        <FlexGrowDiv />
        <BoardLikeButton
          boardId={parseInt(boardId)}
          like={data?.likeCount}
          clicked={data?.checkedLike === 1}
          viewCount
        /> {/* 좋아요 수 */}
        <BoardBookmarkButton
          clicked={data?.checkedBookmark === 1}
          boardid={parseInt(boardId)} />
      </WriterTypo>
      <HashtagContainer>
        <ViewHashtag />
      </HashtagContainer>
      {category === BOARD.INFO.FOOD.CATEGORY &&
        <FoodImageContainer>
          <FoodImage
            src={import.meta.env.REACT_APP_BACKEND_URL + data?.fbImg}
            onError={(event) => {
              event.target.src = NO_IMAGE_PATH;
            }} />
        </FoodImageContainer>}
      {category === BOARD.INFO.SPORT.CATEGORY &&
        <KakaoMap
          nogps
          mapZoomlevel={3}
          readonly
        />}
      <BodyTypo variant="body2">
        {data?.boardContent}
      </BodyTypo>
      <InfoComments />
    </InfoBoardViewContainer>
  );
};

const convertCategoryToTitle = (category) => {
  return Object.values(BOARD.INFO).filter((v) => {
    return v.CATEGORY === category;
  })[0].TITLE;
};

export default InfoBoardViewPage;

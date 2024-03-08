import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EDITOR_HEIGHT, TITLE } from '@src/utils/const.js';
import { useLocation, useParams } from 'react-router-dom';
import BoardEditor from '@src/component/board/info/write/BoardEditor.jsx';
import styled from 'styled-components';
import FoodImgAnaylsis
  from '@src/component/board/info/write/FoodImgAnaylsis.jsx';
import InputHashtag from '@src/component/board/InputHashtag.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { BOARD, INIT_MAP_STATE } from '@src/component/board/const.js';
import loadable from '@loadable/component';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import TextField from '@mui/material/TextField';
import { useAtom, useSetAtom } from 'jotai/react';
import {
  inputHashTagAtom,
  mapCenterAtom,
  mapDistancesAtom,
  mapPathsAtom,
  mapRefAtom,
  quillRefAtom,
} from '@src/component/board/atom.js';
import useInitMapData from '@src/component/board/info/hooks/useInitMapData.jsx';
import DOMPurify from 'dompurify';

import { useNavigate } from 'react-router-dom';
import { userIdAtom } from '@src/pages/login/atom.js';
import { foodIdAtom } from '@src/component/board/info/atom.js';
import { base64toFile } from '@src/utils/functions.js';
import useFetchDietBoardDetail from '@src/hooks/board/info/diet/useFetchDietBoardDetail.jsx';
import useFetchSportBoardDetail from '@src/hooks/board/info/sport/useFetchSportBoardDetail.jsx';
import useEditDietBoard from '@src/hooks/board/info/diet/useEditDietBoard.jsx';
import useEditSportBoard from '@src/hooks/board/info/sport/useEditSportBoard.jsx';
import OcrModal from '@src/component/board/OcrModal.jsx';


const LoadableMap = loadable(
  () => import('@src/component/board/KakaoMap.jsx'),
  {
    fallback: <LoadingComponent />,
  });

const InlineTypography = styled(Typography)`
    display: inline-block;
    margin-right: 10px;
`;
const InfoBoardContainer = styled(Container)`
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

const StyledTextField = styled(TextField)`
    margin-bottom: 20px;
`;
const StyledButton = styled(Button)`
    min-width: 40px;
    padding: 0;
`;

//정보 공유 게시판 글 작성 내용
const InfoBoardEditPage = (props) => {
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

  const [title, setTitle] = useState('');

  //식단 이미지
  const [selectedImage, setSelectedImage] = useState(null);
  const [foodId, setFoodId] = useAtom(foodIdAtom);

  // 지도 정보 서버 저장용
  const [mapPaths, setMapPaths] = useAtom(mapPathsAtom);
  const [mapDistances, setMapDistances] = useAtom(mapDistancesAtom);
  const [mapCenter, setMapCenter] = useAtom(mapCenterAtom);
  //map dom
  const [mapRefState, setMapRefState] = useAtom(mapRefAtom);

  //에디터 글 가져오기
  const [quillRefState, setQuillRefState] = useAtom(quillRefAtom);
  const [inputHashTag, setInputHashTag] = useAtom(inputHashTagAtom);

  const editDietBoard = useEditDietBoard(parseInt(boardId));
  const editSportBoard = useEditSportBoard(parseInt(boardId));

  // 지도 정보를 초기화
  const initMapData = useInitMapData();
  useEffect(() => {
    initMapData();
    setInputHashTag([]);
    if (isNaN(parseInt(boardId))) {
      navigate('/404NotFound');
    }
    if (category === BOARD.INFO.FOOD.CATEGORY) {
      dietRefetch()
        .then((res) => {
          setData(res.data);
          setFoodId(res.data?.foodList.map((f) => f.foodId));
        });
    } else {
      sportRefetch()
        .then((res) => {
          setData(res.data);
          initMapData(JSON.parse(res.data?.mapPaths ?? '[]'),
            JSON.parse(res.data?.mapDistances ?? '[]'),
            { lat: res.data?.mapCenterLat, lng: res.data?.mapCenterLng });
        });
    }
  }, []);

  useEffect(() => {
    console.log(data);
    if (data === null) return;
    setTitle(data.boardTitle);
    setInputHashTag(data.tagNameList ? data.tagNameList.map((item, index) => {
      return {
        label: item,
        key: index,
      };
    }) : []);
  }, [data]);


  const handleEditBoard = () => {
    if (category === BOARD.INFO.FOOD.CATEGORY) {
      editDietBoard.mutate({
        boardId: parseInt(boardId),
        boardTitle: title,
        boardContent: DOMPurify.sanitize(quillRefState.value),
        tagNameList: inputHashTag.map((item) => item.label),
        files: selectedImage ? base64toFile(selectedImage, 'foodImage.png') : null,
        foodId: foodId,
      });
    } else {
      editSportBoard.mutate({
        boardId: parseInt(boardId),
        boardTitle: title,
        boardContent: DOMPurify.sanitize(quillRefState.value),
        hashtag: inputHashTag.map((item) => item.label),
        files: selectedImage,
        mapPaths: JSON.stringify(mapPaths),
        mapDistances: JSON.stringify(mapDistances),
        mapCenterLat: mapCenter.lat,
        mapCenterLng: mapCenter.lng,
        mapZoomlevel: mapRefState?.getLevel(),
      });
    }
  };

  return (
    <InfoBoardContainer>
      <TitleContainer>
        {/* 제목 */}
        <InlineTypography variant="h5">{TITLE.BOARD_WRITE}</InlineTypography>
        {/*카테고리 */}
        <StyledButton
          size="small" variant="contained">
          {category === BOARD.INFO.FOOD.CATEGORY ? BOARD.INFO.FOOD.TITLE : BOARD.INFO.SPORT.TITLE}
        </StyledButton>
        {/* <WriteCategoryMenu setTitle={setTitle} title={title} /> */}
        <FlexGrowDiv />
        <Button
          onClick={handleEditBoard}
          variant="contained">등록</Button>
      </TitleContainer>
      <StyledTextField
        label="제목" size="small" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      {/* 식단 or 운동코스 등록(지도) */}
      {/* nogps는 gps사용하지 않겠다는 옵션 - 쓰기에는 불필요하니 추후 삭제하면 됨 */}
      {category !== BOARD.INFO.FOOD.CATEGORY ?
        <LoadableMap
          nogps zoomlevel={3}
        />
        : <FoodImgAnaylsis
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          foodId={foodId}
          src={import.meta.env.REACT_APP_BACKEND_URL + data?.fbImg}
          editMode />
      }
      {/* 해시태그 입력 */}
      <InputHashtagContainer>
        <InputHashtag />
      </InputHashtagContainer>
      <OcrModal />
      {/* 에디터 */}
      <EditorContainer>
        <BoardEditor
          content={data?.boardContent}
        />
      </EditorContainer>
      <BottomContainer>
      </BottomContainer>
    </InfoBoardContainer>
  );
};

export default InfoBoardEditPage;

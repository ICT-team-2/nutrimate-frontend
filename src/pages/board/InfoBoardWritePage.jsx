import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EDITOR_HEIGHT, TITLE } from '@src/utils/const.js';
import { useLocation } from 'react-router-dom';
import { styled as muiStyled } from '@mui/material/styles';
import BoardEditor from '@src/component/board/info/write/BoardEditor.jsx';
import styled from 'styled-components';
import FoodImgAnaylsis
  from '@src/component/board/info/write/FoodImgAnaylsis.jsx';
import InputHashtag from '@src/component/board/InputHashtag.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { BOARD, INIT_MAP_STATE } from '@src/component/board/const.js';
import loadable from '@loadable/component';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import WriteCategoryButtons
  from '@src/component/board/info/write/WriteCategoryButtons.jsx';
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
import axios from 'axios';

import { LINKS } from '@src/utils/const.js';
import { useNavigate } from 'react-router-dom';
import { userIdAtom } from '@src/pages/login/atom.js';
import useInputDietBoard from '@src/hooks/board/info/diet/useInputDietBoard.jsx';
import useInputSportBoard from '@src/hooks/board/info/sport/useInputSportBoard.jsx';
import { foodIdAtom } from '@src/component/board/info/atom.js';
import { base64toFile } from '@src/utils/functions.js';
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

//정보 공유 게시판 글 작성 내용
const InfoBoardWritePage = (props) => {
  const [category, setCategory] = useState(useLocation()?.state.title);
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

  const inputDietBoard = useInputDietBoard();
  const inputSportBoard = useInputSportBoard();

  // 지도 정보를 초기화
  const initMapData = useInitMapData();
  useEffect(() => {
    initMapData();
    setInputHashTag([]);
    setFoodId([1, 2, 3, 4, 5]);
  }, []);


  const handleInputBoard = () => {
    if (category === BOARD.INFO.FOOD.TITLE) {
      inputDietBoard.mutate({
        boardTitle: title,
        boardContent: DOMPurify.sanitize(quillRefState.value),
        tagNameList: inputHashTag.map((item) => item.label),
        files: base64toFile(selectedImage, 'foodImage.png'),
        foodId: foodId,
      });
    } else {
      inputSportBoard.mutate({
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
        <WriteCategoryButtons title={category} setTitle={setCategory} />
        {/* <WriteCategoryMenu setTitle={setTitle} title={title} /> */}
        <FlexGrowDiv />
        <Button
          onClick={handleInputBoard}
          variant="contained">등록</Button>
      </TitleContainer>
      <StyledTextField
        label="제목" size="small" value={title}
        onChange={(e) => setTitle(e.target.value)} />
      {/* 식단 or 운동코스 등록(지도) */}
      {/* nogps는 gps사용하지 않겠다는 옵션 - 쓰기에는 불필요하니 추후 삭제하면 됨 */}
      {category !== BOARD.INFO.FOOD.TITLE
        ? <LoadableMap
          nogps zoomlevel={3}
        />
        : <FoodImgAnaylsis
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          foodId={foodId}
          editMode />
      }
      {/* 해시태그 입력 */}
      <InputHashtagContainer>
        <InputHashtag />
      </InputHashtagContainer>
      <OcrModal />
      {/* 에디터 */}
      <EditorContainer>
        <BoardEditor />
      </EditorContainer>
      <BottomContainer />
    </InfoBoardContainer>
  );
};

export default InfoBoardWritePage;

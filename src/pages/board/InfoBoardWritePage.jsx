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
import useInitMapData from '@src/component/board/hooks/useInitMapData.jsx';
import DOMPurify from 'dompurify';

//테스트용 더미 데이터 - 추후 삭제 예정
const dummyPaths = [
  {
    'lat': 37.40046141857395,
    'lng': 126.97577439745241,
  },
  {
    'lat': 37.400939258037475,
    'lng': 126.97727635344604,
  },
  {
    'lat': 37.399731909002526,
    'lng': 126.97737836289424,
  },
  {
    'lat': 37.40022780065983,
    'lng': 126.9791739522065,
  },
];
const dummyDistances = [
  0,
  143,
  277,
  446,
];
const dummyCenter = {
  lat: 37.4,
  lng: 126.9780,
};

const LoadableMap = loadable(
  () => import('@src/component/board/KakaoMap.jsx'),
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
  const [category, setCategory] = useState(useLocation()?.state.title);
  const [searchValue, setSearchValue] = useState('');
  const [title, setTitle] = useState('');

  // 지도 정보 서버 저장용
  const [mapPaths, setMapPaths] = useAtom(mapPathsAtom);
  const [mapDistances, setMapDistances] = useAtom(mapDistancesAtom);
  const [mapCenter, setMapCenter] = useAtom(mapCenterAtom);
  //라이브러리 jotai 참조
  const [mapRefState, setMapRefState] = useAtom(mapRefAtom);
  //에디터 글 가져오기
  const [quillRefState, setQuillRefState] = useAtom(quillRefAtom);
  const [inputHashTag, setInputHashTag] = useAtom(inputHashTagAtom);

  // 지도 정보를 초기화
  // useInitMapData(dummyPaths, dummyDistances, dummyCenter);
  useInitMapData();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    console.log(`유저가 검색한 단어:${searchValue}`);
  }, [searchValue]);

  // 지도 정보를 초기화 - 쓰기에는 필요가 없으니까
  // 서버에서 데이터를 받은 후 상세보기나 수정 페이지에서나 사용하고
  // 이건 추후 삭제하면 됨(테스트용)


  useEffect(() => {
    console.log('zoomlevel:', mapRefState?.getLevel());//지도의 확대 레벨
    console.log('center:', mapRefState?.getCenter());//지도의 중심좌표
  }, [mapRefState]);

  const onClickRegister = () => {
    //식단 게시판 글쓰기

    //--------------------
    //운동 게시판 글 쓰기
    console.log('category:', category);
    console.log('title:', title);
    console.log('paths:', mapPaths);
    console.log('distances:', mapDistances);
    console.log('center:', mapCenter);
    console.log('zoomlevel:', mapRefState?.getLevel());
    let content = quillRefState.getEditor().root.innerHTML;
    content = DOMPurify.sanitize(content);
    console.log('DOMPurify content:', content);
    console.log('hashTag:', inputHashTag);
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
          onClick={onClickRegister}
          variant="contained">등록</Button>
      </TitleContainer>
      <TextField label="제목" size="small" value={title} onChange={(e) => setTitle(e.target.value)} />

      {/* 식단 or 운동코스 등록(지도) */}
      {/* nogps는 gps사용하지 않겠다는 옵션 - 쓰기에는 불필요하니 추후 삭제하면 됨 */}
      {category !== BOARD.INFO.FOOD.TITLE ?
        <LoadableMap
          nogps zoomlevel={3}
        /> : <FoodImgAnaylsis />
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

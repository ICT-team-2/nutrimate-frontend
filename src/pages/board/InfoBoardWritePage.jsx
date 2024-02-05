import React, { useEffect, useState } from 'react';
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
import { BOARD } from '@src/component/board/const.js';
import loadable from '@loadable/component';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import WriteCategoryButtons
  from '@src/component/board/info/write/WriteCategoryButtons.jsx';
import TextField from '@mui/material/TextField';
import { useSetAtom } from 'jotai/react';
import { mapCenterAtom, mapDistancesAtom, mapPathsAtom } from '@src/component/board/atom.js';

//테스트용 더미 데이터 - 추후 삭제 예정
const paths = [
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
const distances = [
  0,
  143,
  277,
  446,
];
const center = {
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
  //라이브러리 jotai 참조
  const setMapPath = useSetAtom(mapPathsAtom);
  const setMapDistances = useSetAtom(mapDistancesAtom);
  const setMapCenter = useSetAtom(mapCenterAtom);


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
    setMapPath(paths);
    setMapDistances(distances);
    setMapCenter(center);
  }, []);

  return (
    <InfoBoardContainer>
      <TitleContainer>
        {/* 제목 */}
        <InlineTypography variant="h5">{TITLE.BOARD_WRITE}</InlineTypography>
        {/*카테고리 */}
        <WriteCategoryButtons title={category} setTitle={setCategory} />
        {/* <WriteCategoryMenu setTitle={setTitle} title={title} /> */}
        <FlexGrowDiv />
        <Button variant="contained">등록</Button>
      </TitleContainer>
      <TextField label="제목" size="small" value={title} onChange={(e) => setTitle(e.target.value)} />

      {/* 식단 or 운동코스 등록(지도) */}
      {/* nogps는 gps사용하지 않겠다는 옵션 - 쓰기에는 불필요하니 추후 삭제하면 됨 */}
      {category !== BOARD.INFO.FOOD.TITLE ?
        <LoadableMap
          nogps
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

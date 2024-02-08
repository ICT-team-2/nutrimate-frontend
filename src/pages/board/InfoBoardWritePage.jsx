import React, { useState } from 'react';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { EDITOR_HEIGHT, TITLE } from '@src/utils/const.js';
import { useLocation } from 'react-router-dom';
import { styled as muiStyled } from '@mui/material/styles';
import BoardEditor from '@src/component/board/info/write/BoardEditor.jsx';
import styled from 'styled-components';
import WriteCategoryMenu
  from '@src/component/board/info/write/WriteCategoryMenu.jsx';
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
import axios from 'axios';
import { LINKS } from '@src/utils/const.js';
import { useNavigate } from 'react-router-dom';
import { border } from '@mui/system';

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

  // 유효성 검사
  const validateForm = () => {
    function removeHtmlTags(content) {
      return content.replace(/<[^>]*>?/gm, '').trim();
    }

    // 제목, 내용, 지도가 비어있는지 확인
    let content = quillRefState.getEditor().root.innerHTML;
    content = removeHtmlTags(content);
    if (!title || !content || !mapPaths.length) {
      alert('제목, 내용, 지도는 필수입니다.');
      return false;
    }

    // 해시태그 중복 확인
    const hashTagLabels = inputHashTag.map(tag => tag.label);
    const hashTagSet = new Set(hashTagLabels);
    if (hashTagSet.size !== hashTagLabels.length) {
      alert('해시태그에 중복이 있습니다.');
      return false;
    }

    return true;
  };

  const onClickRegister = async () => {
    // 유효성 검사
    if (!validateForm()) return;
    function removeHtmlTags(content) {
      return content.replace(/<[^>]*>?/gm, '').trim();
    }

    //식단 게시판 글쓰기

    //--------------------
    //운동 게시판 글 쓰기
    console.log('category:', category === '운동' ? 'exercise' : category);
    console.log('title:', title);
    console.log('paths:', mapPaths);
    console.log('distances:', mapDistances);
    console.log('center:', mapCenter);
    console.log('zoomlevel:', mapRefState?.getLevel());
    let content = quillRefState.getEditor().root.innerHTML;
    content = removeHtmlTags(content);
    console.log('DOMPurify content:', content);
    console.log('hashTag:', inputHashTag);

    
    // 데이터를 JSON 형식으로 준비
    const data = {
      boardCategory: category === '운동' ? 'exercise' : category,
      boardTitle: title,
      mapPaths: JSON.stringify(mapPaths),
      mapDistances: JSON.stringify(mapDistances),
      mapCenterLat: mapCenter.lat,
      mapCenterLng: mapCenter.lng,
      mapZoomlevel: mapRefState?.getLevel(),
      boardContent: removeHtmlTags(content),  // HTML 태그 제거
      hashTag: JSON.stringify(inputHashTag),
      userId: DUMMY_USER.USER_ID,  // 더미 유저 ID 추가
    };
    
    // axios를 통해 서버에 데이터 전송
    try {
      const response = await axios.post('/boards/sport', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response.data);
      if (response.status === 200) {  // HTTP 상태 코드가 200인 경우(요청 성공)
        alert('등록 완료');  // 등록 완료 알림
      //
      } else {
        alert('등록 실패');  // 등록 실패 알림
      }
    } catch (error) {
      console.error(error);
      alert('등록 중 오류가 발생');  // 오류 발생 알림
    }
    
  };

  return (
    <InfoBoardContainer>
      <TitleContainer>
        {/* 제목 */}
        <InlineTypography variant='h5'>{TITLE.BOARD_WRITE}</InlineTypography>
        {/*카테고리 */}
        <WriteCategoryButtons title={title} setTitle={setTitle} />
        {/* <WriteCategoryMenu setTitle={setTitle} title={title} /> */}
        <FlexGrowDiv />
        <Button
          onClick={onClickRegister}
          variant="contained">등록</Button>
      </TitleContainer>
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

import React, { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';
import Box from '@mui/material/Box';
import InfoBoardTable from '@src/component/board/info/list/InfoBoardTable.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { LINKS, PATH_PARAMS, TITLE } from '@src/utils/const.js';
import InfoBoardCategory from '@src/component/board/info/list/InfoBoardCategoryMenu.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import SelectInfoSearchTitle from '@src/component/board/info/list/SelectInfoSearchTitle.jsx';
import useFetchInfoBoardList from '@src/hooks/board/info/useFetchInfoBoardList.jsx';
import { BOARD, SELECT_COLUMNS } from '@src/component/board/const.js';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';

const ContentsCotainerBox = muiStyled(Box)`
    margin: 0
    width: 100%;
    flex-grow: 8;
    margin-top: 20px;
`;

const TextFieldContainerDiv = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
`;

const PagingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
`;
const FlexGrowDiv = styled.div`
    flex-grow: 1;
`;

const InfoBoardListContent = ({ title, category }) => {

    const { page } = useParams(); // 현재 페이지
    const navigate = useNavigate();

    const [pageState, setPageState] = useState(parseInt(page));
    const [searchValue, setSearchValue] = useState('');
    const [selectColumn, setSelectColumn] = useState(SELECT_COLUMNS.TITLE.value);
    const [dataState, setDataState] = useState(undefined);

    const { data, isLoading } = useFetchInfoBoardList({
      nowPage: pageState,
      receivePage: 10,
      searchColumn: selectColumn,// 검색 컬럼
      searchKeyword: searchValue,
      boardCategory: category.CATEGORY,
    });

    useEffect(() => {
      if (data == null || data.length === 0) return;
      setDataState(data);
    }, [data]);

    useEffect(() => {
      console.log('dataState', dataState);
    }, [dataState]);

    useEffect(() => {
      if (isNaN(pageState)) {
        setPageState(1);
      }
    }, [pageState]);

    const handlePageChange = (event, value) => {
      setPageState(value);
      navigate(LINKS.INFO_BOARD + `/${category.PATH_PARAMS}/${value}`);
    };

    const gotoWritePage = () => {
      navigate(LINKS.INFO_BOARD_WRITE,
        {
          state: {
            title: category.PATH_PARAMS === PATH_PARAMS.SPORT
              ? TITLE.SPORT_BOARD
              : TITLE.FOOD_BOARD
            ,
          },
        });
    };

    return (
      <ContentsCotainerBox>
        {/* title */}
        <InfoBoardCategory title={title} />
        <br />
        <TextFieldContainerDiv>
          {/* 글 찾기 인풋 */}
          <SelectInfoSearchTitle
            selectColumn={selectColumn}
            setSelectColumn={setSelectColumn}
          />
          <CustomSearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <FlexGrowDiv />
          {/* 글 작성 버튼*/}
          <Button variant="contained" onClick={gotoWritePage}>
            글 작성
          </Button>
        </TextFieldContainerDiv>
        {/* 글 목록 테이블 */}
        {isLoading
          ? <LoadingComponent />
          : <InfoBoardTable data={data?.boardList} />}
        {/* 페이지네이션 */}
        <PagnationComponent
          pageState={pageState}
          totalPage={data?.totalPage >= 1 ? data?.totalPage : 1}
          handlePageChange={handlePageChange} />
      </ContentsCotainerBox>
    );
  }
;

InfoBoardListContent.defaultProps = {
  title: TITLE.ALL_INFO_BOARD,
  category: BOARD.INFO.ALL,
};

export default InfoBoardListContent;

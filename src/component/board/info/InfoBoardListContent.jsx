import React, { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, Pagination, TextField } from '@mui/material';
import styled from 'styled-components';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';
import Box from '@mui/material/Box';
import InfoBoardTable from '@src/component/board/info/InfoBoardTable.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { LINKS, PATH_PARAMS, TITLE } from '@src/utils/const.js';
import InfoBoardCategory from '@src/component/board/info/InfoBoardCategoryMenu.jsx';


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

const InfoBoardListContent = ({ data, title, category }) => {


  const { page } = useParams(); // 현재 페이지
  const [pageState, setPageState] = useState(parseInt(page));

  useEffect(() => {
    if (isNaN(pageState)) {
      setPageState(1);
    }
  }, [pageState]);

  const navigate = useNavigate();
  const handlePageChange = (event, value) => {
    setPageState(value);
    navigate(LINKS.INFO_BOARD + `/${category}/${value}`);
  };

  const gotoWritePage = () => {
    navigate(LINKS.INFO_BOARD_WRITE,
      {
        state: {
          title: category === PATH_PARAMS.SPORT
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
        <CustomSearchInput label="Search" id="search" size="small" />
        <FlexGrowDiv></FlexGrowDiv>
        {/* 글 작성 버튼*/}
        <Button variant="contained" onClick={gotoWritePage}>
          글 작성
        </Button>
      </TextFieldContainerDiv>
      {/* 글 목록 테이블 */}
      <InfoBoardTable />
      {/* 페이지네이션 */}
      <PagingContainer>
        <FlexGrowDiv></FlexGrowDiv>
        <Pagination count={10} color="primary" showFirstButton showLastButton
                    shape="rounded" page={pageState} onChange={handlePageChange}
        />
      </PagingContainer>
    </ContentsCotainerBox>
  );
};

InfoBoardListContent.defaultProps = {
  data: [],
  title: TITLE.ALL_INFO_BOARD,
  category: PATH_PARAMS.ALL,
};

export default InfoBoardListContent;

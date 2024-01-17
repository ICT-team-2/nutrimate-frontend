import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, Pagination, TextField } from '@mui/material';
import styled from 'styled-components';
import { CustomSearchInput } from '@src/component/GlobalComponents.jsx';
import Box from '@mui/material/Box';
import InfoBoardList from '@src/component/board/InfoBoardList.jsx';
import { useNavigate, useParams } from 'react-router-dom';


const ContentsCotainerBox = muiStyled(Box)`
    margin: 0
    witdh: 100%;
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

const BoardListContent = ({ data, title = '전체', category = 'all' }) => {

  const { page } = useParams();
  const [pageState, setPageState] = useState(page);
  const navigate = useNavigate();
  const handlePageChange = (event, value) => {
    setPageState(value);
    navigate(`/board/${category}/${value}`);
  };


  return (
    <ContentsCotainerBox>
      <h3>{title}</h3>
      <TextFieldContainerDiv>
        <CustomSearchInput label="Search" id="search" size="small" />
        <FlexGrowDiv></FlexGrowDiv>
        <Button variant="contained">글 작성</Button>
      </TextFieldContainerDiv>
      <br />
      <InfoBoardList />
      <PagingContainer>
        <FlexGrowDiv></FlexGrowDiv>
        <Pagination count={10} color="primary" showFirstButton showLastButton
                    shape="rounded" page={pageState} onChange={handlePageChange}
        />
      </PagingContainer>
    </ContentsCotainerBox>
  );
};

export default BoardListContent;

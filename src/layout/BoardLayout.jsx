import React, { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, Pagination, TextField } from '@mui/material';
import styled from 'styled-components';
import { CustomSearchInput } from '@src/component/GlobalComponents.jsx';
import Box from '@mui/material/Box';
import InfoBoardTable from '@src/component/board/info/InfoBoardTable.jsx';
import RecommendFriendList from '@src/component/board/RecommendFriendList.jsx';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const InfoBoardContainer = muiStyled(Box)`
  margin-left: 10vw;
  margin-right: 1vw;
  display: block;
`;


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

const RowFlexDiv = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const PagingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
`;
const FlexGrowDiv = styled.div`
    flex-grow: 1;
`;

const BoardLayout = ({ data, title = '전체', category = 'all' }) => {

  const { page } = useParams();
  const [pageState, setPageState] = useState(page);
  const navigate = useNavigate();
  const handlePageChange = (event, value) => {
    setPageState(value);
    navigate(`/board/${category}/${value}`);
  };
  const OutletContainer = muiStyled(Container)`
    
  `;


  return (
    <InfoBoardContainer>
      <RowFlexDiv>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
        <RecommendFriendList />
      </RowFlexDiv>
    </InfoBoardContainer>
  );
};

export default BoardLayout;

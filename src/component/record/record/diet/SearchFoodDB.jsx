import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import useFetchFoodDBWithSearch from '@src/hooks/record/food/useFetchFoodDBWithSearch.jsx';
import FoodDBTable from '@src/component/record/record/diet/FoodDBTable.jsx';
import { PagingContainer } from '@src/component/infomation/CommonComponents.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: end;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const SearchFoodDBContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const TableContainer = styled.div`
    margin-top: 40px;
`;

const SearchFoodDB = () => {
  const [searchWord, setSearchWord] = useState('');
  const [nowPage, setNowPage] = useState(1);
  const [params, setParams] = useState({
    searchWord: '',
    nowPage: 1,
  });
  const { data, isLoading } = useFetchFoodDBWithSearch(params);
  const [foodList, setFoodList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);

  const handleSearchWordChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setNowPage(value);
  };

  const handleSearch = () => {
    setParams((prev) => {
      return {
        ...prev,
        searchWord,
      };
    });
  };

  const handleKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!data) return;
    setFoodList(data.foodList);
    setTotalPage(data?.totalPage ?? 1);
    setNowPage((prev) => {
      if (prev <= 1) return 1;
      if (prev >= data?.totalPage) return data?.totalPage;
      return prev;
    });
  }, [data]);

  useEffect(() => {
    setParams((prev) => {
      return {
        searchWord,
        nowPage,
      };
    });
  }, [nowPage]);


  return (
    <SearchFoodDBContainer>
      <InputContainer>
        <TextField
          value={searchWord}
          onChange={handleSearchWordChange}
          onKeyDown={handleKeyDownEnter}
          label={'음식 검색'} size="small" />
        <StyledButton
          variant="contained"
          onClick={handleSearch}>검색</StyledButton>
      </InputContainer>
      {isLoading ? <LoadingComponent /> :
        <>
          <TableContainer>
            <FoodDBTable data={foodList} />
          </TableContainer>
          <PagnationComponent
            pageState={nowPage}
            totalPage={totalPage}
            handlePageChange={handlePageChange}
          />
        </>}
    </SearchFoodDBContainer>
  );
};

export default SearchFoodDB;

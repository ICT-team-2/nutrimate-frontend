import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import useFetchSportDB from '@src/hooks/record/sport/useFetchSportDB.jsx';
import SportDBTable from '@src/component/record/record/sport/SportDBTable.jsx';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import ManualRecordSport from '@src/component/record/record/sport/ManualRecordSport.jsx';

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: end;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;
const NoData = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
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


const SearchSportDB = () => {

    const [params, setParams] = useState({
      searchWord: '',
      nowPage: 1,
    });
    const [sportList, setSportList] = useState(undefined);
    const [nowPage, setNowPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [searchWord, setSearchWord] = useState('');
    const [dataIndex, setDataIndex] = useState(undefined);

    const { data, isLoading } = useFetchSportDB(params);


    const handlePageChange = (e, value) => {
      setNowPage(value);
    };

    const handleSearch = (e) => {
      setSearchWord(e.target.value);
    };

    const clickSearchBtn = () => {
      setParams((prev) => ({
        ...prev,
        searchWord,
      }));
    };

    useEffect(() => {
      if (!data) return;
      setTotalPage(data.totalPage);
      setNowPage((prev) => {
        if (prev < 1) return 1;
        if (prev > data.totalPage) {
          return data.totalPage;
        }
        return prev;
      });
      setSportList(data.sportList);
    }, [data]);

    useEffect(() => {
      setParams((prev) => ({
        ...prev,
        nowPage,
      }));
    }, [nowPage]);

    return (
      <SearchFoodDBContainer>
        <InputContainer>
          <TextField
            value={searchWord}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                clickSearchBtn();
              }
            }}
            label={'운동 검색'} size="small" />
          <StyledButton
            variant="contained"
            onClick={clickSearchBtn}
          >검색</StyledButton>
        </InputContainer>
        <TableContainer>
          {sportList === undefined ? <LoadingComponent /> :
            <SportDBTable
              data={sportList}
              onClickRow={(index) => {
                setDataIndex(index);
              }}
            />}
        </TableContainer>
        <PagnationComponent
          totalPage={totalPage}
          pageState={nowPage}
          handlePageChange={handlePageChange}
        />
        {dataIndex != null && <ManualRecordSport
          data={sportList[dataIndex]}
        />}
      </SearchFoodDBContainer>
    );
  }
;

export default SearchSportDB;

import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';

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
const SearchFoodDB = () => {
  return (
    <SearchFoodDBContainer>
      <InputContainer>
        <TextField label={'음식 검색'} size="small" />
        <StyledButton
          variant="contained"
          onClick={() => {
          }}
        >검색</StyledButton>
      </InputContainer>
      <NoData>음식을 검색해주세요.</NoData>
    </SearchFoodDBContainer>
  );
};

export default SearchFoodDB;

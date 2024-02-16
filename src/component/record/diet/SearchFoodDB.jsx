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
const SearchFoodDB = () => {
  return (
    <InputContainer>
      <TextField label={'음식 검색'} size="small" />
      <StyledButton
        variant="contained"
        onClick={() => {
        }}
      >검색</StyledButton>
    </InputContainer>
  );
};

export default SearchFoodDB;

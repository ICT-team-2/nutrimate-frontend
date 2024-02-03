import styled from 'styled-components';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded.js';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded.js';
import React from 'react';
import { Button } from '@mui/material';

export const CategoryButtonContainer = styled.div`
    display: flex;
    margin: 30px 0;
`;
export const PagingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
export const InfoContentContainer = styled.div`
    margin-top: 30px;
`;
const StyledButton = styled(Button)`
    margin-right: 10px;
`;
export const SelectCheckedButton = (props) => {
  const { title, disabled, onClick } = props;
  return (
    <StyledButton onClick={onClick}>
      {disabled
        ? <CheckCircleOutlineRoundedIcon color="disabled" />
        : <CheckCircleRoundedIcon />}
      {title}
    </StyledButton>
  );
};
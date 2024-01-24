import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/AdditionalInfos.jsx';


const StyledTypography = muiStyled(Typography)`
    width: 300px;
    margin: auto 0 auto 30px;
`;
const InfoDiv = styled.div`
    font-size: 1.25rem;
    height: 60px;
    background-color: ${({ theme }) => theme['dark-background']};
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto 30px;
    width: 100%;
`;
const StyledContainerDiv = styled.div`
    display: flex;
    width: 100%;
`;
export const ColonDiv = styled.div`
    margin: auto 0;
`;
export const StyledDiv = styled.div`
    margin: auto 0;
    width: 36%;
    text-align: center;
`;
const DietInfo = () => {
  return (
    <UserInfoContainerDiv>
      <StyledDiv>탄수화물 : 단백질 : 지방</StyledDiv>
      <StyledContainerDiv>
        <InfoDiv>50</InfoDiv>
        <ColonDiv>:</ColonDiv>
        <InfoDiv>20</InfoDiv>
        <ColonDiv>:</ColonDiv>
        <InfoDiv>30</InfoDiv>
      </StyledContainerDiv>
    </UserInfoContainerDiv>
  );
};

export default DietInfo;

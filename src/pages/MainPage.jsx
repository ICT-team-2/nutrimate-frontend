import React from 'react';
import MainPageImg from '@src/asset/image/MainPageImg.png';
import styled from 'styled-components';
import { APP_TITLE } from '@src/utils/const.js';
import { Button, Container } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import {
  RelativeWrapper,
  StyledContainer,
} from '@src/styles/GlobalStyledComponents.jsx';

const MainImg = styled.img`
    width: 100%;
    height: ${(props) => props.size}px;
    object-fit: cover;
`;

const MainPageImgContent = styled.div`
    width: 500px;
    height: 300px;
    position: absolute;
    transform: translateY(-350px); // transform 속성을 사용하여 위치 이동
    color: white;
    z-index: 1000;
`;

const MainContent = styled.div`
`;

const MainPage = ({ size }) => {
  return (
    <>
      <MainImg src={MainPageImg} size={size} />
      <StyledContainer>
        <RelativeWrapper>
          <MainPageImgContent>
            <h2>{APP_TITLE}</h2>
            <h1>건강한 식습관으로 더 나은 삶의<br /> 시작을 경험하세요.</h1>
            <h3>당신만의 맞춤식 프로그램으로<br />건강한 식습관을 만나보세요.</h3>
            <Button variant='contained'>식습관 검사하기</Button>
          </MainPageImgContent>
        </RelativeWrapper>
        <MainContent>
        <h3>{APP_TITLE}</h3>
        <h3>지속 가능한 식습관으로 더 나은 자신을 찾아보세요.</h3>
        <h3>Nutri Mate는 당신의 목표를 이루기 위한 올바른 식습관을 지원합니다.</h3>
      </MainContent>
      </StyledContainer>


    </>
  );
};

MainPage.defaultProps = {
  size: 500,
};

export default MainPage;

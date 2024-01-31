import React from 'react';
import MainPageImg from '@src/asset/image/MainPageImg.jpg';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { RelativeWrapper, StyledContainer } from '@src/component/common/GlobalComponents.jsx';
import MainContent from '@src/component/mainpage/MainContent.jsx';

const MainImg = styled.img`
    width: 100%;
    height: ${(props) => props.size};
    object-fit: cover;
`;

const MainPageImgContent = styled.div`

    position: relative;
    transform: translateY(-400px); // transform 속성을 사용하여 위치 이동
    color: white;
    z-index: 10;

`;

const MainFirstTypo = styled.div`
    font-size: 40px;
    font-family: 'Noto Serif KR', sans-serif;
    margin-bottom: 30px;
`;
const MainSecondTypo = styled.div`
    font-size: 26px;
`;
const MainImgCover = styled.div`
    width: 100%;
    height: ${(props) => props.size};
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
`;

const StyledButton = styled(Button)`
    margin: 40px 0px 0 30px;
    width: 200px;
    height: 55px;
    font-size: 20px;
`;
const MainPage = ({ size }) => {
  return (
    <>
      <MainImg src={MainPageImg} size={size} />
      <MainImgCover size={size} />
      <StyledContainer>
        <RelativeWrapper>
          <MainPageImgContent>
            {/* <h2>{TITLE.APP}</h2> */}
            <MainFirstTypo>
              건강한 식습관으로 더 나은 삶의<br />
              시작을 경험하세요
            </MainFirstTypo>
            <MainSecondTypo>
              당신만의 맞춤식 프로그램으로 건강한 식습관을 만나보세요
            </MainSecondTypo>
            <StyledButton
              variant="contained"
              size="large">식습관 검사하기</StyledButton>
          </MainPageImgContent>
        </RelativeWrapper>
        <MainContent />
      </StyledContainer>
    </>
  );
};

MainPage.defaultProps = {
  size: '100vh',
};

export default MainPage;

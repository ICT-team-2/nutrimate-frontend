import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import SurveyImg from '@src/asset/image/SurveyImg.png';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import { SurveyContainer } from '@src/component/survey/CommonComponents.jsx';
import value1 from '@src/asset/image/value1.webp';
import value2 from '@src/asset/image/value2.png';
import value3 from '@src/asset/image/value3.webp';


// 전역 스타일 설정
const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        overflow: hidden; // 이 부분 추가
    }
`;

const SurveyStartContainer = styled.div`
    display: flex;
    flex-direction: row;
    // width: 100%;
    // height: 100vh;
`;

// const StyledImg = styled.img`
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
// `;
const HalfDiv = styled(FlexGrowDiv)`
    width: 100%;
    display: flex;
`;
const ContentContainer = styled.div`
    margin-top: 50px;
    //margin-left: 50px;
    float: center;
    text-align: center;
`;

const StyledTitle = styled(Typography)`
    margin-bottom: 50px;
    margin-top: 50px;
    //margin-left: 120px;
    font-style: bold;
    text-align: center;
   `; 

const StyledTitleTypography = styled(Typography)`
    margin-bottom: 20px;
    // float: right;
`;
const StyledSubTitleTypography = styled(Typography)`
    margin-bottom: 20px;
    // float: right;
    color: ${({ theme }) => theme['extra-light-text']};
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: space-around; // 이미지 사이 공간
`;

const StyledImg = styled.img`
    width: 300px; 
    height: 300px; 
    border-radius: 15px; // 모서리 둥글게
    margin: 10px; // 이미지 사이의 간격
`;

const SurveyStart = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  return (
    <>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <SurveyStartContainer>

        
        <HalfDiv>
          <SurveyContainer>
          <StyledTitle
              variant='h6'>NutriMate에 오신것을 환영합니다</StyledTitle>
              <ImageContainer>
                  <StyledImg src={value1} alt="value1" />
                  <StyledImg src={value2} alt="value2" />
                  <StyledImg src={value3} alt="value3" />
              </ImageContainer>
            <ContentContainer>
            <StyledTitleTypography
              variant='h4'>건강한 식습관이란 무엇일까요?</StyledTitleTypography>
            {/* <StyledSubTitleTypography
              variant='h7'>건강한 식습관의 의미를 찾아보고 자신만의 지속가능한 건강관리를 만나보세요.<br/><br/></StyledSubTitleTypography> */}
            <Button
              variant='contained' color='primary' size='medium'
              onClick={() => {
                setProgress(SURVEY_PROGRESS.NAME);
              }}>
              <Typography variant='h8'>시작하기</Typography>
            </Button>
            </ContentContainer>
          </SurveyContainer>
        </HalfDiv>
      </SurveyStartContainer>
    </>
  );
};

export default SurveyStart;

import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import MainPageImg from '@src/asset/image/MainPageImg.jpg';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';

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

const SurveyContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
`;

const StyledImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;
const HalfDiv = styled(FlexGrowDiv)`
    width: 100%;
    display: flex;
`;
const ContentContainer = styled.div`
    margin: auto;
`;

const StyledTitleTypography = styled(Typography)`
    margin-bottom: 20px;
`;
const StyledSubTitleTypography = styled(Typography)`
    margin-bottom: 20px;
    color: ${({ theme }) => theme['extra-light-text']};
`;


const SurveyStart = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  return (
    <>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <SurveyContainer>
        <HalfDiv>
          <ContentContainer>
            <StyledTitleTypography variant="h3">잘 먹는다는 건 어떤 의미일까요?</StyledTitleTypography>
            <StyledSubTitleTypography variant="h6">행동심리학 기반의 지속가능한 건강관리를 만나보세요.</StyledSubTitleTypography>
            <Button
              variant="contained" color="primary" size="large"
              onClick={() => {
                setProgress(SURVEY_PROGRESS.NAME);
              }}>
              <Typography variant="h6">시작하기</Typography>
            </Button>
          </ContentContainer>
        </HalfDiv>
        <HalfDiv>
          <StyledImg src={MainPageImg} alt="MainPageImg" />
        </HalfDiv>
      </SurveyContainer>
    </>
  );
};

export default SurveyStart;

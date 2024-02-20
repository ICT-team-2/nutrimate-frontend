import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import LoginImg from '@src/asset/image/LoginImg.png';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import { SurveyContainer } from '@src/component/survey/CommonComponents.jsx';
import { LINKS } from '@src/utils/const';
import { useNavigate } from 'react-router-dom';

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

const SurveyEndLogin = () => {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle /> {/* 전역 스타일 적용 */}
      <SurveyStartContainer>
        <HalfDiv>
          <SurveyContainer>
            <StyledTitleTypography
              variant='h4'>식습관 검사 완료!</StyledTitleTypography>
            <StyledSubTitleTypography
              variant='h6'>로그인을 하시면 맞춤화 된 정보로 나의 식단을 분석 할 수 있습니다. <br/> NutriMate와 함께 새로워진 일상을 만나보세요.<br/><br/></StyledSubTitleTypography>
            <Button
              variant='contained' color='inherit' size='Large'
              onClick={() => {
                navigate(LINKS.LOGIN);
              }}>
              <Typography variant='h8'>로그인하러가기</Typography>
            </Button>
            <Button
              variant='contained' color='primary' size='Large'
              onClick={() => {
                navigate(LINKS.REGISTER);
              }}>
              <Typography variant='h8'>회원가입하러가기</Typography>
            </Button>
          </SurveyContainer>
        </HalfDiv>
        <HalfDiv>
          <StyledImg src={LoginImg} alt='LoginImg' />
        </HalfDiv>
      </SurveyStartContainer>
    </>
  );
};

export default SurveyEndLogin;

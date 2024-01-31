import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Container } from '@mui/material';

const GlobalStyle = createGlobalStyle`
    * {
        font-size: 22px;
    }
`;

const MainContentContainer = styled(Container)`
    margin: 50px auto 0;

`;
const BodyTitle = styled.div`
    font-size: 38px;
    font-family: 'Noto Serif KR', sans-serif;
    margin: 50px 0;

`;
const BodyContent = styled.div`
    line-height: 40px;
    margin-bottom: 120px;
`;

const MainPageIntroduce = () => {
  return (
    <>
      <GlobalStyle />
      <MainContentContainer>
        <BodyTitle>
          NutriMate는 당신의 목표를 이루기 위한<br />
          올바른 식습관을 지원합니다.
        </BodyTitle>
        <BodyContent>
          개인화 된 프로그램으로 지속 가능한 식단을 구성해줍니다. 저희 뉴트리매이트는 사용자들이 식단에 대해 더욱 잘 이해할 수 있도록 돕고, 자신의 생활 습관을 고찰할 수 있도록 이끌며, 변화를 위해
          필요한 정보를 제공합니다. 맞춤화 된 정보를 통해 나에게 맞는 식습관으로 더 나은 자신을 찾아보세요.
        </BodyContent>

      </MainContentContainer>
    </>)
    ;
};

export default MainPageIntroduce;

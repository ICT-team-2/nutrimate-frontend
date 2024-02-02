import React from 'react';
import styled from 'styled-components';
import { Button, Container, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';

const LoginContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`;
const LoginHeader = styled.div`

`;
const LoginBody = styled.div`
    padding: 30px;
`;
const LoginPaper = styled(Paper)`
    width: 40%;
        //background-color: ${({ theme }) => theme['main-background']};
`;
const HeaderH2 = styled.h2`
    text-align: center;
`;
const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
`;
const LoginButton = styled(Button)`
    width: 100%;
`;
const AdditionalContainer = styled.div`
    display: flex;
`;
const OAuthContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px;
`;
const OAuthButton = styled.div`
    cursor: pointer;
    margin: 0 10px;
`;

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader>
          <HeaderH2>Sign in</HeaderH2>
        </LoginHeader>
        <Divider />
        <LoginBody>
          <StyledTextField label="아이디" />
          <StyledTextField label="비밀번호" type="password" />
          <AdditionalContainer>

            <FlexGrowDiv />

          </AdditionalContainer>
          <LoginButton variant="contained">Login</LoginButton>
        </LoginBody>
        <Divider>간편 로그인</Divider>
        <OAuthContainer>
          <OAuthButton>
            <img src="/src/asset/image/oauth/GoogleLogin.png" alt="구글 로그인" />
          </OAuthButton>
          <OAuthButton>
            <img src="/src/asset/image/oauth/FacebookLogin.png" alt="페이스북 로그인" />
          </OAuthButton>
          <OAuthButton>
            <img src="/src/asset/image/oauth/NaverLogin.png" alt="네이버 로그인" />
          </OAuthButton>
          <OAuthButton>
            <img src="/src/asset/image/oauth/KakaoLogin.png" alt="카카오 로그인" />
          </OAuthButton>
        </OAuthContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;

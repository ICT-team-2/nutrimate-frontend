import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Checkbox, Container, FormControlLabel, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';

const LoginContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const LoginHeader = styled.div`
    padding: 20px 0;
`;
const LoginBody = styled.div`
    padding: 30px;
`;
const LoginPaper = styled(Paper)`
    width: 40%;
        //background-color: ${({ theme }) => theme['main-background']};
    margin: auto;
`;
const HeaderH2 = styled.h2`
    text-align: center;
    margin: 20px
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
    margin-bottom: 15px;
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

  const [checked, setChecked] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  //todo 로깅용 - 나중에 지울 것
  // useEffect(() => {
  //   console.log(`id: ${id}, password: ${password}, checked: ${checked}`);
  // }, [checked, id, password]);

  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader>
          <HeaderH2>Register</HeaderH2>
        </LoginHeader>
        <Divider />
        <LoginBody>
          <StyledTextField
            label="아이디" value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <StyledTextField
            label="비밀번호" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AdditionalContainer>
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

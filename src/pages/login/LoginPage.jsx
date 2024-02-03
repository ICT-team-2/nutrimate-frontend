import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import axios from 'axios';

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
  
  const handleLogin = (provider) => {
    if (id === '' || password === '') {
      window.alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(id)) {
      window.alert('아이디가 잘못입력되었습니다.');
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(password)) {
      window.alert('비밀번호가 잘못 입력되었습니다.');
      return;
    }
    
    console.log(`Logging in with id: ${id}, password: ${password}`);
    console.log('ddd');
    
    axios.post('/login', {
      userUid: id,
      userPwd: password,
    })
         .then(response => {
           console.log(response.data); // 서버로부터의 응답을 확인
           if (response.data.message === 'success') {
             alert('로그인 성공');
           } else {
             alert('로그인 실패');
           }
         })
         .catch(error => {
           console.error('Error:', error);
         });
  };
  
  //todo 로깅용 - 나중에 지울것
  useEffect(() => {
    console.log(`id: ${id}, password: ${password}, checked: ${checked}`);
  }, [checked, id, password]);
  
  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader>
          <HeaderH2>Sign in</HeaderH2>
        </LoginHeader>
        <Divider />
        <LoginBody>
          <StyledTextField
            label='아이디' value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <StyledTextField
            label='비밀번호' type='password' value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AdditionalContainer>
            <FormControlLabel control={
              <Checkbox
                value={checked}
                onChange={() => setChecked(!checked)} />} label='아이디 저장' />
            <FlexGrowDiv />
          </AdditionalContainer>
          <LoginButton
            onClick={handleLogin}
            variant='contained'>Login</LoginButton>
        </LoginBody>
        <Divider>간편 로그인</Divider>
        <OAuthContainer>
          <OAuthButton>
            <img src='/src/asset/image/oauth/GoogleLogin.png' alt='구글 로그인' />
          </OAuthButton>
          <OAuthButton>
            <img src='/src/asset/image/oauth/FacebookLogin.png'
                 alt='페이스북 로그인' />
          </OAuthButton>
          <OAuthButton>
            <img src='/src/asset/image/oauth/NaverLogin.png' alt='네이버 로그인' />
          </OAuthButton>
          <OAuthButton>
            <img src='/src/asset/image/oauth/KakaoLogin.png' alt='카카오 로그인' />
          </OAuthButton>
        </OAuthContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;

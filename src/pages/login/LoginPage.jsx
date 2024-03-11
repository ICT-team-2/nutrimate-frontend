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
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';
import { Link } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import  firebaseConfigFile from '@src/component/calendar/fireConfig.js';
import { useCookies } from 'react-cookie';

const LoginContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
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
    margin: 0 2%;
`;
const RegisterLinkContainer = styled.div`
    background-color: ${({ theme }) => theme['bg-color-deep']};
    color: black;
    padding: 20px;
    text-align: center;
    font-size: 0.8rem;
`;
const RegisterLink = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme['link-color']};
`;

const LoginPage = () => {

  const [checked, setChecked] = useState(false);
  const [id, setId] = useState(localStorage.getItem('savedId') || '');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['fcmtoken']);

  // const [userId, setUserId] = useAtom(userIdAtom);


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
        .then(async response => {
          const { accessToken } = response.data;
          const firebaseApp = initializeApp(firebaseConfigFile);
        
          const YOUR_PUBLIC_VAPID_KEY=`BNrVEpkMuonyjj2m5qjiOrBWesOqUxgDkCfCDBWN2jf_JlCnrTDdvdflYEue9wxQK4Abhno4kpuWlBKLWVqHgW0`;//.env에 지정이 안되서 일단 이렇게 처리
          const messaging = getMessaging();
          getToken(messaging,{vapidKey: YOUR_PUBLIC_VAPID_KEY}).then((token) => {
            setCookie('fcmtoken', token)
            console.log("fcmToken:", token);
            console.log("fcmToken!:", cookies.fcmtoken);
            window.location.href = '/';
          });
              
              
          })
      
        .catch(error => {
            // 오류 처리
            console.error("에러 발생:", error);
        });
  };
  //axios.defaults.headers.common['ACCESS'] = `${accessToken}`;


  //   console.log(response.data); // 서버로부터의 응답을 확인

//       if (response.data.sub) {
//         // alert('로그인 성공');
//         //window.localStorage.setItem('accessToken', JSON.stringify(accessToken));
//         //userIdAtom.set(sub);
//         //setData(response.data.sub);
//         window.sessionStorage.setItem('userId', JSON.stringify(response.data.sub));
//         setUserId(response.data.sub);
//         console.log('찍히니');
//         window.location.href = '/';
//       } else {
//         alert('로그인 실패');
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
  // });
//  };


  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:9999/oauth2/authorization/${provider}`;
  };


  const setSignupStatus = (status) => {
    window.sessionStorage.setItem('signup_status', status);
  };

  // window.onload = function() {
  //   const params = new URLSearchParams(window.location.search);
  //   const userId = params.get('userId');

  //   if (userId) {
  //     window.sessionStorage.setItem('userId', userId);
  //   }
  // };

  // // 구글 로그인 처리 함수
  // const handleGoogleLogin = () => {
  //   window.location.href = "http://localhost:9999/oauth2/authorization/google";
  //   console.log(response.data);
  // };

  // // 페이스북 로그인 처리 함수
  // const handleFacebookLogin = () => {
  //   window.location.href = "http://localhost:9999/oauth2/authorization/facebook";
  // };

  // // 네이버 로그인 처리 함수
  // const handleNaverLogin = () => {
  //   window.location.href = "http://localhost:9999/oauth2/authorization/naver";
  // };

  // // 카카오 로그인 처리 함수
  // const handleKakaoLogin = () => {
  //   window.location.href = "http://localhost:9999/oauth2/authorization/kakao";
  // };

  // 아이디 저장 체크박스의 상태가 변경되었을 때 실행되는 useEffect
  useEffect(() => {
    // 아이디 저장 체크박스가 체크된 상태라면 아이디를 로컬 스토리지에 저장합니다.
    if (checked) {
      localStorage.setItem('savedId', id);
    }
    // 아이디 저장 체크박스가 체크 해제된 상태라면 로컬 스토리지의 아이디를 삭제합니다.
    else {
      localStorage.removeItem('savedId');
    }
  }, [checked, id]);


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
            label="아이디" value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <StyledTextField
            label="비밀번호" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AdditionalContainer>
            <FormControlLabel control={
              <Checkbox
                value={checked}
                onChange={() => setChecked(!checked)} />} label="아이디 저장" />
            <FlexGrowDiv />
          </AdditionalContainer>
          <LoginButton
            onClick={handleLogin}
            variant="contained">Login</LoginButton>
        </LoginBody>
        <Divider>간편 로그인</Divider>
        <OAuthContainer>
          {/* <OAuthButton onClick={handleGoogleLogin}>
          <img src='/src/asset/image/oauth/GoogleLogin.png' alt='구글 로그인' />
        </OAuthButton>
        <OAuthButton onClick={handleFacebookLogin}>
          <img src='/src/asset/image/oauth/FacebookLogin.png'
              alt='페이스북 로그인' />
        </OAuthButton>
        <OAuthButton onClick={handleNaverLogin}>
          <img src='/src/asset/image/oauth/NaverLogin.png' alt='네이버 로그인' />
        </OAuthButton>
        <OAuthButton onClick={handleKakaoLogin}>
          <img src='/src/asset/image/oauth/KakaoLogin.png' alt='카카오 로그인' />
        </OAuthButton> */}

          <OAuthButton onClick={
            () => {
              handleSocialLogin('google');
              setSignupStatus('google');
            }}>
            <img src="/src/asset/image/oauth/GoogleLogin.png" alt="구글 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('facebook');
            setSignupStatus('facebook');
          }}>
            <img src="/src/asset/image/oauth/FacebookLogin.png" alt="페이스북 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('naver');
            setSignupStatus('naver');
          }}>
            <img src="/src/asset/image/oauth/NaverLogin.png" alt="네이버 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('kakao');
            setSignupStatus('kakao');
          }}>
            <img src="/src/asset/image/oauth/KakaoLogin.png" alt="카카오 로그인" />
          </OAuthButton>
        </OAuthContainer>
        <RegisterLinkContainer>
          Don`t have an account? <RegisterLink href={LINKS.REGISTER}>Sign up</RegisterLink>
        </RegisterLinkContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;

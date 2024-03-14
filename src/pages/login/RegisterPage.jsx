import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const';
import axios from 'axios';
import { data } from '@tensorflow/tfjs';
import { toast } from 'react-toastify';


const LoginContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const LoginHeader = styled.div`
    padding: 5px 0;
`;
const LoginBody = styled.div`
    padding-top: 15px;
    padding-bottom: 20px;
    padding-left: 30px;
    padding-right: 30px;
    margin-bottom: 20px;
`;
const LoginPaper = styled(Paper)`
    width: 40%;
    height: 90vh; // add this line
    overflow-y: auto; // add this line
        // background-color: ${({ theme }) => theme['main-background']};
    // margin: auto;
    margin-bottom: 0px;
`;
const HeaderH2 = styled.h2`
    text-align: center;
    margin-top: 20px
`;
const HeaderH3 = styled.h3`
    text-align: center;
    margin: 5px
`;
const StyledTextField = styled(TextField)`
    width: 100%;
    margin-bottom: 10px;
`;
const LoginButton = styled(Button)`
    width: 100%;
`;
const AdditionalContainer = styled.div`
    display: flex;
    // margin-top: 10px;
    margin-bottom: 10px;
`;

const StyledFormControl = styled(FormControl)`
    margin-top: 30px;
    margin-bottom: 10px;
`;

const StyledRadioGroup = styled(RadioGroup)`
    flex-direction: row;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
    margin-right: 40px;
`;

const StyledButton = styled(Button)`
    margin-top: 10px;
    width: 100%;
`;

const StyledButtonSmall = styled(Button)`
    height: 40px;
    width: 60px;
    margin-bottom: 18px;
    margin-top: 8px;
    margin-left: 40px;
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


const RegisterPage = () => {

  const savedUserData = JSON.parse(sessionStorage.getItem('userData')) || {};
  // useState 훅을 사용하여 상태 변수 정의 및 초기값 설정
  const [id, setId] = useState(savedUserData.id || '');
  const [password, setPassword] = useState(savedUserData.password || '');
  const [tel, setTel] = useState(savedUserData.tel || '');
  const [email, setEmail] = useState(savedUserData.email || '');

  useEffect(() => {
    // const savedUserData = JSON.parse(sessionStorage.getItem('userData')) || {};
    setId(savedUserData.id || '');
    setPassword(savedUserData.password || '');
    setTel(savedUserData.tel || '');
    setEmail(savedUserData.email || '');
  }, []); // 빈 배열을 두번째 인자로 전달하여 컴포넌트가 처음 마운트될 때 한 번만 실행
  const saveUserDataToSessionStorage = () => {
    const userData = {
      userUid: id,
      userPwd: password,
      userPhone: tel,
      userEmail: email,
    };
    sessionStorage.setItem('userData', JSON.stringify(userData));
  };

  // 입력된 사용자 정보를 세션 스토리지에 저장
  useEffect(() => {
    saveUserDataToSessionStorage();
  }, [id, password, tel, email]); // id, password, tel, email 중 하나라도 변경될 때마다 실행

  // 입력된 사용자 정보를 업데이트하는 핸들러 함수들
  const handleIdChange = (e) => setId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleTelChange = (e) => setTel(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const [verification, setVerification] = useState('email');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [certifiedPN, setCertifiedPN] = useState('');
  const [certifiedEM, setCertifiedEN] = useState('');
  const [isValidCertifiedPN, setIsValidCertifiedPN] = useState(false);
  const [isValidCertifiedEM, setIsValidCertifiedEM] = useState(false);
  const [showCertifiedPN, setShowCertifiedPN] = useState(false);
  const [showConfirmButton, setShowConfirmButton] = useState(false);
  const [isCertifiedPNVisible, setIsCertifiedPNVisible] = useState(false);
  const [isCertifiedEMVisible, setIsCertifiedEMVisible] = useState(false);
  const [PNError, setPNError] = useState('');
  const [EMError, setEMError] = useState('');
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  // cosnt [EMError, setEMError] = useState('');
  const [isDialogTwoShow, setIsDialogTwoShow] = useState(false);
  const navigate = useNavigate();

  const validatePNCK = () => {
    const regex = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if (!regex.test(tel)) {
      toast.warn('올바른 전화번호를 입력해주세요');
      return false;
    }
    return true;
  };

  const validateEMCK = () => {
    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regex.test(email)) {
      toast.warn('올바른 EMAIL를 입력해주세요');
      return false;
    }
    return true;
  };

  const handleCertification = async () => {
    if (verification === 'phone') {
      validatePNCK();
    } else if (verification === 'email') {
      validateEMCK();
    }

    if (PNError === '' && EMError === '') {
      const data = {
        userUid: id,
        userPwd: password,
        userPhone: tel,
        userEmail: email,
      };
      return data;
    } else {
      throw new Error('Validation failed');
    }
  };


  const handleButtonClickMessage = async () => {

    try {
      setIsCertifiedPNVisible(true);

      const certificationResult = await handleCertification();
      if (!certificationResult) {
        return;
      }

      const checkResponse = await axios.post('/checkPhoneNumber', { userPhone: tel });

      if (checkResponse.data.exists) {
        toast.warn('이미 가입된 번호입니다.');
        setIsDialogVisible(false);
        return;
      }

      const response = await axios.post('/message/send', { userPhone: tel });

      if (response.status !== 200) {
        throw new Error('Failed to send the message');
      }

      if (setIsDialogVisible == true) {
        toast.success('인증번호가 발송되었습니다.');

        // resetTimer();
        // startTimer();

        setIsDialogTwoShow(!isDialogTwoShow);
      }

    } catch (error) {
      if (error.message === 'Validation failed') {
        toast.warn('회원정보를 올바르게 입력했는지 확인해주세요.');
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('인증번호 발송에 실패하였습니다. 다시 시도해주세요.');
      }
      setIsDialogVisible(false);
    }
  };

  const verifyCertification = async () => {
    try {
      const response = await axios.post('/verify', {
        userPhone: tel,
        authCode: certifiedPN,
      });

      if (response.status === 200) {
        setIsValidCertifiedPN(true);
        registerUser();

        // const data = await handleCertification();
        // await registerUser(data, isValidCertifiedPN);
      }
    } catch (error) {
      console.error(error);
      setIsValidCertifiedPN(false);
    }
  };

  const handleButtonClickEmail = async () => {

    try {
      setIsCertifiedEMVisible(true);

      const certificationResult = await handleCertification();
      if (!certificationResult) {
        return;
      }

      const checkResponse = await axios.post('/checkEmail', { userEmail: email });

      if (checkResponse.data.exists) {
        toast.warn('이미 가입된 메일입니다.');
        setIsDialogVisible(false);
        return;
      }

      const response = await axios.post('/email/send', { userEmail: email });

      if (response.status !== 200) {
        throw new Error('Failed to send the message');
      }
      toast.success('인증번호가 발송되었습니다.');

      if (setIsDialogVisible == true) {
        setIsDialogTwoShow(!isDialogTwoShow);
      }

    } catch (error) {
      if (error.message === 'Validation failed') {
        toast.warn('회원정보를 올바르게 입력했는지 확인해주세요.');
      } else {
        console.error('An unknown error occurred:', error);
        toast.error('인증번호 발송에 실패하였습니다. 다시 시도해주세요.');
      }
      setIsDialogVisible(false);
    }
  };

  const verifyCertificationEmail = async () => {
    try {
      const response = await axios.post('/verifyEmail', {
        userEmail: email,
        code: certifiedEM,
      });

      if (response.status === 200) {
        setIsValidCertifiedEM(true);
        registerUser();

      } else {
        toast.error('인증번호가 잘못되었습니다.');
        setIsValidCertifiedEM(false);
      }
    } catch (error) {
      console.error(error);
      setIsValidCertifiedEM(false);
    }
  };


  const registerUser = async () => {
    toast.success('인증이 완료되었습니다.');
    return;
  };


  const handleSocialLogin = (provider) => {
    window.location.href = `${import.meta.env.REACT_APP_BACKEND_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader>
          <HeaderH2> NutriMate</HeaderH2>
          <HeaderH3>Sign Up</HeaderH3>
        </LoginHeader>
        <Divider />
        <LoginBody>
          <StyledTextField
            label="아이디" value={id}
            onChange={handleIdChange}
          />
          <StyledTextField
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <StyledFormControl component="fieldset">
            <FormLabel component="legend">인증 방식</FormLabel>
            <StyledRadioGroup aria-label="verification" name="row-radio-buttons-group" value={verification}
                              onChange={(e) => setVerification(e.target.value)}>
              <StyledFormControlLabel value="email" control={<Radio />} label="이메일 인증" />
              <StyledFormControlLabel value="phone" control={<Radio />} label="휴대폰 인증" />
            </StyledRadioGroup>
          </StyledFormControl>
          {verification === 'email' ?
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item xs={8}>
                <StyledTextField
                  label="이메일"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item>
                <StyledButtonSmall variant="contained" onClick={handleButtonClickEmail}>인증</StyledButtonSmall>
              </Grid>
              {isCertifiedEMVisible && (
                <Grid item xs={12}>
                  <StyledTextField
                    label="인증번호 입력"
                    type="text"
                    value={certifiedEM}
                    onChange={(e) => setCertifiedEN(e.target.value)}
                  />
                  <StyledButton variant="contained" onClick={verifyCertificationEmail}>
                    확인
                  </StyledButton>
                </Grid>
              )}
            </Grid>

            :
            <Grid container spacing={1}>
              <Grid item xs={8}>
                <StyledTextField
                  label="휴대폰 번호"
                  type="tel"
                  value={tel}
                  onChange={handleTelChange}
                />
              </Grid>
              <Grid item>
                <StyledButtonSmall variant="contained" onClick={handleButtonClickMessage}>
                  인증
                </StyledButtonSmall>
              </Grid>
              {isCertifiedPNVisible && (
                <Grid item xs={12}>
                  <StyledTextField
                    label="인증번호 입력"
                    type="text"
                    value={certifiedPN}
                    onChange={(e) => setCertifiedPN(e.target.value)}
                  />
                  <StyledButton variant="contained" onClick={verifyCertification}>
                    확인
                  </StyledButton>
                </Grid>
              )}
            </Grid>
          }
          <AdditionalContainer>
            <Checkbox
              checked={agreed}
              onChange={(e) => {
                if (verification === 'email' && !isValidCertifiedEM) {
                  toast.warn('이메일 인증을 완료해주세요');
                  return;
                }
                if (verification === 'phone' && !isValidCertifiedPN) {
                  toast.warn('휴대폰 인증을 완료해주세요');
                  return;
                }
                setAgreed(e.target.checked);
              }}
            />
            <div style={{ marginTop: '12px' }}>
              <h5>
                NutriMate 이용약관 및 개인정보 처리방침에 동의합니다.
              </h5>
            </div>
          </AdditionalContainer>
          <StyledButton variant="contained" disabled={!agreed} onClick={() => {
            if (id === '') {
              toast.warn('아이디를 입력해주세요');
              return;
            }
            if (password === '') {
              toast.warn('비밀번호를 입력해주세요');
              return;
            }
            navigate(LINKS.REGISTER_NEXT);
          }}>계속</StyledButton>
        </LoginBody>
        <Divider>간편 회원가입 / 로그인</Divider>
        <OAuthContainer>
          <OAuthButton onClick={
            () => {
              handleSocialLogin('google');
              // setSignupStatus('google');
            }}>
            <img src="/src/asset/image/oauth/GoogleLogin.png" alt="구글 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('facebook');
            // setSignupStatus('facebook');
          }}>
            <img src="/src/asset/image/oauth/FacebookLogin.png" alt="페이스북 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('naver');
            // setSignupStatus('naver');
          }}>
            <img src="/src/asset/image/oauth/NaverLogin.png" alt="네이버 로그인" />
          </OAuthButton>
          <OAuthButton onClick={() => {
            handleSocialLogin('kakao');
            // setSignupStatus('kakao');
          }}>
            <img src="/src/asset/image/oauth/KakaoLogin.png" alt="카카오 로그인" />
          </OAuthButton>
        </OAuthContainer>
      </LoginPaper>
    </LoginContainer>
  );
};

export default RegisterPage;

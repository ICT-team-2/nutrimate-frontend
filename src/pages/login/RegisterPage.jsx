import React, { useState } from 'react';
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
  FormLabel
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
  margin-top:30px;
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
  margin-left: 45px;
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
  
  const [checked, setChecked] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  // const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verification, setVerification] = useState('email');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
   const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:9999/oauth2/authorization/${provider}`;
  };
  // const [nickName, setNickName] = useState('');
  // const [gender, setGender] = useState('');
  // const [birthYear, setBirthYear] = useState('');
  // const [birthMonth, setBirthMonth] = useState('');
  // const [birthDay, setBirthDay] = useState('');
  
  //todo 로깅용 - 나중에 지울 것
  // useEffect(() => {
  //   console.log(`id: ${id}, password: ${password}, checked: ${checked}`);
  // }, [checked, id, password]);
  
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
            label='아이디' value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <StyledTextField
            label='비밀번호'
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {/* <StyledTextField
            label='비밀번호 확인' type='password' value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          /> */}
           {/* <StyledTextField
            label='사용자 이름' value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          /> */}
          {/* <StyledTextField
            label='이름' value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={4}>
              <StyledTextField
                label='년' type='number' value={birthYear}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setBirthYear(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledTextField
                label='월' type='number' value={birthMonth}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setBirthMonth(e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledTextField
                label='일' type='number' value={birthDay}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setBirthDay(e.target.value)}
              />
            </Grid>
          </Grid>
          <FormControl component="fieldset">
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup row aria-label="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value="male" control={<Radio />} label="남성" />
              <FormControlLabel value="female" control={<Radio />} label="여성" />
            </RadioGroup>
          </FormControl> */}
          <StyledFormControl component="fieldset">
            <FormLabel component="legend">인증 방식</FormLabel>
            <StyledRadioGroup aria-label="verification" name="row-radio-buttons-group" value={verification} onChange={(e) => setVerification(e.target.value)}>
              <StyledFormControlLabel value="email" control={<Radio />} label="이메일 인증" />
              <StyledFormControlLabel value="phone" control={<Radio />} label="휴대폰 인증" />
            </StyledRadioGroup>
          </StyledFormControl>
          {verification === 'email' ? 
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={8}>
              <StyledTextField
                label='이메일' type='email' value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <StyledButtonSmall variant='contained'>인증</StyledButtonSmall>
            </Grid>
          </Grid> :
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item xs={8}>
              <StyledTextField
                label='휴대폰' type='tel' value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
            <Grid item>
              <StyledButtonSmall variant='contained'>인증</StyledButtonSmall>
            </Grid>
          </Grid>
        }
          <AdditionalContainer>
          <Checkbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <div style={{marginTop: '14px'}}>
          <h5>
            NutriMate 이용약관 및 개인정보 처리방침에 동의합니다.
          </h5>
          </div>
        </AdditionalContainer>
        <StyledButton variant='contained' disabled={!agreed} onClick={() => {
            if (id === '') {
              alert('아이디를 입력해주세요');
              return;
            }
            if (password === '') {
              alert('비밀번호를 입력해주세요');
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
      </LoginPaper>
    </LoginContainer>
  );
};

export default RegisterPage;

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
  FormLabel,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import NameProfileComponent
  from '@src/component/setting/userinfo/NameProfileComponent.jsx';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const';
import axios from 'axios';


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
    height: 80vh; // add this line
    overflow-y: auto; // add this line
        // background-color: ${({ theme }) => theme['main-background']};
    // margin: auto;
    margin-bottom: 0px;
`;
const HeaderH2 = styled.h2`
    text-align: center;
    margin-top: 20px
`;
const HeaderH4 = styled.h4`
    text-align: center;
    margin: 5px
`;
const StyledTextField = styled(TextField)`
    width: 100%;
    margin-top: 30px;
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
    margin-top: 300px;
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

// FileInput 컴포넌트 추가
const FileInput = styled.input`
    display: none;
`;

const RegisterPageNext = () => {

  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (nickname === '') {
      alert('닉네임을 입력해주세요');
      return;
    }

    // 닉네임 중복 확인 요청 보내기
    try {
      const response = await axios.post('/member/checkNick', { userNick: nickname });

      // 중복된 닉네임이 있는 경우
      if (response.data.exists) {
        alert('이미 사용 중인 닉네임입니다.');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('닉네임 중복 확인에 실패하였습니다.');
      return;
    }

    // sessionStorage에서 userData, surveyData 가져오기
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const surveyData = JSON.parse(sessionStorage.getItem('surveyData'));

    // 서버에 보낼 데이터 객체 생성
    const postData = {
      userNick: nickname,
      ...userData,
      ...surveyData,
      userAllergy: surveyData.userAllergy.join(','),
      userHealthReason: surveyData.userHealthReason.join(','),
    };
    console.log('postData:', postData);

    try {
      // 서버에 POST 요청 보내기
      const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/member/join`, postData);

      console.log('response:', response);

      if (response.status === 200) {
        navigate(LINKS.LOGIN);
        alert('회원가입되었습니다.');
      } else {
        alert('회원가입에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('회원가입에 실패하였습니다.');
    }
  };


  return (
    <LoginContainer>
      <LoginPaper>
        <LoginHeader>
          <HeaderH2> NutriMate</HeaderH2>
          <HeaderH4>사용자 이름을 만드세요.</HeaderH4>
        </LoginHeader>
        <Divider />
        <LoginBody>
          <StyledTextField
            label="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <StyledButton variant="contained" onClick={handleRegister}>완료</StyledButton>
        </LoginBody>
      </LoginPaper>
    </LoginContainer>
  );
};

export default RegisterPageNext;

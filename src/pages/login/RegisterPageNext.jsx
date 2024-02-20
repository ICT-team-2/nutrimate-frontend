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
import NameProfileComponent
  from '@src/component/setting/userinfo/NameProfileComponent.jsx';
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
    height: 70vh; // add this line
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
  const [profilePicture, setProfilePicture] = useState('');
  const navigate = useNavigate();
  const history = useNavigate();
  
  // 프로필 이미지 업로드 핸들러
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
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
            label='닉네임'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <StyledButton variant='contained' onClick={() => {
            if (nickname === '') {
              alert('닉네임을 입력해주세요');
              return;
            }
              navigate(LINKS.LOGIN);
              alert("회원가입되었습니다.");
            }}>완료</StyledButton>
        </LoginBody>
      </LoginPaper>
    </LoginContainer>
  );
};

export default RegisterPageNext;

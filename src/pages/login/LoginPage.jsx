import React from 'react';
import styled from 'styled-components';
import { Button, Container, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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
    width: 50%;
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
    display: flex;;
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
            
          </AdditionalContainer>
          <LoginButton variant="contained">Login</LoginButton>
        </LoginBody>
        <Divider>혹은</Divider>
        ss
      </LoginPaper>
    </LoginContainer>
  );
};

export default LoginPage;

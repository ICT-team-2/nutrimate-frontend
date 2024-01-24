import React from 'react';
import NameProfileComponent from '@src/component/setting/userinfo/NameProfileComponent.jsx';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import AdditionalInfos from '@src/component/setting/userinfo/AdditionalInfos.jsx';
import DietInfo from '@src/component/setting/userinfo/DietInfo.jsx';
import { Button } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

const FIELD_WIDTH = 'calc(100% + 60px)';


const StyledTypography = muiStyled(Typography)`
    margin: 30px;
`;

const StyledTextField = muiStyled(TextField)`
    width: ${FIELD_WIDTH};
    color: black;

`;


const InfoContainer = styled.div`
    width: ${FIELD_WIDTH};
    border-radius: 5px;
    background-color: white;
    height: ${({ height }) => height || '100px'};
    border: 1px solid ${({ theme }) => theme['border-color-checkbox']};
    display: flex;
    margin-bottom: 40px;
`;
const IntroduceTypo = muiStyled(StyledTypography)`
  margin: 20px;
`;
const InfoInnerContainer = styled.div`
    margin: auto;
    width: 100%;
`;
const StyledDiv = styled.div`
    display: flex;
    width: ${FIELD_WIDTH};
    margin-bottom: 40px;
`;


const UserInfoView = () => {

  const navigate = useNavigate();
  return (
    <>
      <NameProfileComponent />
      <StyledTypography variant="h5">소개</StyledTypography>
      <InfoContainer height="150px">
        <IntroduceTypo variant="body1">소개를 입력해주세요</IntroduceTypo>
      </InfoContainer>
      <StyledTypography variant="h5">추가정보</StyledTypography>
      <InfoContainer height="auto">
        <InfoInnerContainer>
          <AdditionalInfos title={['이메일']} info={['111@email.com']} />
          <AdditionalInfos title={['일일 목표 칼로리']} minWidth={['136px']} info={['2000kcal']} />
          <DietInfo />
          <AdditionalInfos isDouble info={['70.3kg', '170cm']} textAlign={['left', 'right']} />
          <AdditionalInfos title={['성별']} />
          <AdditionalInfos title={['운동을 하는 정도']} minWidth={['136px']} />
        </InfoInnerContainer>
      </InfoContainer>
      <StyledDiv>
        <FlexGrowDiv />
        <Button
          variant="contained"
          onClick={() => {
            navigate(LINKS.EDIT_INFO);
          }}
        >개인정보 수정</Button>
      </StyledDiv>
    </>

  );
};

export default UserInfoView;

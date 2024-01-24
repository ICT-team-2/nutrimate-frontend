import React from 'react';
import NameProfileComponent from '@src/component/setting/userinfo/NameProfileComponent.jsx';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import EditAdditionalInfos from '@src/component/setting/userinfo/edit/EditAdditionalInfos.jsx';
import EditDietInfo from '@src/component/setting/userinfo/edit/EditDietInfo.jsx';
import EditHeightWeightInfo from '@src/component/setting/userinfo/edit/EditHeightWeightInfo.jsx';
import EditGenderInfo from '@src/component/setting/userinfo/edit/EditGenderInfo.jsx';
import EditSelectBox from '@src/component/setting/userinfo/edit/EditSelectBox.jsx';

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

const InfoInnerContainer = styled.div`
    margin: auto;
    width: 100%;
`;
const StyledDiv = styled.div`
    display: flex;
    width: ${FIELD_WIDTH};
    margin-bottom: 40px;
`;


const UserEditInfo = () => {

  const navigate = useNavigate();
  return (
    <>
      <NameProfileComponent profileButton />
      <StyledTypography variant="h5">소개</StyledTypography>
      <StyledTextField
        variant={'outlined'} multiline rows={4}
        label="자기소개" placeholder="자기 소개를 입력해주세요"
      />
      <StyledTypography variant="h5">추가정보</StyledTypography>
      <InfoContainer height="auto">
        <InfoInnerContainer>
          <EditAdditionalInfos title={'이메일'} label={'이메일'} />
          <EditAdditionalInfos title={'일일 목표 칼로리'} label={'칼로리(kcal)'} />
          <EditSelectBox
            title="식단" label="식단"
            keys={['NORMAL', 'EXERCISE', 'KITO', 'VEGAN']}
            values={['일반식', '운동식', '키토식', '비건식']}
          />
          <EditDietInfo />
          <EditGenderInfo />
          <EditHeightWeightInfo />
          <EditSelectBox />
        </InfoInnerContainer>
      </InfoContainer>
      <StyledDiv>
        <FlexGrowDiv />
        <Button
          variant="contained"
          onClick={() => {
            navigate(LINKS.EDIT_INFO);
          }}
        >수정</Button>
      </StyledDiv>
    </>

  );
};

export default UserEditInfo;

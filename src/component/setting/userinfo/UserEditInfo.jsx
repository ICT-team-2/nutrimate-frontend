import React, { useEffect,useState } from 'react';
import NameProfileComponent
  from '@src/component/setting/userinfo/NameProfileComponent.jsx';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import AdditionalInfos
  from '@src/component/setting/userinfo/AdditionalInfos.jsx';
import DietRatioInfo from '@src/component/setting/userinfo/DietRatioInfo.jsx';
import HeightWeightInfo
  from '@src/component/setting/userinfo/HeightWeightInfo.jsx';
import GenderInfo from '@src/component/setting/userinfo/GenderInfo.jsx';
import SportSelectBox from '@src/component/setting/userinfo/SportSelectBox.jsx';
import { useAtom } from 'jotai/react';
import { dietStateAtom } from '@src/component/setting/atom.js';
import { SETTING_USER_INFOS } from '@src/component/setting/const.js';
import DietSelectBox from '@src/component/setting/userinfo/DietSelectBox.jsx';
import axios from 'axios';

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
  const handleUpdate = async () => {
    try {
      const response = await axios.put('/member/mypage', userInfo); // '/api/user'는 실제 API 엔드포인트로 변경해야 합니다.
      if (response.status === 200) {
        alert('정보가 성공적으로 수정되었습니다.');
        navigate(LINKS.VIEW_INFO);
      } else {
        alert('정보 수정에 실패하였습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error(error);
      alert('정보 수정에 실패하였습니다. 다시 시도해 주세요.');
    }
  };
  const [userInfo, setUserInfo] = useState({
    userEmail: '',
    userCal: 0,
    userDiet: '',
    userHeight: 0,
    userWeight: 0,
    userGender: '',
    userSport: '',
    userIntro:''
  });

  const [diet, setDiet] = useAtom(dietStateAtom);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    console.log(userInfo);
  },[userInfo])
  

  return (
    <>
      <NameProfileComponent 
      profileButton 
      name={'이름?'}
      nickname={'닉네임?'}
      />
      <StyledTypography variant="h5">소개</StyledTypography>
      <StyledTextField
        variant={'outlined'} multiline rows={4}
        label="자기소개" placeholder="자기 소개를 입력해주세요"
        value={userInfo.userIntro}
        onChange={e => setUserInfo({...userInfo,userIntro:e.target.value})}
      />
      <StyledTypography variant="h5">추가정보</StyledTypography>
      <InfoContainer height="auto">
        <InfoInnerContainer>
          <AdditionalInfos
            title={SETTING_USER_INFOS.EMAIL.TITLE}
            label={SETTING_USER_INFOS.EMAIL.LABEL}
            value={userInfo.userEmail}
            onChange={e => {
              console.log(e.target.value);
              setUserInfo({...userInfo,userEmail:e.target.value}
            )}}
            />
          <AdditionalInfos
            title={SETTING_USER_INFOS.CALORY.TITLE}
            label={SETTING_USER_INFOS.CALORY.LABEL}
            value={userInfo.userCal}
            onChange={e => setUserInfo({...userInfo,userCal:e.target.value})} />
          <DietSelectBox
            title={SETTING_USER_INFOS.DIET.TITLE} label={SETTING_USER_INFOS.DIET.LABEL}
            keys={SETTING_USER_INFOS.DIET.KEYS}
            values={SETTING_USER_INFOS.DIET.VALUES}
            setDiet={setDiet}
            id={SETTING_USER_INFOS.DIET.ID}
            value={userInfo.userDiet}
            onChange={e => setUserInfo({...userInfo,userDiet:e.target.value})}
          />
          <DietRatioInfo />
          <GenderInfo />
          <HeightWeightInfo />
          <SportSelectBox />
        </InfoInnerContainer>
      </InfoContainer>
      <StyledDiv>
        <FlexGrowDiv />
        <Button
          variant="contained"
          onClick={() => {
            navigate(LINKS.VIEW_INFO);
          }}
        >수정 완료</Button>
      </StyledDiv>
    </>

  );
};

export default UserEditInfo;

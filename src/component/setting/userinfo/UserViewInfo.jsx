import React, { useEffect, useState } from 'react';
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
import { SETTING_USER_INFOS } from '@src/component/setting/const.js';
import DietSelectBox from '@src/component/setting/userinfo/DietSelectBox.jsx';
import axios from 'axios';
import { useAtom } from 'jotai';
import {
  carboAtom,
  dietStateAtom,
  fatAtom,
  genderAtom,
  heightStateAtom,
  introAtom,
  proteinAtom,
  sportStateAtom,
  weightStateAtom,
} from '../atom';
import { userIdAtom } from '@src/pages/login/atom';

const FIELD_WIDTH = 'calc(100% + 60px)';

export const UserInfoContainerDiv = styled.div`
    display: flex;
    width: 100%;
    margin: 30px 0;
`;

const StyledTypography = muiStyled(Typography)`
    margin: 30px;
`;

const StyledTextField = muiStyled(TextField)`
    width: ${FIELD_WIDTH};
    color: black;

    & .MuiOutlinedInput-input.Mui-disabled{
      color: black;
      -webkit-text-fill-color: black;
    }
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

const UserViewInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [carbo, setCarbo] = useAtom(carboAtom);
  const [protein, setProtein] = useAtom(proteinAtom);
  const [fat, setFat] = useAtom(fatAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [diet, setDiet] = useAtom(dietStateAtom);
  const [gender, setGender] = useAtom(genderAtom);
  const [height, setHeight] = useAtom(heightStateAtom);
  const [weight, setWeight] = useAtom(weightStateAtom);
  const [sport, setSport] = useAtom(sportStateAtom);
  // const [intro, setIntro] = useAtom(introAtom); 

  useEffect(() => {
    console.log('UserViewInfo useEffect - userId: ', userId);
    window.scrollTo(0, 0);

    axios.get('/member/mypage', {
      params: {
        userId: sessionStorage.userId,
      },
    })
      .then(response => {
        console.log(response.data);
        setUserInfo(response.data.memberDto);
        setGender(response.data.memberDto.userGender);
        setHeight(response.data.memberDto.userHeight);
        setWeight(response.data.memberDto.userWeight);
        setSport(response.data.memberDto.userSportHard);
        // setIntro(response.data.memberDto.userIntro);

        setDiet(response.data.memberDto.userDiet);
        if (response.data.memberDto.userDiet === SETTING_USER_INFOS.DIET.CUSTOM.KEYS) {
          setCarbo(response.data.memberDto.userCarbo);
          setProtein(response.data.memberDto.userProtein);
          setFat(response.data.memberDto.userFat);
        }

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <NameProfileComponent
        name={userInfo?.userName}
        nickname={userInfo?.userNick} />
      <StyledTypography variant="h5">소개</StyledTypography>
      <StyledTextField
        variant={'outlined'} 
        multiline 
        rows={4}
        //label="자기소개" 
        placeholder="자기 소개를 입력해주세요"
        disabled
        value={userInfo?.userIntro}
      />
      <StyledTypography variant="h5">추가정보</StyledTypography>
      <InfoContainer height="auto">
        <InfoInnerContainer>
          <AdditionalInfos
            title={SETTING_USER_INFOS.EMAIL.TITLE}
            label={SETTING_USER_INFOS.EMAIL.LABEL}
            value={userInfo?.userEmail}
            disabled
          />
          <AdditionalInfos
            title={SETTING_USER_INFOS.CALORY.TITLE}
            label={SETTING_USER_INFOS.CALORY.LABEL}
            value={userInfo?.userCal}
            disabled
          />
          <DietSelectBox
            title={SETTING_USER_INFOS.DIET.TITLE} label={SETTING_USER_INFOS.DIET.LABEL}
            keys={SETTING_USER_INFOS.DIET.KEYS}
            values={SETTING_USER_INFOS.DIET.VALUES}
            defaultValue={SETTING_USER_INFOS.DIET.CUSTOM.KEYS}
            disabled
          />
          <DietRatioInfo disabled />
          <GenderInfo disabled />
          <HeightWeightInfo height={height} weight={weight} disabled />
          <SportSelectBox disabled />
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

export default UserViewInfo;

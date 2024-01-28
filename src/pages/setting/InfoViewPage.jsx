import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { useSetAtom } from 'jotai/react';
import { settingDrawerHeightAtom } from '@src/component/setting/atom.js';
import { SETTING_DRAWER_HEIGHT } from '@src/component/setting/const.js';
import UserViewInfo from '@src/component/setting/userinfo/UserViewInfo.jsx';

const StyledContainer = muiStyled(Container)`
    margin-top: 20px;
    width: 60%;
    padding-left: 100px;
`;


const InfoViewPage = () => {

  const setDrawerHeight = useSetAtom(settingDrawerHeightAtom);
  useEffect(() => {
    setDrawerHeight(SETTING_DRAWER_HEIGHT.VIEW_INFO);
  }, []);
  return (
    <StyledContainer>
      <UserViewInfo />
    </StyledContainer>
  );
};

export default InfoViewPage;

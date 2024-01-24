import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import UserEditInfo from '@src/component/setting/userinfo/edit/UserEditInfo.jsx';
import { SETTING_DRAWER_HEIGHT } from '@src/component/setting/const.js';
import { settingDrawerHeightAtom } from '@src/component/setting/atom.js';
import { useSetAtom } from 'jotai/react';

const StyledContainer = muiStyled(Container)`
    margin-top: 20px;
    width: 60%;
    padding-left: 100px;
`;


const InfoViewPage = () => {
  const setDrawerHeight = useSetAtom(settingDrawerHeightAtom);
  useEffect(() => {
    setDrawerHeight(SETTING_DRAWER_HEIGHT.EDIT_INFO);
  }, []);
  return (
    <StyledContainer>
      <UserEditInfo />
    </StyledContainer>
  );
};

export default InfoViewPage;

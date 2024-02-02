import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useAtomValue } from 'jotai/react';
import { drawerStateAtom } from '@src/component/common/Header/atom.js';
import ProfileImgMenu from '@src/component/common/Header/ProfileImgMenu.jsx';
import Logo from '@src/component/common/Logo.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import SettingSideMenu from '@src/component/setting/sidemenu/SettingSideMenu.jsx';
import SideMenu from '@src/component/common/Header/SideMenu.jsx';
import { settingDrawerHeightAtom } from '@src/component/setting/atom.js';

const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

//sidemenu css 설정
const StyledAppBar = muiStyled(AppBar)`
    background-color: ${({ theme }) => theme['main-background']};
    color: black;
    min-height: 56px;
    box-shadow: none;
    position: static;
`;
const StyledButton = muiStyled(Button)`
      color: ${({ theme }) => theme['gray-light-text']};
      margin-right: 1rem;
  `;

/**
 * @param props {{hasDrawer: boolean}}
 * @returns {Element}
 * @constructor
 */
const SettingHeader = (props) => {
  // const theme = useTheme();
  const { hasDrawer } = props;
  const settingDrawerOpen = useAtomValue(drawerStateAtom);
  const drawerHeight = useAtomValue(settingDrawerHeightAtom);
  const navigate = useNavigate();

  const gotoInfo = () => {
    navigate(LINKS.INFO);
  };

  const gotoBoard = () => {
    navigate(LINKS.ALL_INFO_BOARD + '/1');
  };
  const gotoFeed = () => {
    navigate(LINKS.FEEDBOARD_VIEW);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar open={settingDrawerOpen}>
        <Toolbar sx={{ flexGrow: 0 }}>
          {/* 로고 */}
          <Logo />
          {/* 햄버거 아이콘 */}
          {/* {hasDrawer && <SettingMenuButton />} */}
          {/* 빈 공간 */}
          <Box sx={{ flexGrow: 1 }} />
          <StyledButton onClick={gotoInfo}>Infomation</StyledButton>
          <StyledButton onClick={gotoBoard}>Board</StyledButton>
          <StyledButton onClick={gotoFeed}>Feed</StyledButton>
          <ProfileImgMenu />
        </Toolbar>
      </StyledAppBar>
      {hasDrawer && <SettingSideMenu />}
      <SideMenu drawerWidth="200px" drawerHeight={drawerHeight} />
    </Box>

  );
};

SettingHeader.defaultProps = {
  hasDrawer: true,
};

export default SettingHeader;

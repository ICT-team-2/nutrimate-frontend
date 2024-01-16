import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useAtomValue } from 'jotai/react';

import SideMenu from '@src/component/common/Header/SideMenu';
import SideMenuButton from '@src/component/common/Header/SideMenuButton';
import { drawerState } from '@src/component/common/Header/jotai';
import ProfileImgMenu from '@src/component/common/Header/ProfileImgMenu';
import Logo from '@src/component/common/Logo';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

//header css 설정
const StyledAppBar = styled(AppBar)`
    background-color: white;
    color: black;
    min-height: 56px;
    box-shadow: none;
`;

/**
 *
 * @param props {{hasDrawer: boolean}}
 * @returns {Element}
 * @constructor
 */
const Header = (props) => {
  // const theme = useTheme();
  const { hasDrawer } = props;

  const open = useAtomValue(drawerState);

  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar position="fixed" open={open}>
        <Toolbar sx={{ flexGrow: 0 }}>
          {/* 로고 */}
          <Logo />
          {/* 햄버거 아이콘 */}
          {hasDrawer && <SideMenuButton />}
          {/* 빈 공간 */}
          <Box sx={{ flexGrow: 1 }} />

          <ProfileImgMenu />
        </Toolbar>
      </StyledAppBar>

      {hasDrawer && <SideMenu />}
    </Box>
  );
};

Header.defaultProps = {
  hasDrawer: true,
};

export default Header;

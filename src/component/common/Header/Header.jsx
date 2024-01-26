import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useAtomValue } from 'jotai/react';

import SideMenu from '@src/component/common/Header/SideMenu';
import SideMenuButton from '@src/component/common/Header/SideMenuButton';
import { drawerStateAtom } from '@src/component/common/Header/atom.js';
import ProfileImgMenu from '@src/component/common/Header/ProfileImgMenu';
import Logo from '@src/component/common/Logo';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import Tooltip from '@mui/material/Tooltip';

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
const Header = (props) => {
  // const theme = useTheme();
  const { hasDrawer } = props;
  
  const open = useAtomValue(drawerStateAtom);
  const navigate = useNavigate();
  const gotoInfo = () => {
    navigate(LINKS.INFO);
  };
  
  const gotoBoard = () => {
    navigate(LINKS.ALL_INFO_BOARD + '/1');
  };
  
  return (
    <Box sx={{ display: 'flex' }}>
      <StyledAppBar open={open}>
        <Toolbar sx={{ flexGrow: 0 }}>
          {/* 로고 */}
          <Logo />
          {/* 햄버거 아이콘 */}
          {/* {hasDrawer && <SideMenuButton />} */}
          {/* 빈 공간 */}
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title={'Infomation'}>
            <StyledButton onClick={gotoInfo}>Infomation</StyledButton>
          </Tooltip>
          <Tooltip title={'Board'}>
            <StyledButton onClick={gotoBoard}>Board</StyledButton>
          </Tooltip>
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

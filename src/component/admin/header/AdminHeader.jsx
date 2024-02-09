import React from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { useAtomValue } from 'jotai/react';

import SideMenu from '@src/component/common/Header/SideMenu';
import { drawerStateAtom } from '@src/component/common/Header/atom.js';
import ProfileImgMenu from '@src/component/common/Header/ProfileImgMenu';
import Logo from '@src/component/common/Logo';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import styled from 'styled-components';
import AdminSideMenu from '@src/component/admin/header/AdminSidebar.jsx';

const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

//sidemenu css 설정
const StyledAppBar = styled(AppBar)`
    background-color: ${({ theme, logowhite }) =>
            logowhite === 'true' ?
                    'rgba(255, 255, 255, 0)' : theme['main-background']};
    color: black;
    min-height: 56px;
    box-shadow: none;
    position: ${({ logowhite }) =>
            logowhite === 'true' ? 'absolute' : 'static'
    };
    padding: 0;
    padding-right: 0 !important; //프로필 메뉴 클릭시 패딩 생기는거 날리는 용
`;
const StyledButton = styled(Button)`
    color: ${({ theme, logowhite }) =>
            logowhite === 'true' ?
                    'white' : theme['gray-light-text']};
    margin-right: 1rem;
`;

/**
 * @param props {{hasDrawer: boolean}}
 * @returns {Element}
 * @constructor
 */
const Header = (props) => {
  // const theme = useTheme();
  const { hasDrawer, logoWhite } = props;

  const open = useAtomValue(drawerStateAtom);
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
      <StyledAppBar open={open} logowhite={logoWhite + ''}>
        <Toolbar sx={{ flexGrow: 0 }}>
          {/* 로고 */}
          <Logo logoWhite={logoWhite} />
          {/* 햄버거 아이콘 */}
          {/* {hasDrawer && <SideMenuButton />} */}
          {/* 빈 공간 */}
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </StyledAppBar>
      {hasDrawer && <AdminSideMenu />}
    </Box>
  );
};

Header.defaultProps = {
  hasDrawer: true,
};

export default Header;

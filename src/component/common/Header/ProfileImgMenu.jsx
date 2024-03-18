import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import { useAtomValue } from 'jotai/react';
import { profileImageAtom } from '@src/component/mypage/atom.js';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import { LINKS } from '@src/utils/const.js';
import styled from 'styled-components';


const settings = ['프로필', '채팅', '캘린더', '로그아웃'];

const StyledIconButton = styled(IconButton)`
    cursor: pointer;
    padding: 0;
`;

const ProfileImgMenu = () => {

  const [anchorElUser, setAnchorElUser] = useState();
  const [userId, setUserId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const { data } = useFetchProfileData();


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      {/* 프로필 아이콘 */}
      <StyledIconButton onClick={handleOpenUserMenu}>
        <UserAvatar
          clickable
          userNick={data?.userNick}
          src={data?.userProfile && import.meta.env.REACT_APP_BACKEND_URL + data?.userProfile}
        />
      </StyledIconButton>


      {/* 드롭다운 메뉴 */}
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={async () => {
              handleCloseUserMenu();
              if (setting === '프로필') {
                navigate(`${LINKS.MYINFO}/${sessionStorage.getItem('userId')}`);
                return;
              }
              if (setting === '채팅') {
                navigate(LINKS.DM);
                return;
              }
              if (setting === '캘린더') {
                navigate(LINKS.CALENDAR);
                return;
              }
              if (setting === '로그아웃') {
                await axios.get('/logout');
                sessionStorage.removeItem('userId');
                navigate('/');
                localStorage.removeItem('isPaid'); // 로그아웃 처리시 결제 상태를 로컬 스토리지에 삭제
              }
            }}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileImgMenu;

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


const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ProfileImgMenu = () => {

  const [anchorElUser, setAnchorElUser] = useState();
  const [userId, setUserId] = useAtom(userIdAtom);
  const navigate = useNavigate();
  const { data } = useFetchProfileData(userId);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {/* 프로필 아이콘 */}
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <UserAvatar src={import.meta.env.REACT_APP_BACKEND_URL + data?.userProfile} />
      </IconButton>


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
          <MenuItem key={setting} onClick={async () => {
            handleCloseUserMenu();
            if (setting === 'Logout') {
              await axios.get('/logout');
              setUserId(undefined);
              navigate('/');
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

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import { useAtomValue } from 'jotai/react';
import { uploadedImageAtom } from '@src/component/mypage/atom.js';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ProfileImgMenu = () => {
  
  const [anchorElUser, setAnchorElUser] = useState();
  const uploadImg = useAtomValue(uploadedImageAtom);
  
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
        <UserAvatar src={uploadImg} />
      </IconButton>
      
      
      {/* 드롭다운 메뉴 */}
      <Menu
        sx={{ mt: '45px' }}
        id='menu-appbar'
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
          <MenuItem key={setting} onClick={() => {
            handleCloseUserMenu();
            if (setting === 'Logout') {
              sessionStorage.removeItem('userId');
              window.location.href = '/'; //로그아웃 후 메인화면
            }
          }}
        >
          <Typography textAlign='center'>{setting}</Typography>
        </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default ProfileImgMenu;

import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAtom, useSetAtom } from 'jotai/react';
import { bookmarkMenuAtom, myPageTabAtom } from '@src/component/mypage/atom.js';
import { Menu, MenuItem } from '@mui/material';
import { BOOKMARK_MENU } from '@src/component/mypage/const.js';

export default function CenteredTabs({ tab = null }) {
  const [value, setValue] = useAtom(myPageTabAtom);
  const [anchorEl, setAnchorEl] = useState(null);
  const setSelectedMenu = useSetAtom(bookmarkMenuAtom);

  useEffect((() => {
      if (tab !== null) {
        setValue(tab);
      }
    }
  ), []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (event, newValue) => {
    setValue(newValue);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedMenu(index);
    setAnchorEl(null);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleTabClick} centered>
        <Tab label="정보공유" />
        <Tab label="피드" />
        <Tab label="북마크" onClick={handleMenuClick} />
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, BOOKMARK_MENU.INFO)}>
          정보공유
        </MenuItem>
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, BOOKMARK_MENU.FEED)}>
          피드
        </MenuItem>
        {/* 이하 동일하게 추가... */}
      </Menu>
    </Box>
  );
}

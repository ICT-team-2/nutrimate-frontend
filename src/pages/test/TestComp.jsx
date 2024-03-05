import React, { useState } from 'react';
import { Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { RECOMMAND_MENU } from '@src/component/infomation/const.js';

export default function TestComp() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  return (
    <div>
      <Tabs value={selectedIndex} onChange={handleMenuItemClick}>
        <Tab label="뉴스" />
        <Tab label="추천" onClick={handleClick} />
        <Tab label="알레르기" />
        {/* 이하 동일하게 추가... */}
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, RECOMMAND_MENU.NUTRIENTS)}>
          영양제 추천
        </MenuItem>
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, RECOMMAND_MENU.SPORT)}>
          운동 추천
        </MenuItem>
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, RECOMMAND_MENU.PLACE)}>
          장소 추천
        </MenuItem>
        <MenuItem onClick={(event) =>
          handleMenuItemClick(event, RECOMMAND_MENU.FOOD)}>
          음식 추천
        </MenuItem>
        {/* 이하 동일하게 추가... */}
      </Menu>
    </div>
  );
}

import React, { useState } from 'react';
import { Menu, MenuItem, Tab, Tabs } from '@mui/material';
import { useAtom, useSetAtom } from 'jotai/react';
import { infoTabStateAtom, recommandMenuStateAtom } from '@src/component/infomation/atom.js';
import { INFO_TABS, RECOMMAND_MENU } from '@src/component/infomation/const.js';

export default function InfomationTabs() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTab, setSelectedTab] = useAtom(infoTabStateAtom);
  const setSelectedMenu = useSetAtom(recommandMenuStateAtom);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (event, index) => {
    setSelectedTab(index);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedMenu(index);
    setAnchorEl(null);
  };

  return (
    <div>
      <Tabs value={selectedTab} onChange={handleTabClick}>
        <Tab label="뉴스" />
        <Tab label="추천"
             onMouseOver={handleMenuClick}
             onMouseLeave={() => {
               setTimeout(() => {
                 handleClose();
               }, 3000);
             }}
        />
      </Tabs>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(event) => {
            setSelectedTab(INFO_TABS.RECOMMAND);
            handleMenuItemClick(event, RECOMMAND_MENU.NUTRIENTS);
          }}
        >
          영양제 추천
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            setSelectedTab(INFO_TABS.RECOMMAND);
            handleMenuItemClick(event, RECOMMAND_MENU.SPORT);
          }}
        >운동 추천
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            setSelectedTab(INFO_TABS.RECOMMAND);
            handleMenuItemClick(event, RECOMMAND_MENU.PLACE);
          }}>장소 추천
        </MenuItem>
        <MenuItem
          onClick={(event) => {
            setSelectedTab(INFO_TABS.RECOMMAND);
            handleMenuItemClick(event, RECOMMAND_MENU.FOOD);
          }}>음식 추천
        </MenuItem>
        {/* 이하 동일하게 추가... */}
      </Menu>
    </div>
  );
}

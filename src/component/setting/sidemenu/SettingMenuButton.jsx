import { useAtom } from 'jotai/react';
import { drawerStateAtom, sideMenuIconRefAtom } from '@src/component/common/Header/atom.js';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useRef } from 'react';
import { settingDrawerStateAtom } from '@src/component/setting/atom.js';


const SettingMenuButton = () => {
  const [open, setOpen] = useAtom(drawerStateAtom);
  const [settingDrawerOpen, setSettingDrawerOpen] = useAtom(settingDrawerStateAtom);

  const [refA, setRef] = useAtom(sideMenuIconRefAtom);
  const ref = useRef(null);

  const handleDrawer = (event) => {
    if (settingDrawerOpen) {
      handleDrawerClose(event);
      return;
    }
    handleDrawerOpen(event);
  };

  const handleDrawerOpen = (event) => {
    setSettingDrawerOpen(true);
    setOpen(true);
  };

  const handleDrawerClose = (event) => {
    setSettingDrawerOpen(false);
    setOpen(false);

  };

  useEffect(() => {
    setSettingDrawerOpen(open);
  }, []);

  useEffect(() => {
    setRef(ref.current);
  }, [ref]);

  return (
    <IconButton
      color="inherit"
      onClick={handleDrawer}
      edge="start"
      sx={{
        marginLeft: 1,
      }}
      ref={ref}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default SettingMenuButton;

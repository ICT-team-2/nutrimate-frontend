import { useAtom } from 'jotai/react';
import { drawerState } from '@src/component/common/Header/jotai';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';


const SideMenuButton = () => {
  const [open, setOpen] = useAtom(drawerState);

  const handleDrawer = () => {
    if (open) {
      handleDrawerClose();
      return;
    }
    handleDrawerOpen();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <IconButton
      color="inherit"
      onClick={handleDrawer}
      edge="start"
      sx={{
        marginLeft: 1,
      }}
    >
      <MenuIcon />
    </IconButton>
  );
};

export default SideMenuButton;

import { useAtom } from 'jotai/react';
import { drawerState, sideMenuIconRefAtom } from '@src/component/common/Header/atom.js';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useRef } from 'react';


const SideMenuButton = () => {
  const [open, setOpen] = useAtom(drawerState);

  const [refA, setRef] = useAtom(sideMenuIconRefAtom);
  const ref = useRef(null);

  const handleDrawer = (event) => {
    if (open) {
      handleDrawerClose(event);
      return;
    }
    handleDrawerOpen(event);
  };

  const handleDrawerOpen = (event) => {
    setOpen(true);

  };

  const handleDrawerClose = (event) => {
    setOpen(false);

  };

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

export default SideMenuButton;

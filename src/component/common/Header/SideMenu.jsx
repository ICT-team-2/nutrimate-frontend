import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useAtom, useAtomValue } from 'jotai/react';

import { drawerState } from '@src/component/common/Header/jotai';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  '& .MuiDrawer-paper': {
    border: 'none', // 항상 적용되는 border 제거
    ...openedMixin(theme), // open 상태일 때 적용되는 스타일
    ...closedMixin(theme), // close 상태일 때 적용되는 스타일
    ...(open ? openedMixin(theme) : closedMixin(theme)), // open 상태에 따라 적용
  },
}));


const StyledDrawer = styled(Drawer)`
`;

const menuItem = ['Inbox', 'Starred', 'Send email', 'Drafts'];
const menuIcon = [<InboxIcon key="icon1" />,
  <MailIcon key="icon2" />,
  <InboxIcon key="icon3" />,
  <MailIcon key="icon4" />,
];

const SideMenu = () => {

  const open = useAtomValue(drawerState);

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        {menuItem.map((text, index) => (
          <ListItem key={text} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              {/* 메뉴의 아이콘 */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                }}
              >
                {menuIcon[index]}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default SideMenu;

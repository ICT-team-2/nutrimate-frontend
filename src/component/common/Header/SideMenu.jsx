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
import { MENU_LIST } from '@src/utils/const.js';
import { faBookmark, faGear, faHeart, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  border: 'none',
  backgroundColor: theme['main-background'],
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
  border: 'none',
  backgroundColor: theme['main-background'],

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
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),

}));

const StyledDrawer = styled(Drawer)`
    &.MuiDrawer-docked {
        width: 0;
    }

    & .MuiDrawer-paper {
        position: absolute;
    }

`;

const menuItem = [
  MENU_LIST.HOME,
  MENU_LIST.SEARCH,
  MENU_LIST.RECORD,
  MENU_LIST.CALENDAR,
  MENU_LIST.INFOBOARD,
  MENU_LIST.FEEDBOARD,
  MENU_LIST.CHALLENGE,
  MENU_LIST.USERINFO,
  MENU_LIST.BOOKMARK,
  MENU_LIST.SETTING,
];


const menuTitle = menuItem.map((item) => item.TITLE);

const menuIcon = [
  <InboxIcon key="icon1" />,
  <MailIcon key="icon2" />,
  <InboxIcon key="icon3" />,
  <MailIcon key="icon4" />,
  <InboxIcon key="icon5" />,
  <FontAwesomeIcon key="icon6" icon={faHeart} />,
  <FontAwesomeIcon key="icon7" icon={faTrophy} />,
  <FontAwesomeIcon key="icon8" icon={faUser} />,
  <FontAwesomeIcon key="icon9" icon={faBookmark} />,
  <FontAwesomeIcon key="icon10" icon={faGear} />,
];

const SideMenu = () => {

  const open = useAtomValue(drawerState);

  return (
    <StyledDrawer variant="permanent" open={open}>
      <DrawerHeader />
      <List>
        {menuTitle.map((text, index) => (
          <ListItem key={text + index} disablePadding sx={{ display: 'block' }}>
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
                  ml: 1,
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
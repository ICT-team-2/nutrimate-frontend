import React, { useEffect, useRef, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled as muiStyled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useAtom, useAtomValue } from 'jotai/react';

import {
  drawerStateAtom,
  sideMenuIconRefAtom,
} from '@src/component/common/Header/atom.js';
import {
  faCircleXmark,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  settingDrawerHeightAtom,
  settingDrawerStateAtom,
} from '@src/component/setting/atom.js';
import styled from 'styled-components';
import { SETTING_LIST } from '@src/component/setting/const.js';
import { firstDrawerRefAtom } from '@src/utils/atom.js';

const innerDrawerWidth = '220px';
const fullOpenDrawerWidth = 380;
const halfOpenDrawerWidth = 250;

const openedMixin = (theme, width) => ({
  width: width,
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
const DrawerHeader = muiStyled('div')(({ theme }) => ({
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  backgroundColor: theme['main-background'],
}));

const Drawer = muiStyled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, width }) => ({
  width: width,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme, width),
    '& .MuiDrawer-paper': openedMixin(theme, width),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  
}));

const StyledDrawer = muiStyled(Drawer)`
    &.MuiDrawer-docked {
        width: 0;
    }

    & .MuiDrawer-paper {
        position: absolute;
        left:65px;
        background-color: ${({ theme }) => theme['dark-background']};
        height: ${({ height }) => height || '100vh'};
    }
`;
const DrawerInnerContainer = styled.div`
    display: flex;
    flex-direction: row;

`;

//메뉴 아이템들
const menuItem = (() => {
  const list = [];
  for (let item in SETTING_LIST) {
    list.push(SETTING_LIST[item]);
  }
  return list;
})();
// console.log(menuItem);

const menuTitle = menuItem.map((item) => item.TITLE);
const menuPath = menuItem.map((item) => item.PATH);

const itemMargin = [0, 3];

//메뉴 아이콘들
const menuIcon = [
  <FontAwesomeIcon key='icon1' icon={faClipboardList}
                   style={{ paddingLeft: '4px' }} />,
  <FontAwesomeIcon key='icon2' icon={faCircleXmark}
                   style={{ paddingLeft: '1px' }} />,

];

const SettingSideMenu = () => {
  
  const [drawerOpen, setDrawerOpen] = useAtom(settingDrawerStateAtom);
  const navigate = useNavigate();
  const drawerRef = useRef();
  const documentRef = useRef(window.document);
  const iconButtonRef = useAtomValue(sideMenuIconRefAtom);
  const drawerHeight = useAtomValue(settingDrawerHeightAtom);
  const [firstDrawerRef, setFirstDrawerRef] = useAtom(firstDrawerRefAtom);
  // const [sideDivState, setSideDivState] = useState(false);
  const [firstDrawerState, setFirstDrawerState] = useAtom(drawerStateAtom);
  
  // drawer 밖을 클릭하면 drawer가 닫히도록
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current
        && !drawerRef.current.contains(event.target)
        && iconButtonRef
        && !iconButtonRef.contains(event.target)
      ) {
        setDrawerOpen(false);
      }
    };
    console.log(drawerHeight);
    documentRef.current.addEventListener('mousedown', handleClickOutside);
    return () => {
      documentRef.current.removeEventListener('mousedown', handleClickOutside);
    };
  }, [iconButtonRef]);
  
  useEffect(() => {
    console.log(firstDrawerRef);
    
    drawerRef.current.addEventListener('mouseover', (event) => {
      setDrawerOpen(true);
    });
    
    drawerRef.current.addEventListener('mouseleave', (event) => {
      setDrawerOpen(false);
    });
    if (!!firstDrawerRef) {
      firstDrawerRef.addEventListener('mouseover', (event) => {
        setDrawerOpen(true);
      });
      
      firstDrawerRef.addEventListener('mouseleave', (event) => {
        setDrawerOpen(false);
      });
    }
  }, [firstDrawerRef]);
  useEffect(() => {
    console.log(firstDrawerRef);
  }, [firstDrawerRef]);
  
  return (
    <StyledDrawer
      variant='permanent'
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      ref={drawerRef}
      height={drawerHeight}
      width={firstDrawerState ? fullOpenDrawerWidth : halfOpenDrawerWidth}
    >
      <DrawerHeader />
      <DrawerInnerContainer>
        <div
          style={{ width: firstDrawerState ? innerDrawerWidth : '0px' }}></div>
        <List sx={{ width: '100%' }}>
          {menuTitle.map((text, index) => (
            <ListItem key={text + index} disablePadding
                      sx={{ display: 'block' }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: drawerOpen ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(menuPath[index]);
                }}
              >
                {/* 메뉴의 아이콘 */}
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: drawerOpen ? 3 : 'auto',
                  }}
                >
                  {menuIcon[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{
                    opacity: drawerOpen ? 1 : 0,
                    marginLeft: itemMargin[index] + 'px',
                  }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerInnerContainer>
    </StyledDrawer>
  );
};

export default SettingSideMenu;
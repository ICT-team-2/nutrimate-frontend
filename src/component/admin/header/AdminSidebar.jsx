import React, { useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useAtom, useAtomValue } from 'jotai/react';

import { drawerStateAtom, firstDrawerRefAtom, sideMenuIconRefAtom } from '@src/component/common/Header/atom.js';
import { MENU_LIST } from '@src/utils/const.js';
import {
  faCalendar, faChartLine,
  faClipboard,
  faGear,
  faHeart,
  faHouse,
  faPaperPlane,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { ADMIN_MENU_LIST } from '@src/component/admin/const.js';


const drawerWidth = 240;

const openedMixin = (theme, drawerWidth) => ({
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
})(({ theme, open, drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  ...(open && {
    ...openedMixin(theme, drawerwidth),
    '& .MuiDrawer-paper': openedMixin(theme, drawerwidth),
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
        height: ${({ drawerheight }) => drawerheight || 'auto'};
    }

`;

//메뉴 아이템들
const menuItem = Object.values(ADMIN_MENU_LIST);
const menuTitle = menuItem.map((item) => item.TITLE);

const itemMargin = [0, 3];

//메뉴 아이콘들
const menuIcon = [
  <FontAwesomeIcon icon={faChartLine}
                   style={{ paddingLeft: '1px' }} />,
  <FontAwesomeIcon icon={faUser}
                   style={{ paddingLeft: '2px' }} />,
];

const AdminSideMenu = ({ drawerWidth, drawerHeight }) => {

  const [drawerOpen, setDrawerOpen] = useAtom(drawerStateAtom);
  const navigate = useNavigate();
  const drawerRef = useRef();
  const documentRef = useRef(window.document);
  const iconButtonRef = useAtomValue(sideMenuIconRefAtom);
  const [drawerRefAtom, setDrawerRefAtom] = useAtom(firstDrawerRefAtom);

  const itemOnClick = menuItem.map((item) => {
    return () => {
      navigate(item.PATH);
    };
  });

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
    documentRef.current.addEventListener('mousedown', handleClickOutside);
    return () => {
      documentRef.current.removeEventListener('mousedown', handleClickOutside);
    };
  }, [iconButtonRef]);

  // drawer 안에 mouse가 들어오면 drawer가 열리도록
  useEffect(() => {
    const handleMouseEnter = () => {
      setDrawerOpen(true);
    };
    const handleMouseLeave = () => {
      setDrawerOpen(false);
    };
    drawerRef.current.addEventListener('mouseover', handleMouseEnter);
    drawerRef.current.addEventListener('mouseleave', handleMouseLeave);
  }, []);

  useEffect(() => {
    setDrawerRefAtom(drawerRef.current);
  }, [drawerRef]);

  return (
    <StyledDrawer
      variant="permanent"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      ref={drawerRef}
      drawerwidth={drawerWidth}
      drawerheight={drawerHeight}
    >
      <DrawerHeader />
      <List>
        {menuTitle.map((text, index) => (
          <ListItem
            key={text + index} disablePadding sx={{ display: 'block' }}
            onClick={itemOnClick[index]}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: drawerOpen ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              {/* 메뉴의 아이콘 */}
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerOpen ? 4 : 'auto',
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
    </StyledDrawer>
  );
};

AdminSideMenu.defaultProps = {
  drawerWidth: drawerWidth,
};

export default AdminSideMenu;
import React, { useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import { useAtom, useAtomValue } from 'jotai/react';

import { drawerState, sideMenuIconRefAtom } from '@src/component/common/Header/atom.js';
import { MENU_LIST } from '@src/utils/const.js';
import {
  faBookmark,
  faCalendar,
  faClipboard,
  faGear,
  faHeart,
  faHouse,
  faMagnifyingGlass,
  faPaperPlane,
  faTrophy,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

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

//메뉴 아이템들
const menuItem = [
  MENU_LIST.HOME,
  MENU_LIST.SEARCH,
  MENU_LIST.RECORD,
  MENU_LIST.CALENDAR,
  MENU_LIST.INFOBOARD,
  MENU_LIST.FEEDBOARD,
  MENU_LIST.CHALLENGE,
  MENU_LIST.MYINFO,
  MENU_LIST.BOOKMARK,
  MENU_LIST.SETTING,
];


const menuTitle = menuItem.map((item) => item.TITLE);

const itemMargin = [0, 1, 3, 2, 1, 1, 0, 2, 3, 1];

//메뉴 아이콘들
const menuIcon = [
  <FontAwesomeIcon key="icon1" icon={faHouse} />,
  <FontAwesomeIcon key="icon2" icon={faMagnifyingGlass}
                   style={{ paddingLeft: '1px' }} />,
  <FontAwesomeIcon key="icon3" icon={faClipboard}
                   style={{ paddingLeft: '3px' }} />,
  <FontAwesomeIcon key="icon4" icon={faCalendar}
                   style={{ paddingLeft: '2px' }} />,
  <FontAwesomeIcon key="icon5" icon={faPaperPlane}
                   style={{ paddingLeft: '1px' }} />,
  <FontAwesomeIcon key="icon6" icon={faHeart}
                   style={{ paddingLeft: '1px' }} />,
  <FontAwesomeIcon key="icon7" icon={faTrophy} />,
  <FontAwesomeIcon key="icon8" icon={faUser}
                   style={{ paddingLeft: '2px' }} />,
  <FontAwesomeIcon key="icon9" icon={faBookmark}
                   style={{ paddingLeft: '3px' }} />,
  <FontAwesomeIcon key="icon10" icon={faGear}
                   style={{ paddingLeft: '1px' }} />,
];


const SideMenu = () => {

  const [drawerOpen, setDrawerOpen] = useAtom(drawerState);
  const navigate = useNavigate();
  const drawerRef = useRef();
  const documentRef = useRef(window.document);
  const iconButtonRef = useAtomValue(sideMenuIconRefAtom);

  const itemOnClick = menuItem.map((item) => {
    return () => {
      if (item.TITLE === MENU_LIST.SEARCH.TITLE) {
        // todo 검색창 열기
        return;
      }
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

  return (
    <StyledDrawer
      variant="permanent"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      ref={drawerRef}
    >
      <DrawerHeader />
      <List>
        {menuTitle.map((text, index) => (
          <ListItem key={text + index} disablePadding sx={{ display: 'block' }}
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

export default SideMenu;
import { LINKS, ROUTER_LINKS } from '@src/utils/const.js';

export const SETTING_LIST = {
  USERINFO: {
    TITLE: '개인정보 확인',
    PATH: LINKS.VIEW_INFO,
    ROUTER: ROUTER_LINKS.VIEW_INFO,
  },
  DELETE_USER: {
    TITLE: '회원 탈퇴',
    PATH: LINKS.DELETE_USER,
    ROUTER: ROUTER_LINKS.DELETE_USER,
  },
};

export const SETTING_DRAWER_HEIGHT = {
  VIEW_INFO: '1280px',
  EDIT_INFO: '1460px',
  DELETE_USER: 'calc(100vh - 40px)',
};
import { LINKS, ROUTER_LINKS, USER_INFOS } from '@src/utils/const.js';

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
  // VIEW_INFO: '1460px',
  // EDIT_INFO: '1460px',
  // DELETE_USER: 'calc(100vh - 40px)',
  VIEW_INFO: '465px',
  EDIT_INFO: '465px',
  DELETE_USER: '465px',
};

export const SETTING_USER_INFOS = {
  SPORT: { ...USER_INFOS.SPORT },
  DIET: { ...USER_INFOS.DIET },
  GENDER: { ...USER_INFOS.GENDER },
  INTRODUCE: {
    TITLE: '자기소개',
    LABEL: '자기 소개를 입력해주세요',
  },
  EMAIL: {
    TITLE: '이메일',
    LABEL: '이메일',
  },
  CALORY: {
    TITLE: '일일 목표 칼로리',
    LABEL: '칼로리(kcal)',
  },
  HEIGHT: {
    TITLE: '키',
    LABEL: '키(cm)',
    ID: 'height',
  },
  WEIGHT: {
    TITLE: '몸무게',
    LABEL: '몸무게(kg)',
    ID: 'weight',
  },
};
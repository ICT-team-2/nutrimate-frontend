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
  VIEW_INFO: '1460px',
  EDIT_INFO: '1460px',
  DELETE_USER: 'calc(100vh - 40px)',
};

export const USERINFOS = {
  SPORT: {
    TITLE: '일주일에 운동을 하는 횟수',
    LABEL: '운동횟수',
    KEYS: ['LOW', 'MEDIUM', 'HIGH'],
    VALUES: ['적게(0-2회)', '보통(3-5회)', '많이(5-7회)'],
  },
  DIET: {
    TITLE: '식단',
    LABEL: '식단',
    KEYS: ['NORMAL', 'EXERCISE', 'KITO', 'VEGAN', 'CUSTOM'],
    VALUES: ['일반 식단', '운동 식단', '케토 식단', '비건 식단', '사용자 정의'],
    NORMAL: {
      KEYS: 'NORMAL',
      VALUES: '일반 식단',
      CARBO: 50,
      PROTEIN: 20,
      FAT: 30,
    },
    EXERCISE: {
      KEYS: 'EXERCISE',
      VALUES: '운동 식단',
      CARBO: 45,
      PROTEIN: 35,
      FAT: 20,
    },
    KITO: {
      KEYS: 'KITO',
      VALUES: '케토 식단',
      CARBO: 5,
      PROTEIN: 20,
      FAT: 75,
    },
    VEGAN: {
      KEYS: 'VEGAN',
      VALUES: '비건 식단',
      CARBO: 50,
      PROTEIN: 25,
      FAT: 25,
    },
    CUSTOM: {
      KEYS: 'CUSTOM',
      VALUES: '사용자 정의',
    },
  },
  GENDER: {
    TITLE: '성별',
    MALE: {
      LABEL: '남자',
      VALUES: 'M',
    },
    FEMALE: {
      LABEL: '여자',
      VALUES: 'F',
    },
  },
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
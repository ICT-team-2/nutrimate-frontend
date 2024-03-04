import { convertDateToUrlParam } from '@src/utils/functions.js';

export const TITLE = {
  APP: 'NutriMate',
  ALL_INFO_BOARD: '전체',
  INFO_BOARD: '정보 공유',
  FOOD_BOARD: '식단',
  SPORT_BOARD: '운동',
  FEED_BOARD: '피드',
  INFO: '자료 공유',
  BOARD_WRITE: '글쓰기',

};

export const PATH_PARAMS = {
  BOARD: 'board',
  ALL: 'all',
  INFO: 'info',
  FOOD: 'food',
  SPORT: 'sport',
  FEED: 'feed',
  WRITE: 'write',
  VIEW: 'view',
  CHALLENGE: 'challenge',
  RECORD: 'record',
  CALENDAR: 'calendar',
  MYINFO: 'mypage',
  BOOKMARK: 'bookmark',
  SETTING: 'setting',
  EDIT: 'edit',
  DELETE: 'delete',
  CHAT: 'chat',
  LOGIN: 'login',
  REGISTER: 'register',
  NEXT: 'next',
  MEMBER: 'member',
  SURVEY: 'survey',
  ADMIN: 'admin',
  CHART: 'chart',
  MANAGE: 'manage',
};

//
export const ROUTER_LINKS = {
  BOARD: PATH_PARAMS.BOARD,
  ALL_INFO_BOARD: PATH_PARAMS.INFO + '/' + PATH_PARAMS.ALL,
  FOOD_BOARD: PATH_PARAMS.INFO + '/' + PATH_PARAMS.FOOD,
  SPORT_BOARD: PATH_PARAMS.INFO + '/' + PATH_PARAMS.SPORT,
  FEED_BOARD: PATH_PARAMS.FEED,
  FEED_BOARD_WRITE: PATH_PARAMS.FEED + '/' + PATH_PARAMS.WRITE,
  FEED_BOARD_VIEW: PATH_PARAMS.FEED + '/' + PATH_PARAMS.VIEW,
  FEED_BOARD_EDIT: PATH_PARAMS.FEED + '/' + PATH_PARAMS.EDIT,
  INFO: PATH_PARAMS.INFO,
  INFO_BOARD_WRITE: PATH_PARAMS.INFO + '/' + PATH_PARAMS.WRITE,
  INFO_BOARD_VIEW: PATH_PARAMS.INFO + '/' + PATH_PARAMS.VIEW,
  RECORD: PATH_PARAMS.RECORD,
  CALENDAR: PATH_PARAMS.CALENDAR,
  MYINFO: PATH_PARAMS.MYINFO,
  BOOKMARK: PATH_PARAMS.BOOKMARK,
  SETTING: PATH_PARAMS.SETTING,
  CHALLENGE: PATH_PARAMS.CHALLENGE,
  CHALLENGE_CHAT: PATH_PARAMS.CHAT,
  VIEW_INFO: PATH_PARAMS.INFO + '/' + PATH_PARAMS.VIEW,
  EDIT_INFO: PATH_PARAMS.INFO + '/' + PATH_PARAMS.EDIT,
  DELETE_USER: PATH_PARAMS.INFO + '/' + PATH_PARAMS.DELETE,
  LOGIN: PATH_PARAMS.LOGIN,
  REGISTER: PATH_PARAMS.REGISTER,
  REGISTER_NEXT: PATH_PARAMS.REGISTER +'/'+ PATH_PARAMS.NEXT,
  MEMBER: PATH_PARAMS.MEMBER,
  SURVEY: PATH_PARAMS.SURVEY,
  ADMIN: PATH_PARAMS.ADMIN,
  CHART: PATH_PARAMS.CHART,
  MANAGE: PATH_PARAMS.MANAGE,
  WRITE: PATH_PARAMS.WRITE,
};

export const LINKS = {
  BOARD: '/' + ROUTER_LINKS.BOARD,
  INFO_BOARD: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.INFO,
  ALL_INFO_BOARD: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.ALL_INFO_BOARD,
  FOOD_BOARD: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.FOOD_BOARD,
  SPORT_BOARD: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.SPORT_BOARD,
  FEED_BOARD: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.FEED_BOARD,
  FEEDBOARD_WRITE: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.FEED_BOARD_WRITE,
  FEEDBOARD_VIEW: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.FEED_BOARD_VIEW,
  FEEDBOARD_EDIT: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.FEED_BOARD_EDIT,
  INFO: '/' + ROUTER_LINKS.INFO,
  INFO_BOARD_WRITE: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.INFO_BOARD_WRITE,
  //INFO_BOARD_VIEW: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.INFO_BOARD_VIEW,
  RECORD: '/' + ROUTER_LINKS.RECORD,
  CALENDAR: '/' + ROUTER_LINKS.CALENDAR,
  MYINFO: '/' + ROUTER_LINKS.MYINFO,
  BOOKMARK: '/' + ROUTER_LINKS.BOOKMARK,
  SETTING: '/' + ROUTER_LINKS.SETTING + '/' + ROUTER_LINKS.VIEW_INFO,
  CHALLENGE: '/' + ROUTER_LINKS.CHALLENGE,
  CHALLENGE_CHAT: '/' + ROUTER_LINKS.CHALLENGE + '/' + ROUTER_LINKS.CHALLENGE_CHAT,
  VIEW_INFO: '/' + ROUTER_LINKS.SETTING + '/' + ROUTER_LINKS.VIEW_INFO,
  EDIT_INFO: '/' + ROUTER_LINKS.SETTING + '/' + ROUTER_LINKS.EDIT_INFO,
  DELETE_USER: '/' + ROUTER_LINKS.SETTING + '/' + ROUTER_LINKS.DELETE_USER,
  LOGIN: '/' + ROUTER_LINKS.MEMBER + '/' + ROUTER_LINKS.LOGIN,
  REGISTER: '/' + ROUTER_LINKS.MEMBER + '/' + ROUTER_LINKS.REGISTER,
  REGISTER_NEXT: '/' + ROUTER_LINKS.MEMBER + '/' + ROUTER_LINKS.REGISTER_NEXT,
  SURVEY: '/' + ROUTER_LINKS.SURVEY,
  ADMIN_CHART: '/' + ROUTER_LINKS.ADMIN + '/' + ROUTER_LINKS.CHART,
  ADMIN_MANAGE: '/' + ROUTER_LINKS.ADMIN + '/' + ROUTER_LINKS.MANAGE,
  RECORD_CHART: '/' + ROUTER_LINKS.RECORD + '/' + ROUTER_LINKS.CHART,
  RECORD_WRITE: '/' + ROUTER_LINKS.RECORD + '/' + ROUTER_LINKS.WRITE,

  INFO_BOARD_VIEW: '/' + ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.INFO_BOARD_VIEW,
};

export const FOOTER_HEIGHT = '13px';
export const EDITOR_HEIGHT = 500;

export const MENU_LIST = {
  HOME: {
    TITLE: '홈',
    PATH: '/',
  },

  RECORD: {
    TITLE: '기록',
    PATH: `${LINKS.RECORD_WRITE}/${convertDateToUrlParam()}`,
  },
  CALENDAR: {
    TITLE: '캘린더',
    PATH: LINKS.CALENDAR,
  },
  INFOBOARD: {
    TITLE: '공유',
    PATH: LINKS.ALL_INFO_BOARD + '/1',
  },
  FEEDBOARD: {
    TITLE: '피드',
    PATH: LINKS.FEEDBOARD_VIEW,
  },
  CHALLENGE: {
    TITLE: '챌린지',
    PATH: LINKS.CHALLENGE,
  },
  MYINFO: {
    TITLE: '프로필',
    PATH: LINKS.MYINFO,
  },

  SETTING: {
    TITLE: '설정',
    PATH: LINKS.SETTING,
  },
};

export const USER_INFOS = {
  SPORT: {
    TITLE: '일주일에 운동을 하는 횟수',
    LABEL: '운동횟수',
    KEYS: ['LOW', 'MEDIUM', 'HIGH'],
    VALUES: ['적게(0-2회)', '보통(3-4회)', '많이(5회 이상)'],
  },
  DIET: {
    TITLE: '식단',
    LABEL: '식단',
    KEYS: ['NORMAL', 'EXERCISE', 'KITO', 'VEGAN', 'CUSTOM'],
    VALUES: ['일반 식단', '운동 식단', '키토 식단', '비건 식단', '사용자 정의'],
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
};

export const NO_IMAGE_PATH = '/src/asset/image/NoImage.png';

export const REACT_QUERY_KEYS = {
  BOARD: 'board',
  COMMENTS: 'comments',
  REPLY: 'reply',
  CHALLENGE: 'challenge',
  INFO: 'info',
  INSERT: 'insert',
  UPDATE: 'update',
  DELETE: 'delete',
  LIKE: 'like',
  FEED: 'feed',
  LIST: 'list',
  RECOMMAND: 'recommand',
  DETAIL: 'detail',
  BOOKMARK: 'bookmark',
  MEMBER: 'member',
  PROFILE: 'profile',
  IMAGE: 'image',
  CREATE: 'create',
  MEMBER_DATA: 'memberData',
  FOLLOW: 'follow',
  FOLLOWEE: 'followee',
  UNFOLLOW: 'unfollow',
  FOLLOWER: 'follower',
  COUNT: 'count',
  NUTRIENTS: 'nutrients',
  SPORT: 'sport',
  PLACE: 'place',
  FOOD: 'food',
  SURVEY: 'survey',
  ADMIN: 'admin',
  RESTAURANT: 'restaurant',
  GYM: 'gym',
};
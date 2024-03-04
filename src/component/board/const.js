import { LINKS, PATH_PARAMS, ROUTER_LINKS } from '@src/utils/const.js';

export const BOARD = {
  INFO: {
    ALL: {
      TITLE: '전체',
      PATH: LINKS.ALL_INFO_BOARD,
      PATH_PARAMS: PATH_PARAMS.ALL,
      ROUTER_LINKS: ROUTER_LINKS.ALL_INFO_BOARD,
    },
    FOOD: {
      TITLE: '식단',
      PATH: LINKS.FOOD_BOARD,
      PATH_PARAMS: PATH_PARAMS.FOOD,
      ROUTER_LINKS: ROUTER_LINKS.FOOD_BOARD,
    },
    SPORT: {
      TITLE: '운동',
      PATH: LINKS.SPORT_BOARD,
      PATH_PARAMS: PATH_PARAMS.SPORT,
      ROUTER_LINKS: ROUTER_LINKS.SPORT_BOARD,
    },
  },
  FEED: {
    TITLE: '피드',
    PATH: LINKS.FEED_BOARD,
    PATH_PARAMS: PATH_PARAMS.FEED,
    ROUTER_LINKS: ROUTER_LINKS.FEED_BOARD,
  },
};

export const INIT_MAP_STATE = {
  CENTER: {
    lat: 37.498004414546934, // 초기값
    lng: 127.02770621963765,
  },
  ZOOM_LEVEL: 3,
  PATHS: [],
  DISTANCES: [],
};

export const COMMENT_TYPE = {
  COMMENT: 'comment',
  REPLY: 'reply',
};

export const INIT_COMMENT_STATE = {
  boardId: undefined,
  cmtContent: '',
  cmtRef: undefined,
  replyNick: undefined,
  type: COMMENT_TYPE.COMMENT, // comment, reply
};

export const INIT_EDIT_COMMENT_STATE = {
  cmtContent: '',
  cmtId: undefined,
};
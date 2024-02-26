import { USER_INFOS } from '@src/utils/const.js';

export const SURVEY_PROGRESS = {
  START: 0,
  NAME: 1,
  BIRTHDAY: 2,
  GENDER: 3,
  HEIGHT: 4,
  WEIGHT: 5,
  HEALTH_REASON: 6,
  DIET: 7,
  EATING_HABIT: 8,
  EXERCISE_COUNT: 9,
  ALLERGY: 10,
  FINISH: 11,
};

export const INIT_SURVEY_DATA = {
  userName: '',
  userBirth: new Date(),
  userGender: '',
  userHeight: '',
  userWeight: '',
  userHealthReason: [],
  userDiet: '',
  carbo: USER_INFOS.DIET.NORMAL.CARBO,
  protein: USER_INFOS.DIET.NORMAL.PROTEIN,
  fat: USER_INFOS.DIET.NORMAL.FAT,
  eatingHabit: [],
  userSportHard: '',
  userAllergy: [],
};

export const SURVEY_SELECT = {
  GENDER: {
    ...USER_INFOS.GENDER,
  },
  HEALTH_REASON: {
    DISEASE: {
      KEYS: 'DISEASE',
      VALUES: '질병으로 인한 관리 목적',
    },
    DIET: {
      KEYS: 'DIET',
      VALUES: '다이어트(미용 목적)',
    },
    BULK_UP: {
      KEYS: 'BULK_UP',
      VALUES: '벌크업(근육량 증가)',
    },
    IMMUNITY: {
      KEYS: 'IMMUNITY',
      VALUES: '면역력을 높이기 위해',
    },
    EATING_PATTERN: {
      KEYS: 'EATING_PATTERN',
      VALUES: '불규칙한 식사 패턴을 바꾸기 위해',
    },
    ETC: {
      KEYS: 'ETC',
      VALUES: '또 다른 이유가 있어요!',
    },
  },
  DIET: {
    ...USER_INFOS.DIET,
  },
  EATING_HABIT: {
    INSTANT: {
      KEYS: 'INSTANT',
      VALUES: '인스턴트 식품을 자주 먹는다',
    },
    SKIP_MEAL: {
      KEYS: 'SKIP_MEAL',
      VALUES: '식사를 자주 거른다',
    },
    SALTY_SWEET: {
      KEYS: 'SALTY_SWEET',
      VALUES: '짜고 단 음식을 많이 먹는다',
    },
    CAFEINE: {
      KEYS: 'CAFEINE',
      VALUES: '카페인이 든 음료를 하루 3잔 이상 마신다',
    },
    DRUNK: {
      KEYS: 'DRUNK',
      VALUES: '주류를 자주 마신다',
    },
    PICKY: {
      KEYS: 'PICKY',
      VALUES: '편식을 한다',
    },
  },
  EXERCISE_COUNT: {
    ...USER_INFOS.SPORT,
  },
};

export const ALLERGY_IMG = {
  START: [8, 24],
  IMG_SIZE: '180px',
  NEXT_X: 21,
  NEXT_Y: 22.9,
  PAPER_SIZE: '200px',
};

export const ALLERGY_LIST = {
  celery: {
    KEYS: 'celery-free',
    VALUES: '샐러리',
  },
  crustacean: {
    KEYS: 'crustacean-free',
    VALUES: '갑각류',
  },
  dairy: {
    KEYS: 'dairy-free',
    VALUES: '우유',
  },
  egg: {
    KEYS: 'egg-free',
    VALUES: '계란',
  },
  fish: {
    KEYS: 'fish-free',
    VALUES: '생선',
  },
  peanut: {
    KEYS: 'peanut-free',
    VALUES: '땅콩',
  },
  sesame: {
    KEYS: 'sesame-free',
    VALUES: '깨',
  },
  shellfish: {
    KEYS: 'shellfish-free',
    VALUES: '조개류',
  },
  soy: {
    KEYS: 'soy-free',
    VALUES: '콩',
  },
  wheat: {
    KEYS: 'wheat-free',
    VALUES: '밀',
  },
  
};

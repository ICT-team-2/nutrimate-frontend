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
};

export const INIT_SURVEY_DATA = {
  userName: '',
  userBirth: new Date(),
  userGender: '',
  userHeight: '',
  userWeight: '',
  healthReason: '',
  userDiet: '',
  eatingHabit: '',
  userSportHard: '',
  userAllergy: [],
};

export const SURVEY_SELECT = {
  GENDER: {
    ...USER_INFOS.GENDER,
  },
  HEALTH_REASON: {
    DISEASE: {
      KEYS: 'A',
      VALUES: '질병으로 인한 관리 목적',
    },
    DIET: {
      KEYS: 'B',
      VALUES: '다이어트(미용 목적)',
    },
    BULK_UP: {
      KEYS: 'C',
      VALUES: '벌크업(근육량 증가)',
    },
    IMMUNITY: {
      KEYS: 'D',
      VALUES: '면역력을 높이기 위해',
    },
    EATING_PATTERN: {
      KEYS: 'E',
      VALUES: '불규칙한 식사 패턴을 바꾸기 위해',
    },
    ETC: {
      KEYS: 'F',
      VALUES: '또 다른 이유가 있어요!',
    },
  },
  DIET: {
    ...USER_INFOS.DIET,
  },
};


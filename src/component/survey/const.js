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
    MALE: 'M',
    FEMALE: 'F',
  },
  HEALTH_REASON: {
    DISEASE: {
      KEY: 'A',
      VALUE: '질병으로 인한 관리 목적',
    },
    DIET: {
      KEY: 'B',
      VALUE: '다이어트(미용 목적)',
    },
    BULK_UP: {
      KEY: 'C',
      VALUE: '벌크업(근육량 증가)',
    },
    IMMUNITY: {
      KEY: 'D',
      VALUE: '면역력을 높이기 위해',
    },
    EATING_PATTERN: {
      KEY: 'E',
      VALUE: '불규칙한 식사 패턴을 바꾸기 위해',
    },
    ETC: {
      KEY: 'F',
      VALUE: '또 다른 이유가 있어요!',
    },
  },
};


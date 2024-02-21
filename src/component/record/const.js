export const RECORD_TABS = {
  FOOD_RECORD: 0,
  SPORT_RECORD: 1,
  ALARM: 2,
  STATISTICS: 3,
};

export const FOOD_RECORD_BUTTONS = {
  IMAGE: {
    LABEL: '이미지로 등록',
    VALUE: 'IMAGE',
  },
  SEARCH_DB: {
    LABEL: '검색하기',
    VALUE: 'SEARCH_DB',
  },
  MANUAL: {
    LABEL: '직접 등록',
    VALUE: 'MANUAL',
  },
};

export const STATISTICS_BUTTONS = {
  DAY: {
    LABEL: '일간',
    VALUE: 'DAY',
  },
  WEEK: {
    LABEL: '주간',
    VALUE: 'WEEK',
  },
  MONTH: {
    LABEL: '월간',
    VALUE: 'MONTH',
  },
};

export const SPORT_RECORD_BUTTONS = Object.keys(FOOD_RECORD_BUTTONS).reduce((acc, key) => {
  if (key === 'IMAGE') return acc;
  acc[key] = FOOD_RECORD_BUTTONS[key];
  return acc;
}, {});

export const SELECT_MEAL_TIME = {
  BREAKFAST: {
    LABEL: '아침',
    VALUE: 'BREAKFAST',
  },
  LUNCH: {
    LABEL: '점심',
    VALUE: 'LUNCH',
  },
  DINNER: {
    LABEL: '저녁',
    VALUE: 'DINNER',
  },
  SNACK: {
    LABEL: '간식',
    VALUE: 'SNACK',
  },
};

export const RECORD_STATISTICS_RESULT_TYPE = Object.keys(RECORD_TABS)
  .reduce((acc, key, currentIndex) => {
    if (currentIndex >= 2) return acc;
    acc[key] = {
      LABEL: RECORD_TABS[key] === RECORD_TABS.FOOD_RECORD ? '식단' : '운동',
      VALUE: currentIndex,
    };
    return acc;
  }, {});

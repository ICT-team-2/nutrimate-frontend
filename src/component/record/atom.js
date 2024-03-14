import { atom } from 'jotai';
import {
  RECORD_STATISTICS_RESULT_TYPE,
  RECORD_TABS,
  SELECT_MEAL_TIME,
  RECORD_ANALYSIS,
} from '@src/component/record/const.js';

export const selectedMealTimeAtom = atom(SELECT_MEAL_TIME.BREAKFAST.VALUE);
selectedMealTimeAtom.debugLabel = 'recordSelectedMealTimeAtom';

export const selectedRecordTabsAtom = atom(RECORD_TABS.FOOD_RECORD);
selectedRecordTabsAtom.debugLabel = 'recordSelectedRecordTabsAtom';

export const selectedStatisticsPeriodBtnAtom = atom(RECORD_ANALYSIS.DAY.periodType);
selectedStatisticsPeriodBtnAtom.debugLabel = 'recordSelectedStatisticsBtnAtom';

export const selectedRecordResultAtom = atom(RECORD_STATISTICS_RESULT_TYPE.FOOD_RECORD?.VALUE);
selectedRecordResultAtom.debugLabel = 'recordSelectedRecordResultAtom';

export const foodsAtom = atom([]);
export const calAtom = atom(2200);

export const isTotalIntakeUpdatedAtom = atom(false);

export const foodCalAtom = atom(0);

export const selectedPriceCategoryAtom = atom('5,000원 미만'); // 초기 상태 값으로 '5000원 미만'을 설정
selectedPriceCategoryAtom.debugLabel = 'selectedPriceCategoryAtom';

export const AllergyAtom = atom([]);
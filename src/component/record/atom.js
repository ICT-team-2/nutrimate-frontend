import { atom } from 'jotai';
import { SELECT_MEAL_TIME } from '@src/component/record/const.js';

export const selectedMealTimeAtom = atom(SELECT_MEAL_TIME.BREAKFAST.VALUE);

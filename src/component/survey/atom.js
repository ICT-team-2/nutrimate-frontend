import { atom } from 'jotai';
import {
  INIT_SURVEY_DATA,
  SURVEY_PROGRESS,
} from '@src/component/survey/const.js';

export const surveyProgressAtom = atom(SURVEY_PROGRESS.START);

export const surveyDataAtom = atom(INIT_SURVEY_DATA);
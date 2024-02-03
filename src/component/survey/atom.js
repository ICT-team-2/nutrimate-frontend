import { atom } from 'jotai';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';

export const surveyProgressAtom = atom(SURVEY_PROGRESS.START);
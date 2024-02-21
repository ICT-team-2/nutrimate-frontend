import { atom } from 'jotai';
import {
  INIT_SURVEY_DATA,
  SURVEY_PROGRESS,
} from '@src/component/survey/const.js';
import {
  atomWithStorage,
  createJSONStorage,
} from 'jotai/vanilla/utils';

export const surveyProgressAtom = atom(SURVEY_PROGRESS.START);

const session = createJSONStorage(() => sessionStorage);
export const surveyDataAtom = atomWithStorage('surveyData',
  INIT_SURVEY_DATA,
  session);
surveyDataAtom.debugLabel = 'surveyDataAtom';


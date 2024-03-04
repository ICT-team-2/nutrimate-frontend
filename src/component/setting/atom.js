import { atom } from 'jotai';
import { SETTING_DRAWER_HEIGHT, SETTING_USER_INFOS } from '@src/component/setting/const.js';

/** 설정 페이지의 왼쪽 메뉴 상태 */
export const settingDrawerStateAtom = atom(false);
settingDrawerStateAtom.debugLabel = 'settingDrawerStateAtom';
export const settingDrawerHeightAtom = atom(SETTING_DRAWER_HEIGHT.VIEW_INFO);
settingDrawerHeightAtom.debugLabel = 'settingDrawerHeightAtom';
export const dietStateAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.KEYS);
dietStateAtom.debugLabel = 'settingDietStateAtom';

export const carboAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.CARBO);
carboAtom.debugLabel = 'settingCarboAtom';
export const proteinAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.PROTEIN);
proteinAtom.debugLabel = 'settingProteinAtom';
export const fatAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.FAT);
fatAtom.debugLabel = 'settingFatAtom';

export const genderAtom = atom('');
genderAtom.debugLabel = 'settingGenderAtom';
export const heightStateAtom = atom(0);
heightStateAtom.debugLabel = 'settingHeightStateAtom';
export const weightStateAtom = atom(0);
weightStateAtom.debugLabel = 'settingWeightStateAtom';

export const calAtom = atom(0);
calAtom.debugLabel = 'settingCalAtom';

export const introAtom = atom('');
introAtom.debugLabel = 'settingIntroAtom';

export const sportStateAtom = atom(SETTING_USER_INFOS.SPORT.KEYS[0]);
sportStateAtom.debugLabel = 'settingSportStateAtom';

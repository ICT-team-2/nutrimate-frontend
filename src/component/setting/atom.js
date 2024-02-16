import { atom } from 'jotai';
import { SETTING_DRAWER_HEIGHT, SETTING_USER_INFOS } from '@src/component/setting/const.js';

/** 설정 페이지의 왼쪽 메뉴 상태 */
export const settingDrawerStateAtom = atom(false);
export const settingDrawerHeightAtom = atom(SETTING_DRAWER_HEIGHT.VIEW_INFO);
export const dietStateAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.KEYS);

export const carboAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.CARBO);
export const proteinAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.PROTEIN);
export const fatAtom = atom(SETTING_USER_INFOS.DIET.NORMAL.FAT);

export const genderAtom = atom('');
export const heightStateAtom = atom(0);
export const weightStateAtom = atom(0);

export const sportStateAtom = atom(SETTING_USER_INFOS.SPORT.KEYS[0]);
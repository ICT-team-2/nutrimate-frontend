import { atom } from 'jotai';
import { SETTING_DRAWER_HEIGHT, USERINFOS } from '@src/component/setting/const.js';

/** 설정 페이지의 왼쪽 메뉴 상태 */
export const settingDrawerStateAtom = atom(false);
export const settingDrawerHeightAtom = atom(SETTING_DRAWER_HEIGHT.VIEW_INFO);
export const dietStateAtom = atom(USERINFOS.DIET.NORMAL.KEYS);

export const carboAtom = atom(USERINFOS.DIET.NORMAL.CARBO);
export const proteinAtom = atom(USERINFOS.DIET.NORMAL.PROTEIN);
export const fatAtom = atom(USERINFOS.DIET.NORMAL.FAT);
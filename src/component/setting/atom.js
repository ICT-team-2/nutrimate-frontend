import { atom } from 'jotai';
import { SETTING_DRAWER_HEIGHT } from '@src/component/setting/const.js';

/** 설정 페이지의 왼쪽 메뉴 상태 */
export const settingDrawerStateAtom = atom(false);
export const settingDrawerHeightAtom = atom(SETTING_DRAWER_HEIGHT.VIEW_INFO);
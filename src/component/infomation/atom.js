import { atom } from 'jotai';
import { INFO_TABS, RECOMMAND_MENU } from '@src/component/infomation/const.js';

export const infoTabStateAtom = atom(INFO_TABS.NEWS);
export const recommandMenuStateAtom = atom(RECOMMAND_MENU.NUTRIENTS);
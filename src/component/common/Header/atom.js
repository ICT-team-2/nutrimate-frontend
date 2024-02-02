import { atom } from 'jotai';

export const drawerStateAtom = atom(false);
/** menuIcon의 ref.current를 저장함*/
export const sideMenuIconRefAtom = atom(null);
export const firstDrawerRefAtom = atom(null);


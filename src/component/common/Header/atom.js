import { atom } from 'jotai';

export const drawerStateAtom = atom(false);
drawerStateAtom.debugLabel = 'headerDrawerStateAtom';
/** menuIcon의 ref.current를 저장함*/
export const sideMenuIconRefAtom = atom(null);
sideMenuIconRefAtom.debugLabel = 'headerSideMenuIconRefAtom';

export const firstDrawerRefAtom = atom(null);
firstDrawerRefAtom.debugLabel = 'headerFirstDrawerRefAtom';


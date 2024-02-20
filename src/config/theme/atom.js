import { atom } from 'jotai';

/** dark mode 여부 */
export const isDarkModeAtom = atom(false);
isDarkModeAtom.debugLabel = 'isDarkModeAtom';
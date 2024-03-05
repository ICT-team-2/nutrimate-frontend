import { atom } from 'jotai';

export const foodIdAtom = atom(Array.from({ length: 10 },
  (v, k) => k + 1));
foodIdAtom.debugLabel = 'foodIdAtom';
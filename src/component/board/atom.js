import { atom } from 'jotai';
import { INIT_MAP_STATE } from '@src/component/board/const.js';

export const mapPathsAtom = atom(INIT_MAP_STATE.PATHS);
export const mapDistancesAtom = atom(INIT_MAP_STATE.DISTANCES);
export const mapCenterAtom = atom(INIT_MAP_STATE.CENTER);
export const mapZoomLevelAtom = atom(INIT_MAP_STATE.ZOOM_LEVEL);
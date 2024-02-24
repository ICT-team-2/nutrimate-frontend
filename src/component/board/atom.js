import { atom } from 'jotai';
import {
  COMMENT_TYPE,
  INIT_COMMENT_STATE,
  INIT_EDIT_COMMENT_STATE,
  INIT_MAP_STATE,
} from '@src/component/board/const.js';

export const mapPathsAtom = atom(INIT_MAP_STATE.PATHS);
mapPathsAtom.debugLabel = 'mapPathsAtom';

export const mapDistancesAtom = atom(INIT_MAP_STATE.DISTANCES);
mapDistancesAtom.debugLabel = 'mapDistancesAtom';

export const mapCenterAtom = atom(INIT_MAP_STATE.CENTER);
mapCenterAtom.debugLabel = 'mapCenterAtom';

export const mapZoomLevelAtom = atom(INIT_MAP_STATE.ZOOM_LEVEL);
mapZoomLevelAtom.debugLabel = 'mapZoomLevelAtom';

export const mapRefAtom = atom(null);
mapRefAtom.debugLabel = 'mapRefAtom';

export const quillRefAtom = atom(null);
quillRefAtom.debugLabel = 'quillRefAtom';

export const inputHashTagAtom = atom([]);
inputHashTagAtom.debugLabel = 'inputHashTagAtom';

export const replyChipDataAtom = atom([INIT_COMMENT_STATE]);
replyChipDataAtom.debugLabel = 'replyChipDataAtom';

export const commentEditDataAtom = atom(INIT_EDIT_COMMENT_STATE);
commentEditDataAtom.debugLabel = 'replyDataAtom';

export const commentListRefAtom = atom(undefined);
commentListRefAtom.debugLabel = 'commentListRefAtom';

export const isCommentEditAtom = atom(false);
isCommentEditAtom.debugLabel = 'isCommentEditAtom';
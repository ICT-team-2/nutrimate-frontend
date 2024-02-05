import { atom } from 'jotai';

export const mapPathsAtom = atom([]);
export const mapDistancesAtom = atom([]);
export const mapCenterAtom = atom({
  lat: 37.498004414546934, // 초기값
  lng: 127.02770621963765,
});
export const mapZoomLevelAtom = atom(3);
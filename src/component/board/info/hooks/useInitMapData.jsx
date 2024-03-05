import React, { useEffect } from 'react';
import { useAtom } from 'jotai/react';
import { mapCenterAtom, mapDistancesAtom, mapPathsAtom } from '@src/component/board/atom.js';
import { INIT_MAP_STATE } from '@src/component/board/const.js';

/**
 * 지도 초기 데이터를 설정하는 hooks
 * @param paths{Array} - 지도의 경로 좌표
 * @param distances{Array} - 지도의 경로별 거리
 * @param center{Object} - 지도 중심 좌표
 * @param center.lat{number} - 지도 중심 좌표의 위도
 * @param center.lng{number} - 지도 중심 좌표의 경도
 * @returns {function}
 */
const useInitMapData = () => {
  const [mapPaths, setMapPaths] = useAtom(mapPathsAtom);
  const [mapDistances, setMapDistances] = useAtom(mapDistancesAtom);
  const [mapCenter, setMapCenter] = useAtom(mapCenterAtom);

  return (paths = INIT_MAP_STATE.PATHS,
          distances = INIT_MAP_STATE.DISTANCES,
          center = INIT_MAP_STATE.CENTER) => {
    setMapPaths(paths ?? INIT_MAP_STATE.PATHS);
    setMapDistances(distances ?? INIT_MAP_STATE.DISTANCES);
    setMapCenter(center ?? INIT_MAP_STATE.CENTER);
  };
};

export default useInitMapData;

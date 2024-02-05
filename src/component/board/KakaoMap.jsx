import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { Paper } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useAtom } from 'jotai/react';
import { mapCenterAtom, mapDistancesAtom, mapPathsAtom } from '@src/component/board/atom.js';

const GlobalStyle = createGlobalStyle`
    .number {
        color: red;
    }
`;

const StyledPaper = muiStyled(Paper)`
  padding: 10px;
  list-style: none;
  font-size: 0.8rem;
  justify-content: space-between;
`;

/**
 * 카카오 지도를 표시하는 컴포넌트
 * @param props {Object}
 * @param props.nogps {boolean} GPS를 사용하지 않을 때 true
 * @param props.zoomlevel {number} 지도의 확대 레벨
 * @returns {Element}
 * @constructor
 */
const KakaoMap = (props) => {
  const { nogps, zoomlevel } = props;
  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState();
  // paths, distances, center는 서버의 데이터로 넘기고,
  // 서버에서 받아온 데이터를 이용해 지도를 그릴 수 있도록 하기 위해 전역 상태로 관리
  const [pathValues, setPathValues] = useAtom(mapPathsAtom);
  const [distanceValues, setDistanceValues] = useAtom(mapDistancesAtom);
  const [centerValue, setCenterValue] = useAtom(mapCenterAtom);

  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState();
  // 검색 값을 관리할 상태 추가
  const [searchValue, setSearchValue] = useState('');

  const [walkCalories, setWalkCalories] = useState(0);
  const [runCalories, setRunCalories] = useState(0);
  const [bikeCalories, setBikeCalories] = useState(0);

  // 지도 이미지 저장
  const mapRef = useRef(null);

  // 몸무게를 평균 65kg으로 가정
  const weight = 65;


  const handleClick = (
    _map,
    mouseEvent,
  ) => {
    if (!isdrawing) {
      setDistanceValues([]);
      setPathValues([]);
    }
    setPathValues((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setDistanceValues((prev) => [
      ...prev,
      Math.round(clickLine.getLength() + moveLine.getLength()),
    ]);
    setIsdrawing(true);
  };

  const handleMouseMove = (
    _map,
    mouseEvent,
  ) => {
    setMousePosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  const handleRightClick = (
    _map,
    _mouseEvent,
  ) => {
    setIsdrawing(false);
  };

  const DistanceInfo = ({ distance }) => {
    const walkTime = (distance / 67) | 0;
    const bikeTime = (distance / 227) | 0;
    return (
      <StyledPaper className="dotOverlay distanceInfo">
        {/* todo 이거 스타일 입히기 */}
        <li>
          <span className="label">총거리</span>{' '}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{' '}
          {walkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{walkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{' '}
          {bikeTime > 60 && (
            <>
              <span className="number">{Math.floor(bikeTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{bikeTime % 60}</span> 분
        </li>
      </StyledPaper>
    );
  };

  useEffect(() => { // 사용자의 현재 위치로 중심좌표 설정
    if (navigator.geolocation && !nogps) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenterValue({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
      return;
    }
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  }, []);

  // 검색 값이 변경될 때마다 장소를 검색하고, 검색 결과에 따라 지도 중심을 이동시키는 useEffect 추가
  useEffect(() => {
    if (searchValue) {
      const places = new window.kakao.maps.services.Places();

      // 객체 생성 확인 로그 추가
      console.log(places);

      places.keywordSearch(searchValue, function(result, status) {
        if (status === window.kakao.maps.services.Status.OK) {
          setCenterValue({
            lat: result[0].y,
            lng: result[0].x,
          });
        } else {
          //alert("장소 검색에 실패했습니다.");
        }
      });
    }
  }, [searchValue]);

  useEffect(() => {
    console.log(`유저가 검색한 단어:${searchValue}`);
  }, [searchValue]);

  // 걷기,달리기,자전거 소모 칼로리
  useEffect(() => {
    const totalDistance = distanceValues[distanceValues.length - 1] || 0;
    const walkTime = (totalDistance / 67) | 0; // 분 단위
    const bikeTime = (totalDistance / 227) | 0; // 분 단위

    const walkCalories = calculateCalories(3.9, weight, walkTime);
    const runCalories = calculateCalories(9.8, weight, walkTime);
    const bikeCalories = calculateCalories(6.8, weight, bikeTime);


    setWalkCalories(walkCalories);
    setRunCalories(runCalories);
    setBikeCalories(bikeCalories);
  }, [distanceValues]);

  // 칼로리 계산 함수
  function calculateCalories(mets, weight, time) {
    return mets * weight * (time / 60);
  }

  // todo console.log 주석처리할 것
  useEffect(() => {
    console.log('pathValues:', pathValues, 'distanceValues:', distanceValues,
      'centerValue:', centerValue);
  }, [centerValue, distanceValues, pathValues]);

  return (
    <>
      <GlobalStyle />
      <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
      <div ref={mapRef} id="map">
        <Map // 지도를 표시할 Container
          id={`;map`}
          center={centerValue} // 지도의 중심좌표
          style={{
            // 지도의 크기
            width: '100%',
            height: '450px',
          }}
          level={zoomlevel} // 지도의 확대 레벨
          onClick={handleClick}
          onRightClick={handleRightClick}
          onMouseMove={handleMouseMove}
        >
          <Polyline
            path={pathValues}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={'#db4040'} // 선의 색깔입니다
            strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
            onCreate={setClickLine}
          />
          {pathValues.map((path) => (
            <CustomOverlayMap
              key={`;dot -${path.lat},${path.lng}`}
              position={path}
              zIndex={1}
            >
              <span className="dot"></span>
            </CustomOverlayMap>
          ))}
          {pathValues.length > 1 &&
            distanceValues.slice(1, distanceValues.length).map((distance, index) => (
              <CustomOverlayMap
                key={`;distance -${pathValues[index + 1].lat},${pathValues[index + 1].lng}`}
                position={pathValues[index + 1]}
                yAnchor={1}
                zIndex={2}
              >
                {!isdrawing && distanceValues.length === index + 2 ? (
                  <DistanceInfo distance={distance} />
                ) : (
                  /* todo 이거 스타일 입히기 */
                  <StyledPaper className="dotOverlay">
                    거리 <span className="number">{distance}</span>m
                  </StyledPaper>
                )}
              </CustomOverlayMap>
            ))}
          <Polyline
            path={isdrawing ? [pathValues[pathValues.length - 1], mousePosition] : []}
            strokeWeight={3} // 선의 두께입니다
            strokeColor={'#db4040'} // 선의 색깔입니다
            strokeOpacity={0.5} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
            strokeStyle={'solid'} // 선의 스타일입니다
            onCreate={setMoveLine}
          />
          {isdrawing && (
            <CustomOverlayMap position={mousePosition} yAnchor={1} zIndex={2}>
              <div className="dotOverlay distanceInfo">
                총거리{' '}
                <span className="number">
                {Math.round(clickLine.getLength() + moveLine.getLength())}
              </span>
                m
              </div>
            </CustomOverlayMap>
          )}
        </Map>
      </div>
      {/*<button onClick={saveAndSendMapImage}>지도 저장하기</button>*/}
      <div>
        걷기 칼로리: {walkCalories.toFixed(2)} kcal
        달리기 칼로리: {runCalories.toFixed(2)} kcal
        자전거 칼로리: {bikeCalories.toFixed(2)} kcal
      </div>
    </>
  );
};

KakaoMap.defaultProps = {
  center: {
    lat: 37.498004414546934, // 초기값
    lng: 127.02770621963765,
  },
  paths: [],
  distances: [],
  nogps: false,
  zoomlevel: 3,
};
export default KakaoMap;
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { Paper } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';

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

const KakaoMap = () => {

  const [walkTime, setWalkTime] = useState(0);
  const [bikeTime, setBikeTime] = useState(0);
  const [isdrawing, setIsdrawing] = useState(false);
  const [clickLine, setClickLine] = useState();
  const [paths, setPaths] = useState([]);
  const [distances, setDistances] = useState([]);
  const [mousePosition, setMousePosition] = useState({
    lat: 0,
    lng: 0,
  });
  const [moveLine, setMoveLine] = useState();

  const handleClick = (
    _map,
    mouseEvent,
  ) => {
    if (!isdrawing) {
      setDistances([]);
      setPaths([]);
    }
    setPaths((prev) => [
      ...prev,
      {
        lat: mouseEvent.latLng.getLat(),
        lng: mouseEvent.latLng.getLng(),
      },
    ]);
    setDistances((prev) => [
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

  const [center, setCenter] = useState({
    lat: 37.498004414546934, // 초기값
    lng: 127.02770621963765
  });
  
  // 검색 값을 관리할 상태 추가
  const [searchValue, setSearchValue] = useState("");
 
  const [walkCalories, setWalkCalories] = useState(0);
  const [runCalories, setRunCalories] = useState(0);
  const [bikeCalories, setBikeCalories] = useState(0);

  // 몸무게를 평균 65kg으로 가정
  const weight = 65;

  // 지도 이미지 저장
  const mapRef = useRef(null);

  // 지도 이미지 저장 및 서버로 전송
  const saveAndSendMapImage = async () => {
    const node = mapRef.current;

    // 지도를 이미지로 변환
    const canvas = await html2canvas(node);
    const dataUrl = canvas.toDataURL('image/png');
    const blob = await (await fetch(dataUrl)).blob();

    // FormData를 생성하고 이미지를 추가
    const formData = new FormData();
    formData.append('mapImage', blob, 'map.png');

    // 서버로 이미지 전송
    const response = await axios.post('/boards/sport', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    console.log(response);
  };

  useEffect(() => { // 사용자의 현재 위치로 중심좌표 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });
    } else {
      alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
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
          setCenter({
            lat: result[0].y,
            lng: result[0].x
          });
        } else {
          //alert("장소 검색에 실패했습니다.");
        }
      });
    }
  }, [searchValue]);

  useEffect(()=>{ console.log(`유저가 검색한 단어:${searchValue}`) },[searchValue])

  // 걷기,달리기,자전거 소모 칼로리
  useEffect(() => {
    const totalDistance = distances[distances.length - 1] || 0;
    const walkTime = (totalDistance / 67) | 0; // 분 단위
    const bikeTime = (totalDistance / 227) | 0; // 분 단위
  
    const walkCalories = calculateCalories(3.9, weight, walkTime);
    const runCalories = calculateCalories(9.8, weight, walkTime);
    const bikeCalories = calculateCalories(6.8, weight, bikeTime);
  
    setWalkTime(walkTime);
    setBikeTime(bikeTime);
    setWalkCalories(walkCalories);
    setRunCalories(runCalories);
    setBikeCalories(bikeCalories);
  }, [distances]);  
  
  // 칼로리 계산 함수
  function calculateCalories(mets, weight, time) {
    return mets * weight * (time / 60);
  }

  return (
    <>
      <GlobalStyle /> 
      <CustomSearchInput searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div ref={mapRef} id="map">
      <Map // 지도를 표시할 Container
        id={`;
map`}
        center={center} // 지도의 중심좌표
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
        onClick={handleClick}
        onRightClick={handleRightClick}
        onMouseMove={handleMouseMove}
      >
        <Polyline
          path={paths}
          strokeWeight={3} // 선의 두께입니다
          strokeColor={'#db4040'} // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle={'solid'} // 선의 스타일입니다
          onCreate={setClickLine}
        />
        {paths.map((path) => (
          <CustomOverlayMap
            key={`;
dot -${path.lat},${path.lng}`}
            position={path}
            zIndex={1}
          >
            <span className="dot"></span>
          </CustomOverlayMap>
        ))}
        {paths.length > 1 &&
          distances.slice(1, distances.length).map((distance, index) => (
            <CustomOverlayMap
              key={`;
distance -${paths[index + 1].lat},${paths[index + 1].lng}`}
              position={paths[index + 1]}
              yAnchor={1}
              zIndex={2}
            >
              {!isdrawing && distances.length === index + 2 ? (
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
          path={isdrawing ? [paths[paths.length - 1], mousePosition] : []}
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
      <button onClick={saveAndSendMapImage}>지도 저장하기</button>
      <div>
        걷기 칼로리: {walkCalories.toFixed(2)} kcal
        달리기 칼로리: {runCalories.toFixed(2)} kcal
        자전거 칼로리: {bikeCalories.toFixed(2)} kcal
      </div>
    </>
  );
};
export default KakaoMap;
import { useEffect, useState } from 'react';
import { CustomOverlayMap, Map, Polyline } from 'react-kakao-maps-sdk';
import { Paper } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { createGlobalStyle } from 'styled-components';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

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
    const walkkTime = (distance / 67) | 0;
    const bycicleTime = (distance / 227) | 0;

    return (

      <StyledPaper className="dotOverlay distanceInfo">
        {/* todo 이거 스타일 입히기 */}
        <li>
          <span className="label">총거리</span>{' '}
          <span className="number">{distance}</span>m
        </li>
        <li>
          <span className="label">도보</span>{' '}
          {walkkTime > 60 && (
            <>
              <span className="number">{Math.floor(walkkTime / 60)}</span> 시간{' '}
            </>
          )}
          <span className="number">{walkkTime % 60}</span> 분
        </li>
        <li>
          <span className="label">자전거</span>{' '}
          {bycicleTime > 60 && (
            <>
              <span className="number">{Math.floor(bycicleTime / 60)}</span>{' '}
              시간{' '}
            </>
          )}
          <span className="number">{bycicleTime % 60}</span> 분
        </li>
      </StyledPaper>
    );
  };

  const [center, setCenter] = useState({
    lat: 37.498004414546934, // 초기값
    lng: 127.02770621963765
  });

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

  // 검색 값을 관리할 상태 추가
  const [searchValue, setSearchValue] = useState("");
 
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

  const mapRef = useRef(null);
  const saveMapAsImage = () => {
    const node = mapRef.current;
  
    html2canvas(node).then(canvas => {
      canvas.toBlob(function(blob) {
        saveAs(blob, 'map.png');
      });
    });
  };

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
      <button onClick={saveMapAsImage}>지도 저장하기</button>
    </>
  );
};
export default KakaoMap;
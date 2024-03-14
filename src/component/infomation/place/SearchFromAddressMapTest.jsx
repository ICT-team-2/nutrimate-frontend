import React, { useEffect, useRef, useState } from 'react';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const StyledPaper = styled(Paper)`
    padding: 5px 10px;
    position: absolute;
    bottom: 42px;
`;

const StyledContainer = styled.div`
    position: absolute;
    right: 30px;
`;

const MapDiv = styled.div`
    width: 100%;
    height: 400px;
`;

const SearchFromAddressMap = ({ address, place, indexData }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();

  const mapRef = useRef();
  const id = nanoid();


  const searchAddressMap = (mapRef) => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(address,
      (data, status) => {
        if (status === kakao.maps.services.Status.ERROR
          || status === kakao.maps.services.Status.ZERO_RESULT) {
        }
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const coords = new kakao.maps.LatLng(data[0].y, data[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: mapRef.current,
            position: coords,
          });

          const overlay = new kakao.maps.CustomOverlay({
            content: '<div>test</div>',
            map: mapRef.current,
            position: marker.getPosition(),
          });

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          mapRef.current.setCenter(coords);
        }
      });
  };

  useEffect(() => {
    if (!mapRef) return;
    const mapOption = {
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };
    // 지도를 생성합니다
    setMap(new kakao.maps.Map(mapRef.current, mapOption));
    searchAddressMap(mapRef);
  }, [mapRef.current]);


  useEffect(() => {
    if (!mapRef || !address) return;
    searchAddressMap(mapRef);
  }, [indexData]);

  return (
    <>
      <MapDiv ref={mapRef}>
      </MapDiv>
    </>
  );
};

SearchFromAddressMap.defaultProps = {
  address: '제주특별자치도 제주시 첨단로 242',
};

export default SearchFromAddressMap;

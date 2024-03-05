import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
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
    right: ${({ place }) => 25 + (place?.length ** 1.6 ?? 0)}px;
`;

const SearchFromAddressMap = ({ address, place, indexData }) => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [placeName, setPlaceName] = useState('');

  const id = nanoid();

  const searchAddressMap = async () => {
    const geocoder = new kakao.maps.services.Geocoder();

    //번지 앞부분만 써야 정확도가 올라감...
    geocoder.addressSearch(address.split('번지')[0].trim(),
      (data, status) => {
        if (status === kakao.maps.services.Status.ERROR
          || status === kakao.maps.services.Status.ZERO_RESULT) {
          console.log('주소 검색 실패');
        }
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          markers.push({
            position: {
              lat: data[0].y,
              lng: data[0].x,
            },
            content: data[0].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));

          setMarkers(markers);
          setPlaceName(place);
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
          map.setBounds(bounds);
        }
      });
  };


  useLayoutEffect(() => {
    if (!map || !address) return;
    searchAddressMap();
  }, [map, indexData, address, place]);

  return (
    <Map // 로드뷰를 표시할 Container
      center={{
        lat: 37.566826,
        lng: 126.9786567,
      }}
      style={{
        width: '50%',
        height: '400px',
      }}
      level={3}
      onCreate={setMap}
    >
      {markers.map((marker) => (
        <React.Fragment key={id}>
          <MapMarker
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
          </MapMarker>
          <CustomOverlayMap // 커스텀 오버레이를 표시할 Container
            // 커스텀 오버레이가 표시될 위치입니다
            position={marker.position}
            xAnchor={0.3}
            yAnchor={0.91}
          >
            <StyledContainer
              place={placeName}
            >
              <StyledPaper
              >
                {placeName}
              </StyledPaper>
            </StyledContainer>
          </CustomOverlayMap>
        </React.Fragment>
      ))}
    </Map>
  );
};

SearchFromAddressMap.defaultProps = {
  address: '경기도 의정부시 금오동 474-5번지',
};

export default SearchFromAddressMap;

import React, { useEffect, useState } from 'react';
import SearchFromAddressMap from '@src/component/infomation/place/SearchFromAddressMap.jsx';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PlaceRecommandTable from '@src/component/infomation/place/PlaceRecommandTable.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import { useAtom } from 'jotai/react';
import { searchKeywordAtom } from '@src/component/infomation/atom.js';
import { PLACE_CATEGORY } from '@src/component/infomation/const.js';
import useFetchRestaurant from '@src/component/infomation/hooks/useFetchRestaurant.jsx';
import useFetchGym from '@src/component/infomation/hooks/useFetchGym.jsx';


const StyledPlaceContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;
const InnerContainer = styled.div`
    margin-right: 30px;
    flex-grow: 1;
`;
const ButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;
const StyledButton = styled(Button)`
    margin-right: 10px;
`;
const PagnationContainer = styled.div`
    width: 50%;
    align-items: flex-start;
    display: flex;
`;

const filterData = (data = [], searchKeyword) => {
  // 데이터가 없거나 주소나 사업장명이 없는 데이터는 필터링
  data = data?.filter(data => {
    return data['소재지전체주소'] != null && data['사업장명'] != null
      || data['소재지전체주소'].trim() !== '' && data['사업장명'].trim() !== '';
  });

  if (searchKeyword.trim() === '') return data;
  // 검색어가 있을 경우 주소나 사업장명이 검색어를 포함하는 데이터만 필터링
  return data?.filter((value) => {
    return value['소재지전체주소']?.includes(searchKeyword)
      || value['사업장명']?.includes(searchKeyword);
  });
};

const pagingData = (data = [], page) => {
  return data?.slice((page - 1) * 6, page * 6);
};

const PlaceRecommandContent = () => {
  const [category, setCategory] = useState(PLACE_CATEGORY.RESTAURANT);
  const [pageState, setPageState] = useState(1);
  const [searchKeyword, setSearchKeyword] = useAtom(searchKeywordAtom);
  const { data: restaurantData, isLoading: restaurantIsLoading } = useFetchRestaurant('');
  const { data: gymData, isLoading: gymIsLoading } = useFetchGym('');
  const [data, setData] = useState([]);
  const [indexData, setIndexData] = useState({ index: 0 });
  const [address, setAddress] = useState('');
  const [placeData, setPlaceData] = useState('');


  const setRestaurantData = () => {
    setData(filterData(restaurantData, searchKeyword));
  };

  const setGymData = () => {
    setData(filterData(gymData, searchKeyword));
  };


  useEffect(() => {
    if (category === PLACE_CATEGORY.RESTAURANT && restaurantData !== undefined) {
      setRestaurantData();
    }
    if (category === PLACE_CATEGORY.GYM && gymData !== undefined) {
      setGymData();
    }
  }, [searchKeyword, category, restaurantData, gymData]);


  useEffect(() => {
    setAddress(pagingData(data, pageState)[indexData.index]?.['소재지전체주소'] ?? '');
    setPlaceData(pagingData(data, pageState)[indexData.index]?.['사업장명'] ?? '');
  }, [indexData, pageState]);


  return (<>
      <ButtonContainer>
        {Object.values(PLACE_CATEGORY).map((value, index) => {
          return (
            <StyledButton
              variant={value === category ? 'contained' : 'outlined'}
              key={index}
              onClick={() => {
                setCategory(value);
              }}>
              {value}
            </StyledButton>
          );
        })}
        {/*<StyledButton variant="contained">
          산책로
        </StyledButton>*/}
      </ButtonContainer>
      <StyledPlaceContainer>
        <InnerContainer>
          <PlaceRecommandTable
            data={pagingData(data, pageState) ?? []}
            pageState={pageState}
            setIndexData={setIndexData}
          />
        </InnerContainer>
        <SearchFromAddressMap
          indexData={indexData}
          place={placeData}
          address={address} />
      </StyledPlaceContainer>
      <PagnationContainer>
        <PagnationComponent
          pageState={pageState}
          totalPage={Math.ceil((data?.length / 6) ?? 1)}
          handlePageChange={(event, value) => {
            setPageState(value);
          }} />
      </PagnationContainer>
    </>
  );
};

export default PlaceRecommandContent;

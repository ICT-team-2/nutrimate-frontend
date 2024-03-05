import React, { useEffect, useState } from 'react';
import SearchFromAddressMap from '@src/component/infomation/place/SearchFromAddressMap.jsx';
import styled from 'styled-components';
import SearchFromKeywordMap from '@src/component/infomation/place/SearchFromKeywordMap.jsx';
import { Button } from '@mui/material';
import PlaceRecommandTable from '@src/component/infomation/place/PlaceRecommandTable.jsx';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import { useAtom } from 'jotai/react';
import { searchKeywordAtom } from '@src/component/infomation/atom.js';
import { PLACE_CATEGORY } from '@src/component/infomation/const.js';
import useFetchRestaurant from '@src/component/infomation/hooks/useFetchRestaurant.jsx';
import useFetchGym from '@src/component/infomation/hooks/useFetchGym.jsx';
import loadable from '@loadable/component';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import SearchFromAddressMapTest from '@src/component/infomation/place/SearchFromAddressMapTest.jsx';

const LoadableMap = loadable(
  () => import('@src/component/infomation/place/SearchFromAddressMap.jsx'),
  {
    fallback: <LoadingComponent />,
  });


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
  return data?.filter(value => {
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
  const { data: restaurantData, isLoading: restaurantIsLoading } = useFetchRestaurant(searchKeyword);
  const { data: gymData, isLoading: gymIsLoading } = useFetchGym(searchKeyword);
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
    if (restaurantData === undefined) return;
    //초기화
    setRestaurantData();
  }, [restaurantData]);

  useEffect(() => {
    if (category === PLACE_CATEGORY.RESTAURANT) {
      setRestaurantData();
    } else {
      setGymData();
    }
  }, [category, pageState, restaurantData, gymData]);


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
          totalPage={Math.ceil(data?.length / 6 ?? 1)}
          handlePageChange={(event, value) => {
            setPageState(value);
          }} />
      </PagnationContainer>
    </>
  );
};

export default PlaceRecommandContent;

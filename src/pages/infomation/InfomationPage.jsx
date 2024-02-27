import React, { lazy, Suspense, useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import InfomationTabs from '@src/component/infomation/InfomationTabs.jsx';
import { CustomSearchInput, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { useAtom, useAtomValue } from 'jotai/react';
import { infoTabStateAtom, recommandMenuStateAtom, searchKeywordAtom } from '@src/component/infomation/atom.js';

import { INFO_TABS, RECOMMAND_MENU } from '@src/component/infomation/const.js';
import LoadingComponent from '@src/component/common/LoadingComponent.jsx';
import PlaceRecommandContent from '@src/component/infomation/place/PlaceRecommandContent.jsx';

//lazy loading
const NewsContents = lazy(() =>
  import('@src/component/infomation/news/NewsContents.jsx'));
const NutrientContents = lazy(() => import('@src/component/infomation/nutrient/NutrientContents.jsx'));
const SportContents = lazy(() => import('@src/component/infomation/sport/SportContents.jsx'));
const RecipeContents = lazy(() => import('@src/component/infomation/recipe/RecipeContents.jsx'));

const InfomationContainer = styled(Container)`
    margin-top: 20px;

`;
const TabContainer = styled.div`
    display: flex;


`;


const InfomationPage = () => {
  const [searchValue, setSearchValue] = useAtom(searchKeywordAtom);


  return (
    <InfomationContainer>
      <TabContainer>
        <InfomationTabs />
        <FlexGrowDiv />
        <CustomSearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TabContainer>
      <Box>
        <Suspense fallback={<LoadingComponent />}>
          <Contents />
        </Suspense>
      </Box>
    </InfomationContainer>
  );
};

const Contents = () => {
  const selectedTab = useAtomValue(infoTabStateAtom);
  const selectedMenu = useAtomValue(recommandMenuStateAtom);

  if (selectedTab === INFO_TABS.NEWS) {
    return <NewsContents />;
  }
  if (selectedTab === INFO_TABS.RECOMMAND) {
    if (selectedMenu === RECOMMAND_MENU.NUTRIENTS) {
      return <NutrientContents />;
    }
    if (selectedMenu === RECOMMAND_MENU.SPORT) {
      return <SportContents />;
    }
    if (selectedMenu === RECOMMAND_MENU.PLACE) {
      return <PlaceRecommandContent />;
    }
    if (selectedMenu === RECOMMAND_MENU.FOOD) {
      return <RecipeContents />;
    }
  }
  if (selectedTab === INFO_TABS.ALLERGY) {
    return <div>알레르기</div>;
  }
};


export default InfomationPage;

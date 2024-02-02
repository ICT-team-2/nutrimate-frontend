import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import InfomationTabs from '@src/component/infomation/InfomationTabs.jsx';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';
import { useAtomValue } from 'jotai/react';
import { infoTabStateAtom, recommandMenuStateAtom } from '@src/component/infomation/atom.js';
import NewsContents from '@src/component/infomation/news/NewsContents.jsx';
import { INFO_TABS, RECOMMAND_MENU } from '@src/component/infomation/const.js';
import NutrientContents from '@src/component/infomation/nutrient/NutrientContents.jsx';

const InfomationContainer = styled(Container)`
    margin-top: 20px;

`;
const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;


`;


const InfomationPage = () => {
  const [searchValue, setSearchValue] = useState('');


  return (
    <InfomationContainer>
      <TabContainer>
        <InfomationTabs />
        <CustomSearchInput
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TabContainer>
      <Box>
        <Contents />
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
      return <div>운동 추천</div>;
    }
    if (selectedMenu === RECOMMAND_MENU.PLACE) {
      return <div>장소 추천</div>;
    }
    if (selectedMenu === RECOMMAND_MENU.FOOD) {
      return <div>음식 추천</div>;
    }
  }
  if (selectedTab === INFO_TABS.ALLERGY) {
    return <div>알레르기</div>;
  }
};


export default InfomationPage;

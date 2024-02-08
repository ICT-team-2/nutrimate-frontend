import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import InfomationTabs from '@src/component/infomation/InfomationTabs.jsx';
import { CustomSearchInput } from '@src/component/common/GlobalComponents.jsx';

const InfomationContainer = styled(Container)`
    margin-top: 20px;
`;
const TabContainer = styled.div`
    display: flex;
    justify-content: space-between;


`;


const InfomationPage = () => {
  const [value, setValue] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


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
      </Box>
    </InfomationContainer>
  );
};

export default InfomationPage;

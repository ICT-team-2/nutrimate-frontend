import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import DietRecord from '@src/component/record/record/diet/DietRecord.jsx';
import DisplayRecordDate from '@src/component/record/record/DisplayRecordDate.jsx';
import { useParams } from 'react-router-dom';
import { useAtom, useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { convertUrlParamToDate } from '@src/utils/functions.js';
import { selectedRecordTabsAtom } from '@src/component/record/atom.js';
import { RECORD_TABS } from '@src/component/record/const.js';
import SportRecord from '@src/component/record/record/sport/SportRecord.jsx';
import RecordStatistics from '@src/component/record/analysis/RecordStatistics.jsx';
import Recommend from '@src/component/record/recommend/Recommend';

const TabsContainer = styled.div`
    margin: 20px 0 40px;
    max-width: 1600px;
    display: flex;
`;

const RecordPageContainer = styled(Container)`
    margin: 0 auto;
    max-width: 1300px;
`;
const InnerContainer = styled.div`
    padding: 0 100px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const RecordPage = () => {
  const [value, setValue] = useAtom(selectedRecordTabsAtom);
  const params = useParams();
  const [date, setDate] = useAtom(datePickerAtom);

  useEffect(() => {
    setDate(convertUrlParamToDate(params.recordDate));
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RecordPageContainer>
      <InnerContainer>
        <DisplayRecordDate />
        <TabsContainer>
          <Tabs value={value} onChange={handleChange}>
            <Tab label="식단기록" />
            <Tab label="운동기록" />
            <Tab label="추천" />
            <Tab label="통계" />
          </Tabs>
        </TabsContainer>

        {value === RECORD_TABS.FOOD_RECORD && <DietRecord />}
        {value === RECORD_TABS.SPORT_RECORD && <SportRecord />}
        {value === RECORD_TABS.RECOMMEND && <Recommend />}
        {value === RECORD_TABS.STATISTICS && <RecordStatistics />}
      </InnerContainer>
    </RecordPageContainer>
  );
};


export default RecordPage;

import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { Container } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from 'styled-components';
import DietRecord from '@src/component/record/diet/DietRecord.jsx';
import DisplayRecordDate from '@src/component/record/DisplayRecordDate.jsx';
import { useParams } from 'react-router-dom';
import { useAtom } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { convertUrlParamToDate } from '@src/utils/functions.js';

const TabsContainer = styled.div`
    margin: 20px 0 40px;
    max-width: 1600px;
    display: flex;
`;

const RecordPageContainer = styled(Container)`
    margin: 0 auto;
`;
const InnerContainer = styled.div`
    padding: 0 50px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const RecordPage = () => {
  const [value, setValue] = useState(0);
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
            <Tab label="알람" />
          </Tabs>
        </TabsContainer>
        <DietRecord />
      </InnerContainer>

    </RecordPageContainer>
  );
};

export default RecordPage;

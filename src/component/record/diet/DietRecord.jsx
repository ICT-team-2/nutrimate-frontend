import React, { useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import styled from 'styled-components';
import {
  FlexDiv,
  FlexGrowDiv,
} from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import SelectMealTime from '@src/component/record/diet/SelectMealTime.jsx';
import RecordImgUploader
  from '@src/component/record/diet/RecordImgUploader.jsx';
import { FOOD_RECORD_BUTTONS } from '@src/component/record/const.js';
import SearchFoodDB from '@src/component/record/diet/SearchFoodDB.jsx';
import ManualRecordDiet from '@src/component/record/diet/ManualRecordDiet.jsx';

const RecordContainer = styled.div`
    //margin: 0 auto;
    //width: 80%;
    //height: 80%;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    justify-content: space-between;
    min-height: 400px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;
const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const SelectContainer = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: row;
`;

const DietRecord = () => {

  const [btnValue, setBtnValue] = useState(FOOD_RECORD_BUTTONS.IMAGE.VALUE);

  const handleBtnClick = (value) => {
    setBtnValue(value);
  };

  return (
    <OuterContainer>
      <SelectContainer>
        <SelectMealTime />
        <FlexGrowDiv />
        <div>
          {Object.values(FOOD_RECORD_BUTTONS).map((button, index) => (
            <StyledButton
              variant="contained" key={button.VALUE}
              onClick={() => {
                handleBtnClick(button.VALUE);
              }}
            >
              {button.LABEL}
            </StyledButton>
          ))}

        </div>
      </SelectContainer>
      <RecordContainer>
        {btnValue === FOOD_RECORD_BUTTONS.IMAGE.VALUE && <RecordImgUploader />}
        {btnValue === FOOD_RECORD_BUTTONS.SEARCH_DB.VALUE && <SearchFoodDB />}
        {btnValue === FOOD_RECORD_BUTTONS.MANUAL.VALUE && <ManualRecordDiet />}
      </RecordContainer>
      <div>대충 분석 결과</div>
    </OuterContainer>

  );
};

export default DietRecord;

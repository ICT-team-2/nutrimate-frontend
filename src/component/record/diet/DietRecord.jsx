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
  
  return (
    <OuterContainer>
      <SelectContainer>
        <SelectMealTime />
        <FlexGrowDiv />
        <div>
          <StyledButton variant='contained'>이미지로 등록</StyledButton>
          <StyledButton variant='contained'>검색하기</StyledButton>
          <StyledButton variant='contained'>직접 등록</StyledButton>
        </div>
      </SelectContainer>
      <RecordContainer>
        <RecordImgUploader />
      </RecordContainer>
      <div>대충 분석 결과</div>
    </OuterContainer>
  
  );
};

export default DietRecord;

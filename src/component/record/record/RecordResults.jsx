import React, { useState } from 'react';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import { useAtom } from 'jotai';
import { selectedRecordTabsAtom } from '@src/component/record/atom.js';
import FoodRecordList from '@src/component/record/record/diet/FoodRecordList.jsx';
import { RECORD_TABS } from '@src/component/record/const.js';
import SportRecordList from '@src/component/record/record/sport/SportRecordList.jsx';

const StyledPaper = styled(Paper)`
    padding: 20px 30px;
    margin-bottom: 40px;
`;
const TitleContainer = styled.div`
    display: flex;
`;
const TitleTypography = styled(Typography)`
    display: inline-block;
`;
const CaloryTypography = styled(TitleTypography)`
    color: ${(theme) => theme.theme['gray-light-text']};
`;

const FoodRecordProgress = styled(LinearProgress)`
    width: ${({ width }) => (width)}%;
    display: inline-block;
    border-radius: 30px 0 0 30px / 30px 0 0 30px;
    height: 10px;
`;
const ProgressContainer = styled.div`

`;
const SportRecordProgress = styled(LinearProgress)`
    width: ${({ width }) => (width)}%;
    display: inline-block;
    border-radius: 0 30px 30px 0 / 0 30px 30px 0;
    height: 10px;

    & .MuiLinearProgress-barColorPrimary {
        background-color: ${(theme) => theme.theme['info-hover']};
    }
`;


const RecordResults = ({ selectedRecordTab }) => {

  const [progress, setProgress] = useState(40);
  const [sportProgress, setSportProgress] = useState(10);


  return (
    <StyledPaper>
      <TitleContainer>
        <TitleTypography variant="h6">총 섭취량</TitleTypography>
        <FlexGrowDiv />
        <CaloryTypography variant="h6">1000/2000kcal</CaloryTypography>
      </TitleContainer>
      <ProgressContainer>
        <FoodRecordProgress
          variant="determinate" value={100}
          width={progress}
        />
        <SportRecordProgress
          variant="determinate"
          value={sportProgress}
          width={100 - progress}
        />
      </ProgressContainer>
      {selectedRecordTab === RECORD_TABS.FOOD_RECORD && <FoodRecordList />}
      {selectedRecordTab === RECORD_TABS.SPORT_RECORD && <SportRecordList />}
    </StyledPaper>
  );
};

export default RecordResults;

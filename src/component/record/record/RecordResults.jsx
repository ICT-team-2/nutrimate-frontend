import React, { useEffect, useState } from 'react';
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
import useFetchRecordAnalysis from '@src/hooks/record/analysis/useFetchRecordAnalysis.jsx';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import dayjs from 'dayjs';

const StyledPaper = styled(Paper)`
    padding: 20px 30px;
    margin-bottom: 40px;
    min-height: 300px;
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
    border-radius: ${({ width }) => width === 100 ? '30px'
            : '30px 0 0 30px / 30px 0 0 30px'};
    height: 10px;
`;
const ProgressContainer = styled.div`

`;
const SportRecordProgress = styled(LinearProgress)`
    width: ${({ width }) => (width)}%;
    display: inline-block;
    border-radius: ${({ foodprogress }) => foodprogress === 0 ? '30px'
            : '0 30px 30px 0 / 0 30px 30px 0'};
    height: 10px;

    & .MuiLinearProgress-barColorPrimary {
        background-color: ${({ theme, sportprogress }) =>
                sportprogress === 0 ? 'rgb(163, 186, 166)' : theme['info-hover']};
    }
`;

const pagePerItem = 5;

const RecordResults = ({ selectedRecordTab }) => {
  const [foodProgress, setFoodProgress] = useState(0);
  const [sportProgress, setSportProgress] = useState(0);
  const [overCal, setOverCal] = useState(false);
  const doDate = useAtomValue(datePickerAtom);
  const { data: recordAnalysis } = useFetchRecordAnalysis(
    dayjs(doDate).format('YYYY-MM-DD'));

  useEffect(() => {
    if (!recordAnalysis) return;
    const fp = ((recordAnalysis.totalDietCal - recordAnalysis.totalSportCal)
      / recordAnalysis.recommendCal * 100);
    setFoodProgress((fp >= 100) ? 100 : fp);
    setOverCal(fp >= 150);// 150% 이상일 경우
    const sp = recordAnalysis.totalSportCal
      / recordAnalysis.recommendCal * 100;
    setSportProgress(fp - sp >= 100 ? 0 : sp);
  }, [recordAnalysis]);


  return (
    <StyledPaper>
      <TitleContainer>
        <TitleTypography variant="h6">총 섭취량</TitleTypography>
        <FlexGrowDiv />
        <CaloryTypography variant="h6">
          {(recordAnalysis?.totalDietCal - recordAnalysis?.totalSportCal).toFixed(2)}
          /{recordAnalysis?.recommendCal}kcal
        </CaloryTypography>
      </TitleContainer>
      <ProgressContainer>
        <FoodRecordProgress
          variant="determinate" value={100}
          width={foodProgress}
          color={overCal ? 'error' : 'primary'}
        />
        <SportRecordProgress
          variant="determinate"
          value={sportProgress / (100 - foodProgress) * 100 >= 100
            ? 100 :
            sportProgress / (100 - foodProgress) * 100}
          width={100 - foodProgress}
          sportprogress={sportProgress}
          foodprogress={foodProgress}
        />
      </ProgressContainer>
      {selectedRecordTab === RECORD_TABS.FOOD_RECORD &&
        <FoodRecordList />}
      {selectedRecordTab === RECORD_TABS.SPORT_RECORD &&
        <SportRecordList />}
    </StyledPaper>
  );
};

export default RecordResults;

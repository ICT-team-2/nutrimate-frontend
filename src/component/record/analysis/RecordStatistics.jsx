import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RecordLineChart } from '@src/component/record/analysis/RecordLineChart.jsx';
import { RECORD_STATISTICS_RESULT_TYPE, RECORD_ANALYSIS } from '@src/component/record/const.js';
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedRecordResultAtom, selectedStatisticsPeriodBtnAtom } from '@src/component/record/atom.js';
import Typography from '@mui/material/Typography';
import FoodRecordList from '@src/component/record/record/diet/FoodRecordList.jsx';
import RecordResults from '@src/component/record/record/RecordResults.jsx';
import RecordResultsMenu from '@src/component/record/analysis/RecordResultsMenu.jsx';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import UseFetchRecordAnalysisGraph from '@src/hooks/record/analysis/useFetchRecordAnalysisGraph.jsx';
import dayjs from 'dayjs';

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const ButtonContainer = styled.div`
    display: flex;
    margin-bottom: 30px;
`;
const StyledButton = styled(Button)`
    margin-right: 10px;
`;

const RecordStatistics = () => {
  const [param, setParam] = useState(RECORD_ANALYSIS.DAY);
  const [selectedIndex, setSelectedIndex] = useAtom(selectedRecordResultAtom);
  const doDate = useAtomValue(datePickerAtom);

  const { data: graphData } = UseFetchRecordAnalysisGraph({
    ...param,
    endDate: dayjs(doDate).format('YYYY-MM-DD'),
  });

  useEffect(() => {
    console.log('graphData', graphData);
  }, [graphData]);

  return (
    <OuterContainer>
      <ButtonContainer>
        {Object.values(RECORD_ANALYSIS).map((button, index) => (
          <StyledButton
            variant="contained" key={button.periodType}
            onClick={() => {
              setParam(button);
            }}>
            {button.label}
          </StyledButton>))
        }
      </ButtonContainer>
      <RecordLineChart graphData={graphData} />
      <RecordResultsMenu />
      <RecordResults selectedRecordTab={selectedIndex} />
    </OuterContainer>
  );
};

export default RecordStatistics;

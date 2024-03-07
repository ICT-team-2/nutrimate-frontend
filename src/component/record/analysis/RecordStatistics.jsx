import React from 'react';
import styled from 'styled-components';
import { RecordLineChart } from '@src/component/record/analysis/RecordLineChart.jsx';
import { RECORD_STATISTICS_RESULT_TYPE, STATISTICS_BUTTONS } from '@src/component/record/const.js';
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedRecordResultAtom, selectedStatisticsPeriodBtnAtom } from '@src/component/record/atom.js';
import Typography from '@mui/material/Typography';
import FoodRecordList from '@src/component/record/record/diet/FoodRecordList.jsx';
import RecordResults from '@src/component/record/record/RecordResults.jsx';
import RecordResultsMenu from '@src/component/record/analysis/RecordResultsMenu.jsx';

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
  const [btnValue, setBtnValue] = useAtom(selectedStatisticsPeriodBtnAtom);
  const [selectedIndex, setSelectedIndex] = useAtom(selectedRecordResultAtom);


  return (
    <OuterContainer>
      <ButtonContainer>
        {Object.values(STATISTICS_BUTTONS).map((button, index) => (
          <StyledButton variant="contained" key={button.VALUE} onClick={() => {
            setBtnValue(button.VALUE);
          }}>
            {button.LABEL}
          </StyledButton>))
        }
      </ButtonContainer>
      <RecordLineChart />
      <RecordResultsMenu />
      <RecordResults selectedRecordTab={selectedIndex} />
    </OuterContainer>
  );
};

export default RecordStatistics;

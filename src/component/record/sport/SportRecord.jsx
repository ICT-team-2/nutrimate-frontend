import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import RecordResults from '@src/component/record/RecordResults.jsx';
import { SPORT_RECORD_BUTTONS } from '@src/component/record/const.js';
import { Button, Paper } from '@mui/material';
import { faClock, faDumbbell, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManualRecordSport from '@src/component/record/sport/ManualRecordSport.jsx';
import SearchSportDB from '@src/component/record/sport/SearchSportDB.jsx';
import { useAtom } from 'jotai';
import { selectedRecordTabsAtom } from '@src/component/record/atom.js';


const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
    margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const RecordContainer = styled.div`
    //margin: 0 auto;
    //width: 80%;
    //height: 80%;
    margin-bottom: 30px;
    min-height: 400px;
`;

const SportRecord = () => {
  const [sportName, setSportName] = useState('');
  const [btnValue, setBtnValue] = useState(SPORT_RECORD_BUTTONS.SEARCH_DB.VALUE);
  const [selectedRecordTab, setSelectedRecordTab] = useAtom(selectedRecordTabsAtom);

  return (
    <OuterContainer>
      <ButtonContainer>
        {Object.values(SPORT_RECORD_BUTTONS).map((button, index) => (
          <StyledButton variant="contained" key={button.VALUE} onClick={() => {
            setBtnValue(button.VALUE);
          }
          }>{button.LABEL}</StyledButton>))
        }
      </ButtonContainer>
      <RecordContainer>
        {btnValue === SPORT_RECORD_BUTTONS.SEARCH_DB.VALUE && (<SearchSportDB />)}
        {btnValue === SPORT_RECORD_BUTTONS.MANUAL.VALUE && (<ManualRecordSport />)}
      </RecordContainer>
      <RecordResults selectedRecordTab={selectedRecordTab} />;
    </OuterContainer>
  );
};

export default SportRecord;
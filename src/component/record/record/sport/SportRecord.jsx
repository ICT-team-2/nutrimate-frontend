import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import RecordResults from '@src/component/record/record/RecordResults.jsx';
import { SPORT_RECORD_BUTTONS } from '@src/component/record/const.js';
import { Button, Paper } from '@mui/material';
import { faClock, faDumbbell, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManualRecordSport from '@src/component/record/record/sport/ManualRecordSport.jsx';
import SearchSportDB from '@src/component/record/record/sport/SearchSportDB.jsx';
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
  const [selectedRecordTab, setSelectedRecordTab] = useAtom(selectedRecordTabsAtom);

  return (
    <OuterContainer>
      <RecordContainer>
        <SearchSportDB />
      </RecordContainer>
      <RecordResults selectedRecordTab={selectedRecordTab} />
    </OuterContainer>
  );
};

export default SportRecord;
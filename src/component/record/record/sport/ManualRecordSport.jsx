import React, { useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import RecordResults from '@src/component/record/record/RecordResults.jsx';
import { SPORT_RECORD_BUTTONS } from '@src/component/record/const.js';
import { Button, Paper } from '@mui/material';
import { faClock, faDumbbell, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputNameContainer = styled.div`
    margin-bottom: 20px;
    padding: 0 20px;
`;

const StyledTextField = styled(TextField)`
    display: inline-block;
`;
const StyledTypography = styled(Typography)`
    display: inline-block;
    margin-top: 18px;
    margin-right: 20px;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;

const RecordContainer = styled(Paper)`
    display: flex;
    padding: 95px 0;
    margin-top: 10px;
`;
const RECORD_ITEMS = [
  {
    TITLE: '시간',
    ICON: faClock,
  },
  {
    TITLE: '몸무게',
    ICON: faWeightScale,
  },
  {
    TITLE: '세트',
    ICON: faDumbbell,
  },
];
const RecordItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;
const RecordTypo = styled(Typography)`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;
const RecordTextField = styled(TextField)`
    display: inline-block;
    margin: auto;
`;
const RecordButton = styled(Button)`
    margin: 34px 0 60px auto;
`;

const ManualRecordSport = () => {
  const [sportName, setSportName] = useState('');
  const [btnValue, setBtnValue] = useState(SPORT_RECORD_BUTTONS.SEARCH_DB.VALUE);

  return (
    <InnerContainer>
      <InputNameContainer>
        <StyledTypography variant="h6">운동 이름</StyledTypography>
        <StyledTextField variant="standard" label="운동 이름" value={sportName} />
      </InputNameContainer>
      <RecordContainer>
        {RECORD_ITEMS.map((item, index) => (
          <RecordItemContainer key={item.TITLE}>
            {<FontAwesomeIcon icon={item.ICON} size="2x"></FontAwesomeIcon>}
            <RecordTypo variant="body2">{item.TITLE}</RecordTypo>
            <RecordTextField variant="standard" label={item.TITLE} type="number" />
          </RecordItemContainer>
        ))
        }
      </RecordContainer>
      <RecordButton variant="contained">등록</RecordButton>
    </InnerContainer>
  );
};

export default ManualRecordSport;

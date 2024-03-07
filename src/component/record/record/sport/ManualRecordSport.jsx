import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import RecordResults from '@src/component/record/record/RecordResults.jsx';
import { SPORT_RECORD_BUTTONS } from '@src/component/record/const.js';
import { Button, Paper } from '@mui/material';
import { faClock, faDumbbell, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import useInputSportRecord from '@src/hooks/record/sport/useInputSportRecord.jsx';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { useAtom, useAtomValue } from 'jotai/react';
import dayjs from 'dayjs';


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

const RecordContainer = styled(Paper)`
    display: flex;
    padding: 95px 0;
    margin-top: 10px;
`;
const RECORD_ITEMS = [
  {
    TITLE: '시간',
    LABEL: '시간(분)',
    ICON: faClock,
    KEY: 'sportTime',
  },
  {
    TITLE: '몸무게',
    LABEL: '몸무게(kg)',
    ICON: faWeightScale,
    KEY: 'sportWeight',
  },
  {
    TITLE: '세트',
    LABEL: '세트(선택사항)',
    ICON: faDumbbell,
    KEY: 'sportSet',
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

const ManualRecordSport = ({ data }) => {
  const { data: userData, isLoading } = useFetchProfileData();
  const [params, setParams] = useState({
    sportId: data.sportId,
    sportTime: 0,
    sportWeight: 0,
    sportSet: undefined,
  });
  const doDate = useAtomValue(datePickerAtom);

  const inputSportRecord = useInputSportRecord();

  const submitRecord = () => {
    inputSportRecord.mutate({
      ...params,
      record: {
        doDate: dayjs(doDate).format('YYYY-MM-DD'),
      },
    });
  };

  useEffect(() => {
    if (!userData) return;
    setParams((prev) => ({
      ...prev,
      sportWeight: userData.userWeight,
    }));
  }, [userData]);

  return (
    <InnerContainer>
      <InputNameContainer>
        <StyledTypography variant="h6">{data.sportName}</StyledTypography>
      </InputNameContainer>
      <RecordContainer>
        {RECORD_ITEMS.map((item, index) => (
          <RecordItemContainer key={item.TITLE}>
            {<FontAwesomeIcon icon={item.ICON} size="2x"></FontAwesomeIcon>}
            <RecordTypo variant="body2">{item.TITLE}</RecordTypo>
            <RecordTextField
              value={params[item.KEY]}
              onChange={(e) => {
                setParams((prev) => ({
                  ...prev,
                  [item.KEY]: e.target.value,
                }));
              }}
              variant="standard"
              label={`${item.LABEL}`}
              type="number" />
          </RecordItemContainer>
        ))
        }
      </RecordContainer>
      <RecordButton
        onClick={submitRecord}
        variant="contained">등록</RecordButton>
    </InnerContainer>
  );
};

export default ManualRecordSport;

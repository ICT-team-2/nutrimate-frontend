import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import useFetchRecordAnalysis from '@src/hooks/record/analysis/useFetchRecordAnalysis.jsx';
import dayjs from 'dayjs';
import useFetchSportRecord from '@src/hooks/record/sport/useFetchSportRecord.jsx';
import DeleteSportRecordModal from '@src/component/record/record/sport/DeleteSportRecordModal.jsx';

const ContainerDiv = styled(FlexDiv)`
    margin: 20px 0;
`;
const FirstContainerDiv = styled(FlexGrowDiv)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 145px;
`;
const SecondContainerDiv = styled(FlexGrowDiv)`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    align-items: center;
`;


const SportRecordItemContianer = styled.div`
    display: flex;
`;
const StyledIconButton = styled(IconButton)`
    padding: 0;
    margin-left: 5px;
    height: fit-content;
`;
const SportRecordContainer = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;
const RecordItemTypography = styled(Typography)`
    display: inline-block;
`;
const FirstItemTypography = styled(Typography)`
    margin: 5px 0;
`;

const TitleTypography = styled(Typography)`
    margin-bottom: 0.5rem;
    font-weight: 600;
`;

const pageSize = 3;

const SportRecordList = () => {
  const doDate = useAtomValue(datePickerAtom);
  const { data: recordAnalysis } = useFetchRecordAnalysis(
    dayjs(doDate).format('YYYY-MM-DD'));

  const { data: sportRecord } = useFetchSportRecord(dayjs(doDate).format('YYYY-MM-DD'));


  useEffect(() => {
    console.log('sportRecord', sportRecord);
  }, [sportRecord]);

  return (
    <ContainerDiv>
      <FirstContainerDiv>
        <FirstItemTypography variant="h6">
          총 운동시간 {recordAnalysis?.totalSportTime}분
        </FirstItemTypography>
        <FirstItemTypography variant="h6">
          소모 칼로리 {recordAnalysis
          && recordAnalysis.totalSportCal.toFixed(2)}kcal
        </FirstItemTypography>
      </FirstContainerDiv>
      <SecondContainerDiv>
        <SportRecordContainer>
          <TitleTypography variant="body2">오늘 한 운동</TitleTypography>
          {sportRecord && sportRecord.map((item, index) => (
            <SportRecordItem
              key={item.sportName + index}
              title={item.sportName}
              calory={item.sportCal}
              time={item.sportTime}
              set={item.sportSet}
              data={item}
            />
          ))}
        </SportRecordContainer>
      </SecondContainerDiv>
    </ContainerDiv>
  );
};

const StyledEmptyDiv = styled.div`
    width: 29px;
`;

const SportRecordItem = (props) => {
  const { title, calory, time, set, data } = props;

  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <SportRecordItemContianer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <RecordItemTypography variant="subtitle2">
        {data?.sportName}
        <br />
        {data && <RecordItemTypography variant="caption" color="grey">
          {data?.sportTime && `${data?.sportTime}분`}
          {data?.sportSet && `, ${data?.sportSet}세트`}
        </RecordItemTypography>}
      </RecordItemTypography>
      <FlexGrowDiv grow={3} />
      {calory && (<>
        <RecordItemTypography variant="body2">
          {calory}kcal
        </RecordItemTypography>
        {hover ? <StyledIconButton
            onClick={() => setModalOpen(true)}
          >
            <CloseRoundedIcon />
          </StyledIconButton>
          : <StyledEmptyDiv />
        }
      </>)}
      <br />
      <br />
      <DeleteSportRecordModal
        data={data}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </SportRecordItemContianer>
  );
};


export default SportRecordList;

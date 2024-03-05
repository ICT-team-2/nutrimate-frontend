import React from 'react';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';

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

const SportRecordList = () => {
  return (
    <ContainerDiv>
      <FirstContainerDiv>
        <FirstItemTypography variant="h6">
          총 운동시간 60분
        </FirstItemTypography>
        <FirstItemTypography variant="h6">
          소모 칼로리 280kcal
        </FirstItemTypography>
      </FirstContainerDiv>
      <SecondContainerDiv>
        <SportRecordContainer>
          <SportRecordItem title="오늘 한 운동" />
          <SportRecordItem
            title={'벤치 프레스'} calory={200} time={10} set={1} />
          <SportRecordItem
            title={'스쿼트'} calory={200} time={10} />
        </SportRecordContainer>
      </SecondContainerDiv>
    </ContainerDiv>
  );
};


const SportRecordItem = (props) => {
  const { title, calory, time, set } = props;
  return (
    <SportRecordItemContianer>
      <RecordItemTypography variant="subtitle2">
        {title}
        <br />
        {time && <RecordItemTypography variant="caption" color="grey">
          {time && `${time}분`}
          {set && `, ${set}세트`}
        </RecordItemTypography>}
      </RecordItemTypography>
      <FlexGrowDiv grow={3} />
      {calory && (<div>
        <RecordItemTypography variant="body2">
          {calory}kcal
        </RecordItemTypography>
        <StyledIconButton>
          <CloseRoundedIcon />
        </StyledIconButton>
        <br />

      </div>)}
    </SportRecordItemContianer>
  );
};


export default SportRecordList;

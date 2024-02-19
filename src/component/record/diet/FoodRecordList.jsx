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
`;
const SecondContainerDiv = styled(FlexGrowDiv)`
    display: flex;
    flex-direction: column;
    flex-grow: 2;
    align-items: center;
`;
const ItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 20px;

`;
const CircleDivContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CircleDiv = styled.div`
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23124E23FF' stroke-width='7' stroke-dasharray='23' stroke-dashoffset='100' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 100px;
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const DietTypography = styled(Typography)`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
`;
const FoodRecordItemContianer = styled.div`
    display: flex;
`;
const StyledIconButton = styled(IconButton)`
    padding: 0;
`;
const FoodRecordContainer = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;

const FoodRecordList = () => {
  return (
    <ContainerDiv>
      <FirstContainerDiv>
        <DietItem title="탄수화물" value="200" maxValue="275" />
        <DietItem title="단백질" value="200" maxValue="275" />
        <DietItem title="지방" value="200" maxValue="275" />
      </FirstContainerDiv>
      <SecondContainerDiv>
        <FoodRecordContainer>
          <FoodRecordItem title="아침" />
          <FoodRecordItem
            title={'샐러드'} calory={200} />
          <FoodRecordItem
            title={'샐러드'} calory={200} />
          <FoodRecordItem
            title={'샐러드'} calory={200} />
        </FoodRecordContainer>

      </SecondContainerDiv>
    </ContainerDiv>
  );
};
const RecordItemTypography = styled(Typography)`
    display: inline-block;
    flex-grow: 1;
`;

const DietItem = (props) => {
  const { title, value, maxValue } = props;
  return (
    <ItemContainer>
      <DietTypography variant="subtitle2">
        {title}
      </DietTypography>
      <CircleDivContainer>
        <CircleDiv>{Math.round(value / maxValue * 100)}%</CircleDiv>
      </CircleDivContainer>
      <DietTypography variant="body1">
        {value}/{maxValue}g
      </DietTypography>

    </ItemContainer>
  );
};

const FoodRecordItem = (props) => {
  const { title, calory } = props;
  return (
    <FoodRecordItemContianer>
      <RecordItemTypography variant="body1">{title}</RecordItemTypography>
      <FlexGrowDiv grow={3} />
      {calory && (<>
        <RecordItemTypography variant="body1">{calory}kcal</RecordItemTypography>
        <StyledIconButton>
          <CloseRoundedIcon />
        </StyledIconButton>
      </>)}
    </FoodRecordItemContianer>
  );
};


export default FoodRecordList;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/material/IconButton';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import useFetchRecordAnalysis from '@src/hooks/record/analysis/useFetchRecordAnalysis.jsx';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import dayjs from 'dayjs';
import useFetchDietRecord from '@src/hooks/record/food/useFetchDietRecord.jsx';
import { selectedMealTimeAtom } from '@src/component/record/atom.js';
import { Button, Menu } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useDeleteDietRecord from '@src/hooks/record/food/useDeleteDietRecord.jsx';
import DeleteDietRecordModal from '@src/component/record/record/diet/DeleteDietRecordModal.jsx';
import MenuItem from '@mui/material/MenuItem';

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
    min-width: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

`;
const StyledMealTimeButton = styled(Button)`
    min-width: fit-content;
    width: fit-content;
    padding: 5px 10px;
`;
const StyledPageIcon = styled(IconButton)`
    border-radius: 5px;
    margin: 0 20px;
    color: black;
`;
const pageSize = 5;
const MEAL_TIME = {
  BREAKFAST: '아침',
  LUNCH: '점심',
  DINNER: '저녁',
  SNACK: '간식',
};

const FoodRecordList = () => {
  const doDate = useAtomValue(datePickerAtom);
  const mealTime = useAtomValue(selectedMealTimeAtom);
  const [page, setPage] = useState(1);

  const [anchorEl, setAnchorEl] = useState(null);

  const { data: recordAnalysis } = useFetchRecordAnalysis(
    dayjs(doDate).format('YYYY-MM-DD'));
  const { data: dietRecord } = useFetchDietRecord({
    doDate: dayjs(doDate).format('YYYY-MM-DD'),
    mealTime,
  });
  const [recordList, setRecordList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  const handleMealTimeMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (!dietRecord) return;
    setRecordList(dietRecord.slice((page - 1) * pageSize,
      page * pageSize));
    setTotalPage(Math.ceil(dietRecord.length / pageSize));
  }, [dietRecord, page]);

  useEffect(() => {
    if (!dietRecord) return;
    setTotalPage(Math.ceil(dietRecord.length / pageSize));
  }, [dietRecord]);

  return (
    <ContainerDiv>
      <FirstContainerDiv>
        <DietItem
          title="탄수화물"
          value={recordAnalysis?.totalCarbo.toFixed(2)}
          maxValue={recordAnalysis?.recommendCarbo.toFixed(2)} />
        <DietItem
          title="단백질"
          value={recordAnalysis?.totalProtein.toFixed(2)}
          maxValue={recordAnalysis?.recommendProtein.toFixed(2)} />
        <DietItem
          title="지방"
          value={recordAnalysis?.totalProvi.toFixed(2)}
          maxValue={recordAnalysis?.recommendProvi.toFixed(2)} />
      </FirstContainerDiv>
      <StyledPageIcon
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </StyledPageIcon>
      <SecondContainerDiv>
        <FoodRecordContainer>
          <StyledMealTimeButton
            onClick={handleMealTimeMenuClick}
          >
            {MEAL_TIME[mealTime]}
          </StyledMealTimeButton>
          {recordList?.map((record, index) => (
            <FoodRecordItem
              key={record.foodName + index}
              data={record} />
          ))}
        </FoodRecordContainer>
      </SecondContainerDiv>
      <StyledPageIcon
        disabled={page >= totalPage}
        onClick={() => setPage(page + 1)}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledPageIcon>
      <MealTimeMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </ContainerDiv>
  );
};

function MealTimeMenu({ anchorEl, setAnchorEl }) {

  const setMealTime = useSetAtom(selectedMealTimeAtom);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu
      id="meal-time-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {Object.keys(MEAL_TIME).map((key) => (
        <MenuItem
          key={key}
          onClick={() => {
            setMealTime(key);
            setAnchorEl(null);
          }}>
          {MEAL_TIME[key]}
        </MenuItem>
      ))
      }
    </Menu>);
}

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
const StyledEmptyDiv = styled.div`
    width: 24px;
`;
const FoodRecordItem = (props) => {
  const { data } = props;
  const [hover, setHover] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <FoodRecordItemContianer
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <RecordItemTypography variant="body1">
        {data?.foodName}
      </RecordItemTypography>
      <FlexGrowDiv grow={3} />
      {data && (<>
        <RecordItemTypography variant="body1">
          {data ? data.foodCal.toFixed(2) : 0}kcal
        </RecordItemTypography>
        {hover ? <StyledIconButton
            onClick={() => setModalOpen(true)}
          >
            <CloseRoundedIcon />
          </StyledIconButton>
          : <StyledEmptyDiv />
        }
      </>)}
      <DeleteDietRecordModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={data} />
    </FoodRecordItemContianer>
  );
};


export default FoodRecordList;

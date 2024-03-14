import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Grid, Menu, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import DietRecordSubmitModal from '@src/component/record/record/diet/DietRecordSubmitModal.jsx';
import MenuItem from '@mui/material/MenuItem';
import useInputCustomDietRecord from '@src/hooks/record/food/useInputCustomDietRecord.jsx';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { selectedMealTimeAtom } from '@src/component/record/atom.js';


const ManualRecordContainer = styled.div`
    width: 100%;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
`;

const StyledButton = styled(Button)`
    margin-top: 60px;
    margin-left: auto;
`;
const StyledTextField = styled(TextField)`
    display: inline-block;
`;
const StyledTypography = styled(Typography)`
    display: inline-block;
    margin-top: 22px;
    margin-right: 20px;
`;
const StyledGrid = styled(Grid)`
    display: flex;
    margin-bottom: 30px;

    &.MuiGrid-item {
        padding: 0;
    }
`;
const MarginTextField = styled(StyledTextField)`
    margin-left: 2rem;
`;
const CarboTextField = styled(StyledTextField)`
    margin-left: 1.1rem;
`;
const FatTextField = styled(StyledTextField)`
    margin-left: 3rem;
`;
const IntakeTextField = styled(StyledTextField)`
    margin-left: 0.8rem;
`;
const IntakeUnitButton = styled(Button)`
    padding: 0;
    color: black;
    margin-top: 22px;
    margin-right: ${({ intakeunit }) => intakeunit === 'g' ? '18px' : '7px'};
    text-transform: none;
`;

const ManualRecordDiet = () => {

  const [data, setData] = useState({
    foodName: '',
    foodCal: 0,
    foodCarbo: 0,
    foodProvi: 0,
    foodProtein: 0,
    intake: 0,
    intakeUnit: 'g',
    foodIntake: 0,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const doDate = useAtomValue(datePickerAtom);
  const mealTime = useAtomValue(selectedMealTimeAtom);
  const inputCustomDietRecord = useInputCustomDietRecord();

  const handleMenuBtnClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSubmit = () => {

    inputCustomDietRecord.mutate({
      ...data,
      record: {
        doDate: dayjs(doDate).format('YYYY-MM-DD'),
      },
      mealTime,
      recordIntake: data.intake,
    });
    setModalOpen(false);
  };

  return (
    <ManualRecordContainer>
      <Grid container spacing={2}>
        <StyledGrid item xs={12}>
          <StyledTypography variant="subtitle1">음식명</StyledTypography>
          <MarginTextField
            value={data.foodName}
            onChange={(e) =>
              setData({ ...data, foodName: e.target.value })}
            variant={'standard'} label={'음식명'} />
        </StyledGrid>
        <StyledGrid item xs={12} sm={12} md={6} xl={4} style={{ marginLeft: '-1px' }}>
          <StyledTypography variant="subtitle1">섭취 칼로리</StyledTypography>
          <StyledTextField
            value={data.foodCal}
            onChange={(e) =>
              setData({ ...data, foodCal: e.target.value })}
            variant={'standard'} label={'섭취 칼로리(kcal)'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={12} sm={12} md={6} xl={4} style={{ marginLeft: '-1px' }}>
          <IntakeUnitButton
            intakeunit={data.intakeUnit}
            onClick={handleMenuBtnClick}
          >
            <Typography variant="subtitle1">
              섭취량({data.intakeUnit})
            </Typography>
          </IntakeUnitButton>
          <IntakeTextField
            value={data.intake}
            onChange={(e) =>
              setData({
                ...data,
                intake: e.target.value,
                foodIntake: e.target.value,
              })}
            variant={'standard'} label={`섭취량(${data.intakeUnit})`} type="number" />
        </StyledGrid>
        <StyledGrid item xs={0} md={0} xl={4} />

        <StyledGrid item xs={12} sm={12} md={6} xl={4}>
          <StyledTypography variant="subtitle1">탄수화물</StyledTypography>
          <CarboTextField
            value={data.foodCarbo}
            onChange={(e) =>
              setData({ ...data, foodCarbo: e.target.value })}
            variant={'standard'} label={'탄수화물(g)'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={12} sm={12} md={6} xl={4}>
          <StyledTypography variant="subtitle1">단백질</StyledTypography>
          <MarginTextField
            value={data.foodProtein}
            onChange={(e) =>
              setData({ ...data, foodProtein: e.target.value })}
            variant={'standard'} label={'단백질(g)'} type="number" />
        </StyledGrid>
        <StyledGrid item xs={12} sm={12} md={6} xl={4}>
          <StyledTypography variant="subtitle1">지방</StyledTypography>
          <FatTextField
            value={data.foodProvi}
            onChange={(e) =>
              setData({ ...data, foodProvi: e.target.value })}
            variant={'standard'} label={'지방(g)'} type="number" />
        </StyledGrid>
      </Grid>
      <StyledButton
        onClick={() => {
          setModalOpen(true);
        }}
        variant="contained">등록</StyledButton>
      <DietRecordSubmitModal
        open={modalOpen}
        setOpen={setModalOpen}
        onSubmit={handleSubmit}
        data={data}
      />
      <IntakeUnitMenu
        handleClose={handleMenuClose}
        setIntakeUnit={(intakeUnit) => {
          setData({ ...data, intakeUnit: intakeUnit });
          handleMenuClose();
        }}
        anchorEl={anchorEl} />
    </ManualRecordContainer>
  );
};

function IntakeUnitMenu({ anchorEl, setIntakeUnit, handleClose }) {
  const open = Boolean(anchorEl);
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => setIntakeUnit('g')}>g</MenuItem>
      <MenuItem onClick={() => setIntakeUnit('mL')}>mL</MenuItem>
    </Menu>
  );
}

export default ManualRecordDiet;

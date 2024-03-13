import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import useInputDietRecordWithDB from '@src/hooks/record/food/useInputDietRecordWithDB.jsx';
import { selectedMealTimeAtom } from '@src/component/record/atom.js';
import dayjs from 'dayjs';

const StyledPaper = styled(Paper)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    padding: 20px;
`;
const TitleTypography = styled(Typography)`
    margin-bottom: 20px;
`;
const DescriptionTypography = styled(Typography)`
    margin-top: 20px;

    display: inline-block;
`;
const SubmitContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const SubmitButton = styled(Button)`

`;
const DescriptionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const convertNanToOne = (value) => {
  if (isNaN(value)) {
    return 1;
  }
  return value;
};
const DietRecordSubmitModal = ({ open, setOpen, data, onSubmit }) => {

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledPaper>
        <TitleTypography id="modal-modal-title" variant="h6" component="h2">
          {data.foodName}({data.intake}{data.intakeUnit})를 정말로 기록하시겠습니까?
        </TitleTypography>
        <DescriptionContainer>
          <DescriptionTypography variant="body2">
            섭취 칼로리&nbsp;
            {data.foodCal * convertNanToOne(data.intake / data.foodIntake)}kcal
          </DescriptionTypography>
          <DescriptionTypography variant="body2">
            탄수화물&nbsp;
            {data.foodCarbo * convertNanToOne(data.intake / data.foodIntake)}g
          </DescriptionTypography>
          <DescriptionTypography variant="body2">
            단백질&nbsp;
            {data.foodProtein * convertNanToOne(data.intake / data.foodIntake)}g
          </DescriptionTypography>
          <DescriptionTypography variant="body2">
            지방&nbsp;
            {data.foodProvi * convertNanToOne(data.intake / data.foodIntake)}g&nbsp;
          </DescriptionTypography>
        </DescriptionContainer>
        <SubmitContainer>
          <SubmitButton
            onClick={() => onSubmit()}
            variant="contained"
          >등록</SubmitButton>
        </SubmitContainer>
      </StyledPaper>
    </Modal>
  );
};


DietRecordSubmitModal.defaultProps = {
  open: false,
  setOpen: () => {
  },
  data: {
    foodName: '',
    intake: 0,
    intakeUnit: 'g',
    foodCal: 0,
    foodCarbo: 0,
    foodProtein: 0,
    foodProvi: 0,
    foodId: 0,
  },
  onSubmit: () => {
  },
};

export default DietRecordSubmitModal;

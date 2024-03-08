import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import useInputDietRecordWithDB from '@src/hooks/record/food/useInputDietRecordWithDB.jsx';
import DietRecordSubmitModal from '@src/component/record/record/diet/DietRecordSubmitModal.jsx';
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
const StyledButton = styled(Button)`
    margin-right: 10px;
    padding: 3px 0;
`;
const TextTypography = styled(Typography)`
    margin-bottom: 10px;
`;
const TextFieldContainer = styled.div`
    margin-top: 10px;
    display: flex;
`;
const ModalOpenButton = styled(Button)`
    margin-top: 10px;
`;
const StyledTextField = styled(TextField)`
    width: calc(100% - 100px);
`;
const DescriptionTypography = styled(Typography)`
    margin-top: 20px;
    margin-right: 20px;
    display: inline-block;
`;
const DietRecordWithDBModal = ({ data, open, setOpen }) => {

  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [intake, setIntake] = useState(0);

  const doDate = useAtomValue(datePickerAtom);
  const mealTime = useAtomValue(selectedMealTimeAtom);
  const inputDietRecordWithDB = useInputDietRecordWithDB();

  const handleSubmit = () => {
    inputDietRecordWithDB.mutate({
      record: {
        doDate: dayjs(doDate).format('YYYY-MM-DD'),
      },
      mealTime,
      foodId: data.foodId,
      recordIntake: intake,
    });
    setSecondModalOpen(false);
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  const handleModalOpen = () => {
    setSecondModalOpen(true);
  };

  useEffect(() => {
    setIntake(data.foodIntake);
  }, [data]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledPaper>
          <TitleTypography id="modal-modal-title" variant="h6" component="h2">
            식단 기록하기
          </TitleTypography>
          <TextTypography variant="body2">
            {data.foodName}을(를) 기록하시겠습니까?
          </TextTypography>
          {[0.5, 1, 2].map((item) => (
            <StyledButton
              key={item}
              onClick={() => {
                setIntake(item * data.foodIntake);
              }}
            >{item}인분</StyledButton>
          ))}

          <TextFieldContainer>
            <StyledTextField
              value={intake}
              variant="standard"
              label="섭취량(g)" />
            <FlexGrowDiv />
            <ModalOpenButton
              onClick={handleModalOpen}
              variant="contained">기록하기</ModalOpenButton>
          </TextFieldContainer>
        </StyledPaper>
      </Modal>
      <DietRecordSubmitModal
        open={secondModalOpen}
        setOpen={setSecondModalOpen}
        onSubmit={handleSubmit}
        data={{ ...data, intake }}
      />
    </>
  );
};

DietRecordWithDBModal.defaultProps = {
  open: false,
};

export default DietRecordWithDBModal;
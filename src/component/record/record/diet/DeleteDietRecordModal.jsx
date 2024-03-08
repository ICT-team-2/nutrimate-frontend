import { useEffect, useState } from 'react';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import useDeleteDietRecord from '@src/hooks/record/food/useDeleteDietRecord.jsx';
import styled from 'styled-components';

const StylePaper = styled(Paper)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 440px;
    padding: 20px;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const DeleteDietRecordModal = ({ data, open, setOpen }) => {

  const deleteDietRecord = useDeleteDietRecord();

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <StylePaper>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          식단 기록({data?.foodName})을 정말로 삭제하시겠습니까?
        </Typography>

        <ButtonContainer>
          <Button
            onClick={() => {
              deleteDietRecord.mutate(data?.record.recordId);
              handleClose();
            }}
            color="error">삭제</Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >취소</Button>
        </ButtonContainer>
      </StylePaper>
    </Modal>
  );
};

DeleteDietRecordModal.defaultProps = {
  open: false,
  setOpen: () => {
  },
};

export default DeleteDietRecordModal;
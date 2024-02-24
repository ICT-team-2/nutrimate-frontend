import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect, useState } from 'react';
import useDeleteBoard from '@src/component/board/feed/hooks/useDeleteBoard.jsx';

/**
 *
 * @param open - 삭제 다이얼로그가 열려있는지 여부(state)
 * @param setOpen - 삭제 다이얼로그를 열고 닫는 함수(setState)
 * @param onClickDelete - 삭제 버튼을 눌렀을 때 실행되는 함수
 * @returns {Element} - 삭제 다이얼로그 컴포넌트
 * @constructor
 */
export default function AskDeleteDialog({ open, setOpen, onClickDelete }) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onClickDelete();
    handleClose();
  };

  return (

    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        정말로 삭제하시겠습니까?
      </DialogTitle>
      <DialogActions>
        <Button
          color="error"
          onClick={handleDelete}>삭제</Button>
        <Button onClick={handleClose} autoFocus>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AskDeleteDialog.defaultProps = {
  open: false,
  setOpen: () => {
    console.log('setOpen');
  },
  onClickDelete: () => {
    console.log('delete');
  },
};
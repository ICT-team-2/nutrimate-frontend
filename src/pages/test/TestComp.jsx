import * as React from 'react';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';

export default function SimpleSnackbar() {

  const toastMsg = () => toast('This is a success toast');
  const successMsg = () => toast.success('This is a success toast');
  const loadingMsg = () => toast.loading('Loading...');

  return (
    <>
      <Button onClick={toastMsg}>Show Toast</Button>
      <Button onClick={successMsg}>Show Toast</Button>
      <Button onClick={loadingMsg}>Show Toast</Button>
    </>
  );
}
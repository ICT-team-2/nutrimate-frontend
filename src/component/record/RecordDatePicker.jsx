import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';
import 'dayjs/locale/ko';
import { useAtom } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import dayjs from 'dayjs';
import useNavigateToRecord from '@src/hooks/useNavigateToRecord.jsx';

export default function RecordDatePicker ({ children, date }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [selectedDate, setSelectedDate] = useAtom(datePickerAtom);
  const gotoRecord = useNavigateToRecord();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDateChange = (d) => {
    gotoRecord(d['$d']);
  };
  
  return (
    <>
      <Button
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
      >
        {children}
      </Button>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
          {' '}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label='날짜 선택'
              value={dayjs(selectedDate)}
              onChange={handleDateChange}
              views={['year', 'month', 'day']}
              format='YYYY/MM/DD'
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
        </MenuItem>
      </Menu>
    </>
  );
}

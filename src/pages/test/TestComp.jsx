import * as React from 'react';
import { useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

function MyComponent () {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='날짜 선택'
        value={selectedDate}
        onChange={handleDateChange}
        views={['year', 'month']}
        format='YYYY/MM'
        renderInput={(props) => <TextField {...props} />}
      
      />
    </LocalizationProvider>
  );
}

export default MyComponent;

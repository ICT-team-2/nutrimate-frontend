import * as React from 'react';
import { useState } from 'react';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { PickersToolbar, PickersToolbarButton } from '@mui/x-date-pickers/internals';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material';

dayjs.locale('ko');

function CustomToolbar({ date, isLandscape, openView, setOpenView, views }) {
  const year = dayjs(date).format('YYYY년');
  const month = dayjs(date).format('M월');

  return (
    <PickersToolbar isLandscape={isLandscape} className="" toolbarTitle={year}>
      <PickersToolbarButton
        variant="subtitle1"
        onClick={() => setOpenView('year')}
        selected={openView === 'year'}
        label={year}
        value={year} />
      <PickersToolbarButton
        variant="h4"
        onClick={() => setOpenView('month')}
        selected={openView === 'month'}
        label={month}
        value={month} />
    </PickersToolbar>
  );
}

function MyComponent() {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="날짜 선택"
        value={selectedDate}
        onChange={handleDateChange}
        views={['year', 'month']}
        format="YYYY년 M월"
        renderInput={(props) => <TextField {...props} />}
        slots={{
          Toolbar: {
            component: CustomToolbar,
            props: { value: selectedDate },
          },
        }}
      />
    </LocalizationProvider>
  );
}

export default MyComponent;

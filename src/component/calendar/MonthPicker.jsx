import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'; // 한국어 로케일 import

dayjs.locale('ko'); // 한국어 로케일 설정


export default function MonthPicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  // const [anchorEl, setAnchorEl] = useState(null);

  const handleDateChange = (date) => {
    const dDate = new Date(date);
    if (dDate.getFullYear() >= 1900 && dDate.getFullYear() < 2200) {
      setSelectedDate(date);
      // console.log(date, typeof date === typeof new Date()); // 선택된 날짜를 콘솔에 출력
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['year', 'month']}
        value={selectedDate}
        onChange={handleDateChange}
        format="YYYY년 MM월"
        // anchorEl={anchorEl}
      />
    </LocalizationProvider>
  );
}

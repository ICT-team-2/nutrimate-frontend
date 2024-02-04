import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { useAtom } from 'jotai/react';
import { surveyDataAtom } from '@src/component/survey/atom.js';

export default function SurveyBirthPicker() {
  const [surveyData, setSurveyData] = useAtom(surveyDataAtom);

  const handleDateChange = (d) => {
    setSurveyData({
      ...surveyData,
      userBirth: d['$d'],
    });
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    >
      <DatePicker
        label="날짜 선택"
        value={dayjs(surveyData.userBirth)}
        onChange={handleDateChange}
        views={['year', 'month', 'day']}
        format="YYYY/MM/DD"
        slotProps={{ textField: { variant: 'standard' } }}
      />
    </LocalizationProvider>


  );
}

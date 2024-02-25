import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom, useSetAtom } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { LINKS } from '@src/utils/const.js';
import dayjs from 'dayjs';

const useNavigateToRecord = () => {
  const navigate = useNavigate();
  const setSelectedDate = useSetAtom(datePickerAtom);

  return (date = new Date()) => {
    setSelectedDate(date);
    navigate(
      LINKS.RECORD_WRITE + '/' +
      dayjs(date).format('YYYYMMDD'));
  };
};

export default useNavigateToRecord;

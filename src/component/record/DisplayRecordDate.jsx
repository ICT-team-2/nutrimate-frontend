import moment from 'moment';

import MonthPicker from '@src/component/calendar/MonthPicker.jsx';
import { useAtom } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import RecordDatePicker from '@src/component/record/RecordDatePicker.jsx';
import { useEffect } from 'react';

function DisplayRecordDate (props) {
  
  const [selectedDate, setSelectedDate] = useAtom(datePickerAtom);
  
  const label = () => {
    const date = moment(selectedDate);
    return <span>{date.format('YYYY년 MM월 DD일')}</span>;
  };
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  
  return (
    <div>
      <RecordDatePicker
        date={selectedDate}
      >{label()}</RecordDatePicker>
    </div>
  );
}

export default DisplayRecordDate;
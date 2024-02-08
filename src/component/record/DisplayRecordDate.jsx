import moment from 'moment';

import MonthPicker from '@src/component/calendar/MonthPicker.jsx';
import { useAtom } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';

function DisplayRecordDate(props) {
  const { date } = props;
  const [selectedDate, setSelectedDate] = useAtom(datePickerAtom);

  const label = () => {
    const date = moment(selectedDate);
    return <span>{date.format('YYYY년 MM월 DD일')}</span>;
  };
  return (
    <div>
      <MonthPicker
        date={selectedDate}
      >{label()}</MonthPicker>
    </div>
  );
}

export default DisplayRecordDate;
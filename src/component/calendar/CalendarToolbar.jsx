import moment from 'moment';
import { Button } from '@mui/material';


function CalendarToolbar(props) {
  // Toolbar 컴포넌트를 커스텀하는 로직을 여기에 작성하세요.
  // 예를 들어, 다음과 같이 날짜를 표시하는 부분을 커스텀할 수 있습니다.
  const goToBack = () => {
    props.date.setMonth(props.date.getMonth() - 1);
    props.onNavigate('prev');
  };

  const goToNext = () => {
    props.date.setMonth(props.date.getMonth() + 1);
    props.onNavigate('next');
  };

  const goToCurrent = () => {
    const now = new Date();
    props.date.setMonth(now.getMonth());
    props.date.setYear(now.getFullYear());
    props.onNavigate('current');
  };

  const label = () => {
    const date = moment(props.date);
    return <span>{date.format('YYYY년 MM월')}</span>;
  };

  return (
    <div>
      <Button onClick={goToBack}>&#8249;</Button>
      <Button onClick={goToCurrent}>Today</Button>
      <Button onClick={goToNext}>&#8250;</Button>
      <label>{label()}</label>
    </div>
  );
}

export default CalendarToolbar;
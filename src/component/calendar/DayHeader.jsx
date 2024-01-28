import moment from 'moment';

const DayHeader = ({ date, label }) => {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayIndex = moment(date).day();
  const labelInKorean = dayNames[dayIndex];
  return <span>{labelInKorean}</span>;
};

export default DayHeader;
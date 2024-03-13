import moment from 'moment';
import DateRange from '@mui/icons-material/DateRange'; 
import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const SelectBox = styled.div`
  display: inline-block; /* 한 줄에 배치되도록 함 */
  transition: transform 0.3s ease; /* transform 속성에만 애니메이션 적용 */

  svg {
    transform: ${({ open }) => (open ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease; /* 회전 애니메이션 효과 적용 */
  }
`;

const CalendarToolbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const DateRangeContainer = styled.div`
  display: flex;
  alignItems: center;
`;

const CalendarToolbar = (props) =>  {
  const { startOfWeek, endOfWeek,isOpen} = props;

  
  const label = () => {
    const date = moment(props.date);
    return <span> {startOfWeek.format('YYYY-MM-DD')} ~ {endOfWeek.format('YYYY-MM-DD')}</span>;
  };

  
  return (
   <CalendarToolbarContainer>
      <DateRangeContainer>
        <DateRange style={{ marginRight: '10px' }} />
        {label()}
      </DateRangeContainer>
      <SelectBox open={isOpen}>
        <KeyboardArrowUpIcon/>
      </SelectBox>
    </CalendarToolbarContainer>
  );
}

export default CalendarToolbar;
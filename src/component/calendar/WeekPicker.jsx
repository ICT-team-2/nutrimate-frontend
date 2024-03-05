import React, { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import WeekToolbar from '@src/component/calendar/CalendarWeeKToolbar.jsx'; 
import style from 'styled-components';

dayjs.extend(isBetweenPlugin);


const AnimatedContainer = style.div`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;



const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary[theme.palette.mode],
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary[theme.palette.mode],
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};



function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export default function WeekPicker({onChangeWeek}) {

    
  const [hoveredDay, setHoveredDay] = React.useState(null);
  const [value, setValue] = React.useState(dayjs(new Date()));

  const startOfWeek = value.startOf('week');
  const endOfWeek = value.endOf('week');
  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => {
    setIsOpen(!isOpen);
    
  };
  useEffect(() => {
     onChangeWeek(value.startOf('week'), value.endOf('week'));
   }, []);



  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
    <div onClick={toggleCalendar} style={{ borderBottom:'2px solid #e5e5e5' }}>
    <WeekToolbar startOfWeek={startOfWeek} endOfWeek={endOfWeek} isOpen={isOpen}/>
    </div>
     <AnimatedContainer isOpen={isOpen}>
     <div style={{ backgroundColor: '#f8fbfa', border:'2px solid #e5e5e5' }}>
      <DateCalendar
        value={value}
        onChange={(newValue) => {
            setValue(newValue);
            onChangeWeek(newValue.startOf('week'), newValue.endOf('week'));
        }}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
        }}
      />
      </div>
      </AnimatedContainer>
    </LocalizationProvider>
  );
}

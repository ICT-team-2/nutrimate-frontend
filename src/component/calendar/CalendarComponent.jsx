import React,{ useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled, { createGlobalStyle } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import CalendarToolbar from '@src/component/calendar/CalendarToolbar.jsx';
import ListTable from '@src/component/calendar/ListTable.jsx';
import DayHeader from '@src/component/calendar/DayHeader.jsx';
import { Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'; 
import ListAltIcon from '@mui/icons-material/ListAlt'; 
const CALENDAR_BOARDER_RADIUS = '10px';

moment.locale('ko');
const localizer = momentLocalizer(moment);

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Pretendard, AppleSDGothicNeo, 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }
`;

const StyledCalendar = styled(Calendar)`
    &.rbc-calendar {
        width: 100%;
        height: 80%;
        background-color: white;
        padding: 20px;
        border-radius: ${CALENDAR_BOARDER_RADIUS};
        border-color: ${(theme) => theme.theme['border-color-light']};
    }

    & .rbc-header {
        font-size: 0.8rem;
        font-weight: 500;
        padding: 16px 20px;
        background-color: ${(theme) => theme.theme['main-background']};
        border-color: ${(theme) => theme.theme['border-color-light']};
        cursor: default;
    }

    & .rbc-month-view {
        border-radius: ${CALENDAR_BOARDER_RADIUS};
        border-color: ${(theme) => theme.theme['border-color-light']};

    }


    & .rbc-month-row {
        border-color: ${(theme) => theme.theme['border-color-light']};

    }

    & .rbc-day-bg {
        cursor: pointer;
        border-color: ${(theme) => theme.theme['border-color-light']};
    }

    & .rbc-date-cell,
    & .rbc-row {
        cursor: pointer;
    }

    & .rbc-today {
        background-color: ${(theme) => theme.theme['menu-active-bg']};
        border-top: 2px solid ${(theme) => theme.theme['menu-active']};
    }


    & .rbc-event {
        background-color: ${(theme) => theme.theme['primary-color']};
    }

`;

const CalendarContainer = muiStyled(Container)`
    width: 60%;
    height: 90vh;
    min-width: 800px;
    min-height: 700px;
    
    &.MuiContainer-root {
      max-width: 70vw;
    }
`;

const events = [
  {
    start: moment().toDate(),
    title: 'My event',
  },
];

const CalendarComponent = (props) => {

  const [isClickCalendar, setIsClickCalendar] = useState(true);
  const [isClickList, setIsClickList] = useState(false);

  const data = [
    {
      'date': 'January 3, 2033',
      'week': 'Tuesday',
      'time': '11:00am',
      'work': 'Meeting'
    },
    {
      'date': 'January 3, 2033',
      'week': 'Tuesday',
      'time': '11:00am',
      'work': 'Study'
    },
    {
      'date': 'January 3, 2033',
      'week': 'Tuesday',
      'time': '11:00am',
      'work': 'Work'
    },
    {
      'date': 'January 12, 2033',
      'week': 'Monday',
      'time': '11:00am',
      'work': 'Study'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    },
    {
      'date': 'January 8, 2033',
      'week': 'Sunday',
      'time': '11:00am',
      'work': 'work'
    }
    
  ];

  const callendar = () => {
    setIsClickCalendar(true)
    setIsClickList(false)
  };

  const list = () => {
    setIsClickCalendar(false)
    setIsClickList(true)
  };
  
  
  
  return (
    <CalendarContainer>
      <GlobalStyle />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button style={{ padding: '8px',boxShadow: isClickCalendar ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',backgroundColor: isClickCalendar ? '#007500' : ''}} onClick={callendar}>
          <CalendarMonthIcon style={{ fontSize: '32px', color: isClickCalendar ? 'white' : ''} }  />
      </Button>
      <Button onClick={list} style={{ padding: '8px',boxShadow: isClickList ? '0px 4px 8px rgba(0, 0, 0, 0.2)' : 'none',backgroundColor: isClickList ? '#007500' : '' }}  >
        <ListAltIcon style={{ fontSize: '32px', color: isClickList  ? 'white' : '' }} />
      </Button>
      </div>
      {isClickCalendar &&
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='start'
        views={['month']}
        //이벤트 클릭 이벤트
        onSelectEvent={event => {
          // console.log(event);
          alert(`Event '${event.title}' was selected`);
        }}
        selectable
        //날짜 칸 클릭 이벤트
        onSelectSlot={(slotInfo) => {
          alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`);
        }}
        components={{
          //툴바 오버라이딩
          toolbar: CalendarToolbar,
          //요일을 한글로 변경하기 위한 오버라이딩
          header: DayHeader,
        }}
        onDrillDown={(date, view, e) => {
          
          alert(`Drilled down on ${date.toLocaleString()}`);
        }}
      />
      }

       {isClickList && 
          <ListTable data = {data}></ListTable>}


    </CalendarContainer>
    
  );
};

export default CalendarComponent;

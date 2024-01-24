import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled, { createGlobalStyle } from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import CalendarToolbar from '@src/component/calendar/CalendarToolbar.jsx';
import DayHeader from '@src/component/calendar/DayHeader.jsx';

const CALENDAR_BOARDER_RADIUS = '10px';

moment.locale('ko');
const localizer = momentLocalizer(moment);

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'JetBrains Mono', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }
`;

const StyledCalendar = styled(Calendar)`
    &.rbc-calendar {
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

    & .rbc-off-range-bg {
        cursor: default;
    }

`;

const CalendarContainer = muiStyled(Container)`
    width: 60%;
    height: 100vh;
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

  return (
    <CalendarContainer>
      <GlobalStyle />
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="start"
        views={['month']}
        //이벤트 클릭 이벤트
        onSelectEvent={event => {
          // console.log(event);
          alert(`Event '${event.title}' was selected`);
        }}
        selectable
        //날짜 칸 클릭 이벤트
        onSelectSlot={(slotInfo) => {
          // console.log(slotInfo);
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
        onDrillDown={(date, view) => {
          alert(`Drilled down on ${date.toLocaleString()}`);
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;

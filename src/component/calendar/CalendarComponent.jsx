import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import 'moment/locale/ko';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'JetBrains Mono', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }
`;

const StyledCalendar = styled(Calendar)`

`;


moment.locale('ko');
const localizer = momentLocalizer(moment);

const CalendarContainer = muiStyled(Container)`
    width: 80%;
    height: 82vh;
    
`;

const events = [
  {
    start: moment().toDate(),
    end: moment().toDate(),
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
        endAccessor="end"
        views={['month']}
        onSelectEvent={event => {
          console.log(event);
          alert(`Event '${event.title}' was selected`);
        }}
        selectable
        onSelectSlot={slotInfo => {
          console.log(slotInfo);
          alert(`selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`);
        }}
      />
    </CalendarContainer>
  );
};

export default CalendarComponent;

import React,{ useState,useEffect } from 'react';
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
import CircleIcon from '@mui/icons-material/Circle';
const CALENDAR_BOARDER_RADIUS = '10px';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';


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

    & .rbc-show-more{
      color: #0f4a15;
    }


    & .rbc-event {
      background-color: transparent;
      font-size:10px;
      color: #0f4a15;
        
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

const CalendarComponent = (props) => {
  console.log(props)
  const [isClickCalendar, setIsClickCalendar] = useState(true);
  const [isClickList, setIsClickList] = useState(false);
  const [monthData, setMonthData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState(null);
  const [calendarUpdate, setCalendarUpdate] = useState(0);
  const [userId, setUserId] = useAtom(userIdAtom);

  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };



  const callendar = () => {
    //setDate(new Date());
    console.log('asdasd',date)
    setIsClickCalendar(true)
    setIsClickList(false)
    setCalendarUpdate(prev => prev + 1);
  };
  const list = () => {
    setIsClickCalendar(false)
    setIsClickList(true)
    
  };
  
  const onhandleMonthSelect = (dates)=>{
    setDate(dates);
  }


  /*
  if(transformedData.length !==0){
    console.log('sdfsdfdf');
    setMonthData(transformedData);
  }
  */
      useEffect(()=>{
        const transformedData = [];
        console.log(userId)
        axios.get(`http://localhost:9999/alarm/list/month?month=${date}&userId=${userId}`)
              .then(response => {
                  console.log(response.data);
              if(response.data.length !==0){
                  for (const data in response.data) {
                    const transformedItem = {};
                    for (const key in response.data[data]) {
                        const newKey = key === 'alarmCategory' ? 'title' : key === 'alarmTime' ? 'start' : key;
                        transformedItem[newKey] = key === 'alarmCategory'? (<>{<CircleIcon style={{ color: '#0f4a15',fontSize:'8px',margin:'0 2px'}}/>} {response.data[data][key]} </>) :response.data[data][key];
                        transformedItem['end']=''
                      }
                    transformedData.push(transformedItem);
                }

                setMonthData(transformedData);
              }
  
                  
              })
              .catch(error => {
                  console.error('Error fetching chat data:', error);
              });
      },[date])





   


  
  return (
    <>
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
        events={monthData}
        startAccessor='start'
        endAccessor='start'
        views={['month']}
        onhandleMonthSelect={onhandleMonthSelect}
        selectable
        //날짜 칸 클릭 이벤트
        onSelectSlot={(slotInfo) => {
          const filteredData=[]
          console.log(slotInfo.start)
          monthData.forEach(data =>{
            if (dayjs(data.start).format('YYYY-MM-DD') == dayjs(slotInfo.start).format('YYYY-MM-DD')) {
              filteredData.push(data)
            }
          } );


          setAnchorEl({
            top: slotInfo.box.y, // Y 좌표 설정
            left: slotInfo.box.x, // X 좌표 설정
            item: filteredData,
            day:slotInfo.start
          });
        }}
        components={{
          //툴바 오버라이딩
          toolbar: (toolbar) => {
            return (
              <CalendarToolbar
                {...toolbar}
                calendarUpdate={calendarUpdate}
                customCallback={(arg) => {
                  onhandleMonthSelect(arg);
                  
                }}
              />
            );
          },
          //요일을 한글로 변경하기 위한 오버라이딩
          header: DayHeader,
        }}
      />
      }

       {isClickList && 
      <ListTable userId={userId}></ListTable>}
      
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: anchorEl?.top || 0, left: anchorEl?.left || 0}}
          style={{height:'300px'}}

        >
          <MenuItem style={{backgroundColor : '#0f4a15', color:'white'}}>{dayjs(anchorEl?.day).format('YYYY-MM-DD')}</MenuItem>
          {anchorEl?.item.map((item, index) => (
          <MenuItem style={{fontSize:'15px'}} key={index}>  <span style={{ marginRight: '10px',fontSize: '12px', fontWeight: 'bold' }}>{item.title}</span><span style={{ fontSize: '10px' }}>{dayjs(item.start).format('A hh시 mm분 ')}</span></MenuItem>
        ))}
     </Menu>

    </CalendarContainer>
    </>
    
  );
};

export default CalendarComponent;

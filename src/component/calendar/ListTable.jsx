import React, { useEffect,useState,useRef } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import Add from '@mui/icons-material/Add'; 
import AlarmModal from '@src/component/calendar/AlarmModal.jsx';
import WeekPicker from '@src/component/calendar/WeekPicker.jsx';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import { color } from '@mui/system';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';


dayjs.locale('ko');


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  position: 'relative', 
  '&:hover': {
    backgroundColor: 'lightgray', // 또는 원하는 회색의 배경색을 지
    '& .deleteButton': {
      opacity: 1,
    },
  },
}));

const DeleteButton = styled(DeleteIcon)`
opacity: 0;
transition: opacity 0.3s ease-in-out; /* 0.3초 동안 서서히 변화 */
  position: absolute;
  font-size: 30px;
  right: 5px;
  top:10px; 

`;

const CircleButton = styled(Button)`
  &&& {
    border-radius: 50%;
    aspect-ratio: 1/1;
    padding: 20px;
    min-width: 50px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    transition: bottom 0.3s ease-in-out; /* Add transition for smooth movement */
    &:hover {
      transform: rotate(50deg);
      transition: transform 0.3s ease-in-out;
    }
    &:not(:hover) {
      ${({ isModalOpen }) => !isModalOpen && `
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
      `}




  }
`;



const StyledTableHead = styled(TableHead)`
    background-color: ${({ theme }) => theme['main-background']};
    
`;



const ListTable = () => {
  const currentDate = dayjs();
  

  const [groupedData, setGroupedData] = useState({});
  const tableContainerRef = useRef(null);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const startOfWeekFirst = value.startOf('week');
  const endOfWeekSecond = value.endOf('week');
  const [startWeek, setStartWeek] = useState(startOfWeekFirst);
  const [endWeek, setEndWeek] = useState(endOfWeekSecond);
  const [calendarData, setCalendarData] = useState([]);
  const [buttonPosition, setButtonPosition] = useState('20px');

  const handleChangeWeek = (startOfWeek, endOfWeek) => {
    setStartWeek(startOfWeek)
    setEndWeek(endOfWeek)
    axios.get(`http://localhost:9999/alarm/list/week?startWeek=${startOfWeek.format('YYYY-MM-DD')}&endWeek=${endOfWeek.format('YYYY-MM-DD')}`)
    .then(datas => {
      console.log(datas.data)
      setCalendarData(datas.data)
    })
    .catch(error => {
      alert('알람을 읽어오는 데 실패했습니다.')
    });
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const weekdays = (date) => {
    const dayOfWeek = (new Date(date)).getDay();
    const weekdaysList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return weekdaysList[dayOfWeek];
  };
  
  const deleteAlarm = (alarmId) => {
      if(confirm('알람을 삭제하시겠습니까?')){
        axios.delete(`http://localhost:9999/alarm/list/week/delete?alarmId=${alarmId}`)
        .then(datas => {
          if(datas.data.alarmOk===1){
            let updatedData = { ...calendarData };
            let updatedData_ = [];
        
            // updatedData가 객체이므로, 이 객체의 프로퍼티들에 접근하여 처리해야 합니다.
            for (const key in updatedData) {
                if (Array.isArray(updatedData[key])) {
                    console.log('111',updatedData[key])
                    updatedData_[key] = updatedData[key].filter(item => item.alarmId !== alarmId );
                }
            }
        
            console.log('sfdfsdf', updatedData_);
        
            // 변경된 상태를 적용
            setCalendarData(updatedData_);
          }
          
        })
        .catch(error => {
          alert('알람을 읽어오는 데 실패했습니다.')
        });
             
      }
  };

  useEffect(() => {
  
     
  }, [])

  useEffect(() => {
    const updatedGroupedData = {};
  
    calendarData.forEach(d => {
      const date = dayjs(d.alarmTime).format('YYYY-MM-DD')
      if (!updatedGroupedData[date]) {
        updatedGroupedData[date] = [];
      }
      updatedGroupedData[date].push(d);
    });
  
    setGroupedData(updatedGroupedData);

  }, [calendarData]);

  useEffect(() => {
    console.log(groupedData);
  }, [groupedData]);


  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = tableContainerRef.current;
      if (tableContainer) {
        const isScrolledToBottom = tableContainer.scrollHeight - tableContainer.scrollTop === tableContainer.clientHeight;
        const newPosition = isScrolledToBottom ? '-20px' : `calc(-20px + ${tableContainer.scrollHeight - tableContainer.scrollTop - tableContainer.clientHeight}px)`;
        setButtonPosition(newPosition);
      }
    };

    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  return (
    <TableContainer ref={tableContainerRef} component={Paper} style={{ width: '100%', height: '80%', position: 'relative', overflow: 'auto'}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <WeekPicker onChangeWeek={handleChangeWeek}></WeekPicker>
        </LocalizationProvider>
    {Object.keys(groupedData).map((date, index) => (
      <Table key={index} sx={{ minWidth: 650}} aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>{date}</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{weekdays(date)}</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {groupedData[date].map((item, itemIndex) => ( 
            <StyledTableRow key={itemIndex}>
              <TableCell>{dayjs(item.alarmTime).format('HH:mm')}</TableCell>
              <TableCell>{item.alarmCategory}</TableCell>
              <TableCell><DeleteButton className="deleteButton" onClick={() => deleteAlarm(item.alarmId,date)} /></TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    ))}
      <CircleButton
       style={{ bottom: buttonPosition }}
        variant='contained'
        onClick={openModal}
      ><Add/></CircleButton>
      {isModalOpen && <AlarmModal showChallengeModal={isModalOpen} setChallengeModal={setIsModalOpen} ></AlarmModal>}
  </TableContainer>
  );
};

export default ListTable;

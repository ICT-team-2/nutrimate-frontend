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
    border-radius:  50% 0 0 50%;
    aspect-ratio: 1/1;
    padding: 20px;    
    margin-top: 15px;
    min-width: 50px;
    right:0px;
    transition: bottom 0.3s ease-in-out; /* Add transition for smooth movement */
    &:hover {
      svg {
        transform: rotate(50deg); /* 마우스를 올렸을 때 svg 회전 */
        transition: transform 0.3s ease-in-out; /* 부드러운 회전을 위한 전환 추가 */
      }
    }

    &:not(:hover) {
      ${({ isModalOpen }) =>
        !isModalOpen &&
        `
      transform: rotate(0deg);
      transition: transform 0.3s ease-in-out;
      `}
    }

  }
`;


const StyledTableHead = styled(TableHead)`
    background-color: ${({ theme }) => theme['main-background']};
    
`;



const ListTable = ({userId}) => {
  const currentDate = dayjs();
  

  const [groupedData, setGroupedData] = useState({});
  const tableContainerRef = useRef(null);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const startOfWeekFirst = value.startOf('week');
  const endOfWeekSecond = value.endOf('week');
  const [startWeek, setStartWeek] = useState(startOfWeekFirst);
  const [endWeek, setEndWeek] = useState(endOfWeekSecond);
  const [calendarData, setCalendarData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChangeWeek = (startOfWeek, endOfWeek) => {
    console.log(startOfWeek)
    setStartWeek(startOfWeek)
    setEndWeek(endOfWeek)
    axios.get(`http://localhost:9999/alarm/list/week?startWeek=${startOfWeek.format('YYYY-MM-DD')}&endWeek=${endOfWeek.format('YYYY-MM-DD')}&userId=${userId}`)
    .then(datas => {
      setCalendarData(datas.data)
    })
    .catch(error => {
      alert('알람을 읽어오는 데 실패했습니다.')
    });
  };


  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const weekdays = (date) => {
    const dayOfWeek = (new Date(date)).getDay();
    const weekdaysList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return weekdaysList[dayOfWeek];
  };
  
  const deleteAlarm = (alarmId,date) => {
    
      if(confirm('알람을 삭제하시겠습니까?')){
        axios.delete(`http://localhost:9999/alarm/list/week/delete?alarmId=${alarmId}`)
        .then(datas => {
          if(datas.data.alarmOk===1){
            let updatedData = { ...calendarData };
            console.log(updatedData);
            updatedData = Object.values(updatedData).filter(item => item.alarmId !== alarmId);
            console.log(updatedData);
        
            // 변경된 상태를 적용
            setCalendarData(updatedData);
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




  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
    <CircleButton      
    variant='contained'
    onClick={openModal}
  ><Add/></CircleButton>
  <>
    <TableContainer ref={tableContainerRef} component={Paper} style={{ width: '100%', height: '580px', position: 'relative', overflow: 'auto'}}>
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

      {isModalOpen && <AlarmModal userId={userId} showChallengeModal={isModalOpen} setChallengeModal={setIsModalOpen} handleChangeWeek={handleChangeWeek} startWeek={startWeek} endWeek={endWeek}  ></AlarmModal>}

    </TableContainer>
    </>
    </div>
  );
};

export default ListTable;

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



dayjs.locale('ko');


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'lightgray', // 또는 원하는 회색의 배경색을 지정
  },
}));

const CircleButton = styled(Button)`
    &&& {
        border-radius: 50%;
        aspect-ratio: 1/1;
        padding: 20px;
        min-width: 50px;
        position: absolute;
        bottom: 20px;
        right: 20px;
        
    }
`;



const StyledTableHead = styled(TableHead)`
    background-color: ${({ theme }) => theme['main-background']};
`;



const ListTable = ({ data }) => {
  const currentDate = dayjs();
  

  const [groupedData, setGroupedData] = useState({});
  const tableContainerRef = useRef(null);
  const [value, setValue] = React.useState(dayjs(new Date()));
  const startOfWeekFirst = value.startOf('week');
  const endOfWeekSecond = value.endOf('week');
  const [startWeek, setStartWeek] = useState(startOfWeekFirst);
  const [endWeek, setEndWeek] = useState(endOfWeekSecond);

  const handleChangeWeek = (startOfWeek, endOfWeek) => {
    setStartWeek(startOfWeek)
    setEndWeek(endOfWeek)
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
      console.log(startWeek)
      console.log(endWeek)
     
  }, [startWeek,endWeek])

  useEffect(() => {
    const updatedGroupedData = {};
  
    data.forEach(d => {
      if (!updatedGroupedData[d.date]) {
        updatedGroupedData[d.date] = [];
      }
      updatedGroupedData[d.date].push(d);
    });
  
    setGroupedData(updatedGroupedData);

  }, [data]);

  useEffect(() => {
    console.log(groupedData);
  }, [groupedData]);


  useEffect(() => {
    const handleScroll = () => {
      const tableContainer = tableContainerRef.current;
      const button = tableContainer.querySelector('.circle-button');
      if (button) {
        const isScrolledToBottom = tableContainer.scrollHeight - tableContainer.scrollTop === tableContainer.clientHeight;
        button.style.bottom = isScrolledToBottom ? '20px' : 'calc(20px + ' + (tableContainer.scrollHeight - tableContainer.scrollTop - tableContainer.clientHeight) + 'px)';
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
      <Table key={index} sx={{ minWidth: 650 }} aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>{date}</TableCell>
            <TableCell align="right">{groupedData[date][0].week}</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {groupedData[date].map((item, itemIndex) => ( 
            <StyledTableRow key={itemIndex}>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.work}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    ))}
      <CircleButton
        variant='contained'
        onClick={openModal}
      ><Add/></CircleButton>
      {isModalOpen && <AlarmModal showChallengeModal={isModalOpen} setChallengeModal={setIsModalOpen} ></AlarmModal>}
  </TableContainer>
  );
};

export default ListTable;

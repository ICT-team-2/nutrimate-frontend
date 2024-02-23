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
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
];

const StyledTableHead = styled(TableHead)`
    background-color: ${({ theme }) => theme['main-background']};
`;



const ListTable = ({ data }) => {
  console.log(data);
  const [groupedData, setGroupedData] = useState({});
  const tableContainerRef = useRef(null);

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
        onClick={() => {
        }}
      ><Add/></CircleButton>
  </TableContainer>
  );
};

export default ListTable;

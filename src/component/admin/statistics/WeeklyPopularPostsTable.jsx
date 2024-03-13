import React, { useState, useEffect } from 'react';
import StatisticsCard from '@src/component/admin/statistics/StatisticsCard.jsx';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },

}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Eclair', 262, 16.0),
  createData('Cupcake', 305, 3.7),
  createData('Gingerbread', 356, 16.0),
];

function CustomizedTables() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/statistic/list/best`)
      .then(response => setBoard(response.data))
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);

  return (
    <TableContainer component={Paper} sx={{ height: 'fit-content' }}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">순위</StyledTableCell>
            <StyledTableCell>닉네임</StyledTableCell>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell align="right">카테고리</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {board.map((row, index) => (
            <StyledTableRow key={row.boardId}>
              <StyledTableCell component="th" scope="row">
                {index + 1}
              </StyledTableCell>
              <StyledTableCell>{row.usernick}</StyledTableCell>
              <StyledTableCell>{row.boardtitle === null ? row.boardContent : row.boardtitle}</StyledTableCell>
              <StyledTableCell align="right">
                {row.boardcategory === 'FEED' ? '피드' : row.boardcategory === 'exercise' ? '운동 게시판' : '음식 게시판'}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const WeeklyPopularPostsTable = () => {
  return (
    <StatisticsCard title="주간 인기 게시글">
      <CustomizedTables />
    </StatisticsCard>
  );
};

export default WeeklyPopularPostsTable;

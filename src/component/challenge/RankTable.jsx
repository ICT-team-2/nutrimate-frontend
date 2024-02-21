import React, { useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import styled from 'styled-components';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

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


const RankTable = ({ data }) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <StyledTableHead>
          <TableRow>
            <TableCell>순위</TableCell>
            <TableCell>아이디</TableCell>
            <TableCell align="right">성공 횟수</TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data && data.map((d, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell>{d.challengeNick}</TableCell>
              <TableCell
                align="right">{d.count}</TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankTable;

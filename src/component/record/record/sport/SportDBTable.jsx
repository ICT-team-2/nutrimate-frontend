import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

const StyledTableRow = muiStyled(TableRow)(({ theme }) => ({
  [`&:hover`]: {
    backgroundColor: theme.palette.action.hover,
  },
}));

const NoData = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SportDBTable = ({ data, onClickRow }) => {

  if (data?.length === 0) return <NoData>데이터가 없습니다.</NoData>;

  return (

    <TableContainer component={Paper}>
      <Table
        aria-label="simple table">
        <TableBody>
          {data && data.map((row, index) => (
            <StyledTableRow
              key={row.foodId}
              onClick={() => {
                onClickRow(index);
              }}>
              <TableCell component="th" scope="row">
                {row.sportName}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );
};

export default SportDBTable;

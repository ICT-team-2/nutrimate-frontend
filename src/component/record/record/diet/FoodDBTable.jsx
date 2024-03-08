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
import DietRecordWithDBModal from '@src/component/record/record/diet/DietRecordWithDBModal.jsx';

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
const FoodDBTable = ({ data }) => {

  const [modalDataIndex, setModalDataIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  if (data?.length === 0) return <NoData>데이터가 없습니다.</NoData>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table
          aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>음식 이름</TableCell>
              <TableCell align="right">1회 섭취량</TableCell>
              <TableCell align="right">칼로리</TableCell>
              <TableCell align="right">탄수화물</TableCell>
              <TableCell align="right">단백질</TableCell>
              <TableCell align="right">지방</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row, index) => (
              <StyledTableRow
                key={row.foodId}
                onClick={() => {
                  setModalDataIndex(index);
                  setModalOpen(true);
                }}>
                <TableCell component="th" scope="row">
                  {row.foodName}
                </TableCell>
                <TableCell align="right">{row.foodIntake}{row.intakeUnit}</TableCell>
                <TableCell align="right">{row.foodCal}kcal</TableCell>
                <TableCell align="right">{row.foodCarbo}g</TableCell>
                <TableCell align="right">{row.foodProtein}g</TableCell>
                <TableCell align="right">{row.foodProvi}g</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DietRecordWithDBModal
        data={data[modalDataIndex]}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
};

export default FoodDBTable;

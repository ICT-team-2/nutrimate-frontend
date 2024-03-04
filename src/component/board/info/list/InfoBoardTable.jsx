import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LINKS } from '@src/utils/const.js';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTitleTableCell = styled(TableCell)`
    cursor: pointer;
`;

const StyledTableRow = styled(TableRow)(({ theme }) => ({

  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Gingerbread2', 356, 16.0, 49),
  createData('Gingerbread3', 356, 16.0, 49),
  createData('Gingerbread4', 356, 16.0, 49),
  createData('Gingerbread5', 356, 16.0, 49),
  createData('Gingerbread6', 356, 16.0, 49),
  createData('Gingerbread7', 356, 16.0, 49),
];

//정보 공유 게시판 글 목록 테이블
export default function InfoBoardTable({ data }) {

  if (data?.length === 0) {
    return <div>등록된 글이 없습니다.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell align="right">작성자</StyledTableCell>
            <StyledTableCell align="right">등록일</StyledTableCell>
            <StyledTableCell align="right">조회수</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((d, index) => (
            <StyledTableRow key={d.boardTitle + index}>
              <TitleTableCell component="th" scope="row">
                {d.boardTitle}
              </TitleTableCell>
              <StyledTableCell align="right">{d.userNick}</StyledTableCell>
              <StyledTableCell align="right">{d.createdDate}</StyledTableCell>
              <StyledTableCell align="right">{d.viewCount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const TitleTableCell = (props) => {
  const navigate = useNavigate();
  const { children: title } = props;
  return <StyledTitleTableCell onClick={() => {
    navigate(LINKS.INFO_BOARD_VIEW + '/506');
  }}>{title}</StyledTitleTableCell>;
};
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
import useUpdateViewCount from '@src/hooks/board/common/useUpdateViewCount.jsx';
import { useEffect } from 'react';

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
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  cursor: 'pointer',
}));


//정보 공유 게시판 글 목록 테이블
export default function InfoBoardTable({ data }) {

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  if (data?.length === 0) {
    return <div>등록된 글이 없습니다.</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>제목</StyledTableCell>
            <StyledTableCell align="center">작성자</StyledTableCell>
            <StyledTableCell align="center">등록일</StyledTableCell>
            <StyledTableCell align="center">조회수</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((d, index) => (
            <StyledTableRow key={d.boardTitle + index}>
              <DataTableCell
                data={d}
                component="th" scope="row">
                {d.boardTitle}
              </DataTableCell>
              <DataTableCell
                data={d} align="center">
                {d.userNick}
              </DataTableCell>
              <DataTableCell
                data={d} align="center">
                {d.createdDate}
              </DataTableCell>
              <DataTableCell
                data={d} align="center">
                {d.boardViewCount}
              </DataTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const DataTableCell = (props) => {
  const navigate = useNavigate();
  const updateViewCount = useUpdateViewCount();

  const { children: title, data } = props;
  return <StyledTableCell
    {...props}
    onClick={() => {
      console.log(data.boardId);
      if (data == null) return;
      updateViewCount.mutate(data.boardId);

      navigate(LINKS.INFO_BOARD_VIEW + `/${data.boardId}`, {
        state: {
          category: data.boardCategory.toUpperCase(),
        },
      });
    }}>
    {title}
  </StyledTableCell>;
};
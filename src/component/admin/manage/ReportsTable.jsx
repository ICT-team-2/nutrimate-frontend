import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function ReportsTable({ data,property,searchValue}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [reportData, setReportData] = React.useState([]);
  const [total, setTotal] = React.useState([]);
  const [updateData, setUpdateData] = React.useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  


  
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - total) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const updateBlockedStatus = (boardId) => {
    const userIndex = reportData.findIndex(user => (property=='board'? user.boardid : user.cmtid) === boardId);
    console.log(userIndex)
    if (userIndex !== -1) {
      const currentBlockedValue = reportData[userIndex].blocked;
      const newBlockedValue = currentBlockedValue === 'N' ? 'Y' : 'N';
      const updatedReportData = [...reportData];
      updatedReportData[userIndex] = {
        ...updatedReportData[userIndex],
        blocked: newBlockedValue
      };
      
      // Update the state with the new reportData
      setReportData(updatedReportData);
    }
  };


  useEffect(() => {
    let url='';
    if(property=='board'){
      url=`http://localhost:9999/block/list/board?nowPage=${page + 1}`  
     }else{
      url=`http://localhost:9999/block/list/comment?nowPage=${page + 1}`  
     }
     if (searchValue.length > 0) {
      url += `&searchUser=${searchValue}`;
     }

    axios.get(url)
      .then(response => {
        // Assuming response.data is the array of report data from the server
        setReportData(response.data);
        setTotal(response.data.totalPage)
      })
      .catch(error => {
        console.error('Error fetching report data:', error);
      });
  }, [page,searchValue]);

  const block =(id,block)=>{
     console.log(id)
     console.log(block)
     let url=''
     if(property=='board'){
          if(block=='N'){
              url=`http://localhost:9999/block/board?boardid=${id}`
          }else{
              url=`http://localhost:9999/block/cancel/board?boardid=${id}`
          }
        }else{
          if(block=='N'){
            console.log('댓글')
            url=`http://localhost:9999/block/comment?cmtid=${id}`
        }else{
            url=`http://localhost:9999/block/cancel/comment?cmtid=${id}`
         }
        }
     axios.put(url)
     .then(response => { 
         if(response.data.BLOCKOK !==null){
            updateBlockedStatus(id);
         }else{
            alert(response.data.BLOCKNOT);
         }
     })
     .catch(error => {
       console.error('Error fetching report data:', error);
     });
  }

  const blockReason =(id,e)=>{
    
    const { clientX, clientY } = e;
    console.log(clientX)
    let url=''
    if(property=='board'){
          url=`http://localhost:9999/block/reason/board?boardid=${id}`
       }else{
          url=`http://localhost:9999/block/reason/comment?cmtid=${id}`
       }
    axios.get(url)
    .then(response => { 
      console.log(response)
      setAnchorEl({
        top: clientY, // Y 좌표 설정
        left: clientX, // X 좌표 설정
        item: response.data,
      });
        
    })
    .catch(error => {
      console.error('Error fetching report data:', error);
    });
 }
 const blockDelete=(id)=>{
  console.log(id)
  let url=''
  if(property=='board'){
         url=`http://localhost:9999/block/list?boardid=${id}`
     }else{
         url=`http://localhost:9999/block/list/comment?cmtid=${id}`
     }
  axios.delete(url)
  .then(response => { 
      if(response.data.BLOCKOK !==null){
        console.log(reportData)
        setReportData(prev => prev.filter(item => (property === 'board' ? item.boardid : item.cmtid) !== id));
         console.log(reportData.length)
         if(reportData.length==1){
          setPage(prev=>prev !==0? prev-1 : prev)
         }


      }else{
         alert(response.data.BLOCKNOT);
      }
  })
  .catch(error => {
    console.error('Error fetching report data:', error);
  });
}

 



  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">{property=='board'?'제목':'댓글내용'}</StyledTableCell>
            <StyledTableCell align="right">글쓴이</StyledTableCell>
            {property=='board'? <StyledTableCell align="right">카테고리</StyledTableCell>:null}
           
            <StyledTableCell align="right">신고횟수</StyledTableCell>
            <StyledTableCell align="right">차단</StyledTableCell>
            <StyledTableCell align="right">신고내역삭제</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reportData.map((reportDataItem,index) => (
            <TableRow key={index}>
              <StyledTableCell component="th" scope="row">
              {reportDataItem.boardtitle !==null?reportDataItem.boardtitle:reportDataItem.boardContent !==null ? reportDataItem.boardContent :reportDataItem.cmtcontent}
              </StyledTableCell>
              <StyledTableCell align="right">{reportDataItem.usernick}</StyledTableCell>
              {property=='board'? <StyledTableCell align="right">{reportDataItem.boardcategory=='FOOD'?'음식 게시판': reportDataItem.boardcategory=='FEED'?'피드':'운동 게시판' }</StyledTableCell>:null}
             
              <StyledTableCell align="right"><Button style={{color:'grey'}} onClick={(e) => blockReason(reportDataItem.cmtid == null ? reportDataItem.boardid : reportDataItem.cmtid,e)} >{reportDataItem.count}</Button></StyledTableCell>
              <StyledTableCell align="right">  <Button 
                      style={{color:'grey'}} 
                      onClick={() => block(reportDataItem.cmtid == null ? reportDataItem.boardid : reportDataItem.cmtid,reportDataItem.blocked)}
                    >
                      {reportDataItem.blocked === 'N' ? '차단' : '차단취소'}
                    </Button></StyledTableCell>
            <StyledTableCell align="right"><Button style={{color:'grey'}} onClick={(e) => blockDelete(reportDataItem.cmtid == null ? reportDataItem.boardid : reportDataItem.cmtid,e)} ><DeleteIcon/></Button></StyledTableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={5} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination           
              rowsPerPageOptions={[5]}
              count={reportData[0]?.totalPage || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorReference="anchorPosition"
          anchorPosition={{ top: anchorEl?.top || 0, left: anchorEl?.left || 0}}
          style={{height:'300px'}}

        >
          <MenuItem style={{backgroundColor : 'grey', color:'white',width:'300px',textAlign: 'center'}}><span style={{ marginRight: '10px',fontSize: '12px',width:'50px'}}>닉네임</span> | <span style={{ marginRight: '10px',fontSize: '12px',width:'100px'}}>신고사유</span> | <span style={{ marginRight: '10px',fontSize: '12px',width:'50px'}}>신고날짜</span> </MenuItem>
          {anchorEl?.item.map((item, index) => (
          <MenuItem style={{fontSize:'15px',textAlign: 'center'}} key={index}>  <span style={{ marginRight: '10px',fontSize: '12px',width:'50px'}}>{item.usernick}</span>    <span style={{
            marginRight: '10px',
            fontSize: '12px',
            width: '100px',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            position: 'relative'
          }}
          onMouseEnter={e => e.currentTarget.title = e.currentTarget.textContent}
          >
            {item.reportreason}
          </span> <span style={{ marginRight: '10px',fontSize: '12px',width:'50px'}}>{item.createddate}</span></MenuItem>
        ))}
     </Menu>
    </TableContainer>
  );
}
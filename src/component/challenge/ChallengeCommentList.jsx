import React, { useState,useAtom } from 'react';
import { useEffect, useRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import style,{ keyframes } from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EditInput from '@src/component/challenge/ChallengeCommentInput.jsx';


const blinkEffect = keyframes`
  50% {
    opacity: 0;
  }
`;

const Blink = style.div`
  animation: ${blinkEffect} 0.5s step-end infinite;
  background-color: #edf8ea;
  height:60px;
`;

const StyledList = style(List)`
  overflow-y: auto;
  max-height: 400px; /* 최대 높이 설정 */
`;

const CommentInputTextField = muiStyled(TextField)`
  min-height: 40px;
  width: 95%;
`;

function ChallengeCommentList({ message, userId,cmtId }) {
  const len = 15;
  const listRef = useRef();
  const topRef = useRef();
  const [commentData,setCommentData] = useState ([]);
  const [nowPage,setNowPage] = useState (1);
  const [insertComment,setInsertComment] = useState (false);
  const [isFetching, setIsFetching] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [cmdId, setCmdId] = useState(null);
  const [updateComment, setUpdateComment] = useState(false);
  const [userNick, setUserNick] = useState('');


  const options = {
    threshold: 1.0,
  };

  const observerOptions = {
    threshold: 1.0,
  };


  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 맨 끝 요소가 보일 때 페이지를 증가시키고 데이터를 가져오는 작업을 수행
         setNowPage(prevPage => prevPage + 1);
         observer.observe(entry.target);
      }
    });
  };
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  useEffect(() => {
    console.log(nowPage)
    if(isFetching){
        if (nowPage !== 1) {
          axios.get(`http://localhost:9999/challenge/comment/list?nowPage=${nowPage}`, {
          }).then(data => {
            console.log(data.data)
            setCommentData(prevData => [...prevData, ...data.data]);
            if (data.data.length < 10) {
              setIsFetching(false); // 데이터 길이가 15보다 작으면 isFetching을 false로 설정
            }
          })
        }else{
          axios.get(`http://localhost:9999/challenge/comment/list?nowPage=${nowPage}`, {
          }).then(data => {
            console.log(data.data)
            setCommentData(data.data);
          });
        }
    }
  }, [nowPage]);




  useEffect(() => {
    const observeLastItem = () => {
      if (listRef.current) {
        const lastItem = listRef.current.lastElementChild;
        observer.observe(lastItem);
       
      }
    };
  
    observeLastItem();
  
    return () => {
      observer.disconnect();
    };
  }, [commentData]);
  
  useEffect(() => {

    if (listRef.current) { // listRef.current가 정의되었는지 확인
      topRef.current.scrollTo(0, 0); // 스크롤을 맨 위로 보냅니다.
    }
    const formattedDate = dayjs().format('YYYY-MM-DD');
    console.log(message)
    if(typeof message === 'string' && message.trim() !== ""){
            axios.get(`http://localhost:9999/challenge/usernick?userId=${userId}`).then(data => {
            console.log(cmdId)
            if(data.data.SUCCESSNOT){
              alert('닉네임 불러오기에 실패했습니다.')
            }else{
            setUserNick(data.data.USER_NICK)
            console.log('!@#$',cmtId)
            const newData = {
              'createdDate': formattedDate,
              'userNick': data.data.USER_NICK,
              'cmtContent': message,
              'userId': userId,
              'cmtId': cmtId
            };
            setInsertComment(true)
            setTimeout(() => {
              setInsertComment(false);
              setCommentData(prevData => [newData,...prevData]);
            }, 500);
            }
          })
          .catch(error => {
            alert('닉네임 불러오기에 실패했습니다.')
          });
        
  }
  }, [message]);

  const handleOpenMenu = (props) => {
    const {event,cmtId} = props
    console.log(cmtId)
    setCmdId(cmtId)
    setAnchorEl(event.currentTarget);
  };

  // Function to handle closing the menu
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setUpdateComment(true);
  };

  const handleDelete = () => {

    axios.put(`http://localhost:9999/challenge/comment/list/delete`,{
      'cmtId': cmdId,

      }).then(data => {
        if(data.data.SUCCESSNOT){
          alert('삭제를 실패했습니다.')
        }else{
          setCommentData(commentData.filter(comment => 
            comment.cmtId !== cmdId
          ));
        }
        handleCloseMenu(null)
      })
      .catch(error => {
        alert('삭제를 실패했습니다.')
        // Handle error here, for example, showing an alert or logging the error
      });
  };

  const onhandleEdit = (comments,) => {
    console.log('comment',comments)
    setCommentData(commentData.map(comment => 
      comment.cmtId === cmdId ? {...comment, cmtContent: comments, cmtId: comment.cmtId} : comment
    ));
    setUpdateComment(false);
    setCmdId('');
  };

  return (
    <>
    <StyledList ref={topRef} >
    {insertComment && <Blink></Blink>}
    {commentData.length === 0 ? (
      <Typography variant="body1">댓글이 없습니다.</Typography>
    ) : (
      commentData.map((comment, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start" ref={listRef}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={
                <React.Fragment>
                  {comment.userNick}
                  <span style={{ fontSize: '10px', margin: '10px'}}>{comment.createdDate}</span>
                  <Typography
                    sx={{ display: 'inline', float: 'right' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                    
                  >
                       {userId === comment.userId && (
                          <MoreVertIcon onClick={(event) => handleOpenMenu({event: event, cmtId: comment.cmtId})} />
                        )}
                  </Typography>
                </React.Fragment>
              }
              secondary={
               updateComment && comment.cmtId===cmdId?
               (
                <>
                
                <EditInput commentMessage ={comment.cmtContent} cmtId={comment.cmtId} onhandleEdit={onhandleEdit}/>
                </>

                ) : (
                <React.Fragment>
                {comment.cmtContent}
                </React.Fragment>
                )
              }
              
            />
          </ListItem>
          {len - 1 !== index && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))
    )}
  </StyledList>
   <Menu
   anchorEl={anchorEl}
   open={Boolean(anchorEl)}
   onClose={handleCloseMenu}
 >
   <MenuItem onClick={() => handleEdit()}>수정</MenuItem>
   <MenuItem onClick={() => handleDelete()}>삭제</MenuItem>
 </Menu>
 </>
  )
    ;
}

export default ChallengeCommentList;
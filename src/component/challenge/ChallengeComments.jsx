import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Typography from '@mui/material/Typography';
import ChallengeCommentList
  from '@src/component/challenge/ChallengeCommentList.jsx';
import ChallengeCommentInput
  from '@src/component/challenge/ChallengeCommentInput.jsx';
import Paper from '@mui/material/Paper';

import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import axios from 'axios';


const CommentContainer = styled(Paper)`
    margin-bottom: 30px;
    padding: 30px;
`;

const TitleTypography = styled(Typography)`
    font-weight: bold;
    margin-bottom: 10px;
`;


const ChallengeComments = () => {

  const [userId, setUserId] = useAtom(userIdAtom);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState([]);


  const onhandleComment = (comment) => {
     setMessage(comment);
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    axios.get(`http://localhost:2222/text`,{
  
      }).then(data => {
        setText(data.data);
      });
      };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
    <CommentContainer>
      <TitleTypography
        variant='subtitle1'>댓글 목록
        <MoreVertIcon style={{ display: 'inline', float: 'right' }} onClick={event=>handleOpenMenu(event)} />
        </TitleTypography>
      <ChallengeCommentInput userId={userId}  onhandleComment={onhandleComment}/>
      <ChallengeCommentList message={message} userId={userId} />
    </CommentContainer>
       <Menu
       anchorEl={anchorEl}
       open={Boolean(anchorEl)}
       onClose={handleCloseMenu}
     > 
       <MenuItem><InsertEmoticonIcon/> : {isNaN(text) ? `${Math.round(text.positive_ratio)}%` : 'Loading...'}</MenuItem>
       <MenuItem><SentimentVeryDissatisfiedIcon/> : {isNaN(text) ? `${Math.round(text.negative_ratio)}%` : 'Loading...'}</MenuItem>
     </Menu>
     </>
  );
};

export default ChallengeComments;

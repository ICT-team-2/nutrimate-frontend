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
import SentimentAnalysisImg from '@image/SentimentAnalysis.png';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';


const CommentContainer = styled(Paper)`
    margin-bottom: 30px;
    padding: 30px;
`;

const TitleTypography = styled(Typography)`
    font-weight: bold;
    margin-bottom: 10px;
`;

const SentimentAnalysisIcon = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;

`;
const TitleContainer = styled.div`
    display: flex;
`;


const ChallengeComments = () => {

  const [userId, setUserId] = useAtom(userIdAtom);
  const [message, setMessage] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [text, setText] = useState([]);
  const [cmtId, setCmtId] = useState([]);


  const onhandleComment = (comment, cmt) => {
    setCmtId(cmt);
    setMessage(comment);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/text`, {}).then(data => {
      setText(data.data);
    });
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <CommentContainer>
        <TitleContainer>
          <TitleTypography
            variant="subtitle1">댓글 목록
          </TitleTypography>
          <FlexGrowDiv />
          <SentimentAnalysisIcon
            src={SentimentAnalysisImg}
            onClick={event => handleOpenMenu(event)} />
        </TitleContainer>
        <ChallengeCommentInput userId={userId} onhandleComment={onhandleComment} />
        <ChallengeCommentList cmtId={cmtId} message={message} userId={userId} />
      </CommentContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem><InsertEmoticonIcon /> : {isNaN(text) ? `${Math.round(text.positive_ratio)}%` : 'Loading...'}
        </MenuItem>
        <MenuItem><SentimentVeryDissatisfiedIcon /> : {isNaN(text) ? `${Math.round(text.negative_ratio)}%` : 'Loading...'}
        </MenuItem>
      </Menu>
    </>
  );
};

export default ChallengeComments;

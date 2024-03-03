import React from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

const ChatRoomContainer = styled.div`
    display: flex;
    margin-top: 20px;
`;

const StyledImg = styled.img`
    width: 100%;
`;
const StyledTypography = styled(Typography)`
    margin: 10px;
    min-height: 50px;
`;
const StyledPaper = styled(Paper)`
    cursor: pointer;
`;

const ChallengeRooms = () => {

  const navigate = useNavigate();

  return (
    <ChatRoomContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledPaper onClick={() => {
            navigate(LINKS.CHALLENGE_CHAT + '/1');
          }}>
            <StyledImg src="/src/asset/image/ChatImage.png" alt="채팅룸" />
            <StyledTypography variant="body1">
              물마시기 챌린지
            </StyledTypography>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledPaper onClick={() => {
            navigate(LINKS.CHALLENGE_CHAT + '/3');
          }}>
            <StyledImg src="/src/asset/image/ChatImage.png" alt="채팅룸" />
            <StyledTypography variant="body1">
              샐러드 챌린지
            </StyledTypography>
          </StyledPaper>
        </Grid>
      </Grid>
    </ChatRoomContainer>
  );
};

export default ChallengeRooms;

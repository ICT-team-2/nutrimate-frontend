import React from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

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
const ChallengeRooms = () => {
  return (
    <ChatRoomContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper>
              <StyledImg src='/src/asset/image/ChatImage.png' alt='채팅룸' />
              <StyledTypography variant='body1'>
                챌린지 주제 1
              </StyledTypography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper>
              <StyledImg src='/src/asset/image/ChatImage.png' alt='채팅룸' />
              <StyledTypography variant='body1'>
                챌린지 주제 2
              </StyledTypography>
            </Paper>
          </Grid>
        </Grid>
      </ChatRoomContainer>
  );
};

export default ChallengeRooms;

import React from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import ChallengeRooms from '@src/component/challenge/ChallengeRooms.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward } from '@fortawesome/free-solid-svg-icons';
import ChallengeRank from '@src/component/challenge/ChallengeRank.jsx';
import ChallengeComments from '@src/component/challenge/ChallengeComments.jsx';

const ChallengeContainer = styled(Container)`
    margin-top: 20px;
    width: 90%;
`;

const StyledPaper = styled(Paper)`
    padding: 20px;
    margin-bottom: 40px;
`;

const ChallengePage = () => {
  return (
    <ChallengeContainer>
      <StyledPaper>
        <Typography variant='body1' color='primary'>
          오늘의 챌린지에 참여하세요!
        </Typography>
      </StyledPaper>
      <ChallengeRooms />
      <ChallengeRank />
      <ChallengeComments />
    </ChallengeContainer>
  );
};

export default ChallengePage;

import React from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';

const ChallengeContainer = styled(Container)`
    margin-top: 20px;
    width: 80%;
`;

const ChallengePage = () => {
  return (
    <ChallengeContainer>
      challenge
    </ChallengeContainer>
  );
};

export default ChallengePage;

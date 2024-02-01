import React from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import { Paper } from '@mui/material';
import styled from 'styled-components';

const ChallengeChatContainer = styled(Paper)`
    width: 60%;
    min-height: 83vh;
    display: flex;
    flex-direction: column;

`;
const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const ChallengeChatPage = () => {
  return (
    <PageContainer>
      <ChallengeChatContainer>
        <ChatUI />
      </ChallengeChatContainer>
    </PageContainer>
  );
};

export default ChallengeChatPage;

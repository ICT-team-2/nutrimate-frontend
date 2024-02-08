import React from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import { Paper } from '@mui/material';
import styled from 'styled-components';

const ChallengeChatContainer = styled(Paper)`
    width: 80%;
    min-height: 83vh;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    padding: 20px;
    max-width: 600px;
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

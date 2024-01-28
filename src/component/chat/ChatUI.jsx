import React from 'react';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

const ChatContainer = styled(Paper)`

`;

const ChatHeader = styled.div`
`;
const ChatBody = styled.div`

`;
const ChatUI = () => {
  return (
    <ChatContainer>
      <ChatHeader></ChatHeader>
      <ChatBody></ChatBody>
    </ChatContainer>
  );
};

export default ChatUI;

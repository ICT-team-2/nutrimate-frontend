import React from 'react';
import Paper from '@mui/material/Paper';
import DMChatUI from '@src/component/chat/dm/DMChatUI.jsx';
import styled from 'styled-components';

const ChatPaper = styled(Paper)`
    width: 100%;
`;

const DMChatComponent = (props) => {
  return (
    <ChatPaper>
      <DMChatUI {...props} title={'채팅'} />
    </ChatPaper>
  );
};

export default DMChatComponent;

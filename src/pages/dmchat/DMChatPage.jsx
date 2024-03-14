import React from 'react';
import DMChatUI from '@src/component/chat/dm/DMChatUI.jsx';
import { Container } from '@mui/material';
import DMChatComponent from '@src/component/chat/dm/DMChatComponent.jsx';
import styled from 'styled-components';
import DMChatroomListComponent from '@src/component/chat/dm/room/DMChatroomListComponent.jsx';

const PageContainer = styled(Container)`
    max-width: 960px;
    padding: 0 80px;
    display: flex;
`;

const DMChatPage = () => {
  return (
    <PageContainer>
      <DMChatroomListComponent />
      <DMChatComponent
        height="calc(85vh - 200px)" overflow />
    </PageContainer>
  );
};

export default DMChatPage;

import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';
import styled from 'styled-components';
import DMChatRoomItem from '@src/component/chat/dm/DMChatRoomItem.jsx';

const ChatRoomListPaper = styled(Paper)`
    width: 100%;
    margin-right: 30px;
`;

const TabBox = styled(Box)`
    border-bottom: 1px solid #e0e0e0;
`;


const DMChatRoomListUI = ({ data, chatroomType }) => {

  const [tabValue, setTabValue] = useState(DM_CHATROOM_TAB.PRIVATE.tabValue);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ChatRoomListPaper>
      <TabBox>
        <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
          {Object.values(DM_CHATROOM_TAB).map((tab) => (
            <Tab key={tab.tabValue} label={tab.label} />
          ))}
        </Tabs>
      </TabBox>
      <DMChatRoomItem />
    </ChatRoomListPaper>
  );
};

DMChatRoomListUI.defaultProps = {
  data: [],
};

export default DMChatRoomListUI;

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Tab, Tabs } from '@mui/material';
import Box from '@mui/material/Box';
import { DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';
import styled from 'styled-components';
import DMChatroomItem from '@src/component/chat/dm/room/DMChatroomItem.jsx';
import useFetchChatroomList from '@src/hooks/dmchat/chatroom/useFetchChatroomList.jsx';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from '@mui/material/IconButton';
import CreatePrivateChatroomModal from '@src/component/chat/dm/room/CreatePrivateChatroomModal.jsx';
import ChangeProfileModal from '@src/component/mypage/myinfo/ChangeProfileModal.jsx';
import useChangeChatroomName from '@src/hooks/dmchat/chatroom/useChangeChatroomName.jsx';
import useChangeChatroomProfile from '@src/hooks/dmchat/chatroom/useChangeChatroomProfile.jsx';
import { useAtom } from 'jotai/react';
import { profileModalAtom } from '@src/component/mypage/atom.js';
import ChangeProfileComponent from '@src/component/common/ChangeProfileComponent.jsx';
import ChangeRoomnameModal from '@src/component/chat/dm/room/ChangeRoomnameModal.jsx';
import CreateGroupChatroomModal from '@src/component/chat/dm/room/CreateGroupChatroomModal.jsx';

const ChatRoomListPaper = styled(Paper)`
    max-width: 300px;
    width: 300px;
    min-width: 300px;
    margin-right: 30px;
`;

const TabBox = styled(Box)`
    border-bottom: 1px solid #e0e0e0;
    display: flex;
`;


const convertTabValueToChatroomType = (tabValue) => {
  return Object.values(DM_CHATROOM_TAB).find((tab) => tab.tabValue === tabValue).value;
};


const DMChatroomListUI = (props) => {

  const { data: chatroomList, refetch, isError } = useFetchChatroomList();
  const [data, setData] = useState();
  const [tabValue, setTabValue] = useState(DM_CHATROOM_TAB.PRIVATE.tabValue);
  const [chatroomIdToChange, setChatroomIdToChange] = useState(undefined);

  const changeChatroomProfile = useChangeChatroomProfile();

  useEffect(() => {
    if (!chatroomList) return;
    setData(chatroomList && chatroomList?.filter((chatroom) => {
      return chatroom.chatroomType === convertTabValueToChatroomType(tabValue);
    }));
  }, [chatroomList, tabValue]);

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
        <FlexGrowDiv />
        {tabValue === DM_CHATROOM_TAB.PRIVATE.tabValue
          && <CreatePrivateChatroomModal />}
        {tabValue === DM_CHATROOM_TAB.GROUP.tabValue && <CreateGroupChatroomModal />}
      </TabBox>
      {data && data?.map((chatroom) => (
        <DMChatroomItem
          key={chatroom.chatroomId}
          data={chatroom}
          mode={convertTabValueToChatroomType(tabValue)}
          setChatroomIdToChange={setChatroomIdToChange}
        />
      ))}
      <ChangeProfileModal
        changeProfile={(file) => {
          changeChatroomProfile.mutate({
            chatroomId: chatroomIdToChange,
            profileImage: file,
          });
        }}
      />
      <ChangeRoomnameModal
        chatroomId={chatroomIdToChange}
      />
    </ChatRoomListPaper>
  );
};

DMChatroomListUI.defaultProps = {
  data: [],
};

export default DMChatroomListUI;

import React from 'react';
import DMChatRoomListUI from '@src/component/chat/dm/DMChatRoomListUI.jsx';
import useFetchChatroomList from '@src/hooks/dmchat/chatroom/useFetchChatroomList.jsx';

const DMChatRoomListComponent = (props) => {

  const { data } = useFetchChatroomList();
  return (
    <>
      <DMChatRoomListUI {...props} />
    </>
  );
};

export default DMChatRoomListComponent;

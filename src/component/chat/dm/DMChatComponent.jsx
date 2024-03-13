import React, { useEffect, useLayoutEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import DMChatUI from '@src/component/chat/dm/DMChatUI.jsx';
import styled from 'styled-components';
import useConnectStomp from '@src/hooks/dmchat/useConnectStomp.jsx';
import useFetchChatMessages from '@src/hooks/dmchat/chatmessage/useFetchChatMessages.jsx';
import { useAtom, useAtomValue } from 'jotai/react';
import { chatroomIdAtom, openedChatroomAtom } from '@src/component/chat/dm/atom.js';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import { useQueryClient } from '@tanstack/react-query';
import { FlexDiv } from '@src/component/common/GlobalComponents.jsx';
import useLeaveChatroom from '@src/hooks/dmchat/chatroom/useLeaveChatroom.jsx';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const ChatPaper = styled(Paper)`
    width: 100%;
    min-height: 518px;
    display: flex;
`;
const MarginAutoDiv = styled.div`
    margin: auto;
`;

const DMChatComponent = (props) => {
  const url = `${import.meta.env.REACT_APP_BACKEND_URL}/dm`;
  const [chatroomId, setChatroomId] = useAtom(chatroomIdAtom);
  const [openedChatroom, setOpenedChatroom] = useAtom(openedChatroomAtom);
  const { data: userData } = useFetchProfileData();
  const queryClient = useQueryClient();
  const leaveChatroom = useLeaveChatroom();


  const { data, refetch } = useFetchChatMessages(chatroomId);
  const [messageData, setMessageData] = useState([]);
  const [isDeleted, setIsDeleted] = useState({ delete: false, chatId: undefined });

  const { client, sendMessage, isConnected } = useConnectStomp({
    url,
    onInsert: (message) => {
      setMessageData((prev) => [...prev, message]);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.DM) &&
            query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM);
        },
      });
    },
    onDelete: (message) => {
      setMessageData((prev) => prev.filter((m) => m.chatId !== message.chatId));
      setIsDeleted({ delete: true, chatId: message.chatId });
    },
  });

  const onSend = (message) => {
    sendMessage(
      `/pub/dm/chat/${chatroomId}`, {
        chatMessage: message,
        userId: parseInt(sessionStorage.getItem('userId')),
        userNick: userData.userNick,
        userProfile: userData.userProfile,
      });
  };

  const onDelete = (chatId) => {
    sendMessage(
      `/pub/dm/chat/delete/${chatroomId}`, {
        chatId,
      });
  };

  useEffect(() => {
    if (!chatroomId) return;
    refetch();
  }, [chatroomId]);

  useLayoutEffect(() => {
    if (!data) return;
    setMessageData(data);
  }, [data]);


  return (
    <ChatPaper>
      {openedChatroom.chatroomId ?
        <DMChatUI
          {...props}
          title={openedChatroom.chatroomName === '' ?
            '채팅'
            : openedChatroom.chatroomName}
          data={messageData}
          onSend={onSend}
          onDelete={onDelete}
          onLeave={() => {
            leaveChatroom.mutate({ chatroomId: openedChatroom.chatroomId });
            setOpenedChatroom({ chatroomId: undefined, chatroomName: '' });
            setChatroomId(undefined);
          }}
          deleted={isDeleted}
        />
        : <MarginAutoDiv>
          채팅방을 선택해주세요
        </MarginAutoDiv>
      }
    </ChatPaper>
  );
};

export default DMChatComponent;

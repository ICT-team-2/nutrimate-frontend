import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai/react';
import { openedChatroomAtom } from '@src/component/chat/dm/atom.js';
import { useState } from 'react';

const useChangeChatroomName = () => {

  const queryClient = useQueryClient();
  const [openedChatroom, setOpenedChatroom] = useAtom(openedChatroomAtom);
  const [chatroomData, setChatroomData] = useState('');
  //axios
  /**
   * 채팅방 이름 변경
   * @param data {{chatroomId: number, chatroomName: string}}
   * @returns {Promise<any>}
   */
  const changeChatRoomName = async (data) => {
    setChatroomData(data);
    try {
      const response = await axios.put(`/dm/room/name`, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //react-query
  return useMutation({
    mutationFn: changeChatRoomName,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.ROOMNAME,
      REACT_QUERY_KEYS.UPDATE],
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey.includes(REACT_QUERY_KEYS.DM) &&
            query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM);
        },
      }).then(() => {
        if (openedChatroom.chatroomId === chatroomData.chatroomId) {
          setOpenedChatroom((prev) => {
            return {
              ...prev,
              chatroomName: chatroomData.chatroomName,
            };
          });
        }
      });
    },
    onError: () => {
      console.error('changeChatRoomName onError');
    },
  });
};

export default useChangeChatroomName;
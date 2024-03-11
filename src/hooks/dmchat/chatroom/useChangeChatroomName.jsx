import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation } from '@tanstack/react-query';

const useChangeChatroomName = () => {
  //axios
  /**
   * 채팅방 이름 변경
   * @param data {{chatroomId: number, chatroomName: string}}
   * @returns {Promise<any>}
   */
  const changeChatRoomName = async (data) => {
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
      console.log('changeChatRoomName onSuccess');
    },
    onError: () => {
      console.log('changeChatRoomName onError');
    },
  });
};

export default useChangeChatroomName;
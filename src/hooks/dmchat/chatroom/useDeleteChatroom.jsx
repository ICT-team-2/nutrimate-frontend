import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useDeleteChatroom = () => {
  //axios
  const deleteChatroom = async (chatroomId) => {
    try {
      await axios.delete(`/dm/room`, {
        params: {
          chatroomId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return useMutation({
    mutationFn: deleteChatroom,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.DELETE],
    onSuccess: () => {
      console.log('채팅방 삭제 성공');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useDeleteChatroom;
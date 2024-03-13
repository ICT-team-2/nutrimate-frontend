import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useLeaveChatroom = () => {

  const queryClient = useQueryClient();

  //axios
  /**
   * @param params
   * @param params.chatroomId {number} 채팅방 ID
   * @returns {Promise<void>}
   */
  const leaveChatroom = async (params) => {
    await axios.delete(`/dm/room`, {
      params: {
        ...params,
        userId: parseInt(sessionStorage.getItem('userId')),
      },
    });
  };

  return useMutation({
    mutationFn: leaveChatroom,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.LEAVE,
      REACT_QUERY_KEYS.DELETE],
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.DM)
            && query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM);
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });

};

export default useLeaveChatroom;
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useCreateGroupChatroom = () => {

  const queryClient = useQueryClient();
  
  //axios
  const createGroupChatRoom = async (userIds) => {
    try {
      const response = await axios.post(`/dm/room/group`, {
        userIds: [...userIds, parseInt(sessionStorage.getItem('userId'))],
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query

  return useMutation({
    mutationFn: createGroupChatRoom,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.GROUP,
      REACT_QUERY_KEYS.INSERT],
    onSuccess: () => {
      console.log('createGroupChatRoom onSuccess');
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey.includes(REACT_QUERY_KEYS.DM) &&
            query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM);
        },
      });
    },
    onError: () => {
      console.log('createGroupChatRoom onError');
    },
  });
};

export default useCreateGroupChatroom;
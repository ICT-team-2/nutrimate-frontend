import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { toast } from 'react-toastify';

const useCreatePrivateChatroom = () => {

  const queryClient = useQueryClient();

  //axios
  const createPrivateDmRoom = async (opponentId) => {
    try {
      const response = await axios.post(`/dm/room/private`, {
        userId: parseInt(sessionStorage.getItem('userId')),
        opponentId,
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //react-query
  return useMutation({
    mutationFn: createPrivateDmRoom,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.PRIVATE,
      REACT_QUERY_KEYS.INSERT],
    onSuccess: () => {
      toast.success('채팅방 생성 성공');
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey.includes(REACT_QUERY_KEYS.DM) &&
            query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM);
        },
      });
    },
    onError: () => {
      toast.error('채팅방 생성 실패');
      console.error('createPrivateDmRoom onError');
    },
  });
};

export default useCreatePrivateChatroom;
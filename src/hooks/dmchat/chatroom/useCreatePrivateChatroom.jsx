import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useCreatePrivateChatroom = () => {
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
      console.log('createPrivateDmRoom onSuccess');
    },
    onError: () => {
      console.log('createPrivateDmRoom onError');
    },
  });
};

export default useCreatePrivateChatroom;
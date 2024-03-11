import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useFetchChatroomList = () => {
  //axios
  const fetchChatroomList = async () => {
    try {
      const response = await axios.get('/dm/room/list', {
        params: {
          userId: parseInt(sessionStorage.getItem('userId')),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //react-query
  return useQuery({
    queryFn: fetchChatroomList,
    queryKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.LIST],
  });
};

export default useFetchChatroomList;
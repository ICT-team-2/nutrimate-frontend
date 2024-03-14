import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useFetchSearchUser = (searchWord) => {
  //axios
  const fetchSearchUser = async () => {
    try {
      const response = await axios.get(`/dm/room/user/search`, {
        params: {
          searchWord,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useQuery({
    queryFn: fetchSearchUser,
    queryKey: [
      REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.SEARCH,
    ],
    enabled: false,
  });
};

export default useFetchSearchUser;
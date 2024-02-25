import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useRecommandFollowList = (userId) => {

  userId = userId || parseInt(sessionStorage.getItem('userId'));
  //axios
  const fetchRecommandList = async () => {
    const response = await axios.get('/follow/recommend', {
      params: {
        userId: userId,
      },

    });
    return response.data;
  };
  //react-query
  return useQuery({
      queryKey: [
        REACT_QUERY_KEYS.MEMBER,
        REACT_QUERY_KEYS.FOLLOW,
        REACT_QUERY_KEYS.RECOMMAND,
        REACT_QUERY_KEYS.LIST,
        userId,
      ],
      queryFn: fetchRecommandList,
    },
  );
};

export default useRecommandFollowList;
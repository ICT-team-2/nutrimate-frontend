import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useQuery } from '@tanstack/react-query';

const useFetchFolloweeList = (userId) => {

  userId = userId || parseInt(sessionStorage.getItem('userId'));

  //axios
  const fetchFolloweeList = async () => {
    const response = await axios.get('/follow/following/list', {
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
      REACT_QUERY_KEYS.FOLLOWEE,
      REACT_QUERY_KEYS.LIST,
      parseInt(userId),
    ],
    queryFn: fetchFolloweeList,
  });
};

export default useFetchFolloweeList;
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import axios from 'axios';

const useFetchFollowerList = (profileUserId) => {

  profileUserId = profileUserId || parseInt(sessionStorage.getItem('userId'));

  //axios
  const fetchFollowerList = async () => {
    const response = await axios.get('/follow/follower/list', {
      params: {
        userId: profileUserId,
      },
    });
    return response.data;
  };
  //react-query
  return useQuery({
    queryKey: [
      REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.FOLLOW,
      REACT_QUERY_KEYS.FOLLOWER,
      REACT_QUERY_KEYS.LIST,
      parseInt(profileUserId),
    ],
    queryFn: fetchFollowerList,
  });
};

export default useFetchFollowerList;
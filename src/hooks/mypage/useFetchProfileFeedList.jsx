import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const useFetchProfileFeedList = (profileUserId) => {

  profileUserId = profileUserId || sessionStorage.getItem('userId');

  //axios
  const fetchProfileFeedList = async ({ pageParam = 1 }) => {
    const response = await axios.get('/board/feed/list', {
      params: {
        userId: sessionStorage.getItem('userId'),
        nowPage: pageParam,
        receivePage: 9,
        profileUserId: profileUserId,
        profile: true,
      },
    });
    return response.data;
  };

  //react-query
  return useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.FEED,
      REACT_QUERY_KEYS.LIST,
      profileUserId],
    queryFn: fetchProfileFeedList,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nowPage >= lastPage.totalPages) {
        return undefined;
      }//다음 페이지가 없을 경우
      return lastPage.nowPage + 1;
    },
    initialPageParam: 1,
  });
};

export default useFetchProfileFeedList;
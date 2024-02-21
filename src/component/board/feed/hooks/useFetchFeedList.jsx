import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';


const useFetchFeedList = () => {

  //axios
  const fetchFeedList = async ({ pageParam = 1 }) => {
    try {
      const response = await axios.get('/board/feed/list', {
        params: {
          nowPage: pageParam,
          receivePage: 5,
          userId: sessionStorage.getItem('userId'),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return useInfiniteQuery({
    queryKey: ['board', 'feed'],
    queryFn: fetchFeedList,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nowPage >= lastPage.totalPages) return undefined;//다음 페이지가 없을 경우
      return lastPage.nowPage + 1;
    },
    initialPageParam: 1,

  });
};


export default useFetchFeedList;
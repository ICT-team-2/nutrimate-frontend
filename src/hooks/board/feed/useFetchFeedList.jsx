import axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useEffect, useState } from 'react';
import { debounce } from '@src/utils/functions.js';


const useFetchFeedList = (search = '', receivePage = 5) => {

  const [searchWord, setSearchWord] = useState(''); //검색어
  const debouncedSetSearchWord = debounce((value) => setSearchWord(value), 500);

  useEffect(() => {
    debouncedSetSearchWord(search);
  }, [search]);


  //axios
  const fetchFeedList = async ({ pageParam = 1 }) => {
      try {
        const response = await axios.get('/board/feed/list', {
          params: {
            nowPage: pageParam,
            receivePage: receivePage,
            userId: sessionStorage.getItem('userId'),
            ...(searchWord && searchWord.trim() !== '' && { searchWord: searchWord }),
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  ;

  return useInfiniteQuery({
    queryKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.FEED,
      REACT_QUERY_KEYS.LIST, searchWord?.trim()],
    queryFn: fetchFeedList,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.nowPage >= lastPage.totalPages) {
        return undefined;
      }//다음 페이지가 없을 경우
      return lastPage.nowPage + 1;
    },
    initialPageParam: 1,
  });
};

export default useFetchFeedList;
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useFetchBookmarkInfoBoardList = (profileUserId, page = 1) => {
  profileUserId = profileUserId || sessionStorage.getItem('userId');
  //axios
  const fetchBookmarkInfoBoardList = async () => {
    const response = await axios.get('/profile/board/info/bookmark', {
      params: {
        userId: profileUserId,
        nowPage: page,
        receivePage: 5,
      },
    });
    return response.data;
  };

  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.BOOKMARK,
      REACT_QUERY_KEYS.LIST,
      profileUserId,
      page],
    queryFn: fetchBookmarkInfoBoardList,
  });
};

export default useFetchBookmarkInfoBoardList;
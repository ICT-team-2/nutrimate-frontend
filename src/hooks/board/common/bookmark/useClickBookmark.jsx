import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useClickBookmark = (boardId, profile) => {

  const queryClient = useQueryClient();

  //axios
  const clickBookmark = async () => {
    try {
      const response = await axios.post('/board/feed/bookmark/push', {
        boardId: boardId,
        userId: sessionStorage.getItem('userId'),
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOOKMARK,
      REACT_QUERY_KEYS.INSERT,
      REACT_QUERY_KEYS.DELETE],
    mutationFn: clickBookmark,
    onSuccess: () => {
      console.log('북마크 성공');
      if (!profile) {
        queryClient.invalidateQueries({
          predicate: (query) => {
            return query.queryKey.includes(REACT_QUERY_KEYS.BOARD)
              && (query.queryKey.includes(boardId) ||
                query.queryKey.includes(REACT_QUERY_KEYS.LIST));
          },
        });
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useClickBookmark;
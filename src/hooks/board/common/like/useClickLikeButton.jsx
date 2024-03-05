import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useClickLikeButton = (boardId) => {
  const queryClient = useQueryClient();
  //axios
  const clickLikeButton = async (boardId) => {
    try {
      const response = await axios.post('/board/feed/like/push', {
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
    mutationKey: [REACT_QUERY_KEYS.LIKE,
      REACT_QUERY_KEYS.INSERT,
      REACT_QUERY_KEYS.DELETE],
    mutationFn: () => clickLikeButton(boardId),
    onSuccess: () => {
      console.log('좋아요 성공');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.BOARD)
            && (query.queryKey.includes(boardId) ||
              query.queryKey.includes(REACT_QUERY_KEYS.LIST));
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useClickLikeButton;
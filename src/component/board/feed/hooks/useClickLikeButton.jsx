import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useClickLikeButton = (boardId) => {
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
  });
};

export default useClickLikeButton;
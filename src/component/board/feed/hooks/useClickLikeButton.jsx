import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

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
    mutationKey: ['like', 'click'],
    mutationFn: () => clickLikeButton(boardId),
  });
};

export default useClickLikeButton;
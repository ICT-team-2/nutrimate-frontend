import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useFetchCommentsList = (boardId) => {
  //axios
  const fetchCommentsList = async () => {
    try {
      const response = await axios.get(`/board/comments/list/${boardId}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query
  return useQuery({
    queryKey: ['board', 'comments', 'get'],
    queryFn: fetchCommentsList,
  });
};

export default useFetchCommentsList;
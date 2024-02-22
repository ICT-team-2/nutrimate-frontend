import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

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
    queryKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.COMMENTS,
      REACT_QUERY_KEYS.LIST],
    queryFn: fetchCommentsList,
  });
};

export default useFetchCommentsList;
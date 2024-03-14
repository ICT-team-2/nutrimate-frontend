import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useEditComment = (boardId) => {

  const queryClient = useQueryClient();

  //axios
  /**
   *
   * @param data
   * @param data.cmtId {number}
   * @param data.cmtContent {string}
   * @returns {Promise<any>}
   */
  const editComment = async (data) => {
    const response = await axios.put('/board/comments/edit', data);
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.COMMENTS, REACT_QUERY_KEYS.UPDATE],
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.COMMENTS)
            && query.queryKey.includes(boardId);
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useEditComment;
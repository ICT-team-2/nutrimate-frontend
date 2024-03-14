import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import axios from 'axios';

const useDeleteComment = (cmtId, boardId) => {
  const queryClient = useQueryClient();
  //axios
  const deleteComment = async () => {
    const response = await axios.delete('/board/comments/delete', {
      data: {
        cmtId: cmtId,
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.COMMENTS, REACT_QUERY_KEYS.DELETE],
    mutationFn: deleteComment,
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

export default useDeleteComment;
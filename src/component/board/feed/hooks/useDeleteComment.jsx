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
      // console.log('댓글 삭제 성공');
      queryClient.invalidateQueries([REACT_QUERY_KEYS.COMMENTS, boardId]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

};

export default useDeleteComment;
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useInputReply = (boardId) => {
  const queryClient = useQueryClient();

  //axios
  const inputReply = async (data) => {
    console.log(data);
    const response = await axios.post('/board/comments/write/replies', {
      boardId: data.boardId,
      userId: sessionStorage.getItem('userId'),
      cmtId: data.cmtRef,
      cmtContent: data.cmtContent,
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.COMMENTS, REACT_QUERY_KEYS.REPLY, REACT_QUERY_KEYS.INSERT],
    mutationFn: inputReply,
    onSuccess: async () => {
      console.log('답글 입력 성공');
      await queryClient.invalidateQueries({
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

export default useInputReply;
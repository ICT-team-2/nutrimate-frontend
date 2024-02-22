import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useEditComment = () => {

  const queryClient = useQueryClient();

  //axios
  const editComment = async (data) => {
    const response = await axios.put('/board/comments/edit', {
      cmtId: data.cmtId,
      cmtContent: data.cmtContent,
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.COMMENTS, REACT_QUERY_KEYS.UPDATE],
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.COMMENTS]);
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useEditComment;
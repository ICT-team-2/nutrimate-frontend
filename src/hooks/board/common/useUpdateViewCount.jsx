import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const useUpdateViewCount = () => {

  const queryClient = useQueryClient();
  //axios
  const updateViewCount = async (boardId) => {
    const response = await axios.put('/board/view/count', {
      boardId: boardId,
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.VIEW_COUNT,
      REACT_QUERY_KEYS.UPDATE],
    mutationFn: updateViewCount,

    onError: (error) => {
      console.error(error);
    },
  });
};

export default useUpdateViewCount;
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LINKS, REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useNavigate } from 'react-router-dom';

const useDeleteBoard = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //axios
  const deleteBoard = async (boardId) => {
    const response = await axios.delete(`/board/feed/delete`, {
      data: {
        boardId: boardId,
      },
    });
    console.log(response.data);
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.DELETE],
    mutationFn: deleteBoard,
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.LIST])
        .then(() => {
          navigate(LINKS.FEEDBOARD_VIEW);
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useDeleteBoard;
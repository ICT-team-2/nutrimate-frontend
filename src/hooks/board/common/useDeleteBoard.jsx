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
      return response.data;
    };

    //react-query
    return useMutation({
      mutationKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.DELETE],
      mutationFn: deleteBoard,
      onSuccess: () => {
        queryClient.invalidateQueries({
            predicate: (query) => {
              return query.queryKey.includes(REACT_QUERY_KEYS.BOARD);
            },
          },
        ).then(() => {
          navigate(LINKS.FEEDBOARD_VIEW);
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }
;

export default useDeleteBoard;
;
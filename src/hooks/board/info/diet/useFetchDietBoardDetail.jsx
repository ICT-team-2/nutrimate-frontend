import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { BOARD } from '@src/component/board/const.js';

const useFetchDietBoardDetail = (boardId, category) => {
  if (category !== BOARD.INFO.FOOD.CATEGORY)
    return {
      data: null,
      isLoading: false,
      refetch: () => {
      },
    };

  //axios
  const fetchDietBoardDetail = async () => {
    try {
      const response = await axios.get(`/board/info/diet/view`, {
        params: {
          boardId: boardId,
          userId: sessionStorage.getItem('userId'),
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //react-query
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.DETAIL,
      parseInt(boardId)],
    queryFn: fetchDietBoardDetail,
    refetchOnWindowFocus: false,
  });
};

export default useFetchDietBoardDetail;
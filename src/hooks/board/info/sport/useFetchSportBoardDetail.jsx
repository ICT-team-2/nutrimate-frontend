import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { BOARD } from '@src/component/board/const.js';

const useFetchSportBoardDetail = (boardId, category) => {

    if (category !== BOARD.INFO.SPORT.CATEGORY)
      return {
        data: null,
        isLoading: false,
        refetch: () => {
        },
      };
    //axios
    const fetchSportBoardDetail = async () => {
      try {
        const response = await axios.get(`/boards/sport/${boardId}`, {
          params: {
            userId: sessionStorage.getItem('userId'),
          },
        });
        if (!response.data) {
          throw new Error('게시글을 찾을 수 없습니다.');
        }
        return response.data;
      } catch (error) {
        console.error(error);

      }
    };

//react-query
    return useQuery({
      queryKey: [
        REACT_QUERY_KEYS.BOARD,
        REACT_QUERY_KEYS.INFO,
        REACT_QUERY_KEYS.SPORT,
        REACT_QUERY_KEYS.DETAIL,
        parseInt(boardId),
      ],
      queryFn: fetchSportBoardDetail,
      refetchOnWindowFocus: false,
    });
  }
;

export default useFetchSportBoardDetail;
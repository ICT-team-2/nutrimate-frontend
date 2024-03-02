import axios from 'axios';
import { LINKS, REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BOARD } from '@src/component/board/const.js';

const useInputSportBoard = () => {

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  //axios
  /**
   * @param data
   * @param data.boardTitle {string}
   * @param data.boardContent {string}
   * @param data.tagNameList {string[]}
   * @param data.files {File}
   * @param data.mapPaths {string}
   * @param data.mapDistances {string}
   * @param data.mapCenterLat {number}
   * @param data.mapCenterLng {number}
   * @param data.mapZoomlevel {number}
   * @returns {Promise<any>}
   */
  const inputSportBoard = async (data) => {
    try {
      const response = await axios.post('/boards/sport', {
        ...data,
        userId: sessionStorage.getItem('userId'),
        boardCategory: 'exercise',
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.SPORT,
      REACT_QUERY_KEYS.INSERT],
    mutationFn: inputSportBoard,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          REACT_QUERY_KEYS.BOARD,
          REACT_QUERY_KEYS.INFO,
        ],
      });
      navigate(LINKS.INFO_BOARD_VIEW + '/' + data.boardId, {
        state: {
          category: BOARD.INFO.SPORT.CATEGORY,
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export default useInputSportBoard;
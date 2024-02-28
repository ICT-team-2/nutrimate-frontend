import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useInputSportBoard = () => {

  const queryClient = useQueryClient();
  //axios
  const inputSportBoard = async (data) => {
    try {
      const response = await axios.post('/boards/sport', data);
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
    onSuccess: () => {
      console.log('게시글 입력 성공');
      queryClient.invalidateQueries({
        queryKey: [
          REACT_QUERY_KEYS.BOARD,
          REACT_QUERY_KEYS.INFO,
        ],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
export default useInputSportBoard;
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useDeleteDietRecord = () => {

  const queryClient = useQueryClient();
  //axios
  /**
   * @param recordId {number} 기록 id
   */
  const deleteDietRecord = async (recordId) => {
    const response = await axios.delete('/record/diet', {
      params: {
        recordId,
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.DELETE,
    ],
    mutationFn: deleteDietRecord,
    onSuccess: () => {
      console.log('삭제 성공');
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeleteDietRecord;
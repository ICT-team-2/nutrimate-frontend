import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useDeleteSportRecord = () => {

  const queryClient = useQueryClient();
  //axios
  /**
   * @param recordId {number} 기록 id
   */
  const deleteSportRecord = async (recordId) => {
    const response = await axios.delete('/record/sport', {
      params: {
        recordId,
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.SPORT,
      REACT_QUERY_KEYS.DELETE,
    ],
    mutationFn: deleteSportRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useDeleteSportRecord;
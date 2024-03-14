import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useInputDietRecordListWithDB = () => {

  const queryClient = useQueryClient();

  //axios
  const inputDietRecordListWithDB = async (data) => {
    const response = await axios.post('/record/diet/db/list', {
      ...data,
      record: {
        ...data.record,
        userId: sessionStorage.getItem('userId'),
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.DB,
      REACT_QUERY_KEYS.LIST],
    mutationFn: inputDietRecordListWithDB,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: () => {
      console.error('useInputDietRecordListWithDB onError');
    },
  });
};

export default useInputDietRecordListWithDB;
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import { toast } from 'react-toastify';

/**
 * @param data {object} 요청 파라미터
 * @param data.record {object} 기록
 * @param data.record.doDate {string} 날짜
 * @param data.foodId {number} 음식 id
 * @param data.mealTime {BREAKFAST|LUNCH|DINNER|SNACK} 식사 시간
 * @param data.recordIntake {number|undefined} 음식 섭취량
 */
const useInputDietRecordWithDB = () => {

  const queryClient = useQueryClient();

  //axios
  /**
   * @param data {object} 요청 파라미터
   * @param data.record {object} 기록
   * @param data.record.doDate {string} 날짜
   * @param data.foodId {number} 음식 id
   * @param data.mealTime {BREAKFAST|LUNCH|DINNER|SNACK} 식사 시간
   */
  const inputDietRecord = async (data) => {
    const response = await axios.post('/record/diet/db', {
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
      REACT_QUERY_KEYS.INSERT,
      REACT_QUERY_KEYS.DB],
    mutationFn: inputDietRecord,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.RECORD.SUCCESS);
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.RECORD],
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.RECORD.ERROR);
      console.error(error);
    },
  });
};

export default useInputDietRecordWithDB;
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

/**
 * @param data {object} 요청 파라미터
 * @param data.doDate {string|undefined} 날짜 (yyyy-MM-dd)
 * @param data.mealTime {string|undefined} 식사 시간
 */
const useFetchDietRecord = (data) => {
  const { doDate, mealTime } = data;

  //axios
  const fetchDietRecord = async () => {
    const response = await axios.get('/record/diet', {
      params: {
        userId: sessionStorage.getItem('userId'),
        doDate,
        mealTime,
      },
    });
    return response.data;
  };

  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.LIST,
      doDate, mealTime],
    queryFn: fetchDietRecord,
  });
};

export default useFetchDietRecord;

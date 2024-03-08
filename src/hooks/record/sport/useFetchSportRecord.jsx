import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

/**
 * @param doDate {string|undefined} 날짜 (yyyy-MM-dd)
 */
const useFetchSportRecord = (doDate) => {
  // axios
  const fetchSportRecord = async () => {
    const response = await axios.get('/record/sport', {
      params: {
        userId: sessionStorage.getItem('userId'),
        doDate,
      },
    });
    return response.data;
  };

  // react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.SPORT,
      doDate],
    queryFn: fetchSportRecord,
  });
};

export default useFetchSportRecord;

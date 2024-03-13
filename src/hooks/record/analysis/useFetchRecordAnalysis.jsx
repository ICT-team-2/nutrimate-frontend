import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import axios from 'axios';

const useFetchRecordAnalysis = (doDate) => {
  //axios
  const fetchRecordAnalysis = async () => {
    const response = await axios.get('/record/analysis', {
      params: {
        userId: sessionStorage.getItem('userId'),
        doDate: doDate,
      },
    });
    return response.data;
  };
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.ANALYSIS,
      doDate,
    ],
    queryFn: fetchRecordAnalysis,
  });
};

export default useFetchRecordAnalysis;
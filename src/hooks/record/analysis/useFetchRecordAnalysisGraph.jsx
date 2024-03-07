import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

/**
 *
 * @param data
 * @param data.endDate {string} 종료일
 * @param data.periodType {'DAY'|'WEEK'|'MONTH'} 기간 타입
 * @param data.periodCount {number} 기간 수
 */
const useFetchRecordAnalysisGraph = (data) => {
  const { endDate, periodType, periodCount } = data;

  //axios
  const fetchRecordAnalysisGraph = async () => {
    const response = await axios.get('/record/analysis/graph', {
      params: {
        ...data,
        userId: sessionStorage.getItem('userId'),
      },
    });
    return response.data;
  };

  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.ANALYSIS,
      REACT_QUERY_KEYS.GRAPH,
      periodType,
      periodCount,
      endDate,
    ],
    queryFn: fetchRecordAnalysisGraph,
  });
};

export default useFetchRecordAnalysisGraph;
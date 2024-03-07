import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

/**
 * @param data {object} 요청 파라미터
 * @param data.searchWord {string|undefined} 검색어
 * @param data.nowPage {number|undefined} 현재 페이지
 * @param data.receivePage {number|undefined} 페이지당 받을 데이터 수
 */
const useFetchSportDB = (data) => {
  const {
    searchWord,
    nowPage = nowPage <= 0 ? 1 : nowPage,
    receivePage = 5,
  } = data;

  //axios
  const fetchSportDB = async () => {
    const response = await axios.get('/sport', {
      params: {
        searchWord,
        nowPage,
        receivePage,
      },
    });
    return response.data;
  };

  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.SPORT,
      REACT_QUERY_KEYS.DB,
      REACT_QUERY_KEYS.SEARCH,
      searchWord, nowPage, receivePage],
    queryFn: fetchSportDB,
  });
};

export default useFetchSportDB;
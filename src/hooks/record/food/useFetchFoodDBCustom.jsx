import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

/**
 * @param data {object} 요청 파라미터
 * @param data.searchWord {string|undefined} 검색어
 * @param data.nowPage {number|undefined} 현재 페이지
 * @param data.receivePage {number|undefined} 페이지당 받을 데이터 수
 */
const useFetchFoodDBCustom = (data) => {
  const {
    searchWord,
    nowPage = nowPage <= 0 ? 1 : nowPage,
    receivePage = 10,
  } = data;

  //axios
  const fetchFoodDBCustom = async () => {
    const response = await axios.get('/food/custom', {
      params: {
        userId: sessionStorage.getItem('userId'),
        searchWord,
        nowPage,
        receivePage,
      },
    });
    return response.data;
  };

  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.DB,
      REACT_QUERY_KEYS.CUSTOM,
      searchWord, nowPage, receivePage],
    queryFn: fetchFoodDBCustom,
  });
};

export default useFetchFoodDBCustom;
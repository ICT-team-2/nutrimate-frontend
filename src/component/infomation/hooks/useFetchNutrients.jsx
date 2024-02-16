import { REACT_QUERY_KEYS } from '@src/component/infomation/const.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchNutrients = () => {
  //axios로 api 호출
  const fetchNutrients = async () => {
    const response = await axios.get(
      `${import.meta.env.REACT_APP_FLASK_URL}/nutrients-info`,
    );
    return response.data;
  };
  //react-query로 api 호출
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.NUTRIENTS],
    queryFn: fetchNutrients,
    staleTime: Infinity,// staletime - Infinity로 설정
    refetchOnWindowFocus: false,
  });
};

export default useFetchNutrients;
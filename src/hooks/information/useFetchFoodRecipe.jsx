import { REACT_QUERY_KEYS } from '@src/component/infomation/const.js';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useFetchFoodRecipe = () => {
  //axios
  const fetchFoodRecipe = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/recipe-info`);
    return res.data;
  };
  //react-query
  const result = useQuery({
    queryKey: [REACT_QUERY_KEYS.FOOD],
    queryFn: fetchFoodRecipe,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return result;
};

export default useFetchFoodRecipe;
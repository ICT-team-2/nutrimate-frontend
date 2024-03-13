import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import axios from 'axios';

/**
 * @param foodId {number[]|string[]} 음식 id
 */
const useFetchFoodDBByFoodId = (foodId) => {

  //axios
  const fetchFoodListByFoodId = async () => {
    if (!foodId || foodId.length === 0) return [];
    const foodIdParam = new URLSearchParams();
    foodId.forEach((id) => foodIdParam.append('foodId', id));
    const response = await axios.get(`/food/id?${foodIdParam.toString()}`);
    return response.data;
  };
  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.RECORD,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.LIST,
      foodId],
    queryFn: fetchFoodListByFoodId,
  });

};

export default useFetchFoodDBByFoodId;

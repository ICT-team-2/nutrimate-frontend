import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import axios from 'axios';

const useFetchFoodListByFoodId = (foodId) => {

  //axios
  const fetchFoodListByFoodId = async () => {
    if (!foodId || foodId.length === 0) return [];
    const foodIdParam = new URLSearchParams();
    foodId.forEach((id) => foodIdParam.append('foodId', id));
    const response = await axios.get(`/record/food/list/id?${foodIdParam.toString()}`,
    );
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

export default useFetchFoodListByFoodId;

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useFetchRestaurant = (searchKeyword) => {
  //axios
  const fetchRestaurant = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/restaurant`, {
      params: {
        place: searchKeyword,
      },
    });
    return res.data;
  };

  return useQuery({
    queryKey: [
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.PLACE,
      REACT_QUERY_KEYS.RESTAURANT,
      searchKeyword,
    ],
    queryFn: fetchRestaurant,
  });
};

export default useFetchRestaurant;
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useFetchGym = (searchKeyword) => {
  //axios
  const fetchGym = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/gym`, {
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
      REACT_QUERY_KEYS.GYM,
      searchKeyword,
    ],
    queryFn: fetchGym,
  });
};

export default useFetchGym;
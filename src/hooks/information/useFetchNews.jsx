import { useAtom } from 'jotai/react';
import { selectedNewsCategoryAtom } from '@src/component/infomation/atom.js';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/component/infomation/const.js';


const useFetchNews = () => {

  const [category, setCategory] = useAtom(selectedNewsCategoryAtom);

  //axios 사용
  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.REACT_APP_FLASK_URL}/navernews`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  //react-query 사용
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.NEWS],
    queryFn: fetchNews,
    staleTime: Infinity,// staletime - Infinity로 설정
    refetchOnWindowFocus: false,
  });
};

export default useFetchNews;
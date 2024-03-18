import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/component/infomation/const.js';
import { useQuery } from '@tanstack/react-query';

const youtubeRegex = /https?:\/\/.+\/embed\/(.+)\?.+/;

const convertYoutubeUrl = (url) => {
  const result = url.match(youtubeRegex);
  return `https://youtube.com/watch?v=${result[1]}`;
};

const useFetchSportVideo = () => {
  //axios
  const fetchSportVideo = async () => {
    const res = await axios.get(`${import.meta.env.REACT_APP_FLASK_URL}/exercise-info`);
    return res.data;
  };
  //react-query
  const result = useQuery({
    queryKey: [REACT_QUERY_KEYS.SPORT],
    queryFn: fetchSportVideo,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return result;
};

export default useFetchSportVideo;
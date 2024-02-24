import axios from 'axios';
import { LINKS, REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const useInputFeed = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //axios
  const inputFeed = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    formData.append('userId', sessionStorage.getItem('userId'));

    const response = await axios.post('/board/feed/write', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  return useMutation({
    mutationFn: inputFeed,
    mutationKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.FEED, REACT_QUERY_KEYS.INSERT],
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEYS.FEED, REACT_QUERY_KEYS.LIST])
        .then(() => {
          navigate(LINKS.FEEDBOARD_VIEW);
        });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useInputFeed;

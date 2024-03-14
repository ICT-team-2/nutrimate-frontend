import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LINKS, REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useEditFeed = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //axios
  const updateFeed = async (data) => {
    const formData = new FormData();
    for (let key in data) {
      if (key === 'files' && data[key] == null) {
        continue;
      }
      formData.append(key, data[key]);
    }
    const response = await axios.put('/board/feed/edit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.FEED, REACT_QUERY_KEYS.UPDATE],
    mutationFn: updateFeed,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.BOARD.UPDATE.SUCCESS);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.FEED)
            && query.queryKey.includes(REACT_QUERY_KEYS.LIST);
        },
      }).then(() => {
        navigate(LINKS.FEEDBOARD_VIEW);
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.BOARD.UPDATE.ERROR);
      console.error(error);
    },
  });
};

export default useEditFeed;
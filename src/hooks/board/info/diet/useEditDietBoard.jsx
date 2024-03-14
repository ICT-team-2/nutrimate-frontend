import axios from 'axios';
import { LINKS, REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOARD } from '@src/component/board/const.js';
import { toast } from 'react-toastify';

const useEditDietBoard = (boardId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //axios
  const editDietBoard = async (data) => {

    const formData = new FormData();
    for (let key in data) {
      if (data[key] === null) continue;
      formData.append(key, data[key]);
    }
    formData.append('boardId', boardId);
    formData.append('userId', sessionStorage.getItem('userId'));
    formData.append('boardCategory', 'FOOD');

    const response = await axios.put('/board/info/diet', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.FOOD,
      REACT_QUERY_KEYS.UPDATE],
    mutationFn: editDietBoard,
    onSuccess: () => {
      toast.success(TOAST_MESSAGE.BOARD.UPDATE.SUCCESS);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.INFO)
            && query.queryKey.includes(REACT_QUERY_KEYS.BOARD);
        },
      });
      navigate(LINKS.INFO_BOARD_VIEW + `/${boardId}`, {
        state: {
          category: BOARD.INFO.FOOD.CATEGORY,
        },
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.BOARD.UPDATE.ERROR);
      console.error(error);
    },
  });
};

export default useEditDietBoard;

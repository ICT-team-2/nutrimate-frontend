import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const useEditDietBoard = () => {
  const queryClient = useQueryClient();

  //axios
  const editDietBoard = async (data) => {
    const response = await axios.put('/board/info/diet', {
      ...data,
      userId: sessionStorage.getItem('userId'),
      boardCategory: 'FOOD',
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
      console.log('게시글 수정 성공');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.INFO)
            && query.queryKey.includes(REACT_QUERY_KEYS.BOARD);
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useEditDietBoard;
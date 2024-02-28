import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useInputDietBoard = () => {

  const queryClient = useQueryClient();

  //axios
  const inputDietBoard = async (data) => {
    const response = await axios.post('/board/info/diet', {
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
      REACT_QUERY_KEYS.INSERT],
    mutationFn: inputDietBoard,
    onSuccess: () => {
      console.log('게시글 등록 성공');
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

export default useInputDietBoard;
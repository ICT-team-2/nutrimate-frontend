import { useState } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LINKS, REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useNavigate } from 'react-router-dom';
import { BOARD } from '@src/component/board/const.js';

const useInputDietBoard = () => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //axios
  /**
   *
   * @param data {object}
   * @param data.boardTitle {string}
   * @param data.boardContent {string}
   * @param data.tagNameList {string[]} - 해시태그 리스트
   * @param data.files {File} - 이미지 파일
   * @param data.foodId {number[]} - 음식 id 리스트
   * @returns {Promise<any>}
   */
  const inputDietBoard = async (data) => {
    const formData = new FormData();
    for (let dataKey in data) {
      formData.append(dataKey, data[dataKey]);
    }
    formData.append('userId', sessionStorage.getItem('userId'));
    const response = await axios.post('/board/info/diet', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
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
    onSuccess: (data) => {
      console.log('게시글 등록 성공');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.INFO)
            && query.queryKey.includes(REACT_QUERY_KEYS.BOARD);
        },
      });
      navigate(LINKS.INFO_BOARD_VIEW + '/' + data.boardId, {
        state: {
          category: BOARD.INFO.FOOD.CATEGORY,
        },
      });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useInputDietBoard;
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useState } from 'react';

const useEditSportBoard = () => {

  const queryClient = useQueryClient();

  //axios
  /**
   * @param data {{boardId:number, boardTitle:string, boardContent:string,
   * hashtag:string, boardView:number, mapPaths: [], mapDistances: [],
   * mapCenterLat:number, mapCenterLng:number, mapZoomlevel:number,
   * userId:string}}
   * @returns {Promise<any>}
   */
  const editSportBoard = async (data) => {
    const response = await axios.put('/boards/sport', {
      ...data,
      boardCategory: 'exercise',
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.SPORT,
      REACT_QUERY_KEYS.UPDATE],
    mutationFn: editSportBoard,
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

export default useEditSportBoard;
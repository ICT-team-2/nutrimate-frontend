import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LINKS, REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOARD } from '@src/component/board/const.js';
import { toast } from 'react-toastify';

const useEditSportBoard = (boardId) => {

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //axios
  /**
   * @param data {{boardId:number, boardTitle:string, boardContent:string,
   * hashtag:string, boardView:number, mapPaths: [], mapDistances: [],
   * mapCenterLat:number, mapCenterLng:number, mapZoomlevel:number,
   * userId:string}}
   * @returns {Promise<any>}
   */
  const editSportBoard = async (data) => {
    const response = await axios.put(`/boards/sport/${boardId}`, {
      ...data,
      boardId: boardId,
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
      toast.success(TOAST_MESSAGE.BOARD.UPDATE.SUCCESS);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.INFO)
            && query.queryKey.includes(REACT_QUERY_KEYS.BOARD);
        },
      });
      navigate(LINKS.INFO_BOARD_VIEW + `/${boardId}`, {
        state: {
          category: BOARD.INFO.SPORT.CATEGORY,
        },
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.BOARD.UPDATE.ERROR);
      console.error(error);
    },
  });

};

export default useEditSportBoard;
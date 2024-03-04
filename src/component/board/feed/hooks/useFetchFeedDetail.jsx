import React from 'react';
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useQuery } from '@tanstack/react-query';

const useFetchFeedDetail = (boardId) => {
  //axios
  const fetchFeedDetail = async () => {
    const response = await axios.get(`/board/feed/view`, {
      params: {
        boardId: boardId,
        userId: sessionStorage.getItem('userId'),
      },
    });
    return response.data;
  };
  //react-query
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.BOARD, REACT_QUERY_KEYS.FEED, REACT_QUERY_KEYS.DETAIL, boardId],
    queryFn: fetchFeedDetail,
  });

};

export default useFetchFeedDetail;

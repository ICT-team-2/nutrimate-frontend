import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useEffect, useState } from 'react';

const useFetchInfoBoardList = (param) => {
  const { nowPage, receivePage, searchColumn, searchKeyword, boardCategory } = param;
  const [columnState, setColumnState] = useState(searchColumn);
  const [lastFetched, setLastFetched] = useState(null);

  useEffect(() => {
    if (searchKeyword.trim() === '') return;
    setColumnState(searchColumn);
  }, [searchColumn]);

  const fetchInfoBoardList = async () => {
    const now = Date.now();
    if (lastFetched && now - lastFetched < 500) {
      // 마지막 요청으로부터 1초가 지나지 않았으면 요청을 중단
      return Promise.resolve();
    }

    const response = await axios.get(`/board/info/list`, {
      params: {
        ...param,
        userId: sessionStorage.getItem('userId'),
      },
    });

    // 요청한 시간을 저장
    setLastFetched(now);
    return response.data;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.LIST,
      nowPage,
      receivePage,
      columnState,
      searchKeyword,
      boardCategory,
    ],
    queryFn: fetchInfoBoardList,
  });
};

export default useFetchInfoBoardList;

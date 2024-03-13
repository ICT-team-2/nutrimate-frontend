import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useEffect, useState } from 'react';
import { debounce } from '@src/utils/functions.js';

const useFetchInfoBoardList = (param) => {
  const { nowPage, receivePage, searchColumn, searchKeyword, boardCategory } = param;
  const [columnState, setColumnState] = useState(searchColumn);
  const [searchKeywordState, setSearchKeywordState] = useState(searchKeyword);

  //debounce
  const debounceSetSearchKeyword = debounce(setSearchKeywordState, 500);

  useEffect(() => {
    if (searchKeyword.trim() === '') return;
    setColumnState(searchColumn);
  }, [searchColumn]);

  useEffect(() => {
    debounceSetSearchKeyword(searchKeyword);
  }, [searchKeyword]);

  const fetchInfoBoardList = async () => {


    const response = await axios.get(`/board/info/list`, {
      params: {
        ...param,
        userId: sessionStorage.getItem('userId'),
      },
    });
    return response.data;
  };

  const debounceFetch = debounce(fetchInfoBoardList, 500);

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.BOARD,
      REACT_QUERY_KEYS.INFO,
      REACT_QUERY_KEYS.LIST,
      nowPage,
      receivePage,
      columnState,
      searchKeywordState.trim(),
      boardCategory,
    ],
    queryFn: fetchInfoBoardList,
  });
};

export default useFetchInfoBoardList;

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useAtom } from 'jotai/react';
import { userIdAtom } from '@src/pages/login/atom.js';

const useFetchChatroomList = () => {


  //axios
  const fetchChatroomList = async () => {

    const response = await axios.get('/dm/room/list', {
      params: {
        userId: sessionStorage.getItem('userId'),
      },
    });

    return response.data;
  };

  //react-query
  return useQuery({
    queryFn: fetchChatroomList,
    queryKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.LIST],
  });
};

export default useFetchChatroomList;
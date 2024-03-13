import axios from 'axios';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { useQuery } from '@tanstack/react-query';

const useFetchChatMessages = (chatroomId) => {
  //axios
  const fetchChatMessages = async () => {
    const response = await axios.get(`/dm/message/list/${chatroomId}`);
    return response.data;
  };

  return useQuery({
    queryKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHAT,
      chatroomId],
    queryFn: fetchChatMessages,
    staleTime: 0,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!chatroomId,
  });
};

export default useFetchChatMessages;
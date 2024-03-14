import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { addCommentFB } from '@src/component/notice/NotiBadge.jsx';

const useRegisterFollow = (followeeId) => {
  const userId = parseInt(sessionStorage.getItem('userId'));
  const queryClient = useQueryClient();
  const registerFollow = async () => {
    const response = await axios.post('/follow/follow', {
      followeeId: followeeId,
      followerId: userId,
    });
    return response.data;
  };

  return useMutation({
    mutationKey: [
      REACT_QUERY_KEYS.FOLLOW, REACT_QUERY_KEYS.INSERT,
      userId,
      followeeId,
    ],
    mutationFn: registerFollow,
    onSuccess: (data) => {
      addCommentFB(data.recordId,data,data?.userNick+'가 팔로우 했습니다.');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useRegisterFollow;
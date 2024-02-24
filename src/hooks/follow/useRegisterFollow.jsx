import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useRegisterFollow = (followeeId) => {
  const userId = parseInt(sessionStorage.getItem('userId'));

  const registerFollow = async () => {
    await axios.post('/follow/follow', {
      followeeId: followeeId,
      followerId: userId,
    });
  };

  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.FOLLOW, REACT_QUERY_KEYS.INSERT, userId, followeeId],
    mutationFn: registerFollow,
    onSuccess: () => {
      console.log('팔로우 성공');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useRegisterFollow;
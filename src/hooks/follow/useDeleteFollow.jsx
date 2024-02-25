import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useDeleteFollow = (followeeId) => {

  const userId = parseInt(sessionStorage.getItem('userId'));

  //axios
  const deleteFollow = async () => {
    await axios.delete('/follow/unfollow', {
      data: {
        followeeId: followeeId,
        userId: userId,
      },
    });
  };

  //react-query
  return useMutation({
    mutationKey: [REACT_QUERY_KEYS.FOLLOW, REACT_QUERY_KEYS.DELETE, userId, followeeId],
    mutationFn: deleteFollow,
    onSuccess: () => {
      console.log('팔로우 취소 성공');
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

export default useDeleteFollow;
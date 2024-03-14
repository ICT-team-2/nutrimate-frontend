import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE } from '@src/utils/const.js';
import { toast } from 'react-toastify';

const useChangeProfileImage = () => {

  const queryClient = useQueryClient();
  const userId = parseInt(sessionStorage.getItem('userId'));
  //axios
  // 유저 프로필을 변경합니다.
  const changeProfile = async (profile) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profileImage', profile);

    const response = await axios.put('/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };
  //react-query
  return useMutation({
    mutationFn: changeProfile,
    mutationKey: [REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.UPDATE],
    onSuccess: (data) => {
      toast.success(TOAST_MESSAGE.PROFILE.SUCCESS);
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.MEMBER_DATA)
            && query.queryKey.includes(userId);
        },
      });
    },
    onError: (error) => {
      toast.error(TOAST_MESSAGE.PROFILE.ERROR);
      console.error('프로필 변경 실패', error);
    },
  });
};

export default useChangeProfileImage;
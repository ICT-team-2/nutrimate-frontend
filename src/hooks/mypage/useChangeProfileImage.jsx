import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

const useChangeProfileImage = () => {

  const queryClient = useQueryClient();
  const userId = sessionStorage.getItem('userId');
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
      // console.log('프로필 변경 성공', data);
      queryClient.invalidateQueries([
        REACT_QUERY_KEYS.MEMBER_DATA,
        userId]);
    },
    onError: (error) => {
      console.log('프로필 변경 실패', error);
    },
  });
};

export default useChangeProfileImage;
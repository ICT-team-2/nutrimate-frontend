import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';
import { toast } from 'react-toastify';

const useChangeChatroomProfile = () => {

  const queryClient = useQueryClient();

  //axios
  /**
   * @param data
   * @param data.chatroomId {number}
   * @param data.profileImage {File}
   * @returns {Promise<any>}
   */
  const changeChatroomProfile = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
    const response = await axios.put(`/dm/room/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  };

  //react-query
  return useMutation({
    mutationFn: changeChatroomProfile,
    mutationKey: [REACT_QUERY_KEYS.DM,
      REACT_QUERY_KEYS.CHATROOM,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.UPDATE],
    onSuccess: () => {
      toast.success('프로필 변경 성공');
      queryClient.invalidateQueries({
        predicate: (query) => {
          return query.queryKey.includes(REACT_QUERY_KEYS.CHATROOM) &&
            query.queryKey.includes(REACT_QUERY_KEYS.DM);
        },
      });
    },
    onError: () => {
      toast.error('프로필 변경 실패');
      console.error('useChangeChatroomProfile onError');
    },
  });
};

export default useChangeChatroomProfile;
import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS } from '@src/utils/const.js';

/**
 * 회원 데이터를 가져오는 훅
 * @param profileUserId {number||string||undefined} 사용자 아이디 (기본값:
 *   sessionStorage.getItem('userId'))
 * @returns {*} react-query의 useQuery 결과
 */
const useFetchProfileData = (profileUserId = undefined) => {
  
  profileUserId = profileUserId || sessionStorage.getItem('userId');
  
  //axios
  // 유저 기본 데이터를 가져옵니다.
  const fetchMyData = async () => {
    const response = await axios.get('/profile', {
      params: {
        userId: sessionStorage.getItem('userId'),
        profileUserId: profileUserId,
      },
    });
    return response.data;
  };
  
  //react-query
  return useQuery({
    queryKey: [
      REACT_QUERY_KEYS.MEMBER,
      REACT_QUERY_KEYS.PROFILE,
      REACT_QUERY_KEYS.MEMBER_DATA,
      parseInt(profileUserId),
    ],
    queryFn: fetchMyData,
    
  });
};

export default useFetchProfileData;

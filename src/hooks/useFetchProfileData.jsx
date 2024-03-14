import axios from 'axios';
import { useQueries, useQuery } from '@tanstack/react-query';
import { REACT_QUERY_KEYS, TOAST_MESSAGE, TOAST_OPTIONS } from '@src/utils/const.js';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
    const toastTimeout = setTimeout(() => {
      toast(TOAST_MESSAGE.SLOW_NETWORK, TOAST_OPTIONS.WARN);
    }, 5000);

    const response = await axios.get('/profile', {
      params: {
        userId: sessionStorage.getItem('userId'),
        profileUserId: profileUserId,
      },
    }).catch((error) => {
      clearTimeout(toastTimeout);
    });
    clearTimeout(toastTimeout);
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
    staleTime: 1000 * 60 * 5,//5분
    enabled: !!profileUserId,
  });
};

export default useFetchProfileData;

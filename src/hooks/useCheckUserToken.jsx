import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const useCheckUserToken = () => {
  const [cookies] = useCookies(['ACCESS']); // 쿠키 가져오기(ACCESS 토큰)
  const [userId, setUserId] = useAtom(userIdAtom);//sessionStorage에 저장된 userId
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.ACCESS) {//ACCESS 토큰이 있을 경우
      const decodedToken = jwtDecode(cookies.ACCESS);
      setUserId(decodedToken?.userInfo.userId);
    } else {//ACCESS 토큰이 없을 경우
      setUserId(null);
      sessionStorage.removeItem('userId');
      navigate('/');
    }
  }, [cookies.ACCESS]);
};

export default useCheckUserToken;
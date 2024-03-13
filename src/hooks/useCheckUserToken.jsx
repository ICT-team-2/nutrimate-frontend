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
    if (!cookies.ACCESS) {
      setUserId(undefined);
      sessionStorage.removeItem('userId');
      navigate('/');
      return;
    }
    const decodedToken = jwtDecode(cookies.ACCESS);
    if (!decodedToken?.userInfo) {
      setUserId(undefined);
      sessionStorage.removeItem('userId');
      navigate('/');
      return;
    }
    sessionStorage.setItem('userId', decodedToken?.userInfo.userId);
    setUserId(decodedToken?.userInfo.userId);
  }, [cookies.ACCESS]);
};

export default useCheckUserToken;
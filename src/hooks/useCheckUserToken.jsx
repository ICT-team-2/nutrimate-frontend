import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
import { jwtDecode } from 'jwt-decode';
import { useLocation, useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

const useCheckUserToken = () => {
  const [cookies] = useCookies(['ACCESS']); // 쿠키 가져오기(ACCESS 토큰)
  const [userId, setUserId] = useAtom(userIdAtom);//sessionStorage에 저장된 userId
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const publicPaths = () => {
    const publicPath = [LINKS.LOGIN, LINKS.SURVEY, '/', LINKS.INFO];
    return publicPath.includes(pathname);
  };

  useEffect(() => {
    if (!cookies.ACCESS) {
      setUserId(undefined);
      sessionStorage.removeItem('userId');
      if (!publicPaths()) navigate('/');
      return;
    }
    const decodedToken = jwtDecode(cookies.ACCESS);
    if (!decodedToken?.userInfo) {
      sessionStorage.removeItem('userId');
      if (!publicPaths()) navigate('/');
      return;
    }
    sessionStorage.setItem('userId', decodedToken?.userInfo.userId);
    setUserId(decodedToken?.userInfo.userId);
  }, [cookies.ACCESS]);
};

export default useCheckUserToken;
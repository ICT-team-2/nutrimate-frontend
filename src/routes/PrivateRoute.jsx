import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LINKS, TOAST_OPTIONS } from '@src/utils/const.js';

const PrivateRoute = () => {
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userId == null)
      toast.warn('로그인이 필요한 서비스입니다.', TOAST_OPTIONS.WARN);
  }, []);

  if (userId == null)
    return <Navigate to={LINKS.LOGIN} replace />;

  return <Outlet />;
};

export default PrivateRoute;

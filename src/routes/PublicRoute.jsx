import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '@src/utils/const.js';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (userId != null || userId != undefined)
      toast.warn('이미 로그인이 되어있습니다.', TOAST_OPTIONS.WARN);
  }, []);

  if (userId == null)
    return <Outlet />;

  return <Navigate to="/" />;
};

export default PublicRoute;

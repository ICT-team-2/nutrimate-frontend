import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { LINKS, ROUTER_LINKS } from '@src/utils/const.js';
import MyInfoPage from '@src/pages/mypage/MyInfoPage.jsx';
import Layout from '@src/layout/Layout.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';

const MyPageRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path=":profileUserId" element={<MyInfoPage />}></Route>
        <Route
          path=""
          element={
            <Navigate to={`${LINKS.MYINFO}/${sessionStorage.getItem('userId')}`} />
          }
        ></Route>
        <Route path={'*'} element={<NotFound404Page />}></Route>
      </Route>

    </Routes>
  );
};

export default MyPageRoutes;

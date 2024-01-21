import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_LINKS } from '@src/utils/const.js';
import MyInfoPage from '@src/pages/mypage/MyInfoPage.jsx';
import Layout from '@src/layout/Layout.jsx';

const MyPageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<MyInfoPage />}></Route>

      </Route>

    </Routes>
  );
};

export default MyPageRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import LoginPage from '@src/pages/login/LoginPage.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';

const LoginRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LayoutWithoutSideBar />}>
        <Route path={ROUTER_LINKS.LOGIN} element={<LoginPage />}></Route>
        <Route path={'*'} element={<NotFound404Page />}></Route>
      </Route>
    </Routes>
  );
};

export default LoginRoutes;

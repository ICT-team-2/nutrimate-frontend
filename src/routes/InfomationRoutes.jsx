import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_LINKS } from '@src/utils/const.js';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import MainPage from '@src/pages/MainPage.jsx';

const InfomationRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutWithoutSideBar />}>
        <Route path="" element={<MainPage />}></Route>
      </Route>
    </Routes>
  );
};

export default InfomationRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import InfomationPage from '@src/pages/infomation/InfomationPage.jsx';
import PublicRoute from '@src/routes/PublicRoute.jsx';

const InfomationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LayoutWithoutSideBar />}>
        <Route path={''} element={<InfomationPage />}></Route>
        <Route path={'*'} element={<NotFound404Page />}></Route>
      </Route>
    </Routes>
  );
};

export default InfomationRoutes;

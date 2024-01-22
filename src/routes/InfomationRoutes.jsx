import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';

const InfomationRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<LayoutWithoutSideBar />}>
        <Route path={''} element={<NotFound404Page />}></Route>
        <Route path={'*'} element={<NotFound404Page />}></Route>

      </Route>
    </Routes>
  );
};

export default InfomationRoutes;

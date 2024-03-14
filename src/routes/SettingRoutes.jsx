import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InfoViewPage from '@src/pages/setting/InfoViewPage.jsx';
import SettingLayout from '@src/layout/SettingLayout.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';
import InfoEditPage from '@src/pages/setting/InfoEditPage.jsx';
import DeleteUserPage from '@src/pages/setting/DeleteUserPage.jsx';
import PrivateRoute from '@src/routes/PrivateRoute.jsx';

const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<SettingLayout />}>
          <Route path={ROUTER_LINKS.VIEW_INFO} element={<InfoViewPage />}></Route>
          <Route path={ROUTER_LINKS.EDIT_INFO} element={<InfoEditPage />}></Route>
          <Route path={ROUTER_LINKS.DELETE_USER} element={<DeleteUserPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default SettingRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_LINKS } from '@src/utils/const.js';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import AdminLayout from '@src/layout/AdminLayout.jsx';
import AdminChartPage from '@src/pages/admin/AdminChartPage.jsx';
import AdminManagePage from '@src/pages/admin/AdminManagePage.jsx';
import PrivateRoute from '@src/routes/PrivateRoute.jsx';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path="" element={<AdminLayout />}>
          <Route path={ROUTER_LINKS.CHART} element={<AdminChartPage />} />
          <Route path={ROUTER_LINKS.MANAGE} element={<AdminManagePage />} />
          <Route path={'*'} element={<NotFound404Page />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

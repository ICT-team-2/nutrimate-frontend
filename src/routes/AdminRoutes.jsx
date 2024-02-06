import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_LINKS } from '@src/utils/const.js';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import AdminLayout from '@src/layout/AdminLayout.jsx';
import AdminChartPage from '@src/pages/admin/AdminChartPage.jsx';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<AdminLayout />}>
        <Route path={ROUTER_LINKS.CHART} element={<AdminChartPage />} />
        <Route path={ROUTER_LINKS.MANAGE} element={<h1>Admin Dashboard</h1>} />
        <Route path={'*'} element={<NotFound404Page />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import InfoViewPage from '@src/pages/setting/InfoViewPage.jsx';
import SettingLayout from '@src/layout/SettingLayout.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';
import InfoEditPage from '@src/pages/setting/InfoEditPage.jsx';
import DeleteUser from '@src/component/setting/DeleteUser.jsx';

const SettingRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<SettingLayout />}>
        <Route path={ROUTER_LINKS.VIEW_INFO} element={<InfoViewPage />}></Route>
        <Route path={ROUTER_LINKS.EDIT_INFO} element={<InfoEditPage />}></Route>
        <Route path={ROUTER_LINKS.DELETE_USER} element={<DeleteUser />}></Route>
      </Route>
    </Routes>
  );
};

export default SettingRoutes;

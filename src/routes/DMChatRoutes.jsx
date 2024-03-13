import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '@src/layout/Layout.jsx';
import MyInfoPage from '@src/pages/mypage/MyInfoPage.jsx';
import { LINKS } from '@src/utils/const.js';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import DMChatPage from '@src/pages/dmchat/DMChatPage.jsx';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';

const DMChatRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<DMChatPage />}></Route>
      </Route>
      <Route path={'*'} element={<NotFound404Page />}></Route>
    </Routes>
  );
};

export default DMChatRoutes;

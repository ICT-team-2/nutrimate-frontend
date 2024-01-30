import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import MainPage from '@src/pages/MainPage.jsx';
import TestPage from '@src/pages/test/TestPage.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<LayoutWithoutSideBar logoWhite />}>
        <Route path={''} element={<MainPage />}></Route>
      </Route>
      <Route path={'/'} element={<LayoutWithoutSideBar />}>
        <Route path="test" element={<TestPage />}></Route>
        <Route path={'*'} element={<NotFound404Page />}></Route>
      </Route>
    </Routes>
  );
};

export default MainRoutes;

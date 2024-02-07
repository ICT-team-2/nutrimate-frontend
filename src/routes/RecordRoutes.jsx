import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@src/layout/Layout.jsx';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import ChallengePage from '@src/pages/challenge/ChallengePage.jsx';
import ChallengeChatPage from '@src/pages/challenge/ChallengeChatPage.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';
import RecordChartPage from '@src/pages/record/RecordChartPage.jsx';

const RecordRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={ROUTER_LINKS.CHART + '/:recordDate'} element={<RecordChartPage />}></Route>
        <Route path={ROUTER_LINKS.WRITE + '/:recordDate'} element={<RecordChartPage />}></Route>
      </Route>
      <Route path={'*'} element={<NotFound404Page />}></Route>
    </Routes>
  );
};

export default RecordRoutes;

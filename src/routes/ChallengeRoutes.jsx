import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@src/layout/Layout.jsx';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import ChallengePage from '@src/pages/challenge/ChallengePage.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';
import ChallengeChatPage from '@src/pages/challenge/ChallengeChatPage.jsx';
import PrivateRoute from '@src/routes/PrivateRoute.jsx';

const ChallengeRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path={''} element={<Layout />}>
          <Route path={''} element={<BoardLayout />}>
            <Route path="" element={<ChallengePage />}></Route>
            <Route path={ROUTER_LINKS.CHALLENGE_CHAT + '/:chatroomId'}
                   element={<ChallengeChatPage />}></Route>
          </Route>
        </Route>
      </Route>
      <Route path={'*'} element={<NotFound404Page />}></Route>
    </Routes>
  );
};

export default ChallengeRoutes;

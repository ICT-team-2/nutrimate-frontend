import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTER_LINKS } from '@src/utils/const.js';
import Layout from '@src/layout/Layout.jsx';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import AllBoardPage from '@src/pages/board/AllBoardPage.jsx';
import FoodBoardPage from '@src/pages/board/FoodBoardPage.jsx';
import SportBoardPage from '@src/pages/board/SportBoardPage.jsx';
import FeedBoardPage from '@src/pages/board/FeedBoardPage.jsx';
import InfoBoardViewPage from '@src/pages/board/InfoBoardViewPage.jsx';
import FeedBoardViewPage from '@src/pages/board/FeedBoardViewPage.jsx';
import InfoBoardWritePage from '@src/pages/board/InfoBoardWritePage.jsx';
import FeedBoardWritePage from '@src/pages/board/FeedBoardWritePage.jsx';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import ChallengePage from '@src/pages/challenge/ChallengePage.jsx';

const ChallengeRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={''} element={<BoardLayout />}>
          <Route path='' element={<ChallengePage />}></Route>
        </Route>
      </Route>
      <Route path={'*'} element={<NotFound404Page />}></Route>
    </Routes>
  );
};

export default ChallengeRoutes;

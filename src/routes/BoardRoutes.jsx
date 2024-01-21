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

const BoardRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path={''} element={<BoardLayout />}>
          <Route path={ROUTER_LINKS.ALL_INFO_BOARD + '/:page'}
                 element={<AllBoardPage />}></Route>
          <Route path={ROUTER_LINKS.FOOD_BOARD + '/:page'}
                 element={<FoodBoardPage />}></Route>
          <Route path={ROUTER_LINKS.SPORT_BOARD + '/:page'}
                 element={<SportBoardPage />}></Route>
          <Route path={ROUTER_LINKS.FEED_BOARD}
                 element={<FeedBoardPage />}></Route>
          <Route path={ROUTER_LINKS.INFO_BOARD_VIEW + '/:boardId'}
                 element={<InfoBoardViewPage />}></Route>
          <Route path={ROUTER_LINKS.FEED_BOARD_VIEW}
                 element={<FeedBoardViewPage />}></Route>
        </Route>

      </Route>
      <Route path={'/'} element={<LayoutWithoutSideBar />}>

        <Route path={ROUTER_LINKS.INFO_BOARD_WRITE}
               element={<InfoBoardWritePage />}></Route>
        <Route path={ROUTER_LINKS.FEED_BOARD_WRITE}
               element={<FeedBoardWritePage />}></Route>
      </Route>
    </Routes>
  );
};

export default BoardRoutes;

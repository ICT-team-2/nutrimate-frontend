import Layout from '@src/layout/Layout.jsx';
import LayoutWithoutSideBar from '@src/layout/LayoutWithoutSideBar.jsx';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@src/pages/MainPage.jsx';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import { theme } from '@src/config/theme/themeVariables.js';
import MuiGlobalStyles from '@src/styles/MuiGlobalStyles.jsx';
import { useAtomValue } from 'jotai/react';
import { isDarkMode } from '@src/config/theme/jotai.js';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import AllBoardPage from '@src/pages/board/AllBoardPage.jsx';
import FoodBoardPage from '@src/pages/board/FoodBoardPage.jsx';
import SportBoardPage from '@src/pages/board/SportBoardPage.jsx';
import FeedBoardPage from '@src/pages/board/FeedBoardPage.jsx';
import { ROUTER_LINKS } from '@src/utils/const.js';
import InfoBoardWritePage from '@src/pages/board/InfoBoardWritePage.jsx';
import InfoBoardViewPage from '@src/pages/board/InfoBoardViewPage.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';

function App() {
  const darkMode = useAtomValue(isDarkMode);
  const muiTheme = useMuiTheme();
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        ...theme,
        ...(darkMode ? theme.darkMode : theme.lightMode),
      }}>
        <MuiGlobalStyles />
        <Routes>
          <Route path={'/'} element={<LayoutWithoutSideBar />}>
            <Route path={''} element={<MainPage />}></Route>
            <Route path={ROUTER_LINKS.BOARD + '/' + ROUTER_LINKS.INFO_BOARD_WRITE}
                   element={<InfoBoardWritePage />}></Route>
            <Route path={'*'} element={<NotFound404Page />}></Route>
          </Route>

          <Route path={ROUTER_LINKS.INFO} element={<LayoutWithoutSideBar />}>
            <Route path={''} element={<MainPage />}></Route>
          </Route>
          <Route path={'/' + ROUTER_LINKS.BOARD} element={<Layout />}>
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
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

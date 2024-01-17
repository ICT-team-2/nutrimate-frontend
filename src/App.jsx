import Layout from '@src/pages/layout/Layout.jsx';
import LayoutWithoutSideBar from '@src/pages/layout/LayoutWithoutSideBar.jsx';
import { Route, Routes } from 'react-router-dom';
import MainPage from '@src/pages/MainPage.jsx';
import BoardLayout from '@src/pages/layout/BoardLayout.jsx';
import { theme } from '@src/config/theme/themeVariables.js';
import MuiGlobalStyles from '@src/styles/MuiGlobalStyles.jsx';
import { useAtomValue } from 'jotai/react';
import { isDarkMode } from '@src/config/theme/jotai.js';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';
import { ThemeProvider } from 'styled-components';
import {
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import AllBoardPage from '@src/pages/AllBoardPage.jsx';
import FoodBoardPage from '@src/pages/FoodBoardPage.jsx';
import SportBoardPage from '@src/pages/SportBoardPage.jsx';
import FeedBoardPage from '@src/pages/FeedBoardPage.jsx';

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
          </Route>
          <Route path={'/info/'} element={<Layout />}>
            <Route path={''} element={<MainPage />}></Route>
          </Route>
          <Route path={'/board'} element={<Layout />}>
            <Route path={''} element={<BoardLayout />}>
              <Route path={'all/:page'} element={<AllBoardPage />}></Route>
              <Route path={'food/:page'} element={<FoodBoardPage />}></Route>
              <Route path={'sport/:page'} element={<SportBoardPage />}></Route>
              <Route path={'feed'} element={<FeedBoardPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

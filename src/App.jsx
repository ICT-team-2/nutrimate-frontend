import { useRoutes } from 'react-router-dom';

import { theme } from '@src/config/theme/themeVariables.js';
import MuiGlobalStyles from '@src/styles/MuiGlobalStyles.jsx';
import { useAtomValue } from 'jotai/react';
import { isDarkModeAtom } from '@src/config/theme/atom.js';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ROUTER_LINKS } from '@src/utils/const.js';
import BoardRoutes from '@src/routes/BoardRoutes.jsx';
import MyPageRoutes from '@src/routes/MyPageRoutes.jsx';
import InfomationRoutes from '@src/routes/InfomationRoutes.jsx';
import MainRoutes from '@src/routes/MainRoutes.jsx';
import CalendarRoutes from '@src/routes/CalendarRoutes.jsx';
import SettingRoutes from '@src/routes/SettingRoutes.jsx';

function App () {
  const darkMode = useAtomValue(isDarkModeAtom);
  const muiTheme = useMuiTheme();
  const routes = useRoutes([
    { path: '/*', element: <MainRoutes /> },
    {
      path: '/' + ROUTER_LINKS.BOARD + '/*',
      element: <BoardRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.MYINFO + '/*',
      element: <MyPageRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.INFO + '/*',
      element: <InfomationRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.CALENDAR + '/*',
      element: <CalendarRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.SETTING + '/*',
      element: <SettingRoutes />,
    },
  ]);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        ...theme,
        ...(darkMode ? theme.darkMode : theme.lightMode),
      }}>
        <MuiGlobalStyles />
        {routes}

      </ThemeProvider>
    </MuiThemeProvider>
  )
    ;
}

export default App;

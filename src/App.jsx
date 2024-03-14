import { useRoutes } from 'react-router-dom';

import { theme } from '@src/config/theme/themeVariables.js';
import MuiGlobalStyles from '@src/styles/MuiGlobalStyles.jsx';
import { useAtomValue } from 'jotai/react';
import { isDarkModeAtom } from '@src/config/theme/atom.js';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ROUTER_LINKS } from '@src/utils/const.js';
import BoardRoutes from '@src/routes/BoardRoutes.jsx';
import MyPageRoutes from '@src/routes/MyPageRoutes.jsx';
import InfomationRoutes from '@src/routes/InfomationRoutes.jsx';
import MainRoutes from '@src/routes/MainRoutes.jsx';
import CalendarRoutes from '@src/routes/CalendarRoutes.jsx';
import SettingRoutes from '@src/routes/SettingRoutes.jsx';
import ChallengeRoutes from '@src/routes/ChallengeRoutes.jsx';
import ChatBotComponent from '@src/component/chat/chatbot/ChatBotComponent.jsx';
import LoginRoutes from '@src/routes/LoginRoutes.jsx';
import SurveyRoutes from '@src/routes/SurveyRoutes.jsx';
import AdminRoutes from '@src/routes/AdminRoutes.jsx';
import RecordRoutes from '@src/routes/RecordRoutes.jsx';
import { CssBaseline } from '@mui/material';
import useCheckUserToken from '@src/hooks/useCheckUserToken.jsx';
import DMChatRoutes from '@src/routes/DMChatRoutes.jsx';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const StyledToastContainer = styled(ToastContainer)`
    .Toastify__toast--default {
        color: black;
    }
`;
const ToastGlobalStyles = createGlobalStyle`
    :root {
        --toastify-spinner-color: ${({ theme }) => theme['primary-color']};
        --toastify-spinner-color-empty-area: #e5e5e5;
    }
`;


function App() {
  const darkMode = useAtomValue(isDarkModeAtom);
  const muiTheme = useMuiTheme();
  useCheckUserToken();

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
    {
      path: '/' + ROUTER_LINKS.CHALLENGE + '/*',
      element: <ChallengeRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.MEMBER + '/*',
      element: <LoginRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.SURVEY + '/*',
      element: <SurveyRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.ADMIN + '/*',
      element: <AdminRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.RECORD + '/*',
      element: <RecordRoutes />,
    },
    {
      path: '/' + ROUTER_LINKS.DM + '/*',
      element: <DMChatRoutes />,
    },
  ]);
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        ...theme,
        ...(darkMode ? theme.darkMode : theme.lightMode),
      }}>
        <CssBaseline />
        <MuiGlobalStyles />
        <ToastGlobalStyles />
        <StyledToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          closeOnClick
          transition={Flip}
          closeButton={false}
          stacked
        />
        {routes}
        <ChatBotComponent />
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@src/styles/font.css';
import { StyledEngineProvider } from '@mui/material';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { DevTools as JotaiDevTools } from 'jotai-devtools';

axios.defaults.baseURL = import.meta.env.REACT_APP_BACKEND_URL;
axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

const MainApp = () => {
  const queryClient = new QueryClient();
  return (
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          {/*<JotaiDevTools />*/}
          {/*<ReactQueryDevtools buttonPosition="bottom-left" />*/}
          <App />
        </BrowserRouter>
      </StyledEngineProvider>
    </QueryClientProvider>
    // </React.StrictMode>
  );
};

root.render(<MainApp />);


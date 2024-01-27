import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import '@src/styles/font.css';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StyledEngineProvider>
  </React.StrictMode>,
);

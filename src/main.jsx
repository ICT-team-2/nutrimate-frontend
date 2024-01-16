import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@src/App.jsx';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { theme, themeColor } from '@src/config/theme/themeVariables';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

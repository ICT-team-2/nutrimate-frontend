import { useState } from 'react';
import Header from '@src/component/common/Header/Header.jsx';
import Footer from '@src/component/common/Footer/Footer.jsx';
import styled, { ThemeProvider } from 'styled-components';
import {
  styled as muiStyled,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { theme } from '@src/config/theme/themeVariables.js';
import muiTheme from '@src/config/theme/useMuiTheme.js';
import { isDarkMode } from '@src/config/theme/jotai.js';
import { useAtomValue } from 'jotai/react';
import MuiGlobalStyles from '@src/styles/MuiGlobalStyles.jsx';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';
import { Outlet } from 'react-router-dom';

const footerHeight = '13px';
const Wrapper = styled.div`
    height: fit-content;
    min-height: 96vh;
    display: flex;
    flex-direction: column;
`;
const StyledFooter = muiStyled(Footer)`
    height: ${footerHeight};
`;

const Content = styled.div`
    flex-grow: 1;
    padding-bottom: ${footerHeight}; // 푸터의 높이만큼 padding-bottom을 추가
`;

function Layout () {
  const darkMode = useAtomValue(isDarkMode);
  const muiTheme = useMuiTheme();
  
  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        ...theme,
        ...(darkMode ? theme.darkMode : theme.lightMode),
      }}>
        <MuiGlobalStyles />
        <Wrapper>
          <Header />
          <Content>
            <Outlet />
          </Content>
        </Wrapper>
        <StyledFooter footerheight={footerHeight} />
      </ThemeProvider>
    </MuiThemeProvider>
  )
    ;
}

export default Layout;

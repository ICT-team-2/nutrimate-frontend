import { useState } from 'react';
import Header from '@src/component/common/Header/Header.jsx';
import Footer from '@src/component/common/Footer/Footer.jsx';
import styled, { ThemeProvider } from 'styled-components';
import { styled as muiStyled, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { theme } from '@src/config/theme/themeVariables';
import muiTheme from '@src/config/theme/useMuiTheme.js';
import { isDarkMode } from '@src/config/theme/jotai';
import { useAtomValue } from 'jotai/react';
import MuiGlobalStyles from '@src/config/theme/MuiGlobalStyles.jsx';
import useMuiTheme from '@src/config/theme/useMuiTheme.js';

const footerHeight = '40px';
const Wrapper = styled.div`
    height: auto;
    min-height: 97vw;
    padding-bottom: ${footerHeight};
`;
const StyledFooter = muiStyled(Footer)`
    height: ${footerHeight};
    position: relative;
    transform: translateY(-100%);
`;

function App() {
  const darkMode = useAtomValue(isDarkMode);
  const muiTheme = useMuiTheme();

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeProvider theme={{
        ...theme,
        ...(darkMode ? theme.darkMode : theme.lightMode),
      }}>
        {/*<GlobalStyles />*/}
        <MuiGlobalStyles />
        <Wrapper>
          <Header />
        </Wrapper>
        <StyledFooter footerheight={footerHeight} />
      </ThemeProvider>
    </MuiThemeProvider>
  )
    ;
}

export default App;

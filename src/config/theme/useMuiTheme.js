import { createTheme } from '@mui/material/styles';
import { theme, themeColor } from '@src/config/theme/themeVariables.js';
import { useAtomValue } from 'jotai/react';
import { isDarkModeAtom } from '@src/config/theme/atom.js';

const useMuiTheme = () => {

  const darkMode = useAtomValue(isDarkModeAtom);

  return createTheme({
    ...theme,
    ...(darkMode ? theme.darkMode : theme.lightMode),
    palette: {
      primary: {
        main: themeColor['primary-color'],
      },
      secondary: {
        main: themeColor['secondary-color'],
      },
      error: {
        main: themeColor['error-color'],
      },
      warning: {
        main: themeColor['warning-color'],
      },
      info: {
        main: themeColor['info-color'],
      },
      success: {
        main: themeColor['success-color'],
      },
    },
    action: {
      hover: themeColor['link-hover'],
    },
    typography: {
      fontFamily: '"JetBrains Mono", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });
};


export default useMuiTheme;
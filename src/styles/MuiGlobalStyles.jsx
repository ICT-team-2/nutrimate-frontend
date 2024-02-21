import { GlobalStyles } from '@mui/system';
import { theme } from '@src/config/theme/themeVariables.js';

const themeColor = {
  ...theme,
  ...theme.lightMode,
};

const MuiGlobalStyles = () => {

  return (<GlobalStyles styles={{
    body: {
      backgroundColor: themeColor['main-background'],
      color: themeColor['main-text'],
      fontFamily: themeColor['main-font'],
      fontSize: themeColor['main-font-size'],
      fontWeight: themeColor['main-font-weight'],
      lineHeight: themeColor['main-line-height'],
      letterSpacing: themeColor['main-letter-spacing'],
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    ':root': {
      '--main-background': themeColor['main-background'],
      '--main-text': themeColor['main-text'],
      '--main-font': themeColor['main-font'],
      '--main-font-size': themeColor['main-font-size'],
      '--main-font-weight': themeColor['main-font-weight'],
      '--main-line-height': themeColor['main-line-height'],
      '--main-letter-spacing': themeColor['main-letter-spacing'],

    },
  }} />);
};
export default MuiGlobalStyles;
import { GlobalStyles } from '@mui/system';
import { theme } from '@src/config/theme/themeVariables';

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
    },
  }} />);
};
export default MuiGlobalStyles;
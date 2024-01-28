import React from 'react';
import { Paper } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { TITLE } from '@src/utils/const.js';

const FooterPaper = muiStyled(Paper)(({ theme, footerheight }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: footerheight,
  position: 'relative',
  border: 'none',
  boxShadow: 'none',
  marginLeft: '15px',
  backgroundColor: theme['main-background'],
  transform: 'translateY(-100%)',
}));

const FooterTypo = muiStyled(Typography)`
  line-height: ${({ footerheight }) => footerheight};
  
`;


const Footer = ({ footerheight }) => {
  return (
    <FooterPaper footerheight={footerheight}>
      <FooterTypo variant="caption" color="initial"
                  footerheight={footerheight}
      >
        &copy; Copyright 2024. {TITLE.APP}{' '}
      </FooterTypo>
    </FooterPaper>
  );
};

export default Footer;

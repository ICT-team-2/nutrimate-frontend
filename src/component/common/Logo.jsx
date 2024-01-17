import React from 'react';
import Typography from '@mui/material/Typography';
import { APP_TITLE } from '@src/utils/const';
import { NoDecoLink } from '@src/component/GlobalComponents.jsx';

const Logo = () => {
  return (
    <Typography variant='h6' noWrap component='div' color='inherit'>
      <NoDecoLink to={'/'}>
        {APP_TITLE}
      </NoDecoLink>
    </Typography>
  );
};

export default Logo;

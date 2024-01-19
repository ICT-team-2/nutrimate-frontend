import React from 'react';
import Typography from '@mui/material/Typography';
import { TITLE } from '@src/utils/const';
import { NoDecoLink } from '@src/component/common/GlobalComponents.jsx';

const Logo = () => {
  return (
    <Typography variant="h6" noWrap component="div" color="inherit">
      <NoDecoLink to={'/'}>
        {TITLE.APP}
      </NoDecoLink>
    </Typography>
  );
};

export default Logo;

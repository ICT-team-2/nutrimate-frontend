import React from 'react';
import Divider from '@mui/material/Divider';

const DateDivider = ({ date }) => {
  return (
    <Divider>{date}</Divider>
  );
};

DateDivider.defaultProps = {
  date: '2024-01-01',
};

export default DateDivider;

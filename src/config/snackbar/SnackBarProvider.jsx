import React from 'react';

const SnackBarProvider = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

export default SnackBarProvider;

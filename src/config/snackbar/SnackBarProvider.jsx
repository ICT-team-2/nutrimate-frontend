import React, { createContext } from 'react';

export const SnackBarContext = createContext({});

const SnackBarProvider = (props) => {
  const { children } = props;
  return (
    <>
      {children}
    </>
  );
};

export default SnackBarProvider;

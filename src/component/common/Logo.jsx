import React from 'react';
import Typography from '@mui/material/Typography';
import { TITLE } from '@src/utils/const';
import { NoDecoLink } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';

const StyledLogo = styled.img`
    cursor: pointer;
    width: 108px;
`;

const Logo = () => {
  return (
    <StyledLogo src="/src/asset/image/logo.png" alt="logo"/>
  );
};

export default Logo;

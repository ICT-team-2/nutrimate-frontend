import React from 'react';
import Typography from '@mui/material/Typography';
import { TITLE } from '@src/utils/const';
import { NoDecoLink } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLogo = styled.img`
    cursor: pointer;
    width: 108px;
`;

const Logo = () => {
  return (
    <Link to='/'>
    <StyledLogo src='/src/asset/image/logo.png' alt='logo' />
    </Link>
  );
};

export default Logo;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLogo = styled.img`
    cursor: pointer;
    width: 108px;
`;

const StyledLogoWhite = styled(StyledLogo)`
    position: absolute;
    top: 2px;
    height: 66.7px;
`;

const Logo = ({ logoWhite }) => {
  return (
    <Link to="/">
      {
        logoWhite ?
          <StyledLogoWhite src="/src/asset/image/LogoWhite.png" alt="logo" /> :
          <StyledLogo src="/src/asset/image/Logo.png" alt="logo" />
      }
    </Link>
  );
};

Logo.defaultProps = {
  logoWhite: false,
};

export default Logo;

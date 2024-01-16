import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledContainer = muiStyled(Container)`
    margin: 0 6vw;
`;

export const RelativeWrapper = styled.div`
    position: relative;
`;

export const NoDecoLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

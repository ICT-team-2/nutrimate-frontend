import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

export const SurveyContainer = styled.div`
    margin: auto;
    display: inline-block;


`;
export const SurveyFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

export const StyledTitleTypography = styled(Typography)`
    margin-bottom: 20px;
`;
export const TitleTypography = ({ children }) => {
  return <Typography variant='h4'>
    {children}
  </Typography>;
};
export const StyledSubTitleTypography = styled(Typography)`
    margin-bottom: 20px;
    color: ${({ theme }) => theme['extra-light-text']};
`;
export const SubTitleTypography = ({ children }) => {
  return <StyledSubTitleTypography
    variant='h6'>{children}
  </StyledSubTitleTypography>;
};

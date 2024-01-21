import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import React from 'react';


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

export const StyledSearchInput = muiStyled(TextField)({
  '& .MuiOutlinedInput-root': {
    // borderRadius: '50px',
    backgroundColor: '#fff',
  },
});


export const CustomSearchInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, id, size } = props;
  return <StyledSearchInput
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    label={label} id={id} size={size}
  />;
};
CustomSearchInput.defaultProps = {
  label: 'Search',
  id: 'search',
  size: 'small',
};

const StyledAvatar = muiStyled(Avatar)`
  width: ${({ size }) => size || '40'}px;
  height: ${({ size }) => size || '40'}px;
  ${({ variant }) => variant === 'rounded' && `
    border-radius: 22px;
  `}
`;


export const UserAvatar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userNick, src, size, variant } = props;
  return <StyledAvatar
    alt={userNick}
    src={src}
    size={size}
    variant={variant}
  />;
};

UserAvatar.defaultProps = {
  userNick: 'Remy Sharp',
  src: '/static/images/avatar/2.jpg',
  size: 40,
  variant: 'circular',
};

export const BoardSubtitleTypo = ({ text }) => {
  return <h5 style={{ margin: '8px 0' }}>{text}</h5>;
};

export const FlexGrowDiv = styled.div`
    flex-grow: 1;
`;

export const Seperator = '·';
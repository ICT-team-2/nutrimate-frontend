import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import Typography from '@mui/material/Typography';


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
    borderRadius: '50px', // '50px'가 아닌 50px로 변경
    backgroundColor: '#fff', // background-color가 아닌 backgroundColor로 변경
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
`;


export const UserAvatar = (props) => {
  // eslint-disable-next-line react/prop-types
  const { userNick, profileLink, size } = props;
  return <StyledAvatar alt={userNick} src={profileLink} size={size} />;
};

UserAvatar.defaultProps = {
  userNick: 'Remy Sharp',
  profileLink: '/static/images/avatar/2.jpg',
  size: 40,
};

export const BoardSubtitleTypo = ({ text }) => {
  return <h5 style={{ margin: '8px 0' }}>{text}</h5>;
};

export const FlexGrowDiv = styled.div`
    flex-grow: 1;
`;
export const SeperatorDiv = styled.div`
    display: inline-block;
`;
export const Seperator = '·';
import { styled as muiStyled } from '@mui/material/styles';
import { Container, InputAdornment, TextField } from '@mui/material';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import React from 'react';

export const StyledContainer = muiStyled(Container)`
    margin: 0 6vw;
    width: auto;
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
/**
 * 검색창을 커스텀한 컴포넌트입니다.
 * @param props {{label: string, id: string, size: string, value: string,
 *   callback: function}} - 검색창을 커스텀한 컴포넌트의 속성들입니다.
 * @param props.label {string} - 검색창의 라벨입니다.
 * @param props.id {string} - 검색창의 id입니다.
 * @param props.size {string} - 검색창의 크기입니다.
 * @param props.value {string} - 검색창의 값입니다.
 * @param props.callback {function} - 검색창에서 엔터를 눌렀을 때 실행될 콜백함수입니다.
 * @param props.searchValue {string} - 검색창의 값을 변경할 수 있는 state(변수)입니다.
 * @param props.setSearchValue {function} - 검색창의 값을 변경할 수 있는 콜백함수입니다.
 * @returns {Element}
 * @constructor
 */
export const CustomSearchInput = (props) => {
  // eslint-disable-next-line react/prop-types
  const { label, id, size, callback, searchValue, setSearchValue } = props;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      callback();
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return <StyledSearchInput
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      ),
    }}
    label={label} id={id} size={size} value={searchValue}
    onKeyPress={handleKeyPress}
    onChange={handleChange}  // onChange 핸들러를 추가합니다.
  />;
};

CustomSearchInput.defaultProps = {
  label: 'Search',
  id: 'search',
  size: 'small',
  callback: () => {
    console.log('Enter key pressed');
  },
};


const StyledAvatar = muiStyled(Avatar)`
  width: ${({ size }) => size || '40'}px;
  height: ${({ size }) => size || '40'}px;
  ${({ variant }) => variant === 'rounded' && `
    border-radius: 22px;
  `}
`;

/**
 * 유저의 프로필 사진을 보여주는 컴포넌트입니다.
 *
 * @param props {{userNick: string, src: string, size: number, variant:
 *   string}} - 유저의 프로필 사진을 보여주는 컴포넌트의 속성들입니다.
 * @param props.userNick {string} - 유저의 닉네임입니다.
 * @param props.src {string} - 유저의 프로필 사진의 url입니다.(혹은 base64, blob)
 * src의 내용은 const uploadImg = useAtomValue(uploadedImageAtom);로 받아올 수 있습니다.
 * @param props.size {number} - 유저의 프로필 사진의 크기입니다.
 * @param props.variant {'circular'|'rounded'} - 유저의 프로필 사진의 모양입니다.
 * @param props.sx {object} - 유저의 프로필 사진의 sx입니다.(mui의 sx)
 * @param props.className {string} - 유저의 프로필 사진의 className입니다.(styled-components를 위해서)
 * @returns {Element} 유저의 프로필 사진을 보여주는 컴포넌트에 대한 JSX
 */
export const UserAvatar = (props) => {
  const { userNick, src, size, variant, sx, className } = props;

  return <StyledAvatar
    alt={userNick}
    src={src || '/static/images/avatar/2.jpg'}
    size={size}
    variant={variant}
    sx={sx}
    className={className}
  />;
};

UserAvatar.defaultProps = {
  userNick: 'Remy Sharp',
  src: null,
  size: 40,
  variant: 'circular',
};

export const BoardSubtitleTypo = ({ text }) => {
  return <h5 style={{ margin: '8px 0' }}>{text}</h5>;
};

export const FlexGrowDiv = styled.div`
    flex-grow: ${({ grow }) => grow || 1};
`;

export const FlexDiv = styled.div`
    display: flex;
    flex-direction: ${({ flexdirection }) => flexdirection || 'row'};
`;

export const Seperator = '·';
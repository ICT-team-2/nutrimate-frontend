import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/UserViewInfo.jsx';


const StyledTextField = muiStyled(TextField)`
    width: 80%;
    margin-right: 30px;
    & .MuiOutlinedInput-input.Mui-disabled{
      color: black;
      -webkit-text-fill-color: black;
	}
`;
const StyledLabel = styled.label`
    margin: auto 0;
    width: 30%;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};
`;


const AdditionalInfos = (props) => {
  const { title, label, disabled, value,onChange } = props;
  const [isFocused, setIsFocused] = useState(undefined);

  return (
    <UserInfoContainerDiv>
      <StyledLabel
        htmlFor={title}
        focus={isFocused}
      >{title}</StyledLabel>
      {/*<FlexGrowDiv />*/}
      <StyledTextField
        label={label}
        id={title}
        disabled={disabled}
        value={value ?? ''}
        onFocus={() => setIsFocused('true')}
        onBlur={() => setIsFocused(undefined)}
        onChange={onChange}
      ></StyledTextField>
    </UserInfoContainerDiv>
  );
};
AdditionalInfos.defaultProps = {
  disabled: false,
};

export default AdditionalInfos;

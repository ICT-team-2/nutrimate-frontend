import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/AdditionalInfos.jsx';


const StyledTextField = muiStyled(TextField)`
    width: 80%;
    margin-right: 30px;
`;
const StyledLabel = styled.label`
    margin: auto 0;
    width: 30%;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};
`;


const EditAdditionalInfos = (props) => {
  const { title, label } = props;
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
        onFocus={() => setIsFocused('true')}
        onBlur={() => setIsFocused(undefined)}
      ></StyledTextField>
    </UserInfoContainerDiv>
  );
};

export default EditAdditionalInfos;

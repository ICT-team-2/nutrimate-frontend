import React, { useState } from 'react';

import { styled as muiStyled } from '@mui/material/styles';
import { InputLabel, TextField } from '@mui/material';
import { USERINFOS } from '@src/component/setting/const.js';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/UserViewInfo.jsx';

const StyledTextField = muiStyled(TextField)`
    width: 35%;
    & .MuiOutlinedInput-input.Mui-disabled{
      color: black;
      -webkit-text-fill-color: black;
    }
`;
const StyledLabel = muiStyled(InputLabel)`
    margin: auto 0;
    width: 12.5%;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};

`;
const HeightWeightInfo = ({ disabled }) => {
  const [isHeightFocused, setIsHeightFocused] = useState(undefined);
  const [isWeightFocused, setIsWeightFocused] = useState(undefined);

  return (
    <UserInfoContainerDiv>
      <StyledLabel
        htmlFor={USERINFOS.HEIGHT.ID}
        focus={isHeightFocused}
      >
        {USERINFOS.HEIGHT.TITLE}
      </StyledLabel>
      <StyledTextField
        label={USERINFOS.HEIGHT.LABEL}
        id={USERINFOS.HEIGHT.ID}
        onFocus={() => setIsHeightFocused('true')}
        onBlur={() => setIsHeightFocused(undefined)}
        disabled={disabled}
      >
      </StyledTextField>

      <StyledLabel
        htmlFor={USERINFOS.WEIGHT.ID}
        focus={isWeightFocused}
      >
        {USERINFOS.WEIGHT.TITLE}
      </StyledLabel>
      <StyledTextField
        label={USERINFOS.WEIGHT.LABEL} id={USERINFOS.WEIGHT.ID}
        onFocus={() => setIsWeightFocused('true')}
        onBlur={() => setIsWeightFocused(undefined)}
        disabled={disabled}
      ></StyledTextField>
    </UserInfoContainerDiv>
  );
};

export default HeightWeightInfo;

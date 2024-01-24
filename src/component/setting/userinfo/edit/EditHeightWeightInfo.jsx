import React, { useState } from 'react';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/AdditionalInfos.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import { InputLabel, TextField } from '@mui/material';

const StyledTextField = muiStyled(TextField)`
    width: 35%;

`;
const StyledLabel = muiStyled(InputLabel)`
    margin: auto 0;
    width: 12.5%;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};

`;
const EditHeightWeightInfo = () => {
  const [isHeightFocused, setIsHeightFocused] = useState(undefined);
  const [isWeightFocused, setIsWeightFocused] = useState(undefined);

  return (
    <UserInfoContainerDiv>
      <StyledLabel
        htmlFor="height"
        focus={isHeightFocused + ''}
      >
        키
      </StyledLabel>
      <StyledTextField
        label="키(cm)" id="height"
        onFocus={() => setIsHeightFocused('true')}
        onBlur={() => setIsHeightFocused(undefined)}
      >
      </StyledTextField>

      <StyledLabel
        htmlFor="weight"
        focus={isWeightFocused + ''}
      >
        몸무게
      </StyledLabel>
      <StyledTextField
        label="몸무게(kg)" id="weight"
        onFocus={() => setIsWeightFocused('true')}
        onBlur={() => setIsWeightFocused(undefined)}
      ></StyledTextField>
    </UserInfoContainerDiv>
  );
};

export default EditHeightWeightInfo;

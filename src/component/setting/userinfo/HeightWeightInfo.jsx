import React, { useState } from 'react';

import { styled as muiStyled } from '@mui/material/styles';
import { InputLabel, TextField } from '@mui/material';
import { SETTING_USER_INFOS } from '@src/component/setting/const.js';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/UserViewInfo.jsx';
import { useAtom } from 'jotai';
import { heightStateAtom, weightStateAtom } from '../atom';

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
const HeightWeightInfo = ({ disabled}) => {
  const [isHeightFocused, setIsHeightFocused] = useState(false);
  const [isWeightFocused, setIsWeightFocused] = useState(false);

  const [height, setHeight] = useAtom(heightStateAtom);
  const [weight, setWeight] = useAtom(weightStateAtom);


  return (
    <UserInfoContainerDiv>
      <StyledLabel
        htmlFor={SETTING_USER_INFOS.HEIGHT.ID}
        focus={isHeightFocused}
      >
        {SETTING_USER_INFOS.HEIGHT.TITLE}
      </StyledLabel>
      <StyledTextField
        label={SETTING_USER_INFOS.HEIGHT.LABEL}
        id={SETTING_USER_INFOS.HEIGHT.ID}
        onFocus={() => setIsHeightFocused(true)}
        onBlur={() => setIsHeightFocused(false)}
        disabled={disabled}
        value={height}
        type="number"
        InputProps={{ inputProps: { min: 0 } }} // 최소값을 0으로 설정
        onChange={(e) => setHeight(e.target.value)}
      />

      <StyledLabel
        htmlFor={SETTING_USER_INFOS.WEIGHT.ID}
        focus={isWeightFocused}
      >
        {SETTING_USER_INFOS.WEIGHT.TITLE}
      </StyledLabel>
      <StyledTextField
        label={SETTING_USER_INFOS.WEIGHT.LABEL}
        id={SETTING_USER_INFOS.WEIGHT.ID}
        onFocus={() => setIsWeightFocused(true)}
        onBlur={() => setIsWeightFocused(false)}
        disabled={disabled}
        value={weight}
        type="number"
        InputProps={{ inputProps: { min: 0 } }} // 최소값을 0으로 설정
        onChange={(e) => setWeight(e.target.value)}
      />
    </UserInfoContainerDiv>
  );
};

export default HeightWeightInfo;


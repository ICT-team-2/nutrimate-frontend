import React, { useState } from 'react';

import { styled as muiStyled } from '@mui/material/styles';
import { InputLabel, TextField } from '@mui/material';
import { SETTING_USER_INFOS } from '@src/component/setting/const.js';
import { UserInfoContainerDiv } from '@src/component/setting/userinfo/UserViewInfo.jsx';
import { heIL } from '@mui/x-date-pickers';
import { heightStateAtom, weightStateAtom } from '../atom';
import { useAtom } from 'jotai';

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
        onFocus={() => setIsHeightFocused('true')}
        onBlur={() => setIsHeightFocused(undefined)}
        disabled={disabled}
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      >
      </StyledTextField>

      <StyledLabel
        htmlFor={SETTING_USER_INFOS.WEIGHT.ID}
        focus={isWeightFocused}
      >
        {SETTING_USER_INFOS.WEIGHT.TITLE}
      </StyledLabel>
      <StyledTextField
        label={SETTING_USER_INFOS.WEIGHT.LABEL} id={SETTING_USER_INFOS.WEIGHT.ID}
        onFocus={() => setIsWeightFocused('true')}
        onBlur={() => setIsWeightFocused(undefined)}
        disabled={disabled}
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      ></StyledTextField>
    </UserInfoContainerDiv>
  );
};

export default HeightWeightInfo;

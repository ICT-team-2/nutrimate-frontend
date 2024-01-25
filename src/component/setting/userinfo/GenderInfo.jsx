import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { USERINFOS } from '@src/component/setting/const.js';

const StyledFormControl = muiStyled(FormControl)`
    width: 50%;
    margin-left: 30px;
`;
const StyledFormControlLabel = muiStyled(FormControlLabel)`
    & .MuiTypography-body1.MuiFormControlLabel-label.Mui-disabled{
    color: black;
    -webkit-text-fill-color: black;
  }
`;

// 커스텀 Radio 컴포넌트
const CustomRadio = muiStyled(Radio)(({ theme }) => ({
  '&.Mui-disabled.Mui-checked ': {
    color: theme['primary-color'],
  },
}));

const StyledRadioGroup = muiStyled(RadioGroup)`
     display: flex;
     flex-direction: row;
`;
const StyledFormLabel = muiStyled(FormLabel)`
    color:black;
`;

export default function GenderInfo({ disabled }) {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledFormControl
    >
      <StyledFormLabel>{USERINFOS.GENDER.TITLE}</StyledFormLabel>
      <StyledRadioGroup
        value={value}
        onChange={handleChange}
      >
        <StyledFormControlLabel
          value={USERINFOS.GENDER.MALE.VALUES}
          control={<CustomRadio />}
          label={USERINFOS.GENDER.MALE.LABEL}
          disabled={disabled}
          checked
        />
        <StyledFormControlLabel
          value={USERINFOS.GENDER.FEMALE.VALUES}
          control={<CustomRadio />}
          label={USERINFOS.GENDER.FEMALE.LABEL}
          disabled={disabled}
        />
      </StyledRadioGroup>
    </StyledFormControl>
  );
}
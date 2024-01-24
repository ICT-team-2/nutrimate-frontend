import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

const StyledFormControl = muiStyled(FormControl)`
    width: 50%;
    margin-left: 30px;
`;
const StyledFormControlLabel = muiStyled(FormControlLabel)`
`;
const StyledRadioGroup = muiStyled(RadioGroup)`
     display: flex;
     flex-direction: row;
`;
const StyledFormLabel = muiStyled(FormLabel)`
    color:black;
`;

export default function EditGenderInfo() {
  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <StyledFormControl>
      <StyledFormLabel>성별</StyledFormLabel>
      <StyledRadioGroup
        value={value}
        onChange={handleChange}
      >
        <StyledFormControlLabel value="M" control={<Radio />} label="남성" />
        <StyledFormControlLabel value="F" control={<Radio />} label="여성" />
      </StyledRadioGroup>
    </StyledFormControl>
  );
}
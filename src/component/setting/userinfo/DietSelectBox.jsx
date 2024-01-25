import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { USERINFOS } from '@src/component/setting/const.js';
import { useAtom } from 'jotai/react';
import { dietStateAtom } from '@src/component/setting/atom.js';

const StyledLabel = styled.label`
    margin-left: 30px;
    width: 30%;
    text-align: center;
    color: ${({ theme, focus }) => focus ? theme['primary-color'] : 'black'};
`;

const SelectContainer = styled.div`
    margin: 30px;
    width: 40%;


`;

const StyledSelect = muiStyled(Select)`
  & .MuiSelect-outlined.Mui-disabled{
    color: black;
    -webkit-text-fill-color: black;
  }
`;

const DietSelectBox = (props) => {
  const { title, label, keys, values, disabled } = props;
  const [isFocused, setIsFocused] = useState(undefined);

  const [diet, setDiet] = useAtom(dietStateAtom);

  const handleChange = (event) => {
    setDiet(event.target.value);
  };
  return (
    <>
      <StyledLabel
        focus={isFocused}
      >
        {title}
      </StyledLabel>
      <br />
      <SelectContainer>
        <FormControl fullWidth>
          <InputLabel id="diet">{label}</InputLabel>
          <StyledSelect
            label={label}
            labelId="diet"
            id="diet"
            onFocus={() => setIsFocused('true')}
            onBlur={() => setIsFocused(undefined)}
            value={diet}
            onChange={handleChange}
            disabled={disabled}
          >
            {keys?.map((item, index) =>
              (<MenuItem
                key={item + index}
                value={item}>{values[index]}
              </MenuItem>))}
          </StyledSelect>
        </FormControl>
      </SelectContainer>
    </>
  );
};
DietSelectBox.defaultProps = {
  title: USERINFOS.DIET.TITLE,
  label: USERINFOS.DIET.LABEL,
  values: USERINFOS.DIET.VALUES,
  keys: USERINFOS.DIET.KEYS,
};

export default DietSelectBox;

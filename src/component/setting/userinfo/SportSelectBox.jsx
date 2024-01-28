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

const SportSelectBox = (props) => {
  const { title, label, keys, values, id, disabled } = props;
  const [isFocused, setIsFocused] = useState(undefined);
  const [exercise, setExercise] = useState(keys[0]);
  const [diet, setDiet] = useAtom(dietStateAtom);

  const handleChange = (event) => {

    setExercise(event.target.value);
  };
  console.log(keys);
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
          <InputLabel id="exercise">{label}</InputLabel>
          <StyledSelect
            label={label}
            labelId="exercise"
            id="exercise"
            onFocus={() => setIsFocused('true')}
            onBlur={() => setIsFocused(undefined)}
            value={exercise}
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
SportSelectBox.defaultProps = {
  title: USERINFOS.SPORT.TITLE,
  label: USERINFOS.SPORT.LABEL,
  values: USERINFOS.SPORT.VALUES,
  keys: USERINFOS.SPORT.KEYS,
};

export default SportSelectBox;

import React, { useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';

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
`;

const EditSelectBox = (props) => {
  const { title, label, keys, values } = props;
  const [isFocused, setIsFocused] = useState(undefined);
  const [exercise, setExercise] = useState(keys[0]);


  const handleChange = (event) => {
    setExercise(event.target.value);
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
          <InputLabel id="exercise">{label}</InputLabel>
          <StyledSelect
            label={label}
            labelId="exercise"
            id="exercise"
            onFocus={() => setIsFocused('true')}
            onBlur={() => setIsFocused(undefined)}
            value={exercise}
            onChange={handleChange}
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
EditSelectBox.defaultProps = {
  title: '일주일에 운동을 하는 횟수',
  label: '운동횟수',
  values: ['적게(0-2회)', '보통(3-5회)', '많이(5-7회)'],
  keys: ['LOW', 'MEDIUM', 'HIGH'],
};

export default EditSelectBox;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { USERINFOS } from '@src/component/setting/const.js';
import { useAtom, useSetAtom } from 'jotai/react';
import { carboAtom, dietStateAtom, fatAtom, proteinAtom } from '@src/component/setting/atom.js';

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
  const setCarbo = useSetAtom(carboAtom);
  const setProtein = useSetAtom(proteinAtom);
  const setFat = useSetAtom(fatAtom);

  useEffect(() => {
    switch (diet) {
      case USERINFOS.DIET.NORMAL.KEYS:
        setCarbo(USERINFOS.DIET.NORMAL.CARBO);
        setProtein(USERINFOS.DIET.NORMAL.PROTEIN);
        setFat(USERINFOS.DIET.NORMAL.FAT);
        break;
      case USERINFOS.DIET.EXERCISE.KEYS:
        setCarbo(USERINFOS.DIET.EXERCISE.CARBO);
        setProtein(USERINFOS.DIET.EXERCISE.PROTEIN);
        setFat(USERINFOS.DIET.EXERCISE.FAT);
        break;
      case USERINFOS.DIET.KITO.KEYS:
        setCarbo(USERINFOS.DIET.KITO.CARBO);
        setProtein(USERINFOS.DIET.KITO.PROTEIN);
        setFat(USERINFOS.DIET.KITO.FAT);
        break;
      case USERINFOS.DIET.VEGAN.KEYS:
        setCarbo(USERINFOS.DIET.VEGAN.CARBO);
        setProtein(USERINFOS.DIET.VEGAN.PROTEIN);
        setFat(USERINFOS.DIET.VEGAN.FAT);
        break;
      default:
        break;
    }
  }, [diet]);


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

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel, Select } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { SETTING_USER_INFOS } from '@src/component/setting/const.js';
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
  const { title, label, keys, values, disabled, onChange } = props;
  const [isFocused, setIsFocused] = useState(undefined);

  const [diet, setDiet] = useAtom(dietStateAtom);
  const setCarbo = useSetAtom(carboAtom);
  const setProtein = useSetAtom(proteinAtom);
  const setFat = useSetAtom(fatAtom);

  useEffect(() => {
    switch (diet) {
      case SETTING_USER_INFOS.DIET.NORMAL.KEYS:
        setCarbo(SETTING_USER_INFOS.DIET.NORMAL.CARBO);
        setProtein(SETTING_USER_INFOS.DIET.NORMAL.PROTEIN);
        setFat(SETTING_USER_INFOS.DIET.NORMAL.FAT);
        break;
      case SETTING_USER_INFOS.DIET.EXERCISE.KEYS:
        setCarbo(SETTING_USER_INFOS.DIET.EXERCISE.CARBO);
        setProtein(SETTING_USER_INFOS.DIET.EXERCISE.PROTEIN);
        setFat(SETTING_USER_INFOS.DIET.EXERCISE.FAT);
        break;
      case SETTING_USER_INFOS.DIET.KITO.KEYS:
        setCarbo(SETTING_USER_INFOS.DIET.KITO.CARBO);
        setProtein(SETTING_USER_INFOS.DIET.KITO.PROTEIN);
        setFat(SETTING_USER_INFOS.DIET.KITO.FAT);
        break;
      case SETTING_USER_INFOS.DIET.VEGAN.KEYS:
        setCarbo(SETTING_USER_INFOS.DIET.VEGAN.CARBO);
        setProtein(SETTING_USER_INFOS.DIET.VEGAN.PROTEIN);
        setFat(SETTING_USER_INFOS.DIET.VEGAN.FAT);
        break;
      default:
        break;
    }
  }, [diet]);


  const handleChange = (event) => {
    setDiet(event.target.value);
    onChange(event)
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
  title: SETTING_USER_INFOS.DIET.TITLE,
  label: SETTING_USER_INFOS.DIET.LABEL,
  values: SETTING_USER_INFOS.DIET.VALUES,
  keys: SETTING_USER_INFOS.DIET.KEYS,
  onChange:()=>{}
};

export default DietSelectBox;

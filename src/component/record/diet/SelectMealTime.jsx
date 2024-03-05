import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SELECT_MEAL_TIME } from '@src/component/record/const.js';
import { useAtom } from 'jotai/react';
import { selectedMealTimeAtom } from '@src/component/record/atom.js';

export default function SelectMealTime () {
  const [mealTime, setMealTime] = useAtom(selectedMealTimeAtom);
  
  const handleChange = (event) => {
    console.log(event.target.value);
    setMealTime(event.target.value);};
  
  return (
    <FormControl size='small'>
        <InputLabel>식사시간</InputLabel>
        <Select sx={{ minWidth: 80 }}
                value={mealTime}
                label='mealTime'
                onChange={handleChange}
        >
          {Object.values(SELECT_MEAL_TIME).map(
            (value) =>
              <MenuItem
                key={value.VALUE}
                value={value.VALUE}>{value.LABEL}
              </MenuItem>,
          )}
        </Select>
      </FormControl>
  );
}

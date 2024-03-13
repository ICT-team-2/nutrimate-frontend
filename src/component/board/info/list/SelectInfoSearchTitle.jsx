import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { SELECT_COLUMNS } from '@src/component/board/const.js';

const StyledFormControl = styled(FormControl)`
    margin-right: 6px;
    min-width: 100px;

`;

export default function SelectInfoSearchTitle({ selectColumn, setSelectColumn }) {

  const handleChange = (event) => {
    setSelectColumn(event.target.value);
  };

  return (
    <StyledFormControl sx={{ mr: 1, minWidth: 100 }} size="small">
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectColumn}
        onChange={handleChange}
      >
        {Object.values(SELECT_COLUMNS).map((value) => (
          <MenuItem key={value.value} value={value.value}>
            {value.label}
          </MenuItem>))}
        )
      </Select>
    </StyledFormControl>
  );
}

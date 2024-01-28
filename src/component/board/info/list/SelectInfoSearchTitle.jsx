import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from 'styled-components';
import { useState } from 'react';

const StyledFormControl = styled(FormControl)`
    margin-right: 6px;
    min-width: 100px;

`;

export default function SelectInfoSearchTitle () {
  const [searchTitle, setSearchTitle] = useState('boardTitle');
  
  const handleChange = (event) => {
    setSearchTitle(event.target.value);
  };
  
  return (
    <StyledFormControl sx={{ mr: 1, minWidth: 100 }} size='small'>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={searchTitle}
        onChange={handleChange}
      >
        <MenuItem value={'boardTitle'}>제목</MenuItem>
        <MenuItem value={'boardContent'}>내용</MenuItem>
        <MenuItem value={'userId'}>작성자</MenuItem>
        <MenuItem value={'tagName'}>태그</MenuItem>
      </Select>
    </StyledFormControl>
  );
}

import * as React from 'react';
import { useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { BoardSubtitleTypo } from '@src/component/common/GlobalComponents.jsx';

const ListItem = muiStyled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const StyledInput = styled.input`
    border: none;
    display: block;
    width: 99.5%;
    height: 30px;
    background-color: ${({ theme }) => theme['main-background']};
`;

const StyledPaper = muiStyled(Paper)`
  background-color: ${({ theme }) => theme['main-background']};
`;
const StyledBox = muiStyled(Box)`
  background-color: ${({ theme }) => theme['main-background']};
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0rem;
  margin: 0px;
`;

const StyledListItem = muiStyled(ListItem)`
  margin: 0.5rem;
`;
/**
 * 해시태그를 추가하는 InputHashtag 컴포넌트입니다.
 *
 * @return {JSX.Element} InputHashtag 컴포넌트에 대한 JSX
 */
const InputHashtag = () => {
  const [chipData, setChipData] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const newChip = { key: chipData.length, label: inputValue };
      setChipData([...chipData, newChip]);
      setInputValue('');
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key),
    );
  };

  // useEffect(() => {
  //   console.log(chipData);
  // }, [chipData]);


  return (
    <div>
      <BoardSubtitleTypo text="해시태그 추가" />
      <StyledPaper>
        <StyledBox>
          {chipData.map((data) => (
            <StyledListItem key={data.key}>
              <Chip
                label={data.label}
                onDelete={handleDelete(data)}
                color="primary"
              />
            </StyledListItem>
          ))}
        </StyledBox>
        <StyledInput
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </StyledPaper>
    </div>
  );
};
export default InputHashtag;
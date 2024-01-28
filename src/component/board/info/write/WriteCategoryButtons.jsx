import React from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { BOARD } from '@src/component/board/const.js';

const StyledButton = styled(Button)`
    min-width: 40px;
    padding: 0;
`;

const WriteCategoryButtons = (props) => {
  const { title, setTitle } = props;
  
  return (<>
  <StyledButton
    size='small'
    variant={title === BOARD.INFO.FOOD.TITLE ? 'contained' : 'text'}
    onClick={() => setTitle(BOARD.INFO.FOOD.TITLE)}
  >
    {BOARD.INFO.FOOD.TITLE}
  </StyledButton>
  <StyledButton
    size='small'
    variant={title === BOARD.INFO.SPORT.TITLE ? 'contained' : 'text'}
    onClick={() => setTitle(BOARD.INFO.SPORT.TITLE)}>
    {BOARD.INFO.SPORT.TITLE}
  </StyledButton>
</>
  );
};

export default WriteCategoryButtons;

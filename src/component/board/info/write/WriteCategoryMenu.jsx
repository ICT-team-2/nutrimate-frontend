import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { BOARD } from '@src/component/board/const.js';
import { styled as muiStyled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledButton = muiStyled(Button)`
display: inline-block;
padding: 0;
width: 30px;
`;
/**
 *  사용되지 않은 컴포넌트임
 * @param setTitle
 * @param title
 * @returns {Element}
 * @constructor
 */
const WriteCategoryMenu = ({ setTitle, title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const changeCategory = (event) => {
    setAnchorEl(null);
  };
  return (
    <>
      <StyledButton
        id='fade-button'
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography variant='subtitle2'
                    color={(theme) => theme['gray-light-text']}>{title}
        </Typography>
      </StyledButton>
      <Menu
        id='fade-menu'
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={changeCategory}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          changeCategory();
          setTitle(BOARD.INFO.FOOD.TITLE);
        }}>
          {BOARD.INFO.FOOD.TITLE}</MenuItem>
        <MenuItem onClick={() => {
          changeCategory();
          setTitle(BOARD.INFO.SPORT.TITLE);
        }}>{BOARD.INFO.SPORT.TITLE}</MenuItem>
      </Menu>
    </>
  );
};

export default WriteCategoryMenu;
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { BOARD } from '@src/component/board/const.js';
import { styled as muiStyled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

const StyledButton = muiStyled(Button)`
display: inline-block;
padding: 0;
width: 30px;
`;

const InfoBoardCategory = ({ title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const changeCategory = (event) => {
    setAnchorEl(null);
  };
  return (
    <div>
      <StyledButton
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography variant="h6"
                    color={(theme) => theme['black']}>{title}
        </Typography>
      </StyledButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={changeCategory}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => {
          navigate(LINKS.ALL_INFO_BOARD + '/1');
        }}>{BOARD.INFO.ALL.TITLE}</MenuItem>
        <MenuItem onClick={() => {
          navigate(LINKS.FOOD_BOARD + '/1');
        }}>
          {BOARD.INFO.FOOD.TITLE}</MenuItem>
        <MenuItem onClick={() => {
          navigate(LINKS.SPORT_BOARD + '/1');
        }}>{BOARD.INFO.SPORT.TITLE}</MenuItem>
      </Menu>
    </div>
  );
};

export default InfoBoardCategory;
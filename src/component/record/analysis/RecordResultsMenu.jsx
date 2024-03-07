import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAtom } from 'jotai';
import { selectedRecordResultAtom } from '@src/component/record/atom.js';
import { RECORD_STATISTICS_RESULT_TYPE } from '@src/component/record/const.js';
import Typography from '@mui/material/Typography';

export default function RecordResultsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useAtom(selectedRecordResultAtom);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Typography variant="h6">
          {Object.values(RECORD_STATISTICS_RESULT_TYPE)[selectedIndex].LABEL} 요약
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {Object.values(RECORD_STATISTICS_RESULT_TYPE).map((option, index) => (
          <MenuItem
            key={option.VALUE}
            selected={option.VALUE === selectedIndex}
            onClick={(event) => {
              setSelectedIndex(index);
              handleClose();
            }}
          >
            {option.LABEL}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
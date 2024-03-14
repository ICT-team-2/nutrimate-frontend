import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';
import AskDeleteDialog from '@src/component/board/AskDeleteDialog.jsx';
import useDeleteBoard from '@src/hooks/board/common/useDeleteBoard.jsx';
import ReportModal from '@src/component/admin/manage/ReportModal.jsx';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';


const InfoBoardDropMenu = ({ boardId, category }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();
  const deleteBoard = useDeleteBoard();
  const [showReportModal, setShowReportModal] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoEdit = () => {
    navigate(LINKS.INFO_BOARD_EDIT + `/${boardId}`, {
      state: {
        category: category,
      },
    });
  };
  const handleDelete = () => {
    handleClose();
    setDialogOpen(true);
  };


  const handleReport = () => {
    setShowReportModal(true);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        aria-label="settings">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={gotoEdit}>수정</MenuItem>
        <MenuItem onClick={handleDelete}>삭제</MenuItem>
        <MenuItem onClick={handleReport}>신고</MenuItem>
      </Menu>
      <AskDeleteDialog
        onClickDelete={() => deleteBoard.mutate(boardId)}
        open={dialogOpen} setOpen={setDialogOpen} />
      {showReportModal &&
        <ReportModal setShowReportModal={setShowReportModal} showReportModal={showReportModal} boardId={boardId}
                     searchKeyWord={'BOARD'} />}
    </>
  );
};

export default InfoBoardDropMenu;

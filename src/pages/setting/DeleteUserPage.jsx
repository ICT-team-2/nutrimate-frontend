import React, { useEffect, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import { Button, Container } from '@mui/material';
import { useSetAtom } from 'jotai/react';
import { SETTING_DRAWER_HEIGHT } from '@src/component/setting/const.js';
import { settingDrawerHeightAtom } from '@src/component/setting/atom.js';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import useDeleteUser from '@src/hooks/setting/useDeleteUser.jsx';

const StyledCotainer = muiStyled(Container)`
    margin-top: 20px;
    width:60%;
`;
const StyledDiv = styled.div`
    margin: 20px 0;

`;
const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
`;

const DeleteUserPage = () => {
  const setDrawerHeight = useSetAtom(settingDrawerHeightAtom);
  const [open, setOpen] = useState(false);

  const deleteUser = useDeleteUser();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    setDrawerHeight(SETTING_DRAWER_HEIGHT.DELETE_USER);
  });

  return (
    <StyledCotainer>
      <Typography variant="h5">회원탈퇴</Typography>
      <StyledDiv>
        탈퇴하실 경우에는 관리자에게 문의 시 복구가 가능합니다.<br />
        탈퇴하시겠습니까?
      </StyledDiv>
      <Button
        onClick={handleOpen}
        color="error" variant="contained">회원탈퇴</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            정말로 탈퇴하시겠습니까?
          </Typography>
          <br />
          <FlexDiv>
            <FlexGrowDiv />
            <Button
              onClick={() => {
                deleteUser.mutate();
                handleClose();
              }}
              color="error" variant="contained">탈퇴</Button>
            <Button
              onClick={handleClose}
              color="primary">취소</Button>
          </FlexDiv>
        </StyledBox>
      </Modal>
    </StyledCotainer>
  );
};

export default DeleteUserPage;

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { profilePromptModalAtom } from '@src/component/mypage/atom.js';
import { useAtom } from 'jotai/react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};
const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border: 1px solid #000;
    padding: 20px;
`;

const TitleH3 = styled.h3`
    margin-bottom: 15px;
`;

export default function ProfileAIPromptModal() {
  const [open, setOpen] = useAtom(profilePromptModalAtom);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <StyledBox>
            <TitleH3>프로필 이미지 AI 생성</TitleH3>
            <div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="원하는 이미지를 입력해주세요" 
                size="small"
              />
              <Button
                sx={{ marginLeft: '10px', height: '40px' }}
                variant="contained"
                onClick={handleClose}>입력</Button>
            </div>
          </StyledBox>

        </Fade>
      </Modal>
    </div>
  );
}

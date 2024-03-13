import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { changeChatroomNameModalAtom, openedChatroomAtom } from '@src/component/chat/dm/atom.js';
import { useAtom } from 'jotai/react';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import useChangeChatroomName from '@src/hooks/dmchat/chatroom/useChangeChatroomName.jsx';
import { useState } from 'react';
import TextField from '@mui/material/TextField';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    padding: 20px;
    border-radius: 5px;
`;

const TextFieldContainer = styled.div`
    margin: 10px 0;
    display: flex;
`;

const StyledTextField = styled(TextField)`
    margin-right: 10px;
`;

const TitleTypography = styled(Typography)`
    margin-bottom: 20px;
`;


export default function ChangeRoomnameModal({ chatroomId }) {
  const [open, setOpen] = useAtom(changeChatroomNameModalAtom);
  const [secondOpen, setSecondOpen] = useState(false);
  const [chatroomName, setChatroomName] = useState('');

  const changeChatroomName = useChangeChatroomName(chatroomName);

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    changeChatroomName.mutate({
      chatroomId: chatroomId,
      chatroomName: chatroomName,
    });
    handleClose();
    setChatroomName('');
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          변경할 채팅방 이름을 입력해주세요.
        </Typography>
        <TextFieldContainer>
          <StyledTextField
            value={chatroomName}
            onChange={(e) => setChatroomName(e.target.value)}
            fullWidth
            size="small"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <FlexGrowDiv />
          <Button
            onClick={(e) => {
              handleSubmit();
            }}
            variant="contained">
            확인
          </Button>
        </TextFieldContainer>
      </StyledBox>
    </Modal>

  );
}

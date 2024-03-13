import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import useCreatePrivateChatroom from '@src/hooks/dmchat/chatroom/useCreatePrivateChatroom.jsx';
import useCreateGroupChatroom from '@src/hooks/dmchat/chatroom/useCreateGroupChatroom.jsx';
import { DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

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

export default function ConfirmCreateChatroomModal(props) {
  const { open, setOpen, opponentId, userIds, mode, setFirstModalOpen } = props;

  const createPrivateChatroom = useCreatePrivateChatroom();
  const createGroupChatroom = useCreateGroupChatroom();

  const handleClose = () => setOpen(false);

  const handleCreateChatroom = () => {
    switch (mode) {
      case DM_CHATROOM_TAB.PRIVATE.value:
        createPrivateChatroom.mutate(opponentId);
        break;
      case DM_CHATROOM_TAB.GROUP.value:
        createGroupChatroom.mutate(userIds);
        break;
      default:
        break;
    }
    setOpen(false);
    setFirstModalOpen(false);
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
          채팅방을 생성하시겠습니까?
        </Typography>
        <FlexDiv>
          <FlexGrowDiv />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateChatroom}>
            확인
          </Button>
        </FlexDiv>
      </StyledBox>
    </Modal>
  );
}
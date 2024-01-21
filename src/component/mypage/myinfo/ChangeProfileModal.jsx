import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useAtom, useSetAtom } from 'jotai/react';
import { profileModalAtom, profilePromptModalAtom, uploadedImageAtom } from '@src/component/mypage/atom.js';
import { ResetStyleInput } from '@src/component/common/ImgUploader.jsx';
import { useRef, useState } from 'react';
import { styled as muiStyled } from '@mui/material/styles';
import ProfileAIPromptModal from '@src/component/mypage/myinfo/ProfileAIPromptModal.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 200,
  height: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: '20px',
  borderRadius: '3px',
};

const StyldListItemText = muiStyled(ListItemText)`
  text-align: center;
`;

export default function ChangeProfileModal() {
  const [open, setOpen] = useAtom(profileModalAtom);
  const fileInputRef = useRef();
  const setSelectedImage = useSetAtom(uploadedImageAtom);
  const [promptModalState, setPromptModalState] = useAtom(profilePromptModalAtom);

  const handleClose = () => setOpen(false);
  const uploadImg = (event) => {
    fileInputRef.current.click();
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
    handleClose();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Box
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              textAlign: 'center',
            }}
          >
            <h3>프로필 변경</h3>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setPromptModalState(true)}
                >
                  <StyldListItemText
                    primary="AI로 생성"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={uploadImg}
                >
                  <StyldListItemText
                    primary="사진 업로드"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={handleClose}
                >
                  <StyldListItemText
                    secondary="취소" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Modal>
      <ResetStyleInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <ProfileAIPromptModal />
    </div>
  );
}

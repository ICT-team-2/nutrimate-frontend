import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { profileModalAtom, profilePromptModalAtom } from '@src/component/mypage/atom.js';
import { useAtom, useSetAtom } from 'jotai/react';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import useCreateImageAI from '@src/hooks/mypage/useCreateImageAI.jsx';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import useChangeProfileImage from '@src/hooks/mypage/useChangeProfileImage.jsx';
import { base64toFile } from '@src/utils/functions.js';
import LinearProgress from '@mui/material/LinearProgress';

const StyledBox = styled(Box)`

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: white;
    border: 1px solid #000;
    padding: 0px;
    border-radius: 5px;

`;

const TitleH3 = styled.h3`
    margin-bottom: 15px;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
    height: 40px;
`;

const InputConatiner = styled.div`
    display: flex;
`;
const StyledTextField = styled(TextField)`
    flex-grow: 1;
`;

const StyledImg = styled.img`
    width: 400px;
    height: 400px;
    margin: auto;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    aspect-ratio: 1/1;
`;
const Caption = styled(Typography)`
    margin-right: auto;
`;
const FitContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: fit-content;
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

export default function ProfileAIPromptModal() {
  const [open, setOpen] = useAtom(profilePromptModalAtom);
  const setOpenFirstModal = useSetAtom(profileModalAtom);
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  const handleClose = () => setOpen(false);
  const createImageAI = useCreateImageAI();
  const changeProfileImage = useChangeProfileImage();

  const onKeyDownEnter = (e) => {
    if (e.key === 'Enter') {
      onClickCreateImage();
    }
  };

  const onClickCreateImage = () => {
    createImageAI.mutate({
      prompt: prompt,
    }, {
      onSuccess: (data) => {
        setImage('data:image/png;base64,' + data.image);
      },
    });
  };


  const onClickSaveImage = () => {
    changeProfileImage.mutate(base64toFile(image, 'profile.png'));
    setOpen(false);
    setOpenFirstModal(false);
  };


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
            {createImageAI.isPending && <LinearProgress />}
            <InnerContainer>
              <TitleH3>프로필 이미지 AI 생성</TitleH3>
              <FitContainer>
                <InputConatiner>
                  <StyledTextField
                    id="outlined-basic"
                    variant="outlined"
                    placeholder="원하는 이미지를 입력해주세요."
                    size="small"
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={onKeyDownEnter}
                  />
                  <StyledButton
                    variant="contained"
                    onClick={onClickCreateImage}>
                    {createImageAI.isSuccess ? '다시 생성' : '입력'}
                  </StyledButton>
                  {createImageAI.isSuccess && <StyledButton
                    variant="contained"
                    onClick={onClickSaveImage}>
                    저장
                  </StyledButton>}
                </InputConatiner>
                {createImageAI.isError ?
                  <Caption variant="caption" color="red">
                    이미지 생성에 실패했습니다. 다시 시도해주세요.
                  </Caption>
                  : <Caption variant="caption">
                    * 이미지 생성에 시간이 소요될 수 있습니다.
                  </Caption>}
              </FitContainer>
              {createImageAI.isSuccess && (<ImageContainer>
                <StyledImg src={image} />
              </ImageContainer>)}
            </InnerContainer>
          </StyledBox>
        </Fade>
      </Modal>
    </div>
  );
}

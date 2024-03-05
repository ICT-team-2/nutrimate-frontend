import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import useOcr from '@src/hooks/board/common/useOcr.jsx';
import { base64toFile } from '@src/utils/functions.js';
import { atom } from 'jotai';
import { useAtom } from 'jotai/react';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: white;
    border-radius: 5px;
`;

const StyledDiv = styled.div`
    padding: 20px;
`;

const BodyTypo = styled(Typography)`
    margin: 10px 0;
`;

export const ocrTextAtom = atom('');

export default function OcrModal() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrText, setOcrText] = useAtom(ocrTextAtom);

  const extractText = useOcr();

  const handleOpen = () => {
    setSelectedImage(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOcrText('');
    if (selectedImage == null) return;
    extractText.mutate(base64toFile(selectedImage, 'ocrImage.jpg'), {
      onSuccess: (data) => {
        setOcrText(data.text);
        setOpen(false);
      },
    });
  }, [selectedImage]);

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpen}>OCR</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox>
          {extractText.isPending && <LinearProgress />}
          <StyledDiv>
            <Typography variant="h6">OCR</Typography>
            {extractText.isError
              ? <BodyTypo variant="body2" color="error">
                이미지에서 텍스트 추출 중 에러가 발생했습니다. 다시 한번 시도해 보세요
              </BodyTypo>
              : <BodyTypo variant="body2">
                이미지를 업로드해주세요.
              </BodyTypo>}
            <ImgUploader
              width="100%" height="200px"
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </StyledDiv>
        </StyledBox>
      </Modal>
    </div>
  );
}

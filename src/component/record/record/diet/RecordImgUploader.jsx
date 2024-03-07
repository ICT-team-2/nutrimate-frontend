import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import styled from 'styled-components';
import { Button } from '@mui/material';
import useAnalyzeFoodImage from '@src/hooks/useAnalyzeFoodImage.jsx';

const UploaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;
const StyledButton = styled(Button)`
    margin: 30px 0;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: end;
`;

const RecordImgUploader = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const analyzeFoodImage = useAnalyzeFoodImage();

  useEffect(() => {
    if (!selectedImage) return;
    analyzeFoodImage.mutate(selectedImage.split(',')[1]);
  }, [selectedImage]);

  return (
    <UploaderContainer>
      <ImgUploader
        width="100%" height="100%"
        minheight="350px"
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <ButtonContainer>
        <StyledButton variant="contained">등록</StyledButton>
      </ButtonContainer>
    </UploaderContainer>
  );
};

export default RecordImgUploader;

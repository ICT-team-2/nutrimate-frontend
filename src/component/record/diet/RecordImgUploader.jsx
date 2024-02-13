import React, { useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import styled from 'styled-components';

const UploaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const RecordImgUploader = () => {
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  return (
    <UploaderContainer>
      <ImgUploader
        width='80%' height='100%'
        minwidth='600px' minheight='350px'
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </UploaderContainer>
  );
};

export default RecordImgUploader;

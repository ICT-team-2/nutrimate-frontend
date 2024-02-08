import React, { useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import styled from 'styled-components';
import { FlexDiv, FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';

const ImgUploadContainer = styled.div`
    //margin: 0 auto;
    //width: 80%;
    //height: 80%;
    display: flex;
    margin-bottom: 30px;
`;
const StyledButton = styled(Button)`
    margin-left: 10px;
`;


const DietRecord = () => {

  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <ImgUploadContainer>
        <ImgUploader
          width=" 100%" height="100%"
          minwidth="600px" minheight="300px"
          selectedImage={selectedImage} setSelectedImage={setSelectedImage}
        />
        <FlexGrowDiv />
        <div>
          <Button variant="contained">검색하기</Button>
          <StyledButton variant="contained">직접 등록</StyledButton>
        </div>
      </ImgUploadContainer>
      <div>대충 분석 결과</div>
    </>

  );
};

export default DietRecord;

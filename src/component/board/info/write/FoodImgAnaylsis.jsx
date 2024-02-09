import React, { useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { BoardSubtitleTypo } from '@src/component/common/GlobalComponents.jsx';

const FoodImgAnaylsis = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <BoardSubtitleTypo text="음식 이미지 분석"></BoardSubtitleTypo>
      <ImgUploader
        width="400px" height="200px"
        selectedImage={selectedImage} setSelectedImage={setSelectedImage}
      >이미지 업로드</ImgUploader>
    </>
  );
};

export default FoodImgAnaylsis;

import React from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { BoardSubtitleTypo } from '@src/component/common/GlobalComponents.jsx';

const FoodImgAnaylsis = () => {
  return (
    <>
      <BoardSubtitleTypo text="음식 이미지 분석"></BoardSubtitleTypo>
      <ImgUploader width="400px" height="200px">이미지 업로드</ImgUploader>
    </>
  );
};

export default FoodImgAnaylsis;

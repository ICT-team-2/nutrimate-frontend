import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { BoardSubtitleTypo } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import FoodAnaylsisTable from '@src/component/board/info/write/FoodAnaylsisTable.jsx';

const ImgUploaderContainer = styled.div`
    display: flex;
    width: 100%;
`;

const StyledTableContainer = styled.div`
    flex-grow: 1;
    max-width: calc(50% - 15px);
    margin-left: 30px;
`;

const UploadInnerContiner = styled.div`
    flex-grow: 1;
    max-width: calc(50% - 15px);
    margin-right: 30px;
    display: flex;
`;

const FoodImgAnaylsis = ({ foodId, editMode, selectedImage, setSelectedImage, src }) => {
  return (
    <>
      <BoardSubtitleTypo text="음식 이미지 분석"></BoardSubtitleTypo>
      <ImgUploaderContainer>
        <UploadInnerContiner>
          <ImgUploader
            src={editMode ? src : null}
            width="100%" height="300px"
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          >이미지 업로드</ImgUploader>
        </UploadInnerContiner>
        <StyledTableContainer
          image={selectedImage}
        >
          <FoodAnaylsisTable
            editMode={editMode} />
        </StyledTableContainer>
      </ImgUploaderContainer>
    </>
  );
};

export default FoodImgAnaylsis;

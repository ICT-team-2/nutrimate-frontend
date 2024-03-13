import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { BoardSubtitleTypo } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import FoodAnaylsisTable from '@src/component/board/info/write/FoodAnaylsisTable.jsx';
import useAnalyzeFoodImageWithAI from '@src/hooks/useAnalyzeFoodImageWithAI.jsx';
import { useAtom } from 'jotai/react';
import { foodIdAtom } from '@src/component/board/info/atom.js';
import { inputHashTagAtom } from '@src/component/board/atom.js';
import { nanoid } from 'nanoid';

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

const FoodImgAnaylsis = ({ editMode, selectedImage, setSelectedImage, src }) => {

  const [foodId, setFoodId] = useAtom(foodIdAtom);
  const [inputHashTag, setInputHashTag] = useAtom(inputHashTagAtom);
  const analyzeFoodImageWithAI = useAnalyzeFoodImageWithAI();

  useEffect(() => {
    if (!selectedImage) return;

    analyzeFoodImageWithAI.mutate(selectedImage.split(',')[1], {
      onSuccess: (res) => {
        if (!res.data.foods) return;
        if (res.data.foods.length === 0) return;
        setFoodId((prev) => [...prev,
          ...res.data.foods.map((food) => parseInt(food.foodId))]);
        const id = nanoid();
        setInputHashTag((prev) => [
          ...prev,
          ...res.data.foods.map((food) => ({
            label: food.foodName,
            key: id,
          }))]);
      },
    });
  }, [selectedImage]);


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

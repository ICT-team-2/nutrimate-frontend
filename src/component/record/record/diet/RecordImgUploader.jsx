import React, { useEffect, useState } from 'react';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import styled from 'styled-components';
import { Button } from '@mui/material';
import useAnalyzeFoodImageWithAI from '@src/hooks/useAnalyzeFoodImageWithAI.jsx';
import useInputDietRecordWithDB from '@src/hooks/record/food/useInputDietRecordWithDB.jsx';
import { useAtom, useAtomValue } from 'jotai/react';
import { datePickerAtom } from '@src/component/calendar/atom.js';
import { selectedMealTimeAtom } from '@src/component/record/atom.js';
import FoodAnaylsisTable from '@src/component/board/info/write/FoodAnaylsisTable.jsx';
import { foodIdAtom } from '@src/component/board/info/atom.js';
import useInputDietRecordListWithDB from '@src/hooks/record/food/useInputDietRecordListWithDB.jsx';
import useFetchFoodDBByFoodId from '@src/hooks/record/food/useFetchFoodDBByFoodId.jsx';
import dayjs from 'dayjs';

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
const InnerContainer = styled.div`
    display: flex;
`;
const TableContainer = styled.div`
    margin-left: 15px;
    width: calc(50% - 15px);
`;
const ImgContainer = styled.div`
    margin-right: 15px;
    width: calc(50% - 15px);
`;

const RecordImgUploader = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [foods, setFoods] = useState([]);
  const [recordIntakes, setRecordIntakes] = useState([]);
  const [foodIds, setFoodIds] = useAtom(foodIdAtom);

  const doDate = useAtomValue(datePickerAtom);
  const mealTime = useAtomValue(selectedMealTimeAtom);

  const analyzeFoodImage = useAnalyzeFoodImageWithAI();
  const inputDietRecordList = useInputDietRecordListWithDB();
  const { data: foodListData } = useFetchFoodDBByFoodId(foodIds);


  const handleSubmit = () => {
    if (!selectedImage) return;
    inputDietRecordList.mutate({
      record: {
        doDate: dayjs(doDate).format('YYYY-MM-DD'),
      },
      foodIds,
      mealTime,
      recordIntakes,
    });
  };

  useEffect(() => {
    setFoodIds((prev) => [...prev,
      ...foods?.map((f) => parseInt(f.foodId)) ?? []]);
  }, [foods]);

  useEffect(() => {
    if (!selectedImage) return;
    analyzeFoodImage.mutate(selectedImage.split(',')[1], {
      onSuccess: (data) => {
        if (!data.data.foods) return;
        if (data.data.foods.length === 0) return;
        setFoods((prev) => [...prev, ...data.data.foods]);
      },
    });
  }, [selectedImage]);

  useEffect(() => {
    setRecordIntakes(foodListData?.map((f) => f.foodIntake) ?? []);
  }, [foodListData]);


  return (
    <UploaderContainer>
      <InnerContainer>
        <ImgContainer>
          <ImgUploader
            width="100%" height="100%"
            minheight="300px"
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </ImgContainer>
        <TableContainer>
          <FoodAnaylsisTable
            editMode />
        </TableContainer>
      </InnerContainer>
      <ButtonContainer>
        <StyledButton
          onClick={handleSubmit}
          variant="contained">등록</StyledButton>
      </ButtonContainer>
    </UploaderContainer>
  );
};

export default RecordImgUploader;

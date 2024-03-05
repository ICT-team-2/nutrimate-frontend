import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Button } from '@mui/material';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import { useAtom } from 'jotai';
import { foodsAtom } from '../atom';
import { isTotalIntakeUpdatedAtom } from '../atom.js';


const UploaderContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;  // 추가된 속성
  margin-bottom: 50px;
`;

const LoaderAnimation = keyframes`
    0%{width: 0px;}
    70%{width: 100%; opacity: 1;}
    90%{opacity: 0; width: 100%;}
    100%{opacity: 0;width: 0px;}
`;

const Loader3 = styled.div`
  position: absolute;  // 수정된 속성
  width: 150px;
  height: 20px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);  // 추가된 속성

  &:after{
    content: "Image Detection ...";
    color: #134f2c;
    font-family:  Lato,"Helvetica Neue" ;
    font-weight: 200;
    font-size: 16px;
    position: absolute;
    width: 100%;
    height: 20px;
    line-height: 20px;
    left: 0;
    top: 0;
    background-color: #fff;
    z-index: 1;
  }

  &:before{
    content: "";
    position: absolute;
    background-color: #134f2c;
    top: -5px;
    left: 0px;
    height: 30px;
    width: 0px;
    z-index: 0;
    opacity: 1;
    -webkit-transform-origin:  100% 0%;
    transform-origin:  100% 0% ;
    animation: ${LoaderAnimation} 3s ease-in-out infinite;
  }
`;


const StyledButton = styled(Button)`
  margin: 30px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const RecordImgUploader = () => {
  const [foods, setFoods] = useAtom(foodsAtom);
  const [isTotalIntakeUpdated, setIsTotalIntakeUpdated] = useAtom(isTotalIntakeUpdatedAtom);

  useEffect(() => {
    console.log("Foods: ", foods);
  }, [foods]);

  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processedData, setProcessedData] = useState(null); 
  const [buttonVisible, setButtonVisible] = useState(true);

  useEffect(() => { 
    if (processedData) { 
      setLoading(true);
      axios.post('http://localhost:2222/food', processedData, {
        headers: {
          'Content-Type':'multipart/form-data'
        },
        withCredentials: true
      })
      .then(response => {
        setLoading(false);
        const receivedFoods = response.data.foods;
        // 각 음식명을 출력합니다.
        // 분석 결과에 따라 알림을 띄우고, 필요하다면 페이지를 리셋합니다.
      if (receivedFoods.length === 0) {
        alert('이미지 분석에 실패하셨습니다.');
        // 페이지를 리셋하려면 상태들을 초기화하면 됩니다.
        setFoods([]);
        setSelectedImage(null);
        setProcessedData(null);
        setButtonVisible(true);
      } else {
        alert('이미지 분석에 성공하셨습니다.');
        setFoods(receivedFoods);
        console.log('receivedFoods',receivedFoods);
      }
    })
    .catch(error => {
      console.log(error);
      setLoading(false);
    });
  }
}, [processedData]);
  

const handleImageUpload = (image) => {
  setLoading(true);
  setTimeout(() => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      const base64Image = e.target.result;
      setSelectedImage(base64Image);  
      
      const base64Encoded = base64Image.split(',')[1];
      const data = new FormData();
      data.append('base64Encoded', base64Encoded);
      setProcessedData(data);
      setLoading(false);  // 이미지 업로드 후에 로딩 상태를 false로 설정
    }
  }, 3000);
}


  const upload = () => {
    if (!selectedImage) {
      alert('이미지를 선택해주세요.');
      return;  // 함수 종료
    }

    setButtonVisible(false);
    
    
    foods.forEach(food => {
      const data={
        userId:sessionStorage.userId,
        foodName: food.foodName,
      };
      axios.post('/record/food', data, {
        headers: {
          'Content-Type':'application/json'
        },
        withCredentials: true  // 이 부분을 추가합니다.
      })
      .then(response => {
        console.log(response.data);
        alert('식단이 기록되었습니다!');
        

        setIsTotalIntakeUpdated(true);  // 총 섭취량이 변경되었음을 알립니다.
      })
      .catch(error => {
        console.log(error);
      })
    });
  }
  
  return (
    <UploaderContainer>
      {!loading ? (
        <ImgUploader
          width="100%" height="100%"
          minWidth="600px" minHeight="350px"
          selectedImage={selectedImage}
          setSelectedImage={handleImageUpload}
        />
    ) : null}
      <ButtonContainer>
        {buttonVisible && !loading &&  // 로딩 상태를 체크하는 조건을 추가
        <StyledButton variant="contained" onClick={upload}>등록</StyledButton>
        }
      </ButtonContainer>
      {loading && <Loader3 />}
    </UploaderContainer>
  );
}

export default RecordImgUploader;


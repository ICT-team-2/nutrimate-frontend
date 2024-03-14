import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Button, TextField } from '@mui/material';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';
import * as tmImage from '@teachablemachine/image';
import ChallengeImgUploader from '@src/component/chat/ChallengeImgUploader.jsx';
import { toast } from 'react-toastify';
import { TOAST_OPTIONS } from '@src/utils/const.js';


const ModalBg = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #ffffffe2;
`;


const ModalBox = styled.div`
    position: absolute;
    width: 500px;
    height: 360px;
    padding: 40px;
    text-align: center;
    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`;


const ModalCloseBtn = styled.button`
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    color: rgba(0, 0, 0, 0.7);
    background-color: transparent;
    font-size: 20px;
`;

const ModalContent = styled.div`
    position: relative;
    top: 30px;

`;

const StyledButton = styled(Button)`
    margin-top: 20px;
    width: 100%;
    height: 40px;


`;

/////////////////
// Keyframes 정의
const rotateLoading = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const loadingTextOpacity = keyframes`
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;


const Loading = styled.div`
    height: 250px;
    width: 250px;
    position: absolute;
    border: 2px solid transparent;
    border-color: transparent #2ecc71 transparent #2ecc71;
    border-radius: 50%;
    animation: ${rotateLoading} 1.5s linear infinite normal;
    transform-origin: 50% 50%;


`;

const LoadingText = styled.div`
    color: rgb(46, 139, 87);
    font-family: "Helvetica Neue", "Helvetica", "Arial";
    font-size: 20px;
    font-weight: bold;
    margin-top: 110px;
    margin-left: 30px;
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 200px;
    animation: ${loadingTextOpacity} 2s linear infinite normal;
`;

const LoadingContainer = styled.div`
    height: 250px;
    width: 250px;
    position: relative;
    margin: 30px auto;

    &:hover {
        /* 로딩 아이콘 색상 변경 */

        & > div {
            transition: border-color 0.5s ease-in-out;
            border-color: transparent #32CD32 transparent #32CD32;
        }
    }
`;


// 스크롤을 비활성화하는 함수
export function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// 스크롤을 다시 활성화하는 함수
export function enableScroll() {
  document.body.style.overflow = 'auto';
}

let model, //메모리에 로드한 모델 저장용
//webcam,//웹캠 사용시 
  maxPredictions;//클래스(분류) 갯수 저장용


const ChallengeModal = (props) => {
  const { showChallengeModal, setChallengeModal, nickname, chatroom, userId, setChallengeSuccess } = props;

  const [inputValue, setInputValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loadingStart, setLoadingStart] = useState(false);


  //티처블 머신 코드

  async function initialize() {
    //setLoadingStart(true)
    let URL = '';
    if (chatroom == 1) {
      URL = 'https://teachablemachine.withgoogle.com/models/FFNAWMNDG/';
    } else {
      URL = 'https://teachablemachine.withgoogle.com/models/49JT5k0r4/';
    }
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    await predict();
  }


  async function predict() {
    const img = new Image();
    img.src = uploadedImage;
    const prediction = await model.predict(img);
    //예측 결과를 labelContainer에 표시주는 반복문
    //className:클래스명(분류명)
    //probability:확률
    //toFixed(소수점 자리수):자리수까지 표현(반올림)
    if (prediction[0].probability >= 0.7) {

      fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/challenge/success/record?chatroomId=${chatroom}&userId=${userId}`, {
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {
          if (data.SUCCESSNOT == null) {
            if (data.SUCCESS == 1) {
              setChallengeSuccess(true);
              toast.success(nickname + '님 챌린지에 성공했습니다.');
              setChallengeModal(false);
            } else {
              toast.warn(nickname + '님 오늘 이미 챌린지에 참여했습니다.');
              setChallengeModal(false);

            }
          } else {
            toast.error(nickname + '님 챌린지에 실패했습니다. 만약 올바른 이미지를 등록했다면 다시 한 번 시도해주세요!!');
            setChallengeModal(false);
          }
        });
    } else {
      setChallengeModal(false);
      toast.error(nickname + '님 챌린지에 실패했습니다. 만약 올바른 이미지를 등록했다면 다시 한 번 시도해주세요.');
    }
  }


  const closeModal = () => {
    setChallengeModal(false);
  };

  const handleModalClick = (e) => {
    // 모달 바깥 영역 클릭 시에는 모달을 닫지 않도록 이벤트 전파 막기
    e.stopPropagation();
  };

  // 이미지가 업로드될 때 호출되는 콜백 함수
  const handleImageSelect = (imageData) => {
    setUploadedImage(imageData);
  };

  const handleClick = () => {
    if (uploadedImage) {
      setLoadingStart(true);
      setTimeout(() => {
        initialize();
      }, 3000);

    } else {
      toast.error('이미지를 업로드해주세요.', TOAST_OPTIONS.ERROR);
    }
  };


  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, [showChallengeModal]);


  return (
    <ModalBg>
      <ModalBox onClick={handleModalClick}>
        {loadingStart ? (
          <LoadingContainer>
            <Loading />
            <LoadingText>챌린지 확인중...</LoadingText>
          </LoadingContainer>
        ) : (
          <>
            <ModalCloseBtn onClick={closeModal}>
              ✖
            </ModalCloseBtn>
            <ModalContent>
              <ChallengeImgUploader
                onImageSelect={handleImageSelect}
                width="100%" height="200px">
                이미지 업로드
              </ChallengeImgUploader>
              <StyledButton variant="contained" onClick={handleClick}>
                확인
              </StyledButton>
            </ModalContent>
          </>
        )}
      </ModalBox>
    </ModalBg>


  );
};

export default ChallengeModal;

import React, { useEffect,useState } from "react";
import styled from 'styled-components';
import { Button,TextField } from '@mui/material';
import { ImgUploader } from '@src/component/common/ImgUploader.jsx';

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
  height: 300px;
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

// 스크롤을 비활성화하는 함수
export function disableScroll() {
  document.body.style.overflow = 'hidden';
}

// 스크롤을 다시 활성화하는 함수
export function enableScroll() {
  document.body.style.overflow = 'auto';
}

const ChatJoinModal = ({ showChallengeModal, setChallengeModal}) => {
  const [inputValue, setInputValue] = useState('');

  const closeModal = () => {
    setChallengeModal(false);
  };

  const handleModalClick = (e) => {
    // 모달 바깥 영역 클릭 시에는 모달을 닫지 않도록 이벤트 전파 막기
    e.stopPropagation();
  };

  const handleClick = () => {
    setInputValue("");
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
        <ModalCloseBtn onClick={closeModal}>
          ✖
        </ModalCloseBtn>
        <ModalContent>
        <ImgUploader width="100% " height="200px">이미지 업로드</ImgUploader>
          <StyledButton variant="contained" onClick={handleClick}>
            확인
          </StyledButton>
          
        </ModalContent>
      </ModalBox>
    </ModalBg>
  );
};

export default ChatJoinModal;

import React, { useEffect,useState } from "react";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Button,TextField } from '@mui/material';

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
  width: 400px;
  height: 200px;
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

const ModalTitle = styled.h2`
  position: absolute;
  top: 0px; /* 버튼과 동일한 상대적인 위치로 설정합니다. */
  left: 80px; /* 여기서 left 값은 버튼의 right 값과 동일하게 조정하십시오. */
`;

  const StyledTextField = styled(TextField)`
    flex-grow: 1;
    width: 100%; 

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

const ChatJoinModal = ({ showModal, setShowModal ,onSend}) => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
    alert('챌린지 계정 생성에 실패했습니다.'); 
    navigate('/challenge');
  };

  const handleModalClick = (e) => {
    // 모달 바깥 영역 클릭 시에는 모달을 닫지 않도록 이벤트 전파 막기
    e.stopPropagation();
  };

  const handleClick = () => {
    onSend(inputValue);
    setInputValue("");
  };

  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, [showModal]);

  return (
    <ModalBg>
      <ModalBox onClick={handleModalClick}>
        <ModalTitle>챌린지 계정만들기</ModalTitle>
        <ModalCloseBtn onClick={closeModal}>
          ✖
        </ModalCloseBtn>
        <ModalContent>
          <StyledTextField 
            size="small"
            label="챌린지 닉네임을 입력해주세요."
            multiline
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <StyledButton variant="contained" onClick={handleClick}>
            확인
          </StyledButton>
          
        </ModalContent>
      </ModalBox>
    </ModalBg>
  );
};

export default ChatJoinModal;

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';
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
    width: 30%;
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

const StyledTextField = styled(TextField)`
    width: 100%;
    height: 100%; /* Adjust height as needed */
`;

const ReportModal = ({ setShowReportModal,boardId,cmtId,searchKeyWord }) => {
  const [reportReason, setReportReason] = useState('');
  const [userId, setUserId] = useAtom(userIdAtom);

  const closeModal = () => {
    setShowReportModal(false);
  };

  const reportClick = (e) => {

    axios.post('http://localhost:9999/report', {
      'seachKeyWord': searchKeyWord,
      'boardid': boardId,
      'reportreason': '신고합니다.',
      'userid':userId
    })
    .then(response => {
      // 서버에서 반환하는 데이터에 따라 적절한 동작을 수행합니다.
      alert(response.data.REPORTOK); // 예시로 경고창을 띄움
    })
    .catch(error => {
      console.error('Error submitting report:', error);
      alert('Failed to submit report'); // 오류가 발생했을 때 처리
    });

  };
  
  const handleInputChange = (event) => {

    setReportReason(event.target.value);
  };

  useEffect(() => {
    // modal이 떠 있을 땐 스크롤 막음
    disableScroll();
    // modal 닫히면 다시 스크롤 가능하도록 함
    return () => enableScroll();
  }, [setShowReportModal]);

  return (
    <ModalBg>
      <ModalBox>
        <>
          <h2>신고하기</h2>
          <ModalCloseBtn onClick={closeModal}>✖</ModalCloseBtn>
          <ModalContent>
            <StyledTextField
              size="small"
              label="신고내용을 입력해주세요."
              multiline
              rows={7}
              value={reportReason}
              onChange={handleInputChange}
            />
            <StyledButton variant="contained" onClick={reportClick}>
              신고하기
            </StyledButton>
          </ModalContent>
        </>
      </ModalBox>
    </ModalBg>
  );
};

export default ReportModal;
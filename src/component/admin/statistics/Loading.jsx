import React from 'react';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% { transform: translate(2px,2px); }
  33.33% { transform: translate(102px,2px); }
  66.66% { transform: translate(42px,102px); }
  100% { transform: translate(2px,2px); }
`;

const scaleAnimation = keyframes`
  0% { transform: scale(0.8); }
  100% { transform: scale(1.2); }
`;

const SpinnerAnimation = styled.div`

  position: absolute;  // 위치를 절대값으로 변경
  top: 50%;  // 상단에서 50% 위치
  left: 30%;  // 왼쪽에서 50% 위치
  transform: translate(-50%, -50%) scale(1);  // 위치 조정
  backface-visibility: hidden;
  transform-origin: 0 0;
  animation: ${spinAnimation} 3.571428571428571s linear infinite;
`;

const SpinnerDiv = styled.div`
  transform: scale(0.8);
  transform-origin: 100px 100px;
  animation: ${scaleAnimation} 3.571428571428571s linear infinite;
`;

const SpinnerChild = styled.div`
  position: absolute;
`;

const SpinnerFirstChild = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 12px solid #1d3f72;
  background: #5699d2;
`;

const SpinnerSecondChild = styled.div`
  width: 17px;
  height: 51px;
  transform: rotate(-45deg);
  background: #1d3f72;
  border-radius: 0 0 8px 8px;
  position: absolute;
  top: 68px;
  left: 85px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
`;

const LoadingText = styled.div`
  font-size:20px;
  position: absolute;  
  bottom: 0;  
  left: 50%;  
  transform: translateX(-50%);  
`;

const Loading = () => {
  return (
    <Wrapper>
      <SpinnerAnimation className="ldio-0m9kxpl2ipzl">
        <SpinnerDiv>
          <SpinnerChild>
            <SpinnerFirstChild />
            <SpinnerSecondChild />
          </SpinnerChild>
        </SpinnerDiv>
      </SpinnerAnimation>
      <LoadingText>Loading...</LoadingText>
    </Wrapper>
  );
};

export default Loading;
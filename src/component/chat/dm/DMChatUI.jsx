import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Divider from '@mui/material/Divider';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import { Typography } from '@mui/material';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';

const ChatContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    z-index: 1000;

`;

const ChatHeader = styled.div`
    padding: 20px;
`;
const ChatBody = styled.div`
        //background-color: ${({ theme }) => theme['chat-bg']};
    flex-grow: 1;
    overflow-y: ${({ overflow }) => overflow === 'true' ? 'auto' : 'visible'};
    height: ${({ height }) => height ? height : 'auto'};
`;

/**
 *
 * @param props {object}
 * @param props.title {string} 채팅방 제목
 * @param props.overflow {boolean} 스크롤바 여부
 * @param props.height {string} 높이
 * @param props.data {Array} 채팅 데이터
 * @param props.onSend {function} 메시지 전송 이벤트
 * @param props.nickname {string} 사용자 닉네임
 * @returns {Element}
 * @constructor
 */
const DMChatUI = (props) => {
  const { title, overflow, height, data, onSend, nickname } = props;

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant="h6">{title}</Typography>
      </ChatHeader>
      <Divider />
      <ChatBody ref={scrollRef} overflow={overflow + ''} height={height}>
        <MyTalkComponent nick="닉네임" content="ㅎㅇㅎㅇ" />
        <OtherTalkComponent content="gdgd" nick="나길동" />
      </ChatBody>
      <ChatInput onSend={onSend} />
    </ChatContainer>
  );
};

DMChatUI.defaultProps = {
  title: '챌린지 주제',
  data: [],  // data의 기본값을 빈 배열로 설정
  onSend: () => {
  },
};
export default DMChatUI;
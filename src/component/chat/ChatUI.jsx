import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';
import { useRef, useEffect } from 'react';
import ChatLoading from '@src/component/chat/chatbot/ChatLoading.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import ChatBotComponent from '@src/component/chat/chatbot/ChatBotComponent';

const ChatContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
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

const ChatOutAndEnter = styled.div`
    padding: 20px;
    text-align: center;
`;


const hueAnimation = keyframes`
    from {
        -webkit-filter: hue-rotate(0deg);
    }
    to {
        -webkit-filter: hue-rotate(-360deg);
    }
`;


const ChallengeSuccess = styled.div`
    font-family: 'Helvetica Neue, Helvetica, Arial, sans-serif';
    font-size: 20px;
    font-weight: 100;
    letter-spacing: 2px;
    text-align: center;
    color: #f35626;
    background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${hueAnimation} 10s infinite linear;
`;

const AvatarWrapper = styled.div`
    margin-right: 10px; // Avatar와 텍스트 사이의 간격 조절을 위해 추가
`;


const ChatUI = (props) => {
  const { title, overflow, height, data, onSend, nickname, loading, micicon,voice } = props;
  const [voiceReading, setVoiceReading] = useState(false);
  console.log('sdfsdfsdfs',voiceReading);
  const scrollRef = useRef();
  useEffect(() => {
  // useEffect 훅 내부에서 스크롤 이동을 처리합니다.
  if (scrollRef.current) {
  scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
  }, [data]);
  
  const Voice = () => {
  setVoiceReading(true);
  };
  
  useEffect(() => {
  setVoiceReading(voice);
  }, [voiceReading]);
  
  return (
  <ChatContainer>
  <ChatHeader>
  <Typography variant="h6">{title}{micicon && <FontAwesomeIcon onClick={Voice} icon={faMicrophone} style={{
  fontSize: '24px',
  color: 'red',
  float: 'right',
  }} />} </Typography>
  </ChatHeader>
  <Divider />
  <ChatBody ref={scrollRef} overflow={overflow + ''} height={height}>
  
      {
        Array.isArray(data)
          ? data.map((d, i) =>
            d.messageType == 'CHAT' ?
              d.challengeNick == nickname ?
                <MyTalkComponent key={i} content={d.chatMessage} nick={d.challengeNick} />
                : <OtherTalkComponent key={i} content={d.chatMessage} nick={d.challengeNick} />
              : d.messageType == 'CHALLENGE' ?
                <ChallengeSuccess key={i}> -- {d.chatMessage} --</ChallengeSuccess>
                : <ChatOutAndEnter key={i}>{d.chatMessage}</ChatOutAndEnter>,
          )
          : d.messageType == 'CHAT' ?
            d.challengeNick == nickname ?
              <MyTalkComponent
                content={d.chatMessage}
                nick={d.challengeNick} />
              : <OtherTalkComponent
                content={d.chatMessage} nick={d.challengeNick} />
            : d.messageType == 'CHALLENGE' ?
              <ChallengeSuccess> {d.chatMessage}</ChallengeSuccess>
              : <ChatOutAndEnter>{d.chatMessage}</ChatOutAndEnter>
  
      }
      {loading && <ChatLoading></ChatLoading>}
      {voiceReading && <ChatBotComponent voiceReading={voiceReading} />}
  
    </ChatBody>
    <ChatInput onSend={onSend} />
  </ChatContainer>
  );
  };
  
  ChatUI.defaultProps = {
  title: '챌린지 주제',
  data: [],  // data의 기본값을 빈 배열로 설정
  };
  export default ChatUI;
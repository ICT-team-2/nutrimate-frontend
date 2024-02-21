import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Divider from '@mui/material/Divider';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';
import { useRef, useEffect } from 'react';
import ChatLoading from '@src/component/chat/chatbot/ChatLoading.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone,faVolumeXmark,faVolumeHigh} from '@fortawesome/free-solid-svg-icons';
import ChatBotComponent from '@src/component/chat/chatbot/ChatBotComponent';
import ChatLoadingText from '@src/component/chat/chatbot/ChatLoadingText';
import { Tooltip, Typography, Stack, IconButton } from '@mui/material';

const ChatContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    zIndex: 1000;
    
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
  const { title, overflow, height, data, onSend, nickname, loading, micicon,voice,loadingtext,voiceText } = props;
  const [voiceReading, setVoiceReading] = useState(false);
  //tts
  const [textReading, setTextReading] = useState(true);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
  //tts


  const scrollRef = useRef();
  useEffect(() => {
    stopSynthesis();
    // useEffect 훅 내부에서 스크롤 이동을 처리합니다.
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
  if(!textReading){
    if(data[data.length-1].challengeNick === '챗봇'){
          startSynthesis(data[data.length-1].chatMessage);
    }
          
  }

  }, [data,loadingtext]);
  
  const Voice = () => {
     setVoiceReading(true);
  };

  //tts
  useEffect(() => {
      // useEffect 훅 내부에서 스크롤 이동을 처리합니다.
    if ('speechSynthesis' in window ) {
      setSynthesisSupported(true);
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      setSynthesisSupported(false);
    }
  }, []);


  const loadVoices = () => {
    const loadedVoices = window.speechSynthesis.getVoices();
    const koreanVoices = loadedVoices.filter(voice => voice.lang.startsWith('ko'));
    setVoices(koreanVoices);
  };

  const startSynthesis = (message) => {
    utterance.text = message;
    utterance.voice = voices[0];

    window.speechSynthesis.speak(utterance);
  };

  const stopSynthesis = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };


  //tts





  const Reading= () => {
    if(textReading==true){
      stopSynthesis();
      setTextReading(false);
    }else{
      setTextReading(true);
    }
  };
  
  useEffect(() => {
    setVoiceReading(voice);
  }, [voiceReading]);
 
  
  const microphoneTooltipContent = '음성 인식';
  const readAloudTooltipContent = textReading ? '챗봇의 답변을 읽어줍니다.' : '챗봇의 답변을 읽어주는 것을 끕니다.';




  return (
  <ChatContainer >
  <ChatHeader>
    
  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between"> {/* 왼쪽/오른쪽 정렬 */}
        <Typography variant="h6">{title}</Typography> {/* Title 왼쪽에 위치 */}
        <Stack direction="row" spacing={2}>
        {micicon && (
            <Tooltip title={readAloudTooltipContent}
            PopperProps={{
              style: { zIndex: 20000 } // 툴팁의 z-index 값을 조정하여 ChatContainer 위에 나타나도록 함
            }}   
            >
              <IconButton onClick={Reading}>
                <FontAwesomeIcon icon={textReading ? faVolumeHigh : faVolumeXmark} style={{ fontSize: '24px' }} />
              </IconButton>
            </Tooltip>
          )}
          {micicon && (
            <Tooltip title={microphoneTooltipContent}
            PopperProps={{
              style: { zIndex: 20000 } // 툴팁의 z-index 값을 조정하여 ChatContainer 위에 나타나도록 함
            }}>
              <IconButton onClick={Voice}>
                <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: '24px', color: 'red' }} />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Stack>
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
      {loadingtext && <ChatLoadingText content={voiceText}></ChatLoadingText>}
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
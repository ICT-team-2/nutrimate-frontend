import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import Divider from '@mui/material/Divider';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';
import ChatLoading from '@src/component/chat/chatbot/ChatLoading.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faVolumeXmark, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import ChatLoadingText from '@src/component/chat/chatbot/ChatLoadingText';
import { Tooltip, Typography, Stack, IconButton } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

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


let recognition;
const ChatUI = (props) => {
  const { title, overflow, height, data, onSend, nickname, loading, micicon } = props;

  //stt
  const [voiceReading, setVoiceReading] = useState(false);
  const [voicedata, setVoicedata] = useState([]);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loadingtext, setLoadingtext] = useState('');
  const [loadingVoice, setLoadingVoice] = useState('');
  //stt
  //tts
  const [textReading, setTextReading] = useState(true);
  const [synthesisSupported, setSynthesisSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const [utterance, setUtterance] = useState(new SpeechSynthesisUtterance());
  //tts
  let prevStateLength = useRef(voicedata.length);
  const scrollRef = useRef();
  useEffect(() => {
    //setVoicedata(data)
    if (micicon) {
      setVoicedata(prevVoicedata => [...prevVoicedata, data[data.length - 1]]);
      prevStateLength.current = voicedata.length;
    } else {
      setVoicedata(data);
    }
  }, [data]);


  useEffect(() => {
    stopSynthesis();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    // voicedata의 길이가 변할 때마다 실행됩니다.
    if (!textReading && voicedata.length > prevStateLength.current) {
      // voicedata의 길이가 증가하고, 마지막 메시지의 발송자가 '챗봇'인 경우에만 startSynthesis를 호출합니다.
      if (voicedata[voicedata.length - 1].challengeNick === '챗봇') {
        startSynthesis(voicedata[voicedata.length - 1].chatMessage);
        prevStateLength.current = voicedata.length;
      }
    }


  }, [voicedata]);
  useEffect(() => {
    // useEffect 훅 내부에서 스크롤 이동을 처리합니다.
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [loadingtext]);


  const Voice = () => {
    setVoiceReading(true);

  };
  //stt

  const handleSend = (message) => {
    setVoicedata(prevVoicedata => [...prevVoicedata, {
      'chatMessage': message,
      'challengeNick': '유저',
      'messageType': 'CHAT',
    }]);
    setLoadingVoice(true);
    axios.post(`${import.meta.env.REACT_APP_FLASK_URL}/chatbot`, { 'content': message })
      .then(response => {
        const botChatData = { 'chatMessage': response.data.messages, 'challengeNick': '챗봇', 'messageType': 'CHAT' };
        setVoicedata(prevVoicedata => [...prevVoicedata, botChatData]);
        setLoadingVoice(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoadingVoice(false);
      });
  };


  useEffect(() => {
    if (voiceReading) {
      if (!('webkitSpeechRecognition' in window)) {
        setTranscript('당신의 브라우저는 STT를 지원하지 않습니다.');
        setVoiceReading(false);
      } else {//음성인식 지원하는 브라우저
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
        recognition.lang = 'ko-KR';
        recognition.interimResults = true;

        recognition.onspeechstart = () => {//음성 인식 서비스에서 음성으로 인식하는 소리가 감지되면 실헹되는 이벤트
        };


        recognition.onspeechend = () => { //음성 인식 서비스에서 인식한 음성이 더 이상 감지되지 않으면 실행되는 이벤트
          recognition.stop();

          setIsRecognizing(false);
          setLoadingtext(false);
          setVoiceReading(false);
        };

        recognition.onresult = function(event) { //음성 인식 서비스가 결과를 반환할 때 실행되는 이벤트
          // 최종 결과를 저장할 변수를 초기화합니다.
          let finalTranscript = '';


          setTranscript(Array.from(event.results).map(results => results[0].transcript).join(''));
          // 결과를 반복하면서 최종 결과를 추출합니다.
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript = Array.from(event.results).map(results => results[0].transcript).join('');
            }
          }

          // 최종 결과를 서버로 전송합니다.
          if (finalTranscript.trim() !== '') {
            handleSend(finalTranscript);

          }
        };

        recognition.onerror = () => {
          toast.warn('음성인식에 실패했습니다. 다시 한 번 시도 해주세요.');
          setVoiceReading(false);
          setIsRecognizing(false);
          setLoadingtext(false);
        };

        if (isRecognizing) {
          recognition.stop();
          setIsRecognizing(false);

        } else {
          recognition.start();
          setTranscript('');
          setLoadingtext(true);
          setIsRecognizing(true);
        }

      }
    }

  }, [voiceReading]);


  //stt


  //tts
  useEffect(() => {
    // useEffect 훅 내부에서 스크롤 이동을 처리합니다.
    if ('speechSynthesis' in window) {
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


  const Reading = () => {
    if (textReading == true) {
      stopSynthesis();
      setTextReading(false);
    } else {
      setTextReading(true);
    }
  };


  const microphoneTooltipContent = '음성 인식';
  const readAloudTooltipContent = textReading ? '챗봇의 답변을 읽어줍니다.' : '챗봇의 답변을 읽어주는 것을 끕니다.';


  return (
    <ChatContainer>
      <ChatHeader>

        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{title}</Typography>
          <Stack direction="row" spacing={2}>
            {micicon && (
              <Tooltip title={readAloudTooltipContent}
                       PopperProps={{
                         style: { zIndex: 20000 },
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
                         style: { zIndex: 20000 },
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

        {voicedata.length > 0 ?
          Array.isArray(voicedata)
            ? voicedata.map((d, i) =>
              d && d.messageType == 'CHAT' ?
                d.challengeNick == nickname ?
                  <MyTalkComponent key={i} content={d.chatMessage} nick={d.challengeNick} />
                  : <OtherTalkComponent key={i} content={d.chatMessage} nick={d.challengeNick} />
                : d && d.messageType == 'CHALLENGE' ?
                  <ChallengeSuccess key={i}> -- {d.chatMessage} --</ChallengeSuccess>
                  : d ? <ChatOutAndEnter key={i}>{d.chatMessage}</ChatOutAndEnter>
                    : (null), // 수정된 부분
            )
            : voicedata.messageType == 'CHAT' ?
              voicedata.challengeNick == nickname ?
                <MyTalkComponent
                  content={voicedata.chatMessage}
                  nick={voicedata.challengeNick} />
                : <OtherTalkComponent
                  content={voicedata.chatMessage} nick={voicedata.challengeNick} />
              : voicedata.messageType == 'CHALLENGE' ?
                <ChallengeSuccess> {voicedata.chatMessage}</ChallengeSuccess>
                : <ChatOutAndEnter>{voicedata.chatMessage}</ChatOutAndEnter>
          : (null) // 수정된 부분
        }
        {(loading || loadingVoice) && <ChatLoading></ChatLoading>}
        {loadingtext && <ChatLoadingText content={transcript}></ChatLoadingText>}

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
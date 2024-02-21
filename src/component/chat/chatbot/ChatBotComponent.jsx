import React, { useEffect, useRef, useState } from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const ChatBotPaper = styled(Paper)`
    width: 450px;
    background-color: white;
    margin-bottom: 10px;
    display: ${({ openchat }) => openchat === 'true' ? 'block' : 'none'};
`;
const CircleButton = styled(Button)`
    border-radius: 50%;
    aspect-ratio: 1/1;
    padding: 20px;
    min-width: 50px;
`;
const ChatBotContainer = styled.div`
    position: fixed;
    bottom: 2vh;
    right: 2vw;
    z-index: 20000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;


let count=0;
const ChatBotComponent = (props) => {
  const { voiceReading} = props;
  const [openChat, setOpenChat] = useState(false);
  const documentRef = useRef(document);
  const chatBotRef = useRef(null);
  const chatBotButtonRef = useRef(null);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [nickname, setNickname] = useState('유저');
  const [voice, setVoice] = useState(voiceReading);
  const [loadingtext, setLoadingtext] = useState(false);

  const handleSend =  (message) => {
    console.log('123123')
      setChatData(prevChatData => {
        // prevChatData가 비어있지 않고, 마지막 요소의 challengeNick이 '유저'와 같지 않을 때만 새로운 데이터를 추가
        if (prevChatData.length === 0 || prevChatData[prevChatData.length - 1].challengeNick !== '유저') {
            return [...prevChatData, { 'chatMessage': message, 'challengeNick': '유저', 'messageType': 'CHAT' }];
        }
        // 그렇지 않으면 prevChatData를 그대로 반환 (즉, 상태를 업데이트하지 않음)
        return prevChatData;
    });
    setLoading(true); 
    axios.post('http://localhost:2222/chatbot', { 'content': message })
    .then(response => {
      setLoading(false);
      setChatData(prevChatData => {
        if (prevChatData.length === 0 || prevChatData[prevChatData.length - 1].challengeNick !== '챗봇') {
            return [...prevChatData, { 'chatMessage': response.data.messages, 'challengeNick': '챗봇', 'messageType': 'CHAT' }];
        }
        return prevChatData;
    });
    })
    .catch(error => {
      setLoading(false);
      console.error('Error:', error);
    });
  };



  //chatbot 밖을 클릭하면 챗봇 닫힘
  useEffect(() => {
      count++;
      
      if(count==1){
          const chatData={ 'chatMessage' : '안녕하세요. 챗봇입니다. 무엇을 도와드릴까요?', 'challengeNick': '챗봇','messageType':'CHAT' }
          setChatData(prevChatData => [...prevChatData, chatData]); 
      }  
      if(voice){
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
          console.log('당신의 브라우저는 STT를 지원하지 않습니다.');
          setVoice(false);
        } else {
          if (voice) {
            SpeechRecognition.startListening({ continuous: true, language: 'ko-KR' });
          }
        }
      }




    const handleClickOutside = (event) => {
      if (!chatBotRef.current.contains(event.target)
        && !chatBotButtonRef.current.contains(event.target)) {
        setOpenChat(false);
      }
    };
    documentRef.current.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [voiceReading]);

  useEffect(() => {
    let timeoutId;
    console.log(transcript);
    const handleTranscriptChange = () => {
      clearTimeout(timeoutId);
  
      timeoutId = setTimeout(() => {
        // 일정 시간이 경과하면 동작을 수행합니다.
        SpeechRecognition.stopListening();
        setVoice(false);
        setTimeout(() => {
          
          setLoadingtext(false);
          resetTranscript();
          handleSend(transcript);
        }, 3000);
      }, 300);
    };
    

      if (transcript !== '') {
        setLoadingtext(true)
        handleTranscriptChange();
      }



    return () => {
      clearTimeout(timeoutId);
    };
  }, [transcript,voice]);
  
  return (
    <ChatBotContainer>
      <Fade in={openChat} timeout={250}>
        <ChatBotPaper openchat={openChat + ''} ref={chatBotRef}>
          <ChatUI title='챗봇' overflow height={'450px'} onSend={handleSend}  data={chatData} nickname={nickname} loading={loading} voice={voice} voiceText={transcript}  loadingtext={loadingtext} micicon='micicon'/>
        </ChatBotPaper>
      </Fade>
      <CircleButton
        variant='contained'
        onClick={() => {
          setOpenChat(!openChat);
        }}
        ref={chatBotButtonRef}
      >
        <FontAwesomeIcon icon={faComments} />
      </CircleButton>
    </ChatBotContainer>
  );
};

export default ChatBotComponent;

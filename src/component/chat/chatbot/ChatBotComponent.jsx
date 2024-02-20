import React, { useEffect, useRef, useState } from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fade from '@mui/material/Fade';
import axios from 'axios';


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
let recognition;
const ChatBotComponent = (props) => {
  const { voiceReading} = props;
  const [openChat, setOpenChat] = useState(false);
  const documentRef = useRef(document);
  const chatBotRef = useRef(null);
  const chatBotButtonRef = useRef(null);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [nickname, setNickname] = useState('유저');
  const [voice, setVoice] = useState(voiceReading);


  let chatDataTest='sdfdf'
  const handleSend =  (message) => {

    setChatData(prevChatData => [...prevChatData, { 'chatMessage': message, 'challengeNick': '유저', 'messageType': 'CHAT' }]);
    setLoading(true); 
    axios.post('http://localhost:2222/chatbot', { 'content': message })
    .then(response => {
      setLoading(false);
      console.log(response.data);
      const botChatData = { 'chatMessage': response.data.messages, 'challengeNick': '챗봇', 'messageType': 'CHAT' };
      console.log(response.data.messages)
      setChatData(prevChatData => [...prevChatData, botChatData]);
    })
    .catch(error => {
      setLoading(false);
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    // chatData 상태가 업데이트될 때마다 로그를 출력
    console.log("Chat data updated:", chatData);
    }, [chatData]);

    useEffect(() => {
        // loading 상태가 업데이트될 때마다 로그를 출력
        console.log("Loading state updated:", loading);
    }, [loading]);


  //chatbot 밖을 클릭하면 챗봇 닫힘
  useEffect(() => {
      count++;
      
      if(count==1){
          const chatData={ 'chatMessage' : '안녕하세요. 챗봇입니다. 무엇을 도와드릴까요?', 'challengeNick': '챗봇','messageType':'CHAT' }
          setChatData(prevChatData => [...prevChatData, chatData]); 
      }  
      if(voiceReading){
        if(!('webkitSpeechRecognition' in window)){
          setTranscript('당신의 브라우저는 STT를 지원하지 않습니다.');
          setVoice(false);
         } else{//음성인식 지원하는 브라우저
          //SpeechRecognition객체 생성
          recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
          recognition.lang = 'ko-KR'; // 인식 언어 설정.미 설정시 <html lang="en">  lang속성으로 설정  			
          //recognition.maxAlternatives = 1; // maxAlternatives(기본값 1)가 숫자가 작을수록 화자의 발음대로 인식하고, 크면 문맥을 고려 다양한 대체 음절을 제시한다
          recognition.interimResults = true;//true는 중간 인식 결과 반환, false(기본값)는 최종 인식 결과만 반환 즉 true설정시 result이벤트가 계속 발생한다.            
          
          //SpeechRecognition객체의 이벤트 설정
          recognition.onspeechstart=()=>{//음성 인식 서비스에서 음성으로 인식하는 소리가 감지되면 실헹되는 이벤트
              console.log('Recognition Start!')
          };  
          

          recognition.onspeechend = ()=> { //음성 인식 서비스에서 인식한 음성이 더 이상 감지되지 않으면 실행되는 이벤트
              console.log('Recognition Stop!')
              recognition.stop();
              setIsRecognizing(false);
          };

          recognition.onresult = function(event) { //음성 인식 서비스가 결과를 반환할 때 실행되는 이벤트
            console.log('event.results:', event.results);
            // 최종 결과를 저장할 변수를 초기화합니다.
            let finalTranscript = '';
          
            // 결과를 반복하면서 최종 결과를 추출합니다.
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              }
            }
          
            // 최종 결과를 서버로 전송합니다.
            if (finalTranscript.trim() !== '') {
              //console.log(chatDataTest)
              chatDataTest=finalTranscript
              //console.log(chatDataTest)
              setVoice(true);
              handleSend(finalTranscript);
              
            }
          }
          
          recognition.onerror = function (event) {
              console.error('음성 인식 오류가 발생했습니다: ' + event.error);
              setVoice(false);
          };
        
              if(isRecognizing){ //음성인식중인 경우                        
                //음성인식 서비스 중지.지금까지 캡처된 오디오를 반환
                recognition.stop();
                setIsRecognizing(false)
                
                } 
                else {
                    recognition.start();
                    setIsRecognizing(true)
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
  
  return (
    <ChatBotContainer>
      <Fade in={openChat} timeout={250}>
        <ChatBotPaper openchat={openChat + ''} ref={chatBotRef}>
          <ChatUI title='챗봇' overflow height={'450px'} onSend={handleSend}  data={chatData} nickname={nickname} loading={loading} voice={voice} micicon='micicon'/>
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

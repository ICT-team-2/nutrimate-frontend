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
const ChatBotComponent = (props) => {
  const { voiceReading} = props;
  const [openChat, setOpenChat] = useState(false);
  const documentRef = useRef(document);
  const chatBotRef = useRef(null);
  const chatBotButtonRef = useRef(null);
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nickname, setNickname] = useState('유저');

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


  //chatbot 밖을 클릭하면 챗봇 닫힘
  useEffect(() => {
      count++;
      
      if(count==1){
          const chatData={ 'chatMessage' : '안녕하세요. 챗봇입니다. 무엇을 도와드릴까요?', 'challengeNick': '챗봇','messageType':'CHAT' }
          setChatData(prevChatData => [...prevChatData, chatData]); 
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
          <ChatUI title='챗봇' overflow height={'450px'} onSend={handleSend}  data={chatData} nickname={nickname} loading={loading} micicon='micicon'/>
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

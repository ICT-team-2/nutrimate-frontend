import React, { useEffect, useRef, useState } from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import styled from 'styled-components';
import { Button, Paper } from '@mui/material';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Fade from '@mui/material/Fade';

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

const ChatBotComponent = () => {
  const [openChat, setOpenChat] = useState(false);
  const documentRef = useRef(document);
  const chatBotRef = useRef(null);
  const chatBotButtonRef = useRef(null);
  //chatbot 밖을 클릭하면 챗봇 닫힘
  useEffect(() => {
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
  }, []);

  return (
    <ChatBotContainer>
      <Fade in={openChat} timeout={250}>
        <ChatBotPaper openchat={openChat + ''} ref={chatBotRef}>
          <ChatUI title="챗봇" overflow height={'450px'} />
        </ChatBotPaper>
      </Fade>
      <CircleButton
        variant="contained"
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

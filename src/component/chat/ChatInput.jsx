import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react';

const ChatInputContainer = styled.div`
    width: calc(100% - 40px);
    display: flex;
    background-color: white;
    margin: 20px;
`;
const StyledTextField = styled(TextField)`
    flex-grow: 1;

`;
const StyledButton = styled(Button)`
    height: 40px;
    margin-left: 10px;
`;

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    if (message.trim() !== '')
      onSend(message);
    setMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSendClick();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    console.log('message:', message);
  }, [message]);

  return (
    <ChatInputContainer>
      <StyledTextField
        size="small"
        label="메세지를 입력하세요"
        multiline
        value={message}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <StyledButton variant="contained" onClick={handleSendClick}>
        <SendIcon />
      </StyledButton>
    </ChatInputContainer>
  );
};

export default ChatInput;

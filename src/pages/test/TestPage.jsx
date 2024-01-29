import React from 'react';
import styled from 'styled-components';
import ChatBotComponent from '@src/component/chat/bot/ChatBotComponent.jsx';


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const TestPage = () => {
  return (

    <ChatBotComponent />


  );
};

export default TestPage;

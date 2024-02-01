import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';

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

const ChatUI = (props) => {
  const { title, overflow, height, data } = props;
  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant='h6'>{title}</Typography>
      </ChatHeader>
      <Divider />
      <ChatBody overflow={overflow + ''} height={height}>
        <MyTalkComponent />
        <OtherTalkComponent />
        <MyTalkComponent content='아무거나 쓰기 귀찮은데 뭐쓰지 뚜뚜뚜뚜따따따따 ㅁㄴㅇㅁㄴㅐㅇㄴㅁㅇㅁㄴㅇ'
                         nick={'가길동'} />
        <MyTalkComponent content='아무거나 쓰기 귀찮은데 뭐쓰지 뚜뚜뚜뚜따따따따 ㅁㄴㅇㅁㄴㅐㅇㄴㅁㅇㅁㄴㅇ'
                         nick={'나길동'} />
        {data.map((d, i) => <OtherTalkComponent
          key={i} content={d.content}
          nick={d.nick} />)}

      </ChatBody>
      <ChatInput />
    </ChatContainer>
  );
};
ChatUI.defaultProps = {
  title: '챌린지 주제',
};

export default ChatUI;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import Divider from '@mui/material/Divider';
import ChatInput from '@src/component/chat/ChatInput.jsx';
import { Typography } from '@mui/material';
import MyTalkComponent from '@src/component/chat/MyTalkComponent.jsx';
import OtherTalkComponent from '@src/component/chat/OtherTalkComponent.jsx';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import useLeaveChatroom from '@src/hooks/dmchat/chatroom/useLeaveChatroom.jsx';

const ChatContainer = styled.div`
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    z-index: 1000;

`;

const ChatHeader = styled.div`
    padding: 20px;
    display: flex;
`;
const ChatBody = styled.div`
        //background-color: ${({ theme }) => theme['chat-bg']};
    flex-grow: 1;
    overflow-y: ${({ overflow }) => overflow === 'true' ? 'auto' : 'visible'};
    height: ${({ height }) => height ? height : 'auto'};
`;

/**
 *
 * @param props {object}
 * @param props.title {string} 채팅방 제목
 * @param props.overflow {boolean} 스크롤바 여부
 * @param props.height {string} 높이
 * @param props.data {Array} 채팅 데이터
 * @param props.onSend {function} 메시지 전송 이벤트
 * @param props.nickname {string} 사용자 닉네임
 * @returns {Element}
 * @constructor
 */
const DMChatUI = (props) => {
  const { title, overflow, height, data, onSend, onDelete, onLeave, deleted } = props;

  const scrollRef = useRef();
  //이전의 deleted값 저장용
  const [isDeleted, setIsDeleted] = useState({ delete: false, chatId: undefined });

  useEffect(() => {
    if (!data) return;
    setIsDeleted(deleted);//비동기
    //삭제할 경우 스크롤 변화없음(이전의 deleted값과 비교하여 변화가 없을 경우 스크롤 이동)
    //deleted값 변화 = 삭제가 일어난 경우
    if (deleted !== isDeleted) return;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <ChatContainer>
      <ChatHeader>
        <Typography variant="h6">{title}</Typography>
        <FlexGrowDiv />
        <IconButton onClick={() => {
          onLeave();
        }}>
          <LogoutIcon />
        </IconButton>
      </ChatHeader>
      <Divider />
      <ChatBody ref={scrollRef} overflow={overflow + ''} height={height}>
        {data && data?.map((d) => {
          if (d.userId === parseInt(sessionStorage.getItem('userId'))) {
            return <MyTalkComponent
              onDelete={() => onDelete(d.chatId)}
              key={d.chatId}
              nick={d.userNick} content={d.chatMessage}
              src={d.userProfile
                && `${import.meta.env.REACT_APP_BACKEND_URL}${d.userProfile}`}
            />;
          } else {
            return <OtherTalkComponent
              key={d.chatId}
              src={d.userProfile
                && `${import.meta.env.REACT_APP_BACKEND_URL}${d.userProfile}`}
              content={d.chatMessage}
              nick={d.userNick} />;
          }
        })}
      </ChatBody>
      <ChatInput onSend={onSend} />
    </ChatContainer>
  );
};

DMChatUI.defaultProps = {
  title: '챌린지 주제',
  data: [],  // data의 기본값을 빈 배열로 설정
  onSend: () => {
  },
  onLeave: () => {
  },
};
export default DMChatUI;
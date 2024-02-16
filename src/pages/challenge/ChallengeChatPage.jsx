import React, { useEffect, useState } from 'react';
import ChatUI from '@src/component/chat/ChatUI.jsx';
import { Paper } from '@mui/material';
import styled from 'styled-components';
import * as Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import ChatJoinModal from '@src/component/chat/ChatJoinModal.jsx';
import ChallengeModal from '@src/component/chat/ChallengeModal.jsx';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

const ChallengeChatContainer = styled(Paper)`
    width: 60%;
    min-height: 83vh;
    display: flex;
    flex-direction: column;
`;

const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledButton = styled(Button)`
    width: 100%;
    height: 40px;


`;


let RoomType = '';
let chatroom;
let userId;
let nickname;


const ChallengeChatPage = () => {
  const stompClient = Stomp.client('ws://localhost:9999/ws');
  const { chatroomId } = useParams();
  const [chatData, setChatData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showChallengeModal, setChallengeModal] = useState(false);


  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };


  const handleChallengeSuccess = (success) => {
    // Handle the challenge success state here
    stompClient.send('/pub/chat/' + RoomType, {}, JSON.stringify({
      'chatMessage': nickname + '가(이) 챌린지를 성공했습니다.',
      'challengeNick': nickname,
      'chatroomId': chatroom,
      'messageType': 'CHALLENGE',
      'userId': userId,
    }));
  };

  const ChatLoading = () => {
    fetch(`http://localhost:9999/challenge/chat/prev?chatroomId=${chatroom}`)
      .then(response => response.json())
      .then(datas => {
        console.log(datas);
        for (const data of datas) {
          setChatData(prevChatData => [...prevChatData, data]);
        }
        stompClient.send('/pub/chat/' + RoomType, {}, JSON.stringify({
          'chatMessage': nickname + '가(이) 입장했어요',
          'challengeNick': nickname,
          'chatroomId': chatroom,
          'messageType': 'ENTER',
          'userId': userId,
        }));
      })
      .catch(error => {
        console.error('Error fetching chat data:', error);
      });
  };

  const handleChallengeModalClick = () => {
    setChallengeModal(true);
  };


  useEffect(() => {
    if (chatroomId == 1) {
      RoomType = 'FIRST_ROOM';
      chatroom = 1;
    } else if (chatroomId == 2) {
      RoomType = 'SECOND_ROOM';
      chatroom = 3;
    }

    stompClient.connect({}, () => {

      fetch(`http://localhost:9999/challenge/chat/member?chatroomId=${chatroom}&userId=3`, {
        method: 'POST',
      })//@RequestBody로 받는다
        .then(response => response.json())
        .then(data => {
          if (data.memberOk == 1) {
            userId = data.userId;
            nickname = data.challengeNick;
            ChatLoading();

          } else if (data.memberOk == 0) {
            setShowModal(true);

          }
        })
        .catch(err => console.log(err));

      console.log('Connected to WebSocket');
      stompClient.subscribe('/sub/channel/' + RoomType, (message) => {
        const chatData = JSON.parse(message.body);
        setChatData(prevChatData => [...prevChatData, chatData]);
      });


    }, (error) => {
      console.error('Error during connection:', error);
    });
    const handleUnload = (ev) => {
      ev.preventDefault();
      stompClient.send('/pub/chat/' + RoomType, {}, JSON.stringify({
        'chatMessage': nickname + '가(이) 퇴장했습니다.',
        'challengeNick': nickname,
        'chatroomId': chatroom,
        'messageType': 'LEAVE',
        'userId': userId,
      }));

    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };


  }, [chatroomId]);


  const handleSend = (message) => {
    stompClient.send('/pub/chat/' + RoomType, {}, JSON.stringify({
      'chatMessage': message,
      'challengeNick': nickname,
      'chatroomId': chatroom,
      'messageType': 'CHAT',
      'userId': userId,
    }));
  };


  const handleSendModal = (inputValue) => {
    console.log(inputValue);
    fetch(`http://localhost:9999/challenge/account`, {
      method: 'POST', body: JSON.stringify({ 'chatroomId': chatroom, 'challengeNick': inputValue, 'userId': 3 }),
      headers: { 'content-type': 'application/json' },
    })//@RequestBody로 받는다
      .then(response => response.json())
      .then(data => {
        if (data.memberOk == 1) {
          userId = data.userId;
          nickname = data.challengeNick;
          ChatLoading();
          setShowModal(false);
        } else if (data.memberDupl != null) {
          alert(data.memberDupl);

        }
      });
  };


  const tooltipTitle = chatroomId === '1' ? '빈 물컵의 사진을 올려주세요' : '샐러드 사진을 올려주세요! ';
  return (
    <PageContainer>
      <ChallengeChatContainer>
        {/* Pass props to ChatUI */}
        <ChatUI title="Challenge Chat" overflow={true} height="300px" data={chatData} onSend={handleSend}
                nickname={nickname} />
        {showModal && <ChatJoinModal showModal={showModal} setShowModal={setShowModal} onSend={handleSendModal} />}
        <Tooltip
          open={open}
          onClose={handleTooltipClose}
          onOpen={handleTooltipOpen}
          placement="top"
          title={<span style={{ fontSize: '20px' }}>{tooltipTitle}</span>}
        >
          <StyledButton variant="contained" onClick={handleChallengeModalClick}>챌린지에 참여하세요</StyledButton>

        </Tooltip>
        {showChallengeModal &&
          <ChallengeModal setChallengeSuccess={handleChallengeSuccess} showChallengeModal={showChallengeModal}
                          setChallengeModal={setChallengeModal} nickname={nickname} chatroom={chatroom} userId={userId}
                          RoomType={RoomType} />}
      </ChallengeChatContainer>

    </PageContainer>
  );
};

export default ChallengeChatPage;
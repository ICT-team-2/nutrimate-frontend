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
import axios from 'axios';
import { useAtom } from 'jotai';
import { userIdAtom } from '@src/pages/login/atom.js';

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


const ChallengeChatPage = () => {
  const stompClient = Stomp.client('ws://localhost:9999/ws');
  const { chatroomId } = useParams();
  const [chatData, setChatData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showChallengeModal, setChallengeModal] = useState(false);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [nickname, setNickname] = useState('');
  const [roomType, setRoomType] = useState('');
  const [chatroom, setChatroom] = useState(1);


  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };


  const handleChallengeSuccess = (success) => {
    // Handle the challenge success state here
    stompClient.send('/pub/chat/' + roomType, {}, JSON.stringify({
      'chatMessage': nickname + '가(이) 챌린지를 성공했습니다.',
      'challengeNick': nickname,
      'chatroomId': chatroom,
      'messageType': 'CHALLENGE',
      'userId': userId,
    }));
  };

  const ChatLoading = () => {
    axios.get(`http://localhost:9999/challenge/chat/prev?chatroomId=${chatroom}`)
      .then(datas => {
        console.log('datas: ', datas.data);
        for (const data of datas.data) {
          setChatData(prevChatData => [...prevChatData, data]);
        }
        stompClient.send('/pub/chat/' + roomType, {}, JSON.stringify({
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
    if (userId == null) {
      return;
    }
    if (chatroomId === '1') {
      setRoomType('FIRST_ROOM');
      setChatroom(1);
    } else if (chatroomId === '3') {
      setRoomType('SECOND_ROOM');
      setChatroom(3);
    }

    stompClient.connect({}, async () => {
      await axios.post(`http://localhost:9999/challenge/chat/member?chatroomId=${chatroom}&userId=${userId}`)//@RequestBody로 받는다
        .then(data => {
          console.log('connect ', data.data);
          if (data.data.memberOk === 1) {
            let newNickname = data.data.challengeNick;
            setNickname(newNickname);
            setShowModal(false);
          } else if (data.data.memberOk === 0) {
            setShowModal(true);
          }
        })
        .catch(err => console.log(err));


      console.log('Connected to WebSocket');
      stompClient.subscribe('/sub/channel/' + (chatroomId === '1' ? 'FIRST_ROOM' : 'SECOND_ROOM'), (message) => {
        const chatData = JSON.parse(message.body);
        console.log('subscribe chatData:', chatData);
        setChatData(prevChatData => [...prevChatData, chatData]);
      });
    }, (error) => {
      console.error('Error during connection:', error);
    });

    const handleUnload = (ev) => {
      ev.preventDefault();
      stompClient.send('/pub/chat/' + roomType, {}, JSON.stringify({
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

  }, [chatroomId, userId]);

  useEffect(() => {
    if (nickname === '') return;
    ChatLoading();
  }, [nickname]);


  const handleSend = (message) => {
    stompClient.send('/pub/chat/' + roomType, {}, JSON.stringify({
      'chatMessage': message,
      'challengeNick': nickname,
      'chatroomId': chatroom,
      'messageType': 'CHAT',
      'userId': userId,
    }));
  };


  const handleSendModal = async (inputValue) => {
    console.log(inputValue);
    await axios.post(`http://localhost:9999/challenge/account`,
      {
        'chatroomId': chatroom,
        'challengeNick': inputValue,
        'userId': userId,
      })//@RequestBody로 받는다
      .then(data => {
        if (data.data.memberOk === 1) {
          let newNickname = data.data.challengeNick;
          setNickname(newNickname);
          setShowModal(false);
        } else if (data.data.memberDupl != null) {
          alert(data.data.memberDupl);
        }
      });

  };


  const tooltipTitle = chatroomId === '1' ? '빈 물컵의 사진을 올려주세요' : '샐러드 사진을 올려주세요! ';
  return (
    <PageContainer>
      <ChallengeChatContainer>
        {/* Pass props to ChatUI */}
        <ChatUI title="Challenge Chat"
                overflow={true}
                height="300px"
                data={chatData}
                onSend={handleSend}
                nickname={nickname} />
        {showModal &&
          <ChatJoinModal
            showModal={showModal}
            setShowModal={setShowModal}
            onSend={handleSendModal} />}
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
          <ChallengeModal
            setChallengeSuccess={handleChallengeSuccess}
            showChallengeModal={showChallengeModal}
            setChallengeModal={setChallengeModal} nickname={nickname}
            chatroom={chatroom} userId={userId}
            RoomType={roomType} />}
      </ChallengeChatContainer>

    </PageContainer>
  );
};

export default ChallengeChatPage;
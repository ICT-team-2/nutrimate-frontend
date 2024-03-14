import React, { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import useConnectStomp from '@src/hooks/dmchat/useConnectStomp.jsx';

const MyComponent = () => {
  const url = `${import.meta.env.REACT_APP_BACKEND_URL}/dm`;
  const { client, sendMessage, isConnected } = useConnectStomp({ url });

  useEffect(() => {
    if (isConnected) {
      sendMessage('/pub/dm/chat', {
        userId: sessionStorage.getItem('userId'),
        chatMessage: 'React',
      });
    }
  }, [isConnected]);

  return (<div>
    StompJs with React Example
  </div>);
};

export default MyComponent;

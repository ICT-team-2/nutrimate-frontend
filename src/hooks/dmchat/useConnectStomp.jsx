import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
//url = `http://localhost:9999/dm`
/**
 * Stomp
 * @param props {object}
 * @param props.url {string} - 연결할 서버 URL
 * @param props.afterConnect {function} - 연결 후 실행할 함수
 */
const useConnectStomp = (props) => {
  const { url, afterConnect, chatroomId } = props;
  const client = new useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // SockJS와 Stomp 클라이언트 설정
    const socket = new SockJS(url);
    client.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,//서버가 클라이언트로부터 하트비트 메시지를 받아들일 최대 시간 간격(밀리초 단위)을 지정
      heartbeatOutgoing: 4000, //서버가 클라이언트로 하트비트 메시지를 보내는 빈도(밀리초 단위)를 지정
      onConnect: () => {
        console.log('Connected to the server');
        // client.current.subscribe('/sub/topic/dm', onMessageReceived);
        setIsConnected(true);
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    // 클라이언트 활성화
    client.current.activate();

    // 컴포넌트 언마운트 시 연결 종료
    return () => {
      client.current.deactivate();
    };
  }, []);

  useEffect(() => {
    if (isConnected && chatroomId !== undefined) {
      client.current.subscribe(`/sub/topic/dm/${chatroomId}`, onMessageReceived);
    }
  }, [chatroomId]);

  const onMessageReceived = (message) => {
    console.log('Received message:', message.body);
  };

  // 메시지 전송 함수 추가
  /**
   *
   * @param destination {string} - 메시지를 전송할 대상
   * @param body {object} - 전송할 메시지
   */
  const sendMessage = (destination, body) => {
    if (client.current && isConnected) {
      client.current.publish({
        destination: destination,
        body: JSON.stringify(body),
      });
      console.log('Message sent:', body);
    } else {
      console.error('Cannot send message when client is not connected.');
      setTimeout(() => {
        sendMessage(destination, body);
      }, 5000);
    }
  };

  /**
   * @returns {{client: Client,
   * sendMessage: (function(string, object): void),
   * isConnected: boolean}}
   */
  return { client: client.current, sendMessage, isConnected };
};

export default useConnectStomp;
import React from 'react';
import styled,{ keyframes } from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const ChatLoadingTextContainer = styled.div`
    display: flex;
    padding: 30px;
`;
const TalkContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: lighten(#f0f4c3, 10%);

    
`;
const StyledUserAvatar = styled(UserAvatar)`
    margin-right: 15px;
`;
const TalkContentBody = styled(Paper)`
    background-color: white;
    padding: 15px;
    width: 80%;
    height:250px;
    position: relative;
    overflow: hidden;
    
`;

const BoxOverlay = styled.div`
    content: '';
    display: block;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
    z-index: 11;
    transform: translate3d(0, 0, 0);
`;
//background: linear-gradient(to bottom, rgba(232, 170, 10, 1), rgba(222, 238, 255, 0) 80%, rgba(255, 255, 255, .5));

const Title = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1;
    line-height: 100px;
    text-align: center;
    color: gray;
    text-transform: uppercase;
    font-size: 15px;
    text-indent: .3em;
`;


const StyledImg = styled.img`
    margin-left: 70px;
    width: 50%;

`;


const waveAnimation = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const Wave = styled.div`
    opacity: .4;
    position: absolute;
    top: 3%;
    left: 50%;
    background: #0af;
    width:500px;
    height: 500px;
    margin-left: -250px;
    margin-top: 150px;
    transform-origin: 50% 48%;
    border-radius: 43%;
    animation: ${waveAnimation} 3000ms infinite linear;
`;

const SecondaryWave = styled(Wave)`
    animation: ${waveAnimation} 5000ms infinite linear;
    opacity: .1;
    background: yellow;
`;

const TertiaryWave = styled(Wave)`
    animation: ${waveAnimation} 7000ms infinite linear;
`;





const ChatLoadingText = (props) => {
  const { nick, content, date } = props;
  return (
    <ChatLoadingTextContainer>
      <TalkContentContainer>
        <TalkContentBody>
        <StyledImg src="/src/asset/image/VoiceRecording.png" alt="채팅룸" />
        <Wave className="wave" />
        <SecondaryWave className="wave -two" />
        <TertiaryWave className="wave -three" />
        <BoxOverlay />
        <Title>{content}</Title>
        </TalkContentBody>
      </TalkContentContainer>
    </ChatLoadingTextContainer>
  );
};


export default ChatLoadingText;

import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Lato:300&display=swap');
`;

const OtherTalkContainer = styled.div`
    display: flex;
    padding: 30px;
`;
const TalkContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;
const StyledUserAvatar = styled(UserAvatar)`
    margin-right: 15px;
`;
const TalkContentBody = styled(Paper)`
    background-color: ${({ theme }) => theme['chat-reply-bg']};
    color: ${({ theme }) => theme['chat-reply-text']};
    padding: 15px;
    padding-bottom:25px;
    width: 30%;
`;

import styled, { keyframes } from 'styled-components';

const loader10AnimationG = keyframes`
    0% { background-color: rgba(255, 255, 255, .2); }
    25% { background-color: rgba(255, 255, 255, 1); }
    50% { background-color: rgba(255, 255, 255, .2); }
    75% { background-color: rgba(255, 255, 255, .2); }
    100% { background-color: rgba(255, 255, 255, .2); }
`;

const loader10AnimationM = keyframes`
    0% { background-color: rgba(255, 255, 255, .2); }
    25% { background-color: rgba(255, 255, 255, .2); }
    50% { background-color: rgba(255, 255, 255, 1); }
    75% { background-color: rgba(255, 255, 255, .2); }
    100% { background-color: rgba(255, 255, 255, .2); }
`;

const loader10AnimationD = keyframes`
    0% { background-color: rgba(255, 255, 255, .2); }
    25% { background-color: rgba(255, 255, 255, .2); }
    50% { background-color: rgba(255, 255, 255, .2); }
    75% { background-color: rgba(255, 255, 255, 1); }
    100% { background-color: rgba(255, 255, 255, .2); }
`;

const Loader10Container = styled.div`
    position: relative;
    width: 12px;
    height: 12px;
    top: 46%;
    left: 46%;
    border-radius: 12px;
    animation: ${loader10AnimationM} 3s ease-in-out infinite;
`;

const Loader10Before = styled.div`
    position: absolute;
    top: 0px;
    left: -25px;
    height: 12px;
    width: 12px;
    border-radius: 12px;
    animation: ${loader10AnimationG} 3s ease-in-out infinite;
`;

const Loader10After = styled.div`
    position: absolute;
    top: 0px;
    left: 25px;
    height: 10px;
    width: 10px;
    border-radius: 10px;
    animation: ${loader10AnimationD} 3s ease-in-out infinite;
`;


const ChatLoading = (props) => {

  return (
    <OtherTalkContainer>
      <StyledUserAvatar />
      <TalkContentContainer>
        <Typography variant="caption" fontWeight="bold">{'챗봇'}</Typography>
        <TalkContentBody>
            <Loader10Container className="loader10">
                <Loader10Before />
                <Loader10After />
            </Loader10Container>
        </TalkContentBody>
      </TalkContentContainer>
    </OtherTalkContainer>
  );
};

export default ChatLoading; 
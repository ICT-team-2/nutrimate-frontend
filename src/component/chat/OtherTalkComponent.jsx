import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const MyTalkContainer = styled.div`
    width: 100%;
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
    width: fit-content;

`;

const OtherTalkComponent = (props) => {
  const { nick, content, date } = props;

  return (
    <MyTalkContainer>
      <StyledUserAvatar />
      <TalkContentContainer>
        <Typography variant="caption" fontWeight="bold">{nick}</Typography>
        <TalkContentBody>
          {content}
        </TalkContentBody>
      </TalkContentContainer>
    </MyTalkContainer>
  );
};

OtherTalkComponent.defaultProps = {
  nick: '닉네임2',
  content: '내용2',
  date: '2021-10-01',
};

export default OtherTalkComponent;

import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

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
    width: fit-content;
    max-width: 70%;
`;
/**
 *
 * @param props
 * @param props.nick {string} 닉네임
 * @param props.content {string} 내용
 * @returns {Element}
 * @constructor
 */
const OtherTalkComponent = (props) => {
  const { nick, content, date, src } = props;

  return (
    <OtherTalkContainer>
      <StyledUserAvatar userNick={nick} src={src} />
      <TalkContentContainer>
        <Typography variant="caption" fontWeight="bold">{nick}</Typography>
        <TalkContentBody>
          {content}
        </TalkContentBody>
      </TalkContentContainer>
    </OtherTalkContainer>
  );
};

OtherTalkComponent.defaultProps = {
  nick: '닉네임2',
  content: '내용2',
  date: '2021-10-01',
};

export default OtherTalkComponent;

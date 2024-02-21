import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const AlignLeftContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

`;

const MyTalkContainer = styled.div`
    display: flex;
    padding: 30px;
    width: 100%;


`;
const TalkContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

`;
const StyledUserAvatar = styled(UserAvatar)`
    margin-left: 15px;
`;
const TalkContentBody = styled(Paper)`
    background-color: ${({ theme }) => theme['chat-bg']};
    padding: 15px;
    max-width: 70%;
`;
const StyledTypography = styled(Typography)`
    text-align: right;
`;

const MyTalkComponent = (props) => {
  const { nick, content, date } = props;
  return (
    <AlignLeftContainer>
      <MyTalkContainer>
        <TalkContentContainer>
          <StyledTypography variant="caption" fontWeight="bold">{nick}</StyledTypography>
          <TalkContentBody>
            {content}
          </TalkContentBody>
        </TalkContentContainer>
        <StyledUserAvatar />
      </MyTalkContainer>
    </AlignLeftContainer>
  );
};
MyTalkComponent.defaultProps = {
  nick: '닉네임1',
  content: '내용1',
  date: '2021-10-01',
};

export default MyTalkComponent;

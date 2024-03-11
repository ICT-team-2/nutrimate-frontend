import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';

const ItemContainer = styled.div`
    display: flex;
    padding: 20px;
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    width: 100%;
`;

const DMChatRoomItem = ({ roomName, latestChat }) => {
  return (
    <ItemContainer>
      <UserAvatar />
      <TextContainer>
        <Typography variant="body1" fontWeight={'bold'}>{roomName}</Typography>
        <Typography variant="caption" color={'grey'}>{latestChat}</Typography>
      </TextContainer>
    </ItemContainer>
  );
};

DMChatRoomItem.defaultProps = {
  roomName: 'roomName',
  latestChat: 'latestChat',
};

export default DMChatRoomItem;

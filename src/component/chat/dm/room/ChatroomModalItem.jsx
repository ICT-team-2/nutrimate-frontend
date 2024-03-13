import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';

const ItemContainer = styled.div`
    display: flex;
    padding: 20px;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;

    }
`;

const StyledTypography = styled(Typography)`
    margin: auto 10px;
`;

const ChatroomModalItem = ({ onClick, userProfile, userNick }) => {
  return (
    <ItemContainer onClick={() => onClick()}>
      <UserAvatar
        src={userProfile && `${import.meta.env.REACT_APP_BACKEND_URL}${userProfile}`}
        userNick={userNick}
      />
      <StyledTypography variant="body1">{userNick}</StyledTypography>
    </ItemContainer>
  );
};
ChatroomModalItem.defaultProps = {
  onClick: () => {
  },
};
export default ChatroomModalItem;

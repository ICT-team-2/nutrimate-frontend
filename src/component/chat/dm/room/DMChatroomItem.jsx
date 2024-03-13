import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { useAtom, useSetAtom } from 'jotai/react';
import { changeChatroomNameModalAtom, chatroomIdAtom, openedChatroomAtom } from '@src/component/chat/dm/atom.js';
import { Menu, MenuItem } from '@mui/material';
import useChangeChatroomName from '@src/hooks/dmchat/chatroom/useChangeChatroomName.jsx';
import ChangeProfileModal from '@src/component/mypage/myinfo/ChangeProfileModal.jsx';
import { profileModalAtom } from '@src/component/mypage/atom.js';
import { DM_CHATROOM_TAB } from '@src/component/chat/dm/const.js';
import useChangeChatroomProfile from '@src/hooks/dmchat/chatroom/useChangeChatroomProfile.jsx';
import useLeaveChatroom from '@src/hooks/dmchat/chatroom/useLeaveChatroom.jsx';

const ItemContainer = styled.div`
    display: flex;
    padding: 20px;
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;

    }
`;
const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px 0 10px;
    max-width: 100%;
`;

const StyledTypography = styled(Typography)`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
`;

const getChatroomProfile = (data, mode) => {
  if (data.chatroomProfile) {
    return `${import.meta.env.REACT_APP_BACKEND_URL}${data.chatroomProfile}`;
  }
  if (mode === DM_CHATROOM_TAB.GROUP.value) return undefined;
  return `${import.meta.env.REACT_APP_BACKEND_URL}${data.memberList[0].userNick}`;
};


const DMChatroomItem = ({ data, mode, setChatroomIdToChange }) => {

  const [roomName, setRoomName] = useState('');
  const [chatroomId, setChatroomId] = useAtom(chatroomIdAtom);
  const [openedChatRoom, setOpenedChatRoom] = useAtom(openedChatroomAtom);

  const setOpenChangeProfileModal = useSetAtom(profileModalAtom);
  const [chatroomNameModalOpen, setChatroomNameModalOpen] = useAtom(changeChatroomNameModalAtom);

  const [menuAnchorPosition, setMenuAnchorPosition] = useState(null);
  const open = Boolean(menuAnchorPosition);

  const leaveChatroom = useLeaveChatroom();


  const handleClick = (event) => {
    setMenuAnchorPosition({
      top: event.clientY,
      left: event.clientX,
    });
  };

  const handleClose = (e) => {
    setMenuAnchorPosition(null);
    e.stopPropagation();
  };

  useEffect(() => {
    if (!data) return;
    setRoomName(data.chatroomName ?? data.memberList[0].userNick);
  }, [data]);


  return (
    <ItemContainer
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleClick(e);
      }}
      onClick={() => {
        setChatroomId(data.chatroomId);
        setOpenedChatRoom({
          chatroomId: data.chatroomId,
          chatroomName: roomName,
        });
      }}>
      <UserAvatar
        src={getChatroomProfile(data, mode)}
        userNick={roomName} />
      <TextContainer>
        <Typography variant="body1" fontWeight={'bold'}>{roomName}</Typography>
        {data &&
          <StyledTypography variant="caption" color={'grey'}>
            {data?.latestChat}
          </StyledTypography>}
      </TextContainer>
      {menuAnchorPosition && <Menu
        id="chatroom-item-menu"
        anchorReference="anchorPosition"
        anchorPosition={menuAnchorPosition}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={(e) => {
          handleClose(e);
          setChatroomIdToChange(data.chatroomId);
          setChatroomNameModalOpen(true);
        }}>채팅방 이름 수정</MenuItem>
        <MenuItem onClick={(e) => {
          handleClose(e);
          setChatroomIdToChange(data.chatroomId);
          setOpenChangeProfileModal(true);
        }}>채팅방 사진 수정</MenuItem>
        <MenuItem onClick={(e) => {
          handleClose(e);
          leaveChatroom.mutate({ chatroomId: data.chatroomId });
          if (chatroomId === data.chatroomId) {
            setOpenedChatRoom({ chatroomId: undefined, chatroomName: '' });
            setChatroomId(undefined);
          }
        }}>채팅방 나가기</MenuItem>
      </Menu>}
    </ItemContainer>
  );
};

export default DMChatroomItem;

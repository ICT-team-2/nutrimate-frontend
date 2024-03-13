import React, { useState } from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem, Paper } from '@mui/material';
import Box from '@mui/material/Box';

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
const MenuBox = styled(Box)`
    cursor: pointer;
    padding: 5px 20px;

    &:hover {
        background-color: ${({ theme }) => theme['chat-bg']};
    }
`;

/**
 *
 * @param props
 * @param props.nick {string} 닉네임
 * @param props.content {string} 내용
 * @returns {Element}
 * @constructor
 */
const MyTalkComponent = (props) => {
  const { nick, content, date, src, onDelete } = props;

  const [menuAnchorPosition, setMenuAnchorPosition] = useState(null);
  const open = Boolean(menuAnchorPosition);

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

  return (
    <>
      <AlignLeftContainer
      >
        <MyTalkContainer>
          <TalkContentContainer
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(e);
            }}
          >
            <StyledTypography variant="caption" fontWeight="bold">{nick}</StyledTypography>
            <TalkContentBody>
              {content}
            </TalkContentBody>
          </TalkContentContainer>
          <StyledUserAvatar userNick={nick} src={src} />
        </MyTalkContainer>
      </AlignLeftContainer>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={menuAnchorPosition}
        open={open}
        onClose={handleClose}
      >
        <MenuBox
          selected={false}
          onClick={(e) => {
            onDelete();
            handleClose(e);
          }}>
          메세지 삭제
        </MenuBox>
      </Menu>
    </>
  );
};
MyTalkComponent.defaultProps = {
  nick: '닉네임1',
  content: '내용1',
  date: '2021-10-01',
  onDelete: () => {
  },
};

export default MyTalkComponent;

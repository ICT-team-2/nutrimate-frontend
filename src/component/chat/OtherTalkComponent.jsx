import React, { useState } from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import Typography from '@mui/material/Typography';
import { Menu, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { LINKS } from '@src/utils/const.js';

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
const OtherTalkComponent = (props) => {
  const { nick, content, date, src, userId } = props;

  const [menuAnchorPosition, setMenuAnchorPosition] = useState(null);
  const open = Boolean(menuAnchorPosition);
  const navigate = useNavigate();

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
      <OtherTalkContainer
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClick(e);
        }}
      >
        <StyledUserAvatar userNick={nick} src={src} />
        <TalkContentContainer>
          <Typography variant="caption" fontWeight="bold">{nick}</Typography>
          <TalkContentBody>
            {content}
          </TalkContentBody>
        </TalkContentContainer>
      </OtherTalkContainer>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={menuAnchorPosition}
        open={open}
        onClose={handleClose}
      >
        <MenuBox
          onClick={() => {
            navigate(`${LINKS.MYINFO}/${userId}`);
            handleClose();
          }}
        >
          개인 페이지로 이동
        </MenuBox>
      </Menu>
    </>
  );
};

OtherTalkComponent.defaultProps = {
  nick: '닉네임2',
  content: '내용2',
  date: '2021-10-01',
};

export default OtherTalkComponent;

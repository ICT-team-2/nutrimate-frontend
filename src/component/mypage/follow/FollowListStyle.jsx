import React from 'react';
import FollowList from '@src/component/mypage/follow/FollowList.jsx';
import Modal from '@mui/material/Modal';
import { useAtom } from 'jotai/react';
import {
  followerListModalAtom,
  followingListModalAtom,
} from '@src/component/mypage/atom.js';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { styled as muiStyled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const TitleContainer = styled.div`
    display: flex;

`;

const StyleBox = muiStyled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  border: 1px solid #000;
  box-shadow: 24;
  padding: 20px;
  height: 500px;
  border-radius: 10px;
`;

const FollowListStyle = ({ data, setData, category, title }) => {
  const [followerModalState, setFollowerModalState] = useAtom(
    followerListModalAtom);
  const [followingModalState, setFollowingModalState] = useAtom(
    followingListModalAtom);

  const handleClose = () => {
    if (category === FOLLOW_MODAL.FOLLOWER.KEY) {
      setFollowerModalState(false);
    } else {
      setFollowingModalState(false);
    }
  };

  return (
    <Modal
      open={category === FOLLOW_MODAL.FOLLOWER.KEY
        ? followerModalState
        : followingModalState}
      onClose={handleClose}
    >
      <StyleBox>
        <TitleContainer>
          <FlexGrowDiv />
          <h3>{title}</h3>
          <FlexGrowDiv />
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </TitleContainer>
        <Divider />
        <FollowList data={data} setData={setData} />
      </StyleBox>
    </Modal>
  );
};

export default FollowListStyle;

import React from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { useAtomValue, useSetAtom } from 'jotai/react';
import {
  followerListModalAtom,
  followingListModalAtom,
  myPageTabAtom,
  profileModalAtom,
  uploadedImageAtom,
} from '@src/component/mypage/atom.js';
import ChangeProfileModal from '@src/component/mypage/myinfo/ChangeProfileModal.jsx';
import FollowerListModal from '@src/component/mypage/followlist/FollowerListModal.jsx';
import FollowingListModal from '@src/component/mypage/followlist/FollowingListModal.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';


const MyInfomationContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
`;
const StyledContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 40px;
`;

const NicknNameH3 = styled.h3`
    margin: 0 0 10px;
    display: flex;
`;
const SecondaryInfoSpan = styled.span`

`;
const SelfIntroductionSpan = styled.span`
    min-height: 50px;
    display: block;
    margin-top: 10px;
`;
const SecInfoTypo = muiStyled(Typography)`
  display: inline-block;
  margin-right: 20px;
`;
const NickNameSpan = styled.span`
    margin-right: 30px;
    padding-top: 3px;
    display: block;
`;

const StyledButton = muiStyled(Button)`
  padding: 0;
`;

const MyInfomations = () => {

  const setOpenModal = useSetAtom(profileModalAtom);
  const uploadImg = useAtomValue(uploadedImageAtom);
  const setTabNumber = useSetAtom(myPageTabAtom);
  const setFollowerModal = useSetAtom(followerListModalAtom);
  const setFollowingModal = useSetAtom(followingListModalAtom);

  return (
    <MyInfomationContainer>
      {/* 프로필 사진 */}
      {uploadImg ?
        <UserAvatar size={130} variant="rounded" src={uploadImg} /> :
        <UserAvatar size={130} variant="rounded" />
      }
      <StyledContainerDiv>
        <NicknNameH3>
          <NickNameSpan>닉네임</NickNameSpan>
          <Button
            onClick={() => setOpenModal(true)}
            variant="contained"
            size="small">프로필 변경</Button>
        </NicknNameH3>
        <SecondaryInfoSpan>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setTabNumber(0)}
            >게시물 10</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setFollowerModal(true)}
            >{FOLLOW_MODAL.FOLLOWER.TITLE} 20</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setFollowingModal(true)}
            >{FOLLOW_MODAL.FOLLOWING.TITLE} 30</StyledButton>
          </SecInfoTypo>
        </SecondaryInfoSpan>
        <SelfIntroductionSpan>자기소개</SelfIntroductionSpan>
      </StyledContainerDiv>
      <ChangeProfileModal />
      <FollowerListModal />
      <FollowingListModal />
    </MyInfomationContainer>
  );
};

export default MyInfomations;

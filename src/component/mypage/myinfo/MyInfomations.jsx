import React, { useEffect } from 'react';
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
import FollowerListModal from '@src/component/mypage/followlist/FollowerListModal.jsx';
import FollowingListModal from '@src/component/mypage/followlist/FollowingListModal.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import ChangeProfileComponent from '@src/component/common/ChangeProfileComponent.jsx';
import useFetchProfileData from '@src/hooks/mypage/useFetchProfileData.jsx';
import { useParams } from 'react-router-dom';


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
  const { profileUserId } = useParams();

  const { data: memberData, isLoading } = useFetchProfileData(profileUserId);


  return (
    <MyInfomationContainer>
      {/* 프로필 사진 */}
      {uploadImg ?
        <UserAvatar size={130} variant="rounded" src={uploadImg} /> :
        <UserAvatar
          userNick={memberData?.userNick}
          size={130} variant="rounded"
          src={import.meta.env.REACT_APP_BACKEND_URL + memberData?.userProfile} />
      }
      <StyledContainerDiv>
        <NicknNameH3>
          <NickNameSpan>{memberData?.userNick}</NickNameSpan>
          <ChangeProfileComponent />
        </NicknNameH3>
        <SecondaryInfoSpan>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setTabNumber(0)}
            >게시물 {memberData?.postCount}</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setFollowerModal(true)}
            >{FOLLOW_MODAL.FOLLOWER.TITLE} {memberData?.followerCount}</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant="subtitle1">
            <StyledButton
              color="inherit"
              onClick={() => setFollowingModal(true)}
            >{FOLLOW_MODAL.FOLLOWING.TITLE} {memberData?.followingCount}</StyledButton>
          </SecInfoTypo>
        </SecondaryInfoSpan>
        <SelfIntroductionSpan>{memberData?.userIntro}</SelfIntroductionSpan>
      </StyledContainerDiv>
      <FollowerListModal />
      <FollowingListModal />
    </MyInfomationContainer>
  );
};


export default MyInfomations;

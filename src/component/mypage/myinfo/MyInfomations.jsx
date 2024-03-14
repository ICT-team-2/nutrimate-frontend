import React, { useEffect } from 'react';
import styled from 'styled-components';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled as muiStyled } from '@mui/material/styles';
import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import {
  followerListModalAtom,
  followingListModalAtom,
  myPageTabAtom,
  profileModalAtom,
  profileImageAtom, followerCountAtom, followingCountAtom,
} from '@src/component/mypage/atom.js';
import FollowerListModal
  from '@src/component/mypage/follow/FollowerListModal.jsx';
import FolloweeListModal
  from '@src/component/mypage/follow/FolloweeListModal.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import ChangeProfileComponent
  from '@src/component/common/ChangeProfileComponent.jsx';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import { useParams } from 'react-router-dom';
import FollowButton from '@src/component/common/FollowButton.jsx';

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
  const uploadImg = useAtomValue(profileImageAtom);
  const setTabNumber = useSetAtom(myPageTabAtom);
  const setFollowerModal = useSetAtom(followerListModalAtom);
  const setFollowingModal = useSetAtom(followingListModalAtom);
  const { profileUserId } = useParams();
  const { data: userData, isLoading } = useFetchProfileData(profileUserId);
  
  const [followerCount, setFollowerCount] = useAtom(followerCountAtom);
  const [followingCount, setFollowingCount] = useAtom(followingCountAtom);
  
  useEffect(() => {
    setFollowingCount(userData?.followingCount);
    console.log(userData);
  }, [userData]);
  
  return (
    <MyInfomationContainer>
      {/* 프로필 사진 */}
      {uploadImg ?
        <UserAvatar size={130} variant='rounded' src={uploadImg} /> :
        <UserAvatar
          userNick={userData?.userNick}
          size={130} variant='rounded'
          src={import.meta.env.REACT_APP_BACKEND_URL + userData?.userProfile} />
      }
      <StyledContainerDiv>
        <NicknNameH3>
          <NickNameSpan>{userData?.userNick}</NickNameSpan>
          <ChangeProfileComponent
            isLoginUser={parseInt(profileUserId) ===
              parseInt(sessionStorage.getItem('userId'))}
            profileUserId={profileUserId}
          />
          {parseInt(profileUserId) !==
            parseInt(sessionStorage.getItem('userId')) &&
            <FollowButton
              following={userData?.isFollowing === 1}
              followId={profileUserId} />}
        </NicknNameH3>
        <SecondaryInfoSpan>
          <SecInfoTypo variant='subtitle1'>
            <StyledButton
              color='inherit'
              onClick={() => setTabNumber(0)}
            >게시물 {userData?.postCount}</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant='subtitle1'>
            <StyledButton
              color='inherit'
              onClick={() => setFollowerModal(true)}
            >{FOLLOW_MODAL.FOLLOWER.TITLE} {userData?.followerCount}</StyledButton>
          </SecInfoTypo>
          <SecInfoTypo variant='subtitle1'>
            <StyledButton
              color='inherit'
              onClick={() => setFollowingModal(true)}
            >{FOLLOW_MODAL.FOLLOWING.TITLE} {followingCount}</StyledButton>
          </SecInfoTypo>
        </SecondaryInfoSpan>
        <SelfIntroductionSpan>{userData?.userIntro}</SelfIntroductionSpan>
      </StyledContainerDiv>
      <FollowerListModal />
      <FolloweeListModal />
    </MyInfomationContainer>
  );
};

export default MyInfomations;

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import ListSubheader from '@mui/material/ListSubheader';
import { Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import { useAtomValue } from 'jotai/react';
import { profileImageAtom } from '@src/component/mypage/atom.js';
import Paper from '@mui/material/Paper';
import useFetchProfileData from '@src/hooks/useFetchProfileData.jsx';
import { userIdAtom } from '@src/pages/login/atom.js';
import { useEffect } from 'react';
import FollowButton from '@src/component/common/FollowButton.jsx';
import useFetchRecommandFollowList from '@src/hooks/follow/useFetchRecommandFollowList.jsx';

const exampleDatas = [
  {
    userNick: 'Photos',
    profile: <ImageIcon />,
  },
  {
    userNick: 'Work',
    profile: <WorkIcon />,
  },
  {
    userNick: 'Vacation',
    profile: <BeachAccessIcon />,
  },
  {
    userNick: 'Photos',
    profile: <ImageIcon />,
  },
  {
    userNick: 'Vacation',
    profile: <BeachAccessIcon />,
  },
];

const StyledListItem = muiStyled(ListItem)`
  padding-top:20px;
`;

const FriendListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 4vw;
`;

const AvatarContainer = styled.div`
    margin: 60px 0 20px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-left: 30px;
`;

const UserNameContainer = styled.div`
    margin: 8.5px auto auto 10px;
    height: 100%;
`;

const StyledPaper = styled.div`
    width: 100%;
    max-width: 300px;
    margin-left: 30px;
    height: 400px;

`;

const StyledListSubheader = styled(ListSubheader)`
    background-color: inherit;
    position: static;
`;

const RecommendFriendList = ({ datas = exampleDatas }) => {
  const { data: userData } = useFetchProfileData();
  const { data: recommendFollowData } = useFetchRecommandFollowList();

  return (
    <FriendListContainer>
      <AvatarContainer>
        <UserAvatar
          userNick={userData?.userNick}
          src={import.meta.env.REACT_APP_BACKEND_URL + userData?.userProfile} />
        <UserNameContainer>{userData?.userNick}</UserNameContainer>
      </AvatarContainer>
      <StyledPaper>
        <List
          subheader={
            <StyledListSubheader>
              회원님을 위한 추천
            </StyledListSubheader>
          }
        >
          {recommendFollowData && recommendFollowData.map((data, index) => (
            <StyledListItem key={data.userNick + index}>
              <ListItemAvatar>
                <UserAvatar
                  userNick={data.userNick}
                  src={import.meta.env.REACT_APP_BACKEND_URL + data.userProfile} />
              </ListItemAvatar>
              <ListItemText primary={data.userNick} />
              <FollowButton
                followId={data.userId}
                following={data.isFollowing === 1}
              >팔로우</FollowButton>
            </StyledListItem>
          ))}
        </List>
      </StyledPaper>
    </FriendListContainer>
  );
};
export default RecommendFriendList;
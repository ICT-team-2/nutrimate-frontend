import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Button } from '@mui/material';
import { styled as muiStyled } from '@mui/material/styles';
import styled from 'styled-components';
import FollowButton from '@src/component/common/FollowButton.jsx';
import { UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import { useAtom, useSetAtom } from 'jotai/react';
import { followerCountAtom, followingCountAtom } from '@src/component/mypage/atom.js';

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
const FollowListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const StyledList = muiStyled(List)({
  width: '100%',
  bgcolor: 'background.paper',
  marginLeft: '30px',
  overflow: 'auto',
  height: '400px',
});

const FollowList = ({ data, setData }) => {

  const setFollowingCount = useSetAtom(followingCountAtom);

  const handleFollow = (index) => {
    setFollowingCount((prev) => prev + 1);
    setData((prev) => {
      const newData = [...prev];
      newData[index].isFollowing = 1;
      return newData;
    });
  };
  const handleUnfollow = (index) => {
    setFollowingCount((prev) => prev - 1);
    setData((prev) => {
      const newData = [...prev];
      newData[index].isFollowing = 0;
      return newData;
    });
  };

  return (
    <FollowListContainer>
      <StyledList>
        {data && data.map((item, index) => (
          <StyledListItem key={item.userNick + index}>
            <ListItemAvatar>
              <UserAvatar
                userNick={item.userNick}
                src={import.meta.env.REACT_APP_BACKEND_URL + item.userProfile}
              />
            </ListItemAvatar>
            <ListItemText primary={item.userNick} />
            <FollowButton
              followId={item.userId}
              following={item.isFollowing === 1}
              onClickFollow={() => handleFollow(index)}
              onClickUnfollow={() => handleUnfollow(index)}
            >팔로우</FollowButton>
          </StyledListItem>
        ))}
      </StyledList>

    </FollowListContainer>
  );
};

FollowList.defaultProps = {
  data: exampleDatas,
};

export default FollowList;
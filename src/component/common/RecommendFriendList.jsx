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
import { uploadedImageAtom } from '@src/component/mypage/atom.js';
import Paper from '@mui/material/Paper';

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
    padding-left: 50px;
`;

const UserNameContainer = styled.div`
    margin: 8.5px auto auto 10px;
    height: 100%;
    color: ${({ theme }) => theme['light-text']};
`;

const StyledPaper = styled(Paper)`
    width: 100%;
    max-width: 300px;
    margin-left: 30px;
    height: 400px;

`;

const RecommendFriendList = ({ datas = exampleDatas }) => {
  const uploadImg = useAtomValue(uploadedImageAtom);
  
  return (
    <FriendListContainer>
      <AvatarContainer>
        <UserAvatar src={uploadImg} />
        <UserNameContainer>username</UserNameContainer>
      </AvatarContainer>
      <StyledPaper>
      <List
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            회원님을 위한 추천
          </ListSubheader>
        }
      >
        {datas.map((data, index) => (
          <StyledListItem key={data.userNick + index}>
            <ListItemAvatar>
              <Avatar>{data.profile}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={data.userNick} />
            <Button color='info'>팔로우</Button>
          </StyledListItem>
        ))}
      </List>
      </StyledPaper>

    </FriendListContainer>
  );
};
export default RecommendFriendList;
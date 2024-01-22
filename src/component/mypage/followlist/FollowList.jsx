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

const FollowList = ({ data }) => {
  return (
    <FollowListContainer>
      <StyledList>
        {data.map((item, index) => (
          <StyledListItem key={item.userNick + index}>
            <ListItemAvatar>
              <Avatar>{item.profile}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.userNick} />
            <Button color="info">팔로우</Button>
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
import React, { useState } from 'react';
import { Button } from '@mui/material';
import useRegisterFollow from '@src/hooks/follow/useRegisterFollow.jsx';
import useDeleteFollow from '@src/hooks/follow/useDeleteFollow.jsx';

const FollowButton = ({ following, followId, onClickFollow, onClickUnfollow }) => {

  const [follow, setFollow] = useState(following);

  const registerFollow = useRegisterFollow(followId);
  const deleteFollow = useDeleteFollow(followId);

  const clickFollow = () => {
    console.log('팔로우');
    registerFollow.mutate();
    setFollow(true);
    onClickFollow();
  };
  const clickUnfollow = () => {
    console.log('해제');
    deleteFollow.mutate();
    setFollow(false);
    onClickUnfollow();
  };

  return (
    <>
      {follow ?
        <Button
          variant="text" color="error"
          onClick={clickUnfollow}
        >
          해제
        </Button> :
        <Button
          variant="text" color="info"
          onClick={clickFollow}
        >
          팔로우
        </Button>
      }
    </>
  );
};

FollowButton.defaultProps = {
  following: false,
  onClickFollow: () => {
  },
  onClickUnfollow: () => {
  },
};

export default FollowButton;
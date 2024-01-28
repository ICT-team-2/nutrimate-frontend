import React from 'react';
import FollowListStyle from '@src/component/mypage/followlist/FollowListStyle.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';

const FollowerListModal = () => {
  return (
    <>
      <FollowListStyle
        category={FOLLOW_MODAL.FOLLOWER.KEY}
        title={FOLLOW_MODAL.FOLLOWER.TITLE} />
    </>
  );
};

export default FollowerListModal;

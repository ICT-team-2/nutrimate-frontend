import React from 'react';
import FollowListStyle from '@src/component/mypage/followlist/FollowListStyle.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';

const FollowingListModal = () => {


  return (
    <>
      <FollowListStyle
        category={FOLLOW_MODAL.FOLLOWING.KEY}
        title={FOLLOW_MODAL.FOLLOWING.TITLE}
      />
    </>
  );
};

export default FollowingListModal;

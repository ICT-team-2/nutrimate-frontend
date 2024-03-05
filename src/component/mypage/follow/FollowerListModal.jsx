import React, { useEffect, useState } from 'react';
import FollowListStyle from '@src/component/mypage/follow/FollowListStyle.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import useFetchFollowerList from '@src/hooks/follow/useFetchFollowerList.jsx';

const FollowerListModal = () => {
  const { data } = useFetchFollowerList();
  const [dataState, setDataState] = useState(null);

  useEffect(() => {
    setDataState(data);
  }, [data]);
  return (
    <>
      <FollowListStyle
        category={FOLLOW_MODAL.FOLLOWER.KEY}
        title={FOLLOW_MODAL.FOLLOWER.TITLE}
        data={dataState} setData={setDataState}
      />
    </>
  );
};

export default FollowerListModal;

import React, { useEffect, useState } from 'react';
import FollowListStyle from '@src/component/mypage/follow/FollowListStyle.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import useFetchFollowerList from '@src/hooks/follow/useFetchFollowerList.jsx';
import { useParams } from 'react-router-dom';

const FollowerListModal = () => {
  const { profileUserId } = useParams();
  
  const { data } = useFetchFollowerList(profileUserId);
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

import React, { useEffect, useState } from 'react';
import FollowListStyle from '@src/component/mypage/follow/FollowListStyle.jsx';
import { FOLLOW_MODAL } from '@src/component/mypage/const.js';
import useFetchFolloweeList from '@src/hooks/follow/useFetchFolloweeList.jsx';

const FolloweeListModal = () => {

  const { data } = useFetchFolloweeList();
  const [dataState, setDataState] = useState(null);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <>
      <FollowListStyle
        category={FOLLOW_MODAL.FOLLOWING.KEY}
        title={FOLLOW_MODAL.FOLLOWING.TITLE}
        data={dataState} setData={setDataState}
      />
    </>
  );
};

export default FolloweeListModal;

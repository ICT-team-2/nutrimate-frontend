import React, { useEffect, useState } from 'react';
import InfoBoardTable from '@src/component/board/info/list/InfoBoardTable.jsx';
import styled from 'styled-components';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';
import useFetchProfileInfoBoardList from '@src/hooks/mypage/useFetchProfileInfoBoardList.jsx';
import { useParams } from 'react-router-dom';

const MyInfoPostsContainer = styled.div`
    margin-bottom: 40px;
`;

const MyInfoPosts = () => {
  const [pageState, setPageState] = useState(1);
  const { profileUserId } = useParams();
  const { data, isLoading, isError } = useFetchProfileInfoBoardList(profileUserId, pageState);

  const handlePageChange = (event, value) => {
    setPageState(value);
  };
  
  return (
    <MyInfoPostsContainer>
      <InfoBoardTable data={data?.infoBoardList} />
      <PagnationComponent
        pageState={pageState}
        totalPage={data?.totalPage}
        handlePageChange={handlePageChange} />
    </MyInfoPostsContainer>
  );
};

export default MyInfoPosts;

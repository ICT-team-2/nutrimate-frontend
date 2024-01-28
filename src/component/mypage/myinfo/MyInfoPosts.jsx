import React, { useState } from 'react';
import InfoBoardTable from '@src/component/board/info/list/InfoBoardTable.jsx';
import styled from 'styled-components';
import PagnationComponent from '@src/component/common/PagnationComponent.jsx';

const MyInfoPostsContainer = styled.div`
    margin-bottom: 40px;
`;

const MyInfoPosts = () => {
  const [pageState, setPageState] = useState(1);
  
  const handlePageChange = (event, value) => {
    setPageState(value);
  };
  
  return (
    <MyInfoPostsContainer>
      <InfoBoardTable />
      <PagnationComponent pageState={pageState}
                          handlePageChange={handlePageChange} />
    </MyInfoPostsContainer>
  );
};

export default MyInfoPosts;

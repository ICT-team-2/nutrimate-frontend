import React from 'react';
import { Pagination } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';

const PagingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
`;

const PagnationComponent = (props) => {
  const { pageState, handlePageChange, allPage } = props;
  return (
    <PagingContainer>
      <FlexGrowDiv></FlexGrowDiv>
      <Pagination count={allPage} color="primary" showFirstButton showLastButton
                  shape="rounded" page={pageState} onChange={handlePageChange}
      />
    </PagingContainer>
  );
};

PagnationComponent.defaultProps = {
  pageState: 1,
  handlePageChange: () => {
  },
  allPage: 10,
};

export default PagnationComponent;

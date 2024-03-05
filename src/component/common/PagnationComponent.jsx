import React from 'react';
import { Pagination } from '@mui/material';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';

const PagingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 40px 0;
`;
/**
 *
 * @param props {object} - props
 * @param {number} props.pageState 현재 페이지
 * @param {function} props.handlePageChange 페이지 변경 핸들러
 * @param {number} props.totalPage 전체 페이지
 * @returns {Element}
 * @constructor
 */
const PagnationComponent = (props) => {
  const { pageState, handlePageChange, totalPage } = props;

  if (totalPage === 0) return null;

  return (
    <PagingContainer>
      <FlexGrowDiv></FlexGrowDiv>
      <Pagination count={totalPage} color="primary" showFirstButton showLastButton
                  shape="rounded" page={pageState} onChange={handlePageChange}
      />
    </PagingContainer>
  );
};

PagnationComponent.defaultProps = {
  pageState: 1,
  handlePageChange: () => {
  },
  totalPage: 10,
};

export default PagnationComponent;

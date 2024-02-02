import React from 'react';
import styled from 'styled-components';
import TestComp from '@src/pages/test/TestComp.jsx';


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const TestPage = () => {
  return (
    <TestComp />
  );
};

export default TestPage;

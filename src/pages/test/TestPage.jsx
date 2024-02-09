import React from 'react';
import styled from 'styled-components';
import TestComp from '@src/pages/test/TestComp.jsx';
import SurveyAllergy from '@src/component/survey/SurveyAllergy.jsx';


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const TestPage = () => {
  return (
    <SurveyAllergy />
  );
};

export default TestPage;

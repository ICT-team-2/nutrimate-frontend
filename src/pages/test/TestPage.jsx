import React from 'react';
import styled from 'styled-components';
import TestComp from '@src/pages/test/TestComp.jsx';
import SurveyAllergy from '@src/component/survey/SurveyAllergy.jsx';
import OcrModal from '@src/component/board/OcrModal.jsx';
import TestStomp from '@src/pages/test/TestStomp.jsx';


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

import React from 'react';
import styled from 'styled-components';
import TestComp from '@src/pages/test/TestComp.jsx';
import SurveyAllergy from '@src/component/survey/SurveyAllergy.jsx';
import OcrModal from '@src/component/board/OcrModal.jsx';


const PageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

const TestPage = () => {
  return (
    <OcrModal />
  );
};

export default TestPage;

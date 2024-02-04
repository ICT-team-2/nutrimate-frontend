import React from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import SurveyName from '@src/component/survey/SurveyName.jsx';

export const SurveyContainer = styled.div`
    margin: auto;
    display: inline-block;
    max-width: 720px;
    width: 100%;
`;
export const SurveyFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
`;

const SurveyContents = () => {
  return (
    <SurveyFlexDiv>
      <SurveyContainer>
        <SurveyProgress />
      </SurveyContainer>
    </SurveyFlexDiv>
  );
};

const SurveyProgress = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  switch (progress) {
    case SURVEY_PROGRESS.NAME:
      return <SurveyName />;
    default:
      return <div>Unknown progress {progress}</div>;
  }
};

export default SurveyContents;

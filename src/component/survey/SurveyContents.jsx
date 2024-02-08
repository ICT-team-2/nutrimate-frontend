import React from 'react';
import styled from 'styled-components';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import SurveyName from '@src/component/survey/SurveyName.jsx';
import SurveyBirth from '@src/component/survey/SurveyBirth.jsx';
import SurveyGender from '@src/component/survey/SurveyGender.jsx';
import SurveyHeight from '@src/component/survey/SurveyHeight.jsx';
import SurveyWeight from '@src/component/survey/SurveyWeight.jsx';
import SurveyHealthReason from '@src/component/survey/SurveyHealthReason.jsx';
import SurveyDiet from '@src/component/survey/SurveyDiet.jsx';
import SurveyEatingHabits from '@src/component/survey/SurveyEatingHabits.jsx';
import SurveySportHard from '@src/component/survey/SurveySportHard.jsx';
import SurveyAllergy from '@src/component/survey/SurveyAllergy.jsx';
import RegisterPage from '@src/pages/login/RegisterPage.jsx';

export const SurveyContainer = styled.div`
    margin: auto;
    display: inline-block;
    max-width: ${({ progress }) => progress === SURVEY_PROGRESS.ALLERGY ? '1200px' : '720px'};
    width: 100%;
`;
export const SurveyFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${({ progress }) => progress === SURVEY_PROGRESS.ALLERGY ? 'auto' : '100vh'};
    margin-top: ${({ progress }) => progress === SURVEY_PROGRESS.ALLERGY ? '40px' : 0};
    width: 100%;
`;

const SurveyContents = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);

  return (
    <SurveyFlexDiv progress={progress}>
      <SurveyContainer progress={progress}>
        <SurveyProgressContent />
      </SurveyContainer>
    </SurveyFlexDiv>
  );
};

const SurveyProgressContent = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  switch (progress) {
    case SURVEY_PROGRESS.NAME:
      return <SurveyName />;
    case SURVEY_PROGRESS.BIRTHDAY:
      return <SurveyBirth />;
    case SURVEY_PROGRESS.GENDER:
      return <SurveyGender />;
    case SURVEY_PROGRESS.HEIGHT:
      return <SurveyHeight />;
    case SURVEY_PROGRESS.WEIGHT:
      return <SurveyWeight />;
    case SURVEY_PROGRESS.HEALTH_REASON:
      return <SurveyHealthReason />;
    case SURVEY_PROGRESS.DIET:
      return <SurveyDiet />;
    case SURVEY_PROGRESS.EATING_HABIT:
      return <SurveyEatingHabits />;
    case SURVEY_PROGRESS.EXERCISE_COUNT:
      return <SurveySportHard />;
    case SURVEY_PROGRESS.ALLERGY:
      return <SurveyAllergy />;
    default:
      return <div>Unknown progress {progress}</div>;
  }
};

export default SurveyContents;

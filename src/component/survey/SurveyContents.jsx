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
    default:
      return <div>Unknown progress {progress}</div>;
  }
};

export default SurveyContents;

import React, { useEffect } from 'react';
import SurveyStart from '@src/component/survey/SurveyStart.jsx';
import SurveyProgressBar from '@src/component/survey/SurveyProgressBar.jsx';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import SurveyName from '@src/component/survey/SurveyName.jsx';
import SurveyContents from '@src/component/survey/SurveyContents.jsx';

const SurveyPage = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);
  
  useEffect(() => {
    setProgress(SURVEY_PROGRESS.START);
  }, []);
  
  return (
    <>
      <SurveyProgressBar />
      {progress === SURVEY_PROGRESS.START
        ? <SurveyStart /> : <SurveyContents />}
    </>
  );
};

export default SurveyPage;

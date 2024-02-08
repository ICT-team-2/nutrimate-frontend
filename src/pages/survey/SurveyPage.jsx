import React, { useEffect } from 'react';
import SurveyStart from '@src/component/survey/SurveyStart.jsx';
import SurveyProgressBar from '@src/component/survey/SurveyProgressBar.jsx';
import { useAtom } from 'jotai/react';
import { surveyProgressAtom } from '@src/component/survey/atom.js';
import { SURVEY_PROGRESS } from '@src/component/survey/const.js';
import SurveyContents from '@src/component/survey/SurveyContents.jsx';
import RegisterPage from '@src/pages/login/RegisterPage.jsx';

const SurveyPage = () => {
  const [progress, setProgress] = useAtom(surveyProgressAtom);

  useEffect(() => {
    setProgress(SURVEY_PROGRESS.START);
  }, []);

  return (
    <>
      <SurveyProgressBar />
      <SurveyPageContent />
    </>
  );
};

const SurveyPageContent = () => {

  const [progress, setProgress] = useAtom(surveyProgressAtom);
  switch (progress) {
    case SURVEY_PROGRESS.START:
      return <SurveyStart />;
    case SURVEY_PROGRESS.FINISH:
      return <RegisterPage />;
    default:
      return <SurveyContents />;
  }
};


export default SurveyPage;

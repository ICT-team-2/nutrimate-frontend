import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SurveyPage from '@src/pages/survey/SurveyPage.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';

const SurveyRoutes = () => {
  return (
    <Routes>

      <Route path={''} element={<SurveyPage />} />
      <Route path={'*'} element={<NotFound404Page />} />
    </Routes>
  );
};

export default SurveyRoutes;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SurveyPage from '@src/pages/survey/SurveyPage.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import PrivateRoute from '@src/routes/PrivateRoute.jsx';
import PublicRoute from '@src/routes/PublicRoute.jsx';

const SurveyRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PublicRoute />}>
        <Route path={''} element={<SurveyPage />} />
        <Route path={'*'} element={<NotFound404Page />} />
      </Route>
    </Routes>
  );
};

export default SurveyRoutes;

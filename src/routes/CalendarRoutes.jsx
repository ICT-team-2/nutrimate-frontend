import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CalendarPage from '@src/pages/calendar/CalendarPage.jsx';
import Layout from '@src/layout/Layout.jsx';
import NotFound404Page from '@src/pages/NotFound404Page.jsx';
import PrivateRoute from '@src/routes/PrivateRoute.jsx';

const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<PrivateRoute />}>
        <Route path={''} element={<Layout />}>
          <Route path="" element={<CalendarPage />}></Route>
          <Route path={'*'} element={<NotFound404Page />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default CalendarRoutes;

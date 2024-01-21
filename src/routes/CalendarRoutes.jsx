import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CalendarPage from '@src/pages/calendar/CalendarPage.jsx';
import Layout from '@src/layout/Layout.jsx';

const CalendarRoutes = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Layout />}>
        <Route path="/" element={<CalendarPage />}></Route>
      </Route>
    </Routes>
  );
};

export default CalendarRoutes;

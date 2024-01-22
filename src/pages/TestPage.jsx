import React from 'react';
import MonthPicker from '@src/component/calendar/MonthPicker.jsx';
import TestComp from '@src/pages/TestComp.jsx';

const TestPage = () => {
  return (
    <div>
      <MonthPicker />
      <TestComp />
    </div>
  );
};

export default TestPage;

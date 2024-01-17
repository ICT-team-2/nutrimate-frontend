import React from 'react';
import BoardLayout from '@src/pages/layout/BoardLayout.jsx';
import BoardListContent from '@src/component/board/BoardListContent.jsx';

const FoodBoardPage = () => {
  return (
    <>
      <BoardListContent title="식단" category="food" />
    </>
  );
};

export default FoodBoardPage;

import React from 'react';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import BoardListContent from '@src/component/board/BoardListContent.jsx';
import { PATH_PARAMS, TITLE } from '@src/utils/const.js';

const FoodBoardPage = () => {
  return (
    <>
      <BoardListContent
        title={TITLE.FOOD_BOARD}
        category={PATH_PARAMS.FOOD} />
    </>
  );
};

export default FoodBoardPage;

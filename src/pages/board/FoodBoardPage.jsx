import React from 'react';
import InfoBoardListContent
  from '@src/component/board/info/list/InfoBoardListContent.jsx';
import { PATH_PARAMS, TITLE } from '@src/utils/const.js';
import { BOARD } from '@src/component/board/const.js';

const FoodBoardPage = () => {
  return (
    <InfoBoardListContent
      title={TITLE.FOOD_BOARD}
      category={BOARD.INFO.FOOD} />
  );
};

export default FoodBoardPage;

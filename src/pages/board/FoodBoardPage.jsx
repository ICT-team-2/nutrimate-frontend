import React from 'react';
import InfoBoardListContent from '@src/component/board/info/InfoBoardListContent.jsx';
import { PATH_PARAMS, TITLE } from '@src/utils/const.js';

const FoodBoardPage = () => {
  return (
    <>
      <InfoBoardListContent
        title={TITLE.FOOD_BOARD}
        category={PATH_PARAMS.FOOD} />
    </>
  );
};

export default FoodBoardPage;

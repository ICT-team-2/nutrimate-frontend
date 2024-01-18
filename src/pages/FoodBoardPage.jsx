import React from 'react';
import BoardLayout from '@src/layout/BoardLayout.jsx';
import InfoBoardContent from '@src/component/board/info/InfoBoardContent.jsx';
import { PATH_PARAMS, TITLE } from '@src/utils/const.js';

const FoodBoardPage = () => {
  return (
    <>
      <InfoBoardContent
        title={TITLE.FOOD_BOARD}
        category={PATH_PARAMS.FOOD} />
    </>
  );
};

export default FoodBoardPage;

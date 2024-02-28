import React from 'react';
import InfoBoardListContent
  from '@src/component/board/info/list/InfoBoardListContent.jsx';
import { PATH_PARAMS } from '@src/utils/const.js';
import { BOARD } from '@src/component/board/const.js';

const SportBoardPage = () => {

  return (
    <InfoBoardListContent
      title="운동" category={BOARD.INFO.SPORT} />

  );
};

export default SportBoardPage;

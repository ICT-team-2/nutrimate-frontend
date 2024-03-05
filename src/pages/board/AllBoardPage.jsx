import React from 'react';
import InfoBoardListContent from '@src/component/board/info/list/InfoBoardListContent.jsx';
import { BOARD } from '@src/component/board/const.js';

const AllBoardPage = () => {

  return (
    <InfoBoardListContent category={BOARD.INFO.ALL} />
  );
};

export default AllBoardPage;

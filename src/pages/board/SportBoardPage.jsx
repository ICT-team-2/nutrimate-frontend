import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InfoBoardListContent
  from '@src/component/board/info/list/InfoBoardListContent.jsx';

const SportBoardPage = () => {
  const { boardId } = useParams();
  return (
    <>
      <InfoBoardListContent title='운동' category='sport' />
    </>
  );
};

export default SportBoardPage;

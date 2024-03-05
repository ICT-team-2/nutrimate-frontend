import React from 'react';
import FeedWrite from '@src/component/board/feed/FeedWrite.jsx';
import { styled as muiStyled } from '@mui/material/styles';
import { Container } from '@mui/material';
import useFetchFeedDetail from '@src/hooks/board/feed/useFetchFeedDetail.jsx';
import { useParams } from 'react-router-dom';


const FeedBoardEditContainer = muiStyled(Container)`
    margin-top: 20px;
`;

const FeedBoardEditPage = () => {
  const param = useParams();
  const { boardId } = param;
  const { data, isLoading, isError } = useFetchFeedDetail(boardId);


  return (
    <FeedBoardEditContainer>
      <FeedWrite editData={data} isEdit />
    </FeedBoardEditContainer>
  );
};

export default FeedBoardEditPage;

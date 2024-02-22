import React from 'react';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { FlexGrowDiv } from '@src/component/common/GlobalComponents.jsx';
import FeedCommentList from '@src/component/board/feed/FeedCommentList.jsx';
import { NO_IMAGE_PATH } from '@src/utils/const.js';

const StyledBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 16px;
    border-radius: 10px;
    display: flex;
    width: 70%;
    max-width: 1200px;
    height: auto;
`;
const ImgContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 700px;
`;
const StyledImg = styled.img`
    max-width: 100%;
    height: auto;
    margin: auto;
`;
const OuterContainer = styled.div`
    max-width: 100%;
`;

/*
  나는 FeedDetailContent의 모달 창 좌우 크기를 줄였을 경우에 모달창의 width와 height가 비율적으로 줄어드는 것을 바라고 있어.
  그런데 image쪽은 좌우크기를 줄이면 비율적으로 줄어드는데 FeedDetailContent쪽은 비율적으로 줄어들지 않고
  좌우의 크기가 줄어들지 않고 있어.
*/

const FeedDetailContent = ({ data, open, setOpen }) => {

  const {
    boardContent, boardId, boardThumbnail,
    checkedLike, likeCount, userNick: writer,
  } = data;
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <OuterContainer>
        <StyledBox>
          <FlexGrowDiv>
            <ImgContainer>
              <StyledImg
                src={import.meta.env.REACT_APP_BACKEND_URL + boardThumbnail}
                alt="feed image"
                onError={(e) => {
                  e.target.src = NO_IMAGE_PATH;
                }} />
            </ImgContainer>
          </FlexGrowDiv>
          <FlexGrowDiv>
            <FeedCommentList
              feedData={data} />
          </FlexGrowDiv>
        </StyledBox>
      </OuterContainer>
    </Modal>
  );
};

FeedDetailContent.defaultProps = {
  data: {},
  open: false,
  setOpen: () => {
  },
};

export default FeedDetailContent;

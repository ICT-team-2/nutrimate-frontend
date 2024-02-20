import React, { useRef } from 'react';
import { FlexGrowDiv, UserAvatar } from '@src/component/common/GlobalComponents.jsx';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FeedCommentComponent from '@src/component/board/feed/FeedCommentComponent.jsx';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment.js';
import LikeButton from '@src/component/board/LikeButton.jsx';
import BookmarkIcon from '@mui/icons-material/Bookmark.js';
import { Button, TextField } from '@mui/material';

const CONTAINER_MAX_HEIGHT = 'calc(100vh - 100px)';
const COMMENT_LIST_MAX_HEIGHT = 'calc(200% - 120px)';

const FeedCommentInnerContainer = styled.div`
    max-width: 100%;
    padding-left: 30px;
    max-height: ${CONTAINER_MAX_HEIGHT};
    height: 80vw;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    position: relative;

`;
const FeedCommentOuterContainer = styled.div`
    width: 100%;

`;

const FeedCommentHeader = styled.div`
    display: flex;
    align-items: flex-start;
    margin: 10px 0;
`;
const NicknameTypo = styled(Typography)`
    margin: 9px 0 0 10px;
`;
const FeedCommentBody = styled.div`
    overflow-y: scroll;
    height: 70vh;
    scrollbar-width: none;
    position: relative;
    max-height: ${COMMENT_LIST_MAX_HEIGHT};
    flex-grow: 1;
    backface-visibility: hidden; //하드웨어 가속을 강제로 활성화
    transform: translate3d(0, 0, 0);
`;


const LikeButtonContainer = styled.div`
    position: relative;
    left: 13px;
    top: 4px;
`;
const ButtonsContainer = styled.div`
    display: flex;
`;
const CommentInputContainer = styled.div`
    display: flex;
`;
const StyledButton = styled(Button)`
    height: 40px;
    margin-left: 5px;
`;
const LikeViewContainer = styled.div`
    position: relative;
    bottom: 5px;
`;
const CommentTextField = styled(TextField)`
    width: calc(100% - 100px);
`;
const LikeTypography = styled(Typography)`
    font-weight: bold;
`;

const FeedCommentList = () => {

  const commentInputRef = useRef(null);

  return (
    <FeedCommentOuterContainer>
      <FeedCommentInnerContainer>
        <FeedCommentHeader>
          <UserAvatar userNick={'닉네임'} />
          <NicknameTypo variant="subtitle2">{'닉네임'}</NicknameTypo>
        </FeedCommentHeader>
        <Divider />
        <FeedCommentBody>
          <FeedCommentComponent inputRef={commentInputRef} />
          <FeedCommentComponent inputRef={commentInputRef} />
          <FeedCommentComponent inputRef={commentInputRef} />
          {/*<FeedCommentComponent />*/}
        </FeedCommentBody>
        <Divider />
        <ButtonsContainer>
          <Tooltip title="댓글">
            <IconButton
              onClick={() => {
                commentInputRef.current.focus();
              }}
              aria-label="comment">
              <CommentIcon />
            </IconButton>
          </Tooltip>
          <FlexGrowDiv />
          <Tooltip title={'좋아요'}>
            <LikeButtonContainer>
              <LikeButton size={7} />
            </LikeButtonContainer>
          </Tooltip>
          <Tooltip title="북마크">
            <IconButton aria-label="bookmark">
              <BookmarkIcon />
            </IconButton>
          </Tooltip>
        </ButtonsContainer>
        <LikeViewContainer>
          <LikeTypography variant="body2">좋아요 5개</LikeTypography>
        </LikeViewContainer>
        <CommentInputContainer>
          <CommentTextField
            inputRef={commentInputRef}
            size="small" />
          <FlexGrowDiv />
          <StyledButton variant="contained">댓글달기</StyledButton>
        </CommentInputContainer>
      </FeedCommentInnerContainer>
    </FeedCommentOuterContainer>

  );
};

export default FeedCommentList;
